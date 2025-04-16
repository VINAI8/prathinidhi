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
      login: "Login",
      popupTitle: "Select Your Language",
      startFiling: "Start Filing Now",
      trackApp: "Track Your Application",
      tutorialHeading: "Tutorials & Help",
      tutorial1Title: "Using Voice to Fill Forms",
      tutorial1Desc: "A step-by-step guide to fill forms using speech.",
      tutorial2Title: "Understanding Legal Terms",
      tutorial2Desc: "Simplified explanation of common legal phrases.",
      tutorial3Title: "Tracking Your Application",
      tutorial3Desc: "How to get real-time updates on your submission.",
      footer1: "© 2025 Prathinidhi | A Government of India Initiative",
      footer2: "Made with 🇮🇳 | Designed for every Indian citizen",
      privacy: "Privacy Policy",
      terms: "Terms of Use",
      help: "Help & Support",
    },
    hi: {
      heroTitle: "भाषा के माध्यम से नागरिकों को सशक्त बनाना",
      heroText:
        "अपनी भाषा में वॉयस का उपयोग करके कानूनी आवेदन पत्र भरें। BHASHINI द्वारा संचालित, भारत के लिए निर्मित।",
      sectionHeading: "वास्तविक समय में अपडेट्स",
      login: "लॉगिन",
      popupTitle: "अपनी भाषा चुनें",
      startFiling: "अभी आवेदन भरें",
      trackApp: "अपने आवेदन को ट्रैक करें",
      tutorialHeading: "ट्यूटोरियल और सहायता",
      tutorial1Title: "फॉर्म भरने के लिए वॉयस का उपयोग करें",
      tutorial1Desc: "वॉयस से फॉर्म भरने की चरण-दर-चरण गाइड।",
      tutorial2Title: "कानूनी शब्दों को समझना",
      tutorial2Desc: "आम कानूनी शब्दों की सरल व्याख्या।",
      tutorial3Title: "अपने आवेदन की ट्रैकिंग",
      tutorial3Desc: "आपके आवेदन की स्थिति को रीयल-टाइम में जानें।",
      footer1: "© 2025 प्रतिनिधि | भारत सरकार की पहल",
      footer2: "🇮🇳 के साथ बनाया गया | हर भारतीय नागरिक के लिए डिज़ाइन किया गया",
      privacy: "गोपनीयता नीति",
      terms: "उपयोग की शर्तें",
      help: "सहायता और समर्थन",
    },
    ta: {
      heroTitle: "மொழி மூலம் குடிமக்களை சக்திவாய்ப்பாக்குதல்",
      heroText:
        "உங்கள் மொழியில் உங்கள் குரலைப் பயன்படுத்தி சட்டப் பணிகளை எளிதாகச் செய்யுங்கள். BHASHINI மூலம் இயக்கப்படுகிறது.",
      sectionHeading: "நேரடி புதுப்பிப்புகள்",
      login: "உள்நுழை",
      popupTitle: "உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்",
      startFiling: "இப்போதே பதிவுசெய்க",
      trackApp: "உங்கள் விண்ணப்பத்தை கண்காணிக்கவும்",
      tutorialHeading: "உதவிகள் மற்றும் பயிற்சிகள்",
      tutorial1Title: "குரலை பயன்படுத்தி படிவங்களை நிரப்புவது",
      tutorial1Desc: "குரல் வழியாக படிவத்தை நிரப்புவதற்கான வழிகாட்டி.",
      tutorial2Title: "சட்ட சொற்கள் விளக்கம்",
      tutorial2Desc: "வழக்கமான சட்ட சொற்கள் எளிய விளக்கம்.",
      tutorial3Title: "விண்ணப்ப கண்காணிப்பு",
      tutorial3Desc: "உங்கள் விண்ணப்ப நிலையை நேரடியாக அறியுங்கள்.",
      footer1: "© 2025 பிரதிநிதி | இந்திய அரசு முயற்சி",
      footer2: "🇮🇳 உடன் உருவாக்கப்பட்டது | ஒவ்வொரு இந்தியனுக்குமானது",
      privacy: "தனியுரிமைக் கொள்கை",
      terms: "பயன்பாட்டு விதிமுறைகள்",
      help: "உதவி மற்றும் ஆதரவு",
    },
    te: {
      heroTitle: "భాష ద్వారా పౌరులను శక్తివంతం చేయడం",
      heroText:
        "మీ భాషలో మీ వాయిస్ ద్వారా చట్టపరమైన దరఖాస్తులు సులభంగా దాఖలు చేయండి. BHASHINI చేత శక్తివంతం చేయబడింది.",
      sectionHeading: "తక్షణ అప్డేట్లు",
      login: "ప్రవేశించండి",
      popupTitle: "మీ భాషను ఎంచుకోండి",
      startFiling: "ఇప్పుడే దాఖలు చేయండి",
      trackApp: "మీ దరఖాస్తును ట్రాక్ చేయండి",
      tutorialHeading: "సహాయ వీడియోలు & మార్గదర్శకాలు",
      tutorial1Title: "వాయిస్ ఉపయోగించి ఫారమ్ పూరించటం",
      tutorial1Desc: "వాయిస్ ద్వారా ఫారమ్ పూరించేందుకు దశల వారీ గైడ్.",
      tutorial2Title: "చట్టపరమైన పదాలు అర్థం చేసుకోవడం",
      tutorial2Desc: "చట్టపరమైన పదాల సరళ వివరణ.",
      tutorial3Title: "మీ దరఖాస్తును ట్రాక్ చేయడం",
      tutorial3Desc: "రియల్ టైమ్ అప్డేట్స్ ఎలా పొందాలో తెలుసుకోండి.",
      footer1: "© 2025 ప్రతినిధి | భారత ప్రభుత్వ ఉపక్రమం",
      footer2: "🇮🇳 తో రూపొందించబడింది | ప్రతి భారత పౌరునికీ",
      privacy: "గోప్యతా విధానం",
      terms: "వినియోగ నిబంధనలు",
      help: "సహాయం మరియు మద్దతు",
    },
    bn: {
      heroTitle: "ভাষার মাধ্যমে নাগরিকদের ক্ষমতায়ন",
      heroText:
        "আপনার ভাষায় আপনার কণ্ঠস্বর ব্যবহার করে আইনগত আবেদনপত্রগুলি সহজে পূর্ণ করুন। BHASHINI দ্বারা চালিত।",
      sectionHeading: "রিয়েল-টাইম আপডেটস",
      login: "লগইন",
      popupTitle: "আপনার ভাষা নির্বাচন করুন",
      startFiling: "এখনই আবেদন করুন",
      trackApp: "আপনার আবেদন ট্র্যাক করুন",
      tutorialHeading: "সহায়তা ও টিউটোরিয়াল",
      tutorial1Title: "ভয়েস ব্যবহার করে ফর্ম পূরণ",
      tutorial1Desc: "ভয়েসে ফর্ম পূরণের ধাপে ধাপে গাইড।",
      tutorial2Title: "আইনি পরিভাষা বোঝা",
      tutorial2Desc: "সাধারণ আইনি শব্দগুলির সহজ ব্যাখ্যা।",
      tutorial3Title: "আপনার আবেদন ট্র্যাক করা",
      tutorial3Desc: "আপনার জমা দেওয়ার রিয়েল-টাইম আপডেট পান।",
      footer1: "© 2025 প্রতিনিধিত্ব | ভারত সরকারের উদ্যোগ",
      footer2: "🇮🇳 দিয়ে তৈরি | প্রতিটি ভারতীয় নাগরিকের জন্য",
      privacy: "গোপনীয়তা নীতি",
      terms: "ব্যবহারের শর্তাবলী",
      help: "সহায়তা ও সমর্থন",
    },
  };

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
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
            <button 
  style={styles.loginBtn} 
  onClick={() => navigate(`/login?lang=${selectedLanguage}`)}
