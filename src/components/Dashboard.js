import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const translations = {
  en: {
    welcome: 'Welcome',
    governmentOfIndia: 'Government of India',
    ministryOfLaw: 'Ministry of Law and Justice',
    fileForms: 'File Legal Forms',
    newForm: '📄 File New Legal Form',
    continueDraft: '📝 Continue Draft Application',
    uploadDocs: '📤 Upload Supporting Documents',
    acceptedFormats: 'Accepted formats: PDF, JPG, PNG',
    statusTitle: '📊 Application Status Overview',
    drafts: 'Draft Applications',
    submitted: 'Submitted Applications',
    uploaded: 'Uploaded Documents',
    logout: '🚪 Logout',
    language: '🌐 Language',
    userDetails: 'User Details',
    aadhaar: 'Aadhaar',
    mobile: 'Mobile',
    otp: 'OTP',
    quickLinks: 'Quick Links',
    faqs: 'FAQs',
    userGuide: 'User Guide',
    govPortal: 'Government Portal',
    terms: 'Terms of Use',
    contact: 'Contact Support',
    email: 'Email',
    phone: 'Phone',
    hours: 'Hours',
    address: 'Address',
    about: 'About Platform',
    aboutText: 'This platform is developed under the Digital India initiative to streamline legal application services for all citizens in multiple regional languages.',
    copyright: () => `© ${new Date().getFullYear()} Government of India. All Rights Reserved. 🇮🇳`,
    popupTitle: 'Select Language'
  },
  ta: {
    aadhaar: 'ஆதார்',
    mobile: 'மொபைல்',
    otp: 'ஒரு தடவை கடவுச்சொல் (OTP)',
    welcome: 'வரவேற்கிறோம்',
    fileForms: 'சட்ட படிவங்களை தாக்கல் செய்யவும்',
    newForm: '📄 புதிய சட்ட படிவத்தை தாக்கல் செய்யவும்',
    continueDraft: '📝 கரைசல் விண்ணப்பத்தை தொடரவும்',
    uploadDocs: '📤 ஆதார ஆவணங்களை பதிவேற்றவும்',
    acceptedFormats: 'ஏற்கப்படும் வடிவங்கள்: PDF, JPG, PNG',
    statusTitle: '📊 விண்ணப்ப நிலைமேற்கோள்',
    drafts: 'கரைசல் விண்ணப்பங்கள்',
    submitted: 'தாக்கல் செய்யப்பட்ட விண்ணப்பங்கள்',
    uploaded: 'பதிவேற்றப்பட்ட ஆவணங்கள்',
    logout: '🚪 வெளியேறு',
    language: '🌐 மொழி',
    quickLinks: 'விரைவு இணைப்புகள்',
    faqs: 'அடிக்கடி கேட்கப்படும் கேள்விகள்',
    userGuide: 'பயனர் வழிகாட்டி',
    govPortal: 'அரசு போர்டல்',
    terms: 'பயன்பாட்டு விதிமுறைகள்',
    contact: 'ஆதரவை தொடர்பு கொள்ளவும்',
    email: 'மின்னஞ்சல்',
    phone: 'தொலைபேசி',
    hours: 'வேலை நேரம்',
    address: 'முகவரி',
    about: 'தளத்தைப் பற்றி',
    aboutText: 'இந்த தளம் "டிஜிட்டல் இந்தியா" முயற்சியின் கீழ், பல மண்டல மொழிகளில் உள்ள குடிமக்களுக்கு சட்ட சேவைகளை எளிமைப்படுத்த உருவாக்கப்பட்டுள்ளது.',
    copyright: () => `© ${new Date().getFullYear()} இந்திய அரசு. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை. 🇮🇳`,
    popupTitle: 'மொழியை தேர்ந்தெடுக்கவும்'
  },
  hi: {
    aadhaar: 'आधार',
    mobile: 'मोबाइल',
    otp: 'ओटीपी',
    welcome: 'स्वागत है',
    fileForms: 'कानूनी फॉर्म भरें',
    newForm: '📄 नया कानूनी फॉर्म भरें',
    continueDraft: '📝 ड्राफ्ट आवेदन जारी रखें',
    uploadDocs: '📤 सहायक दस्तावेज़ अपलोड करें',
    acceptedFormats: 'स्वीकृत प्रारूप: PDF, JPG, PNG',
    statusTitle: '📊 आवेदन स्थिति का अवलोकन',
    drafts: 'ड्राफ्ट आवेदन',
    submitted: 'प्रस्तुत आवेदन',
    uploaded: 'अपलोड किए गए दस्तावेज़',
    logout: '🚪 लॉगआउट',
    language: '🌐 भाषा',
    quickLinks: 'त्वरित लिंक',
    faqs: 'अक्सर पूछे जाने वाले प्रश्न',
    userGuide: 'उपयोगकर्ता मार्गदर्शिका',
    govPortal: 'सरकारी पोर्टल',
    terms: 'उपयोग की शर्तें',
    contact: 'सहायता से संपर्क करें',
    email: 'ईमेल',
    phone: 'फोन',
    hours: 'घंटे',
    address: 'पता',
    about: 'प्लेटफ़ॉर्म के बारे में',
    aboutText: 'यह प्लेटफ़ॉर्म डिजिटल इंडिया पहल के तहत नागरिकों के लिए बहुभाषी कानूनी सेवाओं को सरल बनाने के लिए विकसित किया गया है।',
    copyright: () => `© ${new Date().getFullYear()} भारत सरकार। सर्वाधिकार सुरक्षित। 🇮🇳`,
    popupTitle: 'भाषा चुनें'
  },
  te: {
    aadhaar: 'ఆధార్',
    mobile: 'మొబైల్',
    otp: 'ఓటీపీ',
    welcome: 'స్వాగతం',
    fileForms: 'చట్టపరమైన ఫారాలను దాఖలు చేయండి',
    newForm: '📄 కొత్త ఫారం దాఖలు చేయండి',
    continueDraft: '📝 ముసాయిదా దరఖాస్తును కొనసాగించండి',
    uploadDocs: '📤 మద్దతు పత్రాలను అప్‌లోడ్ చేయండి',
    acceptedFormats: 'అంగీకరించిన ఫార్మాట్లు: PDF, JPG, PNG',
    statusTitle: '📊 దరఖాస్తు స్థితి అవలోకనం',
    drafts: 'ముసాయిదా దరఖాస్తులు',
    submitted: 'దాఖలు చేసిన దరఖాస్తులు',
    uploaded: 'అప్‌లోడ్ చేసిన పత్రాలు',
    logout: '🚪 లాగౌట్',
    language: '🌐 భాష',
    quickLinks: 'త్వరిత లింకులు',
    faqs: 'తరచుగా అడిగే ప్రశ్నలు',
    userGuide: 'వినియోగదారుల గైడ్',
    govPortal: 'ప్రభుత్వ పోర్టల్',
    terms: 'వినియోగ నిబంధనలు',
    contact: 'సహాయం కోసం సంప్రదించండి',
    email: 'ఇమెయిల్',
    phone: 'ఫోన్',
    hours: 'పనిచేసే గంటలు',
    address: 'చిరునామా',
    about: 'వేదిక గురించి',
    aboutText: 'ఈ వేదిక డిజిటల్ ఇండియా చొరవలో భాగంగా భారత పౌరుల కోసం అనేక ప్రాంతీయ భాషల్లో చట్టపరమైన సేవలను సరళీకృతం చేయడానికి అభివృద్ధి చేయబడింది.',
    copyright: () => `© ${new Date().getFullYear()} భారత ప్రభుత్వం. అన్ని హక్కులు నిలుపుకోబడ్డాయి. 🇮🇳`,
    popupTitle: 'భాష ఎంచుకోండి'
  },
  bn: {
    aadhaar: 'আধার',
    mobile: 'মোবাইল',
    otp: 'ওটিপি',
    welcome: 'স্বাগতম',
    fileForms: 'আইনি ফর্ম জমা দিন',
    newForm: '📄 নতুন আইনি ফর্ম জমা দিন',
    continueDraft: '📝 খসড়া আবেদন চালিয়ে যান',
    uploadDocs: '📤 সহায়ক নথি আপলোড করুন',
    acceptedFormats: 'গৃহীত ফরম্যাট: PDF, JPG, PNG',
    statusTitle: '📊 আবেদন অবস্থা সংক্ষিপ্ত বিবরণ',
    drafts: 'খসড়া আবেদন',
    submitted: 'জমা দেওয়া আবেদন',
    uploaded: 'আপলোড করা নথি',
    logout: '🚪 লগআউট',
    language: '🌐 ভাষা',
    quickLinks: 'দ্রুত লিঙ্কসমূহ',
    faqs: 'প্রায়শই জিজ্ঞাসিত প্রশ্নাবলী',
    userGuide: 'ব্যবহারকারী গাইড',
    govPortal: 'সরকারি পোর্টাল',
    terms: 'ব্যবহারের শর্তাবলী',
    contact: 'সহায়তা যোগাযোগ',
    email: 'ইমেইল',
    phone: 'ফোন',
    hours: 'সময়',
    address: 'ঠিকানা',
    about: 'প্ল্যাটফর্ম সম্পর্কে',
    aboutText: 'এই প্ল্যাটফর্মটি ডিজিটাল ইন্ডিয়া উদ্যোগের অধীনে বহু ভাষায় নাগরিকদের জন্য আইনি আবেদন পরিষেবাগুলি সহজ করার জন্য তৈরি করা হয়েছে।',
    copyright: () => `© ${new Date().getFullYear()} ভারত সরকার। সর্বস্বত্ব সংরক্ষিত। 🇮🇳`,
    popupTitle: 'ভাষা নির্বাচন করুন'
  },
};

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const langParam = queryParams.get('lang')?.toLowerCase() || 'en';
  const [t, setT] = useState(translations.en);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState(langParam);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const selected = translations[selectedLanguage] || translations['en'];
    setT(selected);
    // Update URL with selected language
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('lang', selectedLanguage);
    window.history.pushState({}, '', newUrl);
  }, [selectedLanguage]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate(`/login?lang=${selectedLanguage}`);
      return;
    }

    fetch('https://prathinidhi-backend-r8dj.onrender.com/dashboard', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Invalid token');
        return res.json();
      })
      .then((data) => setUser(data.user))
      .catch(() => {
        localStorage.removeItem('token');
        navigate(`/login?lang=${selectedLanguage}`);
      })
      .finally(() => setLoading(false));
  }, [selectedLanguage, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate(`/login?lang=${selectedLanguage}`);
  };
  
  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  // Styles object
  const styles = {
    header: {
      backgroundColor: "#0b5394", // Keep your new background color
      color: "#fff",
      padding: "10px 0", // Changed from 1rem
      position: "fixed", // Changed from relative
      top: 0,
      width: "100%",
      zIndex: 999,
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)" // Updated shadow
    },
    headerContainer: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "0 20px", // Added horizontal padding
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    },
    logoSection: {
      display: "flex",
      alignItems: "center",
      gap: "15px" // Changed from 1rem
    },
    logo: {
      height: "48px" // Changed from width: 60px
    },
    title: {
      fontSize: "26px", 
      fontWeight: "bold", 
      margin: 0,
      color: "white" // Kept for visibility on dark background
    },
    subtitle: {
      fontSize: "13px", 
      margin: 0,
      color: "#e0e0e0" // Kept for visibility on dark background
    },
    rightNav: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    languageSelect: {
      padding: '0.5rem',
      borderRadius: '4px',
      border: '1px solid #d1d5db',
      background: '#f3f4f6',
      cursor: 'pointer'
    },
    logoutBtn: {
      background: '#ef4444',
      color: 'white',
      border: 'none',
      padding: '0.6rem 1.2rem',
      borderRadius: '4px',
      cursor: 'pointer',
      fontWeight: '500',
      transition: 'background 0.2s ease'
    },
    languagePopup: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    },
    popupContent: {
      background: 'white',
      padding: '2rem',
      borderRadius: '8px',
      maxWidth: '500px',
      width: '90%',
      textAlign: 'center'
    },
    popupTitle: {
      margin: '0 0 1.5rem 0',
      color: '#1e293b'
    },
    languageButtons: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '1rem'
    },
    languageButton: {
      padding: '0.8rem 1.5rem',
      background: '#f1f5f9',
      border: '1px solid #e2e8f0',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '1rem',
      transition: 'all 0.2s ease'
    }
  };

  if (loading) return <p style={{ textAlign: 'center', marginTop: '100px' }}>Loading...</p>;

  return (
<div style={{ 
  fontFamily: "Segoe UI, sans-serif", 
  minHeight: '100vh', 
  display: 'flex', 
  flexDirection: 'column', 
  background: 'linear-gradient(to bottom right, #f3f4f6, #e0f2fe)',
  paddingTop: "80px" // Add this to account for fixed header
}}>      
<style>{`
        .nav { display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: #0b5394; color: white; }
        .lang-btn { background: white; color: #4338ca; padding: 0.5rem 1rem; margin-right: 0.5rem; border: none; cursor: pointer; }
        .logout-btn { background: #ef4444; color: white; padding: 0.5rem 1rem; border: none; cursor: pointer; }
        .hero { display: flex; justify-content: center; padding: 2rem; }
        .hero img { width: 100%; max-width: 1000px; border-radius: 1rem; box-shadow: 0 10px 20px rgba(0,0,0,0.15); }
        .main { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; padding: 2rem; }
        .card { background: white; padding: 1.5rem; border-radius: 1rem; box-shadow: 0 2px 6px rgba(0,0,0,0.1); transition: all 0.3s ease; }
        .card:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
        .button-primary { background: #4338ca; color: white; padding: 0.75rem; border: none; border-radius: 0.5rem; margin-bottom: 1rem; cursor: pointer; width: 100%; }
        .button-secondary { background: #e5e7eb; color: #111827; padding: 0.75rem; border: none; border-radius: 0.5rem; width: 100%; cursor: pointer; }
        .file-input { display: block; width: 100%; margin: 1rem 0; padding: 0.5rem; }
        .overview { grid-column: span 2; }
        .status-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; }
        .status-box { padding: 1rem; border-radius: 0.75rem; display: flex; justify-content: space-between; align-items: center; }
        .draft { background: #eef2ff; color: #4338ca; }
        .submitted { background: #dcfce7; color: #15803d; }
        .uploaded { background: #fef9c3; color: #ca8a04; }
        .footer { background: #111827; color: #d1d5db; padding: 2rem; margin-top: auto; }
        .footer h4 { color: white; margin-bottom: 0.5rem; }
        .footer ul { list-style: none; padding: 0; }
        .footer li { margin-bottom: 0.3rem; }
        .footer a { color: #93c5fd; text-decoration: none; }
        .footer a:hover { text-decoration: underline; }
      `}</style>
      
      {/* New Header with Custom Style */}
      <header style={styles.header}>
        <div style={styles.headerContainer}>
          <div style={styles.logoSection}>
            <img src="/prathinidhi.png" alt="Emblem" style={styles.logo} />
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
              style={styles.logoutBtn} 
              onClick={handleLogout}
            >
              {t.logout}
            </button>
          </div>
        </div>
      </header>

      {/* Language Selection Pop-Up */}
      {isPopupOpen && (
        <div style={styles.languagePopup}>
          <div style={styles.popupContent}>
            <h2 style={styles.popupTitle}>
              {t.popupTitle}
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

      <nav className="nav">
        <span>{t.welcome}, {user?.name || 'User'} ({user?.role})</span>
      </nav>

      <div className="hero">
        <img src="/images/prathinidhi.svg" alt="Legal Application India" />
      </div>

      <main className="main">
        
        <div className="card">
          <h3>{t.userDetails}</h3>
          <p><strong>{t.aadhaar}:</strong> {user?.aadhaar}</p>
          <p><strong>{t.mobile}:</strong> {user?.mobile}</p>
          <p><strong>{t.otp}:</strong> {user?.otp}</p>
        </div>
        
        <div className="card">
          <h3>{t.fileForms}</h3>
          <button className="button-primary">{t.newForm}</button>
          <button className="button-secondary">{t.continueDraft}</button>
        </div>

        <div className="card">
          <h3>{t.uploadDocs}</h3>
          <input type="file" multiple className="file-input" />
          <p style={{ fontSize: '0.9rem' }}>{t.acceptedFormats}</p>
        </div>

        <div className="card overview">
          <h3>{t.statusTitle}</h3>
          <div className="status-grid">
            <div className="status-box draft">📄 {t.drafts}: <strong>4</strong></div>
            <div className="status-box submitted">✅ {t.submitted}: <strong>10</strong></div>
            <div className="status-box uploaded">📤 {t.uploaded}: <strong>6</strong></div>
          </div>
        </div>

        
      </main>

      <footer className="footer">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
          <div>
            <h4>{t.quickLinks}</h4>
            <ul>
              <li><a href="/faqs">{t.faqs}</a></li>
              <li><a href="/user-guide">{t.userGuide}</a></li>
              <li><a href="https://www.india.gov.in/" target="_blank" rel="noopener noreferrer">{t.govPortal}</a></li>
              <li><a href="/terms-and-conditions">{t.terms}</a></li>
            </ul>
          </div>
          <div>
            <h4>{t.contact}</h4>
            <ul>
              <li>{t.phone}: +91-1234-567890</li>
              <li>{t.email}: support@prathinidhi.in</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;