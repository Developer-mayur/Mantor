import React, { useEffect, useCallback, useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import { useSocket } from '../context/SocketProvider';

class PeerConnection {
  constructor(onIceCandidate) {
    this.peer = new RTCPeerConnection({
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' }
      ]
    });

    this.peer.onicecandidate = (event) => {
      if(event.candidate) onIceCandidate(event.candidate);
    };
  }

  async createOffer() {
    const offer = await this.peer.createOffer();
    await this.peer.setLocalDescription(offer);
    return offer;
  }

  async createAnswer(offer) {
    await this.peer.setRemoteDescription(offer);
    const answer = await this.peer.createAnswer();
    await this.peer.setLocalDescription(answer);
    return answer;
  }

  async setRemoteDescription(answer) {
    await this.peer.setRemoteDescription(answer);
  }

  addTrack(stream) {
    stream.getTracks().forEach(track => this.peer.addTrack(track, stream));
  }

  addIceCandidate(candidate) {
    this.peer.addIceCandidate(new RTCIceCandidate(candidate));
  }

  onTrack(callback) {
    this.peer.ontrack = (event) => callback(event.streams[0]);
  }

  close() {
    this.peer.close();
  }
}

const RoomPage = ({ roomId, onLeave }) => {
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const peerRef = useRef(null);
  const mediaStreamRef = useRef(null);

  // ICE Candidate Handling
  const handleIceCandidate = useCallback((candidate) => {
    socket.emit('ice:candidate', { to: remoteSocketId, candidate });
  }, [remoteSocketId, socket]);

  // Initialize Peer Connection
  useEffect(() => {
    peerRef.current = new PeerConnection(handleIceCandidate);
    peerRef.current.onTrack(setRemoteStream);
    
    return () => {
      if(peerRef.current) peerRef.current.close();
      if(mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Get User Media
  const getMediaStream = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: true, 
        video: true 
      });
      setMyStream(stream);
      mediaStreamRef.current = stream;
      peerRef.current.addTrack(stream);
    } catch(error) {
      console.error('Media Error:', error);
    }
  }, []);

  // Start Call
  const handleCall = useCallback(async () => {
    await getMediaStream();
    const offer = await peerRef.current.createOffer();
    socket.emit('user:call', { to: remoteSocketId, offer });
  }, [remoteSocketId, socket, getMediaStream]);

  // Handle Incoming Call
  const handleIncomingCall = useCallback(async ({ from, offer }) => {
    await getMediaStream();
    const answer = await peerRef.current.createAnswer(offer);
    socket.emit('call:accepted', { to: from, answer });
    setRemoteSocketId(from);
  }, [socket, getMediaStream]);

  // Socket Event Handlers
  useEffect(() => {
    if(!socket) return;

    const handlers = {
      'user:joined': ({ id }) => setRemoteSocketId(id),
      'incoming:call': handleIncomingCall,
      'call:accepted': ({ answer }) => peerRef.current.setRemoteDescription(answer),
      'ice:candidate': ({ candidate }) => peerRef.current.addIceCandidate(candidate),
      'user:left': () => {
        setRemoteSocketId(null);
        setRemoteStream(null);
      }
    };

    Object.entries(handlers).forEach(([event, handler]) => {
      socket.on(event, handler);
    });

    return () => {
      Object.entries(handlers).forEach(([event, handler]) => {
        socket.off(event, handler);
      });
    };
  }, [socket, handleIncomingCall]);

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h2>Room: {roomId}</h2>
        <button 
          onClick={onLeave}
          style={{ padding: '8px 16px', background: '#dc3545', color: 'white', border: 'none' }}
        >
          Leave Room
        </button>
      </div>

      {remoteSocketId && !myStream && (
        <button 
          onClick={handleCall}
          style={{ padding: '10px 20px', background: '#28a745', color: 'white', border: 'none' }}
        >
          Start Call
        </button>
      )}

      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        {myStream && (
          <div>
            <h3>Your Video</h3>
            <ReactPlayer
              playing
              muted
              height={200}
              width={300}
              url={myStream}
            />
          </div>
        )}

        {remoteStream && (
          <div>
            <h3>Remote Video</h3>
            <ReactPlayer
              playing
              height={200}
              width={300}
              url={remoteStream}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomPage;