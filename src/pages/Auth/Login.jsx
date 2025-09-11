import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(email, password);
      navigate("/wallet");
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-vh-100 d-flex align-items-center justify-content-center" 
      style={{ 
        background: 'linear-gradient(135deg, #4b6cb7 0%, #182848 100%)',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-6 col-sm-8">
            <div 
              className="card shadow-lg border-0" 
              style={{ 
                borderRadius: '25px',
                maxWidth: '500px',
                margin: '0 auto'
              }}
            >
              <div className="card-body" style={{ padding: '3rem' }}>
                {/* Logo Section */}
                <div className="text-center mb-4">
                  <div 
                    className="d-inline-flex align-items-center justify-content-center bg-primary rounded-circle mb-3" 
                    style={{ width: '90px', height: '90px' }}
                  >
                    <i className="fas fa-shield-alt text-white" style={{ fontSize: '2.5rem' }}></i>
                  </div>
                  <h2 className="fw-bold text-primary mb-1" style={{ fontSize: '2.2rem' }}>AI Pay</h2>
                  <p className="text-muted">AI-Powered Fraud Protection</p>
                </div>

                {/* Welcome Text */}
                <div className="text-center mb-4">
                  <h4 className="fw-bold mb-2" style={{ fontSize: '1.5rem' }}>Welcome Back</h4>
                  <p className="text-muted">Sign in to your secure payment account</p>
                </div>

                {/* Login Tabs */}
                <div className="row mb-4">
                  <div className="col-6">
                    <button 
                      className="btn btn-primary w-100" 
                      style={{ 
                        borderRadius: '15px',
                        background: 'linear-gradient(45deg, #667eea, #764ba2)',
                        border: 'none',
                        padding: '12px'
                      }}
                    >
                      <i className="fas fa-envelope me-2"></i>Email
                    </button>
                  </div>
                  <div className="col-6">
                    <button 
                      className="btn btn-outline-secondary w-100"
                      style={{ 
                        borderRadius: '15px',
                        padding: '12px'
                      }}
                    >
                      <i className="fas fa-mobile-alt me-2"></i>OTP
                    </button>
                  </div>
                </div>

                {/* Error Alert */}
                {error && (
                  <div className="alert alert-danger alert-dismissible fade show mb-4" role="alert" style={{ borderRadius: '15px' }}>
                    <i className="fas fa-exclamation-triangle me-2"></i>
                    {error}
                  </div>
                )}

                {/* Login Form */}
                <form onSubmit={onSubmit}>
                  <div className="mb-4">
                    <label htmlFor="email" className="form-label fw-semibold" style={{ fontSize: '1.1rem' }}>
                      Email Address
                    </label>
                    <div className="position-relative">
                      <input
                        type="email"
                        className="form-control form-control-lg"
                        id="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ 
                          borderRadius: '15px', 
                          border: '2px solid #e9ecef',
                          paddingRight: '50px',
                          fontSize: '1.1rem',
                          padding: '15px 20px'
                        }}
                      />
                      <i className="fas fa-user position-absolute top-50 end-0 translate-middle-y me-3 text-muted"></i>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="password" className="form-label fw-semibold" style={{ fontSize: '1.1rem' }}>
                      Password
                    </label>
                    <div className="position-relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control form-control-lg"
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ 
                          borderRadius: '15px', 
                          border: '2px solid #e9ecef',
                          paddingRight: '80px',
                          fontSize: '1.1rem',
                          padding: '15px 20px'
                        }}
                      />
                      <div className="position-absolute top-50 end-0 translate-middle-y me-3 d-flex align-items-center" style={{ gap: '8px' }}>
                        <i className="fas fa-lock text-success" style={{ fontSize: '0.9rem' }}></i>
                        <i 
                          className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-muted`} 
                          style={{ cursor: 'pointer', fontSize: '1rem' }}
                          onClick={() => setShowPassword(!showPassword)}
                        ></i>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary btn-lg w-100 mb-4"
                    style={{ 
                      borderRadius: '15px', 
                      background: 'linear-gradient(45deg, #667eea, #764ba2)',
                      border: 'none',
                      padding: '15px',
                      fontSize: '1.2rem'
                    }}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Signing In...
                      </>
                      
                    ) : (
                      'Sign In'
                    )}
                  </button>
                </form>

                {/* Sign Up Link */}
                <div className="text-center">
                  <p className="text-muted" style={{ fontSize: '1rem' }}>
                    Don't have an account? 
                    <a href="/signup" className="text-primary text-decoration-none fw-semibold ms-1">
                      Sign up for AI Pay
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
