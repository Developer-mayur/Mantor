import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import apis from "../../apis";
import axios from "axios";
 

function SignUp() {
  const nameInput = useRef();
  const emailInput = useRef();
  const passwordInput = useRef();
  const contactInput = useRef();
  const addressInput = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const name = nameInput.current.value.trim();
    const email = emailInput.current.value.trim();
    const password = passwordInput.current.value.trim();
    const contact = contactInput.current.value.trim();
    const address = addressInput.current.value.trim();

    if (!name || !email || !password || !contact || !address) {
      toast.warn("⚠️ All fields are required!");
      return;
    }

    try {
      await axios.post(apis.SIGN_UP, { name, email, password, contact, address });
      toast.success("✅ Signed up successfully!");
      navigate("/");
    } catch (err) {
      toast.error("❌ Oops! Something went wrong. Try again later.");
      console.error(err);
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
            maxWidth: "500px",  
            borderRadius: "12px" 
          }}
        >
          {/* ✅ Card Header */}
          <div 
            className="card-header text-white text-center" 
            style={{ background: "linear-gradient(135deg, #6a11cb, #2575fc)" }}
          >
            <h3 className="fw-bold m-0">Sign Up</h3>
          </div>

          {/* ✅ Form */}
          <form onSubmit={handleSubmit} className="p-3">
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input ref={nameInput} type="text" placeholder="Enter your name" className="form-control rounded-pill" />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input ref={emailInput} type="email" placeholder="Enter your email" className="form-control rounded-pill" />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input ref={passwordInput} type="password" placeholder="Create password" className="form-control rounded-pill" />
            </div>

            <div className="mb-3">
              <label className="form-label">Contact</label>
              <input ref={contactInput} type="text" placeholder="Contact number" className="form-control rounded-pill" />
            </div>

            <div className="mb-3">
              <label className="form-label">Address</label>
              <textarea ref={addressInput} placeholder="Enter your address" className="form-control rounded-3" rows="2"></textarea>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary w-100 rounded-pill" 
              style={{ background: "linear-gradient(135deg, #6a11cb, #2575fc)", border: "none" }}
            >
              Sign Up
            </button>
          </form>

          {/* ✅ Footer */}
          <div className="text-center mt-2">
            <Link to="/" className="text-decoration-none">
              <label className="text-primary">Already have an account? <strong>Login</strong></label>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
