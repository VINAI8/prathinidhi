import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const navigate = useNavigate();

  const languageData = {
    en: {
      heroTitle: "Empowering Citizens through Speech",
      heroText:
        "File legal applications easily using your voice in your language. Powered by BHASHINI, built for Bharat.",
      sectionHeading: "Real-Time Updates",
    },
    hi: {
      heroTitle: "भाषा के माध्यम से नागरिकों को सशक्त बनाना",
      heroText:
        "अपनी भाषा में वॉयस का उपयोग करके कानूनी आवेदन पत्र भरें। BHASHINI द्वारा संचालित, भारत के लिए निर्मित।",
      sectionHeading: "वास्तविक समय में अपडेट्स",
    },
    ta: {
      heroTitle: "மொழி மூலம் குடிமக்களை சக்திவாய்ப்பாக்குதல்",
      heroText:
        "உங்கள் மொழியில் உள்நோக்கம் செய்யப்பட்ட பlegal பத்திரங்களை எளிதாக பூர்த்தி செய்யவும். BHASHINI மூலம் இயக்கப்படுகிறது, இந்தியாவுக்காக உருவாக்கப்பட்டது.",
      sectionHeading: "நேரடி புதுப்பிப்புகள்",
    },
    te: {
      heroTitle: "భాష ద్వారా పౌరులను శక్తివంతం చేయడం",
      heroText:
        "మీ భాషలో మీ వాయిస్ ద్వారా చట్టపరమైన దరఖాస్తులు సులభంగా దాఖలు చేయండి. BHASHINI ద్వారా శక్తివంతం చేయబడింది, భారతదేశం కోసం నిర్మించబడింది.",
      sectionHeading: "రియల్ టైమ్ అప్‌డేట్స్",
    },
    bn: {
      heroTitle: "ভাষার মাধ্যমে নাগরিকদের ক্ষমতায়ন",
      heroText:
        "আপনার ভাষায় আপনার কণ্ঠস্বর ব্যবহার করে আইনগত আবেদনপত্রগুলি সহজে পূর্ণ করুন। BHASHINI দ্বারা চালিত, ভারত জন্য নির্মিত।",
      sectionHeading: "রিয়েল-টাইম আপডেটস",
    },
  };

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  return (
    <main style={styles.main}>
      {/* Sticky Header */}
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
          <div style={styles.rightNav}>
            <select
              style={styles.languageSelect}
              value={selectedLanguage}
              onChange={handleLanguageChange}
            >
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
              <option value="ta">தமிழ்</option>
              <option value="te">తెలుగు</option>
              <option value="bn">বাংলা</option>
            </select>
            <button style={styles.loginBtn} onClick={() => navigate("/login")}>
              Login
            </button>
          </div>
        </div>
      </header>

      {/* Language Selection Pop-Up */}
      {isPopupOpen && (
        <div style={styles.languagePopup}>
          <div style={styles.popupContent}>
            <h2 style={styles.popupTitle}>Select Your Language</h2>
            <div style={styles.languageButtons}>
              <button
                style={styles.languageButton}
                onClick={() => {
                  setSelectedLanguage("en");
                  setIsPopupOpen(false);
                }}
              >
                English
              </button>
              <button
                style={styles.languageButton}
                onClick={() => {
                  setSelectedLanguage("hi");
                  setIsPopupOpen(false);
                }}
              >
                हिंदी
              </button>
              <button
                style={styles.languageButton}
                onClick={() => {
                  setSelectedLanguage("ta");
                  setIsPopupOpen(false);
                }}
              >
                தமிழ்
              </button>
              <button
                style={styles.languageButton}
                onClick={() => {
                  setSelectedLanguage("te");
                  setIsPopupOpen(false);
                }}
              >
                తెలుగు
              </button>
              <button
                style={styles.languageButton}
                onClick={() => {
                  setSelectedLanguage("bn");
                  setIsPopupOpen(false);
                }}
              >
                বাংলা
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Real-time Updates (Horizontal Scroll) */}
<section style={styles.updates}>
  <h3 style={styles.sectionHeading}>Real-Time Updates</h3>
  <div style={styles.updateScrollContainer}>
    <ul style={styles.updateListAnimated}>
      <li>📌 RTI form in Marathi now available – April 2025</li>
      <li>📌 New tutorial launched: "How to Submit an Affidavit"</li>
      <li>📌 Support for Maithili, Konkani languages coming soon</li>
      <li>📌 New feature: Form autofill based on voice prompts</li>
      <li>📌 Integration with DigiLocker now live</li>
    </ul>
  </div>
</section>


      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.heroTextBox}>
            <h2 style={styles.heroTitle}>
              {languageData[selectedLanguage].heroTitle}
            </h2>
            <p style={styles.heroText}>
              {languageData[selectedLanguage].heroText}
            </p>
            <div style={styles.heroButtons}>
              <button style={styles.primaryBtn}>Start Filing Now</button>
              <button style={styles.secondaryBtn}>Track Your Application</button>
            </div>
          </div>
          <img src="/justice.jpg" alt="Justice" style={styles.heroImage} />
        </div>
      </section>


      {/* Tutorials */}
      <section style={styles.tutorials}>
        <h3 style={styles.sectionHeading}>Tutorials & Help</h3>
        <div style={styles.featuresGrid}>
          <FeatureCard
            title="Using Voice to Fill Forms"
            description="A step-by-step guide to fill forms using speech."
          />
          <FeatureCard
            title="Understanding Legal Terms"
            description="Simplified explanation of common legal phrases."
          />
          <FeatureCard
            title="Tracking Your Application"
            description="How to get real-time updates on your submission."
          />
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div>© 2025 Prathinidhi | A Government of India Initiative</div>
        <div>Made with 🇮🇳 | Designed for every Indian citizen</div>
        <div style={{ marginTop: "10px", fontSize: "12px" }}>
          <a href="/privacy" style={styles.footerLink}>
            Privacy Policy
          </a>{" "}
          |{" "}
          <a href="/terms" style={styles.footerLink}>
            Terms of Use
          </a>{" "}
          |{" "}
          <a href="/help" style={styles.footerLink}>
            Help & Support
          </a>
        </div>
      </footer>
    </main>
  );
};

