import React, { useState, useEffect } from 'react';
import { useSocket } from '../context/SocketProvider';
import RoomPage from './Room';

const LobbyScreen = () => {
  const [roomId, setRoomId] = useState('');
  const [email, setEmail] = useState('');
  const [activeRoom, setActiveRoom] = useState(null);
  const socket = useSocket();

  const handleJoinRoom = (e) => {
    e.preventDefault();
    if(socket && email && roomId) {
      socket.emit('room:join', { email, room: roomId });
    }
  };

  useEffect(() => {
    if(!socket) return;

    const handleRoomJoined = ({ room }) => {
      setActiveRoom(room);
    };

    socket.on('room:joined', handleRoomJoined);

    return () => {
      socket.off('room:joined', handleRoomJoined);
    };
  }, [socket]);

  return (
    <div style={{ padding: '20px' }}>
      {!activeRoom ? (
        <form onSubmit={handleJoinRoom} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: '8px' }}
          />
          <input
            type="text"
            placeholder="Enter Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            required
            style={{ padding: '8px' }}
          />
          <button type="submit" style={{ padding: '10px', background: '#007bff', color: 'white', border: 'none' }}>
            Join Room
          </button>
        </form>
      ) : (
        <RoomPage 
          roomId={activeRoom}
          onLeave={() => setActiveRoom(null)}
        />
      )}
    </div>
  );
};

export default LobbyScreen;