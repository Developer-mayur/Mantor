import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import apis from "../../apis";
import { setUser } from "../../redux-config/UserSlice";
import { useState } from "react";

function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // ✅ Automatically navigate if already authenticated
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.get("http://localhost:8000/auth/check", { withCredentials: true });
                if (res.data.isAuthenticated) {
                    // Redirect if already logged in
                    navigate("/dashboard");
                }
            } catch (err) {
                console.log("Not authenticated:", err);
            }
        };
        checkAuth();
    }, [navigate]);

    // ✅ Handle Email-Password Sign-In
    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            console.log("Signing in with:", { email, password });

            const response = await axios.post(apis.SIGN_IN, { email, password });

            if (!response || !response.data || !response.data.user || !response.data.token) {
                throw new Error("Invalid response from server");
            }

            const user = response.data.user;
            const token = response.data.token;

            if (user && user._id) {
                localStorage.setItem("userId", user._id);
                console.log("userId stored in localStorage:", localStorage.getItem("userId"));
            }

            // ✅ Dispatch user and token
            dispatch(setUser({ user, token }));

            toast.success("✅ Sign in success!");

            setTimeout(() => {
                navigate("/dashboard");
            }, 1000);

        } catch (err) {
            console.error("Sign in error:", err);
            toast.error(err.response?.data?.error || "An error occurred. Please try again.");
        }
    };

    

    return (
        <>
            <ToastContainer />
            <div 
                className="d-flex justify-content-center align-items-center" 
                style={{ minHeight: "100vh", background: "#f4f4f4" }}
            >
                <div 
                    className="card shadow-lg p-4" 
                    style={{ 
                        width: "100%", 
                        maxWidth: "450px",  
                        borderRadius: "12px" 
                    }}
                >
                    {/* ✅ Card Header */}
                    <div 
                        className="card-header text-white text-center" 
                        style={{ background: "linear-gradient(135deg, #6a11cb, #2575fc)" }}
                    >
                        <h3 className="fw-bold m-0">Sign In</h3>
                    </div>

                    {/* ✅ Email-Password Form */}
                    <form onSubmit={handleSubmit} className="p-3">
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                type="email" 
                                placeholder="Enter your email" 
                                className="form-control rounded-pill" 
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                type="password" 
                                placeholder="Enter your password" 
                                className="form-control rounded-pill" 
                                required
                            />
                        </div>

                        <button 
                            disabled={!email || !password} 
                            type="submit" 
                            className="btn btn-primary w-100 rounded-pill" 
                            style={{ 
                                background: "linear-gradient(135deg, #6a11cb, #2575fc)", 
                                border: "none" 
                            }}
                        >
                            Sign In
                        </button>
                    </form>

                    {/* ✅ Google Login Button */}
                    <div className="text-center my-3">
                        <a
                            href="http://localhost:8000/auth/google" 
                            className="btn btn-danger w-100 rounded-pill"
                            style={{ backgroundColor: "#DB4437", color: "#fff" }}
                        >
                            <i className="fa fa-google"></i> Sign In with Google
                        </a>
                    </div>

                    {/* ✅ Footer */}
                    <div className="text-center mt-2">
                        <Link to="/signup" className="text-decoration-none">
                            <label className="text-primary">Don't have an account? <strong>Sign Up</strong></label>
                        </Link>
                        <div className="mt-2">
                            <Link to="/forgot-password" className="text-secondary text-decoration-none">
                                <label>Forgot Password?</label>
                            </Link>
                        </div>
                    </div>

                    
                    </div>
                </div>
           
        </>
    );
}

export default SignIn;