const FeatureCard = ({ title, description }) => (
  <div style={styles.featureCard}>
    <h4 style={styles.featureTitle}>{title}</h4>
    <p style={styles.featureDesc}>{description}</p>
  </div>
);

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
  rightNav: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  languageSelect: {
    padding: "6px",
    fontSize: "14px",
    borderRadius: "4px",
  },
  loginBtn: {
    backgroundColor: "#ffb300",
    border: "none",
    padding: "6px 16px",
    fontSize: "14px",
    color: "#000",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  // Updated Pop-Up Styles
  languagePopup: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  popupContent: {
    backgroundColor: "#fff",
    padding: "30px 40px",
    borderRadius: "12px",
    boxShadow: "0 15px 40px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    width: "320px",
    animation: "fadeIn 0.5s ease",
  },
  popupTitle: {
    fontSize: "26px",
    fontWeight: "bold",
    color: "#0b5394",
    marginBottom: "20px",
  },
  languageButtons: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "12px",
  },
  languageButton: {
    padding: "10px 16px",
    backgroundColor: "#0b5394",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    borderRadius: "8px",
    flex: "1 1 auto",
    minWidth: "100px",
    transition: "background-color 0.3s ease",
  },
  hero: {
    backgroundColor: "#e6f0fa",
    padding: "60px 20px",
  },
  heroContent: {
    display: "flex",
    justifyContent: "space-between",
    maxWidth: "1200px",
    margin: "0 auto",
    flexWrap: "wrap",
    alignItems: "center",
  },
  heroTextBox: { maxWidth: "600px" },
  heroTitle: { fontSize: "30px", color: "#0b5394", marginBottom: "20px" },
  heroText: { fontSize: "16px", marginBottom: "20px" },
  heroButtons: { display: "flex", gap: "10px", flexWrap: "wrap" },
  primaryBtn: {
    backgroundColor: "#0b5394",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "999px",
    cursor: "pointer",
  },
  secondaryBtn: {
    backgroundColor: "#fff",
    color: "#0b5394",
    border: "2px solid #0b5394",
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "999px",
    cursor: "pointer",
  },
  heroImage: { maxWidth: "400px", width: "100%", marginTop: "20px" },
  about: {
    padding: "60px 20px",
    maxWidth: "1000px",
    margin: "0 auto",
    textAlign: "center",
  },
  sectionHeading: {
    fontSize: "24px",
    color: "#0b5394",
    marginBottom: "20px",
  },
  aboutText: {
    fontSize: "16px",
    lineHeight: "1.6",
    marginBottom: "30px",
  },
  aboutImage: { maxWidth: "600px", width: "100%" },
  updates: {
    backgroundColor: "#f9f9f9",
    padding: "40px 20px",
    textAlign: "center",
  },
  updateList: {
    listStyle: "none",
    padding: 0,
    fontSize: "15px",
    lineHeight: "2",
    maxWidth: "600px",
    margin: "0 auto",
  },
  tutorials: {
    padding: "60px 20px",
    textAlign: "center",
  },
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  featureCard: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  featureTitle: {
    fontSize: "18px",
    color: "#0b5394",
    marginBottom: "15px",
  },
  featureDesc: {
    fontSize: "16px",
    color: "#555",
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
  
  updateScrollContainer: {
    width: "100%",
    overflow: "hidden",
    position: "relative",
    backgroundColor: "#f4f4f4",
    padding: "10px 0",
    marginBottom: "20px",
  },
  updateListAnimated: {
    display: "flex",
    listStyle: "none",
    padding: 0,
    margin: 0,
    animation: "scrollLeft 20s linear infinite",
  },
  
};

export default Home;
