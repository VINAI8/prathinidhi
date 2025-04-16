import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract the language from the URL query parameters
  const queryParams = new URLSearchParams(location.search);
  const selectedLanguage = queryParams.get('lang') || "en"; // Default to 'en' if not present

  // Language data for different languages
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
    hi: {
      loginHeading: "अपने खाते में लॉग इन करें",
      aadhaar: "आधार संख्या",
      mobile: "मोबाइल संख्या",
      otp: "ओटीपी",
      loginBtn: "लॉग इन करें",
      footer1: "© 2025 प्रथिनिधि | भारत सरकार की एक पहल",
      footer2: "🇮🇳 से बनाई गई | हर भारतीय नागरिक के लिए डिज़ाइन की गई",
      privacy: "गोपनीयता नीति",
      terms: "उपयोग की शर्तें",
      help: "सहायता और समर्थन",
    },
    te: {
      loginHeading: "మీ ఖాతా లో లాగిన్ చేయండి",
      aadhaar: "ఆధార్ నంబర్",
      mobile: "మొబైల్ నంబర్",
      otp: "ఓటీపీ",
      loginBtn: "లాగిన్ చేయండి",
      footer1: "© 2025 ప్రజాతినిధి | భారత ప్రభుత్వం ప్రేరణ",
      footer2: "🇮🇳 నుండి తయారు | ప్రతి భారతీయుడికి రూపకల్పన చేయబడింది",
      privacy: "గోప్యతా విధానం",
      terms: "వినియోగ నిబంధనలు",
      help: "సహాయం మరియు మద్దతు",
    },
    // Add more languages here...
  };

  // Fallback to English if the selected language is not found
  const langData = languageData[selectedLanguage] || languageData["en"];

  // State to hold form input values
  const [aadhaar, setAadhaar] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);  // Show loading state
    setErrorMessage(""); // Clear previous error messages

    const data = new FormData();
    data.append("aadhaar", aadhaar);
    data.append("mobile", mobile);
    data.append("otp", otp);

    try {
      const response = await fetch("https://prathinidhi-backend-r8dj.onrender.com/login", {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message); // Show success message
        
        // Redirect to dashboard with the selected language in the query params
        navigate(`/dashboard?lang=${selectedLanguage}`);
      } else {
        setErrorMessage(result.detail || "Login failed");
      }
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again later.");
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  return (
    <main style={styles.main}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContainer}>
          <div style={styles.logoSection}>
            <img src="/prathinidhi.svg" alt="Emblem" style={styles.logo} />
            <div>
              <h1 style={styles.title}>Prathinidhi</h1>
              <p style={styles.subtitle}>
                राष्ट्रीय बहुभाषी विधिक फॉर्म पोर्टल | National Legal Form Portal
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Login Form Section */}
      <section style={styles.loginSection}>
        <div style={styles.formContainer}>
          <h2 style={styles.loginHeading}>
            {langData.loginHeading}
          </h2>
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

      {/* Footer */}
      <footer style={styles.footer}>
        <div>{langData.footer1}</div>
        <div>{langData.footer2}</div>
        <div style={{ marginTop: "10px", fontSize: "12px" }}>
          <a href="/privacy" style={styles.footerLink}>
            {langData.privacy}
          </a>{" "}
          |{" "}
          <a href="/terms" style={styles.footerLink}>
            {langData.terms}
          </a>{" "}
          |{" "}
          <a href="/help" style={styles.footerLink}>
            {langData.help}
          </a>
        </div>
      </footer>
    </main>
  );
};

// Styling for the components
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