>
  {languageData[selectedLanguage].login}
</button>

          </div>
        </div>
      </header>

      {/* Language Selection Pop-Up */}
      {isPopupOpen && (
        <div style={styles.languagePopup}>
          <div style={styles.popupContent}>
            <h2 style={styles.popupTitle}>
              {languageData[selectedLanguage].popupTitle}
            </h2>
            <div style={styles.languageButtons}>
              {["en", "hi", "ta", "te", "bn"].map((lang) => (
                <button
                  key={lang}
                  style={styles.languageButton}
                  onClick={() => {
                    setSelectedLanguage(lang);
                    setIsPopupOpen(false);
                  }}
                >
                  {lang === "en"
                    ? "English"
                    : lang === "hi"
                    ? "हिंदी"
                    : lang === "ta"
                    ? "தமிழ்"
                    : lang === "te"
                    ? "తెలుగు"
                    : "বাংলা"}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Updates Section */}
      <section style={styles.updates}>
        <h3 style={styles.sectionHeading}>
          {languageData[selectedLanguage].sectionHeading}
        </h3>
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
              <button style={styles.primaryBtn}>
                {languageData[selectedLanguage].startFiling}
              </button>
              <button style={styles.secondaryBtn}>
                {languageData[selectedLanguage].trackApp}
              </button>
            </div>
          </div>
          <img src="/justice.jpg" alt="Justice" style={styles.heroImage} />
        </div>
      </section>

      {/* Tutorials Section */}
      <section style={styles.tutorials}>
        <h3 style={styles.sectionHeading}>
          {languageData[selectedLanguage].tutorialHeading}
        </h3>
        <div style={styles.featuresGrid}>
          <FeatureCard
            title={languageData[selectedLanguage].tutorial1Title}
            description={languageData[selectedLanguage].tutorial1Desc}
          />
          <FeatureCard
            title={languageData[selectedLanguage].tutorial2Title}
            description={languageData[selectedLanguage].tutorial2Desc}
          />
          <FeatureCard
            title={languageData[selectedLanguage].tutorial3Title}
            description={languageData[selectedLanguage].tutorial3Desc}
          />
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div>{languageData[selectedLanguage].footer1}</div>
        <div>{languageData[selectedLanguage].footer2}</div>
        <div style={{ marginTop: "10px", fontSize: "12px" }}>
          <a href="/privacy" style={styles.footerLink}>
            {languageData[selectedLanguage].privacy}
          </a>{" "}
          |{" "}
          <a href="/terms" style={styles.footerLink}>
            {languageData[selectedLanguage].terms}
          </a>{" "}
          |{" "}
          <a href="/help" style={styles.footerLink}>
            {languageData[selectedLanguage].help}
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

// styles remain unchanged from your original

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
    padding: "0px 0px",
    textAlign: "center",
    margin : 0,
  },
  updateList: {
    listStyle: "none",
    padding: 0,
    fontSize: "90px",
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
