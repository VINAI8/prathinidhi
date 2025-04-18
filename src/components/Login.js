import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const selectedLanguage = queryParams.get('lang') || "en";

  const languageData = {
    en: {
      loginHeading: "Login to Your Account",
      aadhaar: "Aadhaar Number",
      mobile: "Mobile Number",
      otp: "OTP",
      loginBtn: "Login",
      footer1: "© 2025 Prathinidhi | A Government of India Initiative",
      footer2: "Made with 🇮🇳 | Designed for every Indian citizen",
      privacy: "Privacy Policy",
      terms: "Terms of Use",
      help: "Help & Support",
    },
  };

  const langData = languageData[selectedLanguage] || languageData["en"];

  const [aadhaar, setAadhaar] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Redirect if token already exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate(`/dashboard?lang=${selectedLanguage}`);
    }
  }, [navigate, selectedLanguage]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const payload = { aadhaar, mobile, otp };

    try {
      const response = await fetch("https://prathinidhi-backend-r8dj.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log("🔑 Login result:", result);

      if (response.ok && result.token) {
        localStorage.setItem("token", result.token); // ✅ Store token
        navigate(`/dashboard?lang=${selectedLanguage}`); // ✅ Redirect
      } else {
        const errorMsg = result.detail
          ? typeof result.detail === 'string'
            ? result.detail
            : JSON.stringify(result.detail)
          : "Login failed";
        setErrorMessage(errorMsg);
      }
    } catch (error) {
      console.error("❌ Login error:", error);
      setErrorMessage("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={styles.main}>
      <header style={styles.header}>
        <div style={styles.headerContainer}>
          <div style={styles.logoSection}>
            <img src="/prathinidhi.png" alt="Emblem" style={styles.logo} />
            <div>
              <h1 style={styles.title}>Prathinidhi</h1>
              <p style={styles.subtitle}>National Legal Form Portal</p>
            </div>
          </div>
        </div>
      </header>

      <section style={styles.loginSection}>
        <div style={styles.formContainer}>
          <h2 style={styles.loginHeading}>{langData.loginHeading}</h2>
          <form style={styles.form} onSubmit={handleLogin}>
            <div style={styles.formGroup}>
              <label>{langData.aadhaar}</label>
              <input
                type="text"
                placeholder={langData.aadhaar}
                style={styles.input}
                value={aadhaar}
                onChange={(e) => setAadhaar(e.target.value)}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label>{langData.mobile}</label>
              <input
                type="text"
                placeholder={langData.mobile}
                style={styles.input}
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label>{langData.otp}</label>
              <input
                type="text"
                placeholder={langData.otp}
                style={styles.input}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
            {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}
            <button style={styles.loginBtn} type="submit" disabled={loading}>
              {loading ? "Logging in..." : langData.loginBtn}
            </button>
          </form>
        </div>
      </section>

      <footer style={styles.footer}>
        <div>{langData.footer1}</div>
        <div>{langData.footer2}</div>
        <div style={{ marginTop: "10px", fontSize: "12px" }}>
          <a href="/privacy" style={styles.footerLink}>{langData.privacy}</a> | 
          <a href="/terms" style={styles.footerLink}>{langData.terms}</a> | 
          <a href="/help" style={styles.footerLink}>{langData.help}</a>
        </div>
      </footer>
    </main>
  );
};

// Styling remains the same
const styles = {
  main: {
    fontFamily: "Segoe UI, sans-serif",
    backgroundColor: "#ffffff",
    color: "#333",
    paddingTop: "80px",
  },
  header: {
    backgroundColor: "#0b5394",
    color: "#fff",
    padding: "10px 0",
    position: "fixed",
    top: 0,
    width: "100%",
    zIndex: 999,
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  headerContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logoSection: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  logo: { height: "48px" },
  title: { fontSize: "26px", fontWeight: "bold", margin: 0 },
  subtitle: { fontSize: "13px", margin: 0 },
  loginSection: {
    padding: "60px 20px",
    textAlign: "center",
  },
  formContainer: {
    maxWidth: "400px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#f4f4f4",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  },
  loginHeading: {
    fontSize: "24px",
    marginBottom: "20px",
    color: "#0b5394",
  },
  formGroup: {
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  loginBtn: {
    backgroundColor: "#0b5394",
    color: "#fff",
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "4px",
    cursor: "pointer",
    border: "none",
    width: "100%",
  },
  errorMessage: {
    color: "red",
    fontSize: "14px",
    marginBottom: "10px",
  },
  footer: {
    backgroundColor: "#0b5394",
    color: "#fff",
    padding: "20px",
    textAlign: "center",
    fontSize: "14px",
    marginTop: "40px",
  },
  footerLink: {
    color: "#fff",
    textDecoration: "none",
  },
};

export default Login;
