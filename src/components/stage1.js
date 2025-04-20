import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Translations object - I'm keeping the same structure as dashboard
const translations = {
  en: {
    welcome: 'Welcome',
    governmentOfIndia: 'Government of India',
    ministryOfLaw: 'Ministry of Law and Justice',
    applicationForm: 'APPLICATION FORM FOR LEGAL AID / Grievance',
    legalAidApplication: 'Legal Aid / Grievance Application',
    applicationFor: 'Application For',
    receivedThrough: 'Received Through',
    state: 'State',
    district: 'District',
    taluka: 'Taluka',
    nextStage: 'Next Stage',
    backToDashboard: 'Back to Dashboard',
    chooseItem: '-- Choose an Item --',
    stage: 'Stage',
    of: 'of',
    logout: '🚪 Logout',
    language: '🌐 Language',
    progress: 'Progress',
    pleaseSelect: 'Please select an option',
    errorMessage: 'Please fill all required fields',
    progressStatus: 'Stage 1 of 6: Basic Information',
    faq: 'FAQs',
    userGuide: 'User Guide',
    govPortal: 'Government Portal',
    terms: 'Terms and Conditions',
    contact: 'Contact',
    phone: 'Phone',
    email: 'Email',
    nalsa: 'NALSA - National Legal Service Authority',
    sclsc: 'SCLSC - Supreme Court Legal Service Committee',
    hclsc: 'HCLSC - High Court Legal Service Committee',
    slsa: 'SLSA - State Legal Service Authority',
    dlsa: 'DLSA - District Legal Service Authority',
    tlsc: 'TLSC - Taluka Legal Service Committee',
    slf: 'SLF - Self',
    rep: 'REP - Representative',
    org: 'ORG - Organization'
  },
  hi: {
    welcome: 'स्वागत है',
    governmentOfIndia: 'भारत सरकार',
    ministryOfLaw: 'कानून और न्याय मंत्रालय',
    applicationForm: 'कानूनी सहायता / शिकायत के लिए आवेदन पत्र',
    legalAidApplication: 'कानूनी सहायता / शिकायत आवेदन',
    applicationFor: 'के लिए आवेदन',
    receivedThrough: 'के माध्यम से प्राप्त',
    state: 'राज्य',
    district: 'जिला',
    taluka: 'तालुका',
    nextStage: 'अगला चरण',
    backToDashboard: 'डैशबोर्ड पर वापस जाएं',
    chooseItem: '-- एक आइटम चुनें --',
    stage: 'चरण',
    of: 'का',
    logout: '🚪 लॉगआउट',
    language: '🌐 भाषा',
    progress: 'प्रगति',
    pleaseSelect: 'कृपया एक विकल्प चुनें',
    errorMessage: 'कृपया सभी आवश्यक फ़ील्ड भरें',
    progressStatus: 'चरण 1 में से 6: मूलभूत जानकारी',
    faq: 'अक्सर पूछे जाने वाले प्रश्न',
    userGuide: 'उपयोगकर्ता मार्गदर्शिका',
    govPortal: 'सरकारी पोर्टल',
    terms: 'नियम और शर्तें',
    contact: 'संपर्क करें',
    phone: 'फ़ोन',
    email: 'ईमेल',
    nalsa: 'नालसा - नेशनल लीगल सर्विस अथॉरिटी',
    sclsc: 'एससीएलएससी - सुप्रीम कोर्ट लीगल सर्विस कमेटी',
    hclsc: 'एचसीएलएससी - हाई कोर्ट लीगल सर्विस कमेटी',
    slsa: 'एसएलएसए - स्टेट लीगल सर्विस अथॉरिटी',
    dlsa: 'डीएलएसए - डिस्ट्रिक्ट लीगल सर्विस अथॉरिटी',
    tlsc: 'टीएलएससी - तालुका लीगल सर्विस कमेटी',
    slf: 'एसएलएफ - स्वयं',
    rep: 'आरईपी - प्रतिनिधि',
    org: 'ओआरजी - संगठन'
  },
  te: {
    welcome: 'స్వాగతం',
    governmentOfIndia: 'భారత ప్రభుత్వం',
    ministryOfLaw: 'చట్ట మరియు న్యాయ మంత్రిత్వ శాఖ',
    applicationForm: 'న్యాయ సహాయం / ఫిర్యాదు దరఖాస్తు ఫారమ్',
    legalAidApplication: 'న్యాయ సహాయం / ఫిర్యాదు దరఖాస్తు',
    applicationFor: 'దేనికోసం దరఖాస్తు',
    receivedThrough: 'ద్వారా అందింది',
    state: 'రాష్ట్రం',
    district: 'జిల్లా',
    taluka: 'తాలూకా',
    nextStage: 'తదుపరి దశ',
    backToDashboard: 'డాష్‌బోర్డ్‌కు వెళ్ళండి',
    chooseItem: '-- అంశాన్ని ఎంచుకోండి --',
    stage: 'దశ',
    of: 'లో',
    logout: '🚪 లాగ్అవుట్',
    language: '🌐 భాష',
    progress: 'ప్రగతి',
    pleaseSelect: 'దయచేసి ఒక ఎంపికను ఎంచుకోండి',
    errorMessage: 'దయచేసి అవసరమైన అన్ని ఖాళీలను పూరించండి',
    progressStatus: 'దశ 1 యొక్క 6: ప్రాథమిక సమాచారం',
    faq: 'తరచుగా అడిగే ప్రశ్నలు',
  userGuide: 'వినియోగదారుల గైడ్',
  govPortal: 'సర్కారు పోర్టల్',
  terms: 'నిబంధనలు మరియు షరతులు',
  contact: 'సంప్రదించండి',
  phone: 'ఫోన్',
  email: 'ఇమెయిల్',
  nalsa: 'నల్సా - నేషనల్ లీగల్ సర్వీస్ అథారిటీ',
  sclsc: 'ఎస్సీఎల్ఎస్సీ - సుప్రీం కోర్ట్ లీగల్ సర్వీస్ కమిటీ',
  hclsc: 'హెచ్సీఎల్ఎస్సీ - హైకోర్ట్ లీగల్ సర్వీస్ కమిటీ',
  slsa: 'ఎస్‌ఎల్ఎస్ఎ - స్టేట్ లీగల్ సర్వీస్ అథారిటీ',
  dlsa: 'డిఎల్ఎస్ఎ - డిస్ట్రిక్ట్ లీగల్ సర్వీస్ అథారిటీ',
  tlsc: 'టిఎల్ఎస్సీ - తాలూకా లీగల్ సర్వీస్ కమిటీ',
  slf: 'ఎస్‌ఎల్‌ఎఫ్ - స్వయంగా',
  rep: 'ఆర్‌ఈపీ - ప్రతినిధి',
  org: 'ఓఆర్‌జీ - సంస్థ'
  },
  ta: {
    welcome: 'வரவேற்கிறோம்',
    governmentOfIndia: 'இந்திய அரசு',
    ministryOfLaw: 'சட்ட மற்றும் நீதிமன்ற அமைச்சகம்',
    applicationForm: 'சட்ட உதவி / புகார் விண்ணப்பப் படிவம்',
    legalAidApplication: 'சட்ட உதவி / புகார் விண்ணப்பம்',
    applicationFor: 'எதற்கான விண்ணப்பம்',
    receivedThrough: 'மூலம் பெறப்பட்டது',
    state: 'மாநிலம்',
    district: 'மாவட்டம்',
    taluka: 'தாலுகா',
    nextStage: 'அடுத்த கட்டம்',
    backToDashboard: 'டாஷ்போர்டுக்கு திரும்பவும்',
    chooseItem: '-- உருப்படியைத் தேர்ந்தெடுக்கவும் --',
    stage: 'கட்டம்',
    of: 'இல்',
    logout: '🚪 வெளியேறு',
    language: '🌐 மொழி',
    progress: 'முன்னேற்றம்',
    pleaseSelect: 'தயவுசெய்து ஒரு விருப்பத்தைத் தேர்ந்தெடுக்கவும்',
    errorMessage: 'தயவுசெய்து தேவையான அனைத்து புலங்களையும் நிரப்பவும்',
    progressStatus: 'கட்டம் 1 இல் 6: அடிப்படை தகவல்',
    userGuide: 'பயனர் வழிகாட்டி',
    govPortal: 'அரசு போர்டல்',
    terms: 'விதிமுறைகள் மற்றும் நிபந்தனைகள்',
    contact: 'தொடர்பு கொள்ள',
    phone: 'தொலைபேசி',
    email: 'மின்னஞ்சல்',
    faq: 'அடிக்கடி கேட்கப்படும் கேள்விகள்',
    sclsc: 'எஸ்சி.எல்.எஸ்.சி - உச்சநீதிமன்ற சட்ட சேவை குழு',
    hclsc: 'எச்.சி.எல்.எஸ்.சி - உயர் நீதிமன்ற சட்ட சேவை குழு',
    slsa: 'எஸ்.எல்.எஸ்.ஏ - மாநில சட்ட சேவை ஆணையம்',
    dlsa: 'டி.எல்.எஸ்.ஏ - மாவட்ட சட்ட சேவை ஆணையம்',
    tlsc: 'டி.எல்.எஸ்.சி - தாலுகா சட்ட சேவை குழு',
    nalsa: 'நல்சா - தேசிய சட்ட சேவை ஆணையம்',
    slf: 'எஸ்எல்எஃப் - சுயமாக',
    rep: 'ஆர்இபி - பிரதிநிதி',
    org: 'ஓஆர்ஜி - நிறுவனம்'
       
  },
  bn: {
    welcome: 'স্বাগতম',
    governmentOfIndia: 'ভারত সরকার',
    ministryOfLaw: 'আইন ও বিচার মন্ত্রণালয়',
    applicationForm: 'আইনি সহায়তা / অভিযোগের জন্য আবেদন ফর্ম',
    legalAidApplication: 'আইনি সহায়তা / অভিযোগ আবেদন',
    applicationFor: 'যার জন্য আবেদন',
    receivedThrough: 'যার মাধ্যমে প্রাপ্ত',
    state: 'রাজ্য',
    district: 'জেলা',
    taluka: 'তালুক',
    nextStage: 'পরবর্তী ধাপ',
    backToDashboard: 'ড্যাশবোর্ডে ফিরে যান',
    chooseItem: '-- একটি আইটেম নির্বাচন করুন --',
    stage: 'ধাপ',
    of: 'এর',
    logout: '🚪 লগ আউট',
    language: '🌐 ভাষা',
    progress: 'অগ্রগতি',
    pleaseSelect: 'অনুগ্রহ করে একটি বিকল্প নির্বাচন করুন',
    errorMessage: 'দয়া করে সমস্ত প্রয়োজনীয় ঘর পূরণ করুন',
    progressStatus: 'ধাপ ১ এর ৬: প্রাথমিক তথ্য',
    faq: 'প্রায়শই জিজ্ঞাসিত প্রশ্নাবলী',
    userGuide: 'ব্যবহারকারী নির্দেশিকা',
    govPortal: 'সরকারি পোর্টাল',
    terms: 'শর্তাবলী',
    contact: 'যোগাযোগ করুন',
    phone: 'ফোন',
    email: 'ইমেইল',
    nalsa: 'নালসা - জাতীয় আইন সহায়তা কর্তৃপক্ষ',
    sclsc: 'এসসিএলএসসি - সুপ্রিম কোর্ট আইন সহায়তা কমিটি',
    hclsc: 'এইচসিএলএসসি - হাই কোর্ট আইন সহায়তা কমিটি',
    slsa: 'এসএলএসএ - রাজ্য আইন সহায়তা কর্তৃপক্ষ',
    dlsa: 'ডিএলএসএ - জেলা আইন সহায়তা কর্তৃপক্ষ',
    tlsc: 'টিএলএসসি - তহশিল আইন সহায়তা কমিটি',
    slf: 'এসএলএফ - স্বয়ং',
    rep: 'আরইপি - প্রতিনিধি',
    org: 'ওআরজি - সংস্থা'
  },
      
  // Add other languages as needed
};

const Stage1 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const langParam = queryParams.get('lang')?.toLowerCase() || localStorage.getItem('preferredLanguage') || 'en';
  const [t, setT] = useState(translations.en);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    applicationType: '',
    receivedThrough: 'SLF - Self', // Default value
    state: '',
    district: '',
    taluka: ''
  });
  const [error, setError] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState(langParam);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [showAnimation, setShowAnimation] = useState(false);

  // Get token from location state or localStorage
  const token = location.state?.token || localStorage.getItem('token');

  useEffect(() => {
    const selected = translations[selectedLanguage] || translations['en'];
    setT(selected);
    // Update URL with selected language
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('lang', selectedLanguage);
    window.history.pushState({}, '', newUrl);
  }, [selectedLanguage]);

  // Verify authentication when component mounts
  useEffect(() => {
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
      .then((data) => {
        setUser(data.user);
        setIsAuthenticated(true);
      })
      .catch(() => {
        localStorage.removeItem('token');
        navigate(`/login?lang=${selectedLanguage}`);
      })
      .finally(() => setLoading(false));
  }, [token, selectedLanguage, navigate]);

  // Animation effect when component mounts
  useEffect(() => {
    setTimeout(() => {
      setShowAnimation(true);
    }, 300);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate(`/login?lang=${selectedLanguage}`);
  };

  const handleNext = () => {
    if (!formData.applicationType || !formData.state || !formData.district || !formData.taluka) {
      setError(t.errorMessage);
      // Shake animation for error
      const formElement = document.querySelector('.stage1-form');
      formElement.classList.add('shake');
      setTimeout(() => {
        formElement.classList.remove('shake');
      }, 500);
      return;
    }

    // Navigate to next stage with form data and token
    navigate('/stage2', {
      state: { 
        token,
        formData: { ...formData }
      },
      search: `?lang=${selectedLanguage}`
    });
  };

  const handleBackToDashboard = () => {
    navigate(`/dashboard?lang=${selectedLanguage}`);
  };

  // Styles object
  const styles = {
    header: {
      backgroundColor: "#0b5394",
      color: "#fff",
      padding: "10px 0",
      position: "fixed",
      top: 0,
      width: "100%",
      zIndex: 999,
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
    },
    headerContainer: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "0 20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    },
    logoSection: {
      display: "flex",
      alignItems: "center",
      gap: "15px"
    },
    logo: {
      height: "48px"
    },
    title: {
      fontSize: "26px",
      fontWeight: "bold",
      margin: 0,
      color: "white"
    },
    subtitle: {
      fontSize: "13px",
      margin: 0,
      color: "#e0e0e0"
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
    // Progress bar container
    progressContainer: {
      position: 'fixed',
      top: '80px',
      left: 0,
      width: '100%',
      backgroundColor: '#f0f4f8',
      padding: '15px 0',
      zIndex: 998,
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      transition: 'all 0.3s ease'
    },
    progressInner: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px'
    },
    progressText: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '5px',
      color: '#333',
      fontWeight: 'bold'
    },
    progressBarOuter: {
      height: '12px',
      backgroundColor: '#e2e8f0',
      borderRadius: '6px',
      overflow: 'hidden'
    },
    progressBarInner: {
      height: '100%',
      width: '16.67%', // 1/6 = 16.67%
      backgroundColor: '#0b5394',
      borderRadius: '6px',
      transition: 'width 1s ease-in-out'
    },
    progressStages: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '5px'
    },
    progressStage: {
      width: '30px',
      height: '30px',
      borderRadius: '50%',
      backgroundColor: '#e2e8f0',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '14px',
      fontWeight: 'bold',
      color: '#666',
      transition: 'all 0.3s ease'
    },
    activeStage: {
      backgroundColor: '#0b5394',
      color: 'white',
      transform: 'scale(1.2)'
    },
    // Buttons at the bottom
    buttonsContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '30px'
    },
    buttonSecondary: {
      backgroundColor: '#e2e8f0',
      color: '#333',
      border: 'none',
      borderRadius: '4px',
      padding: '10px 20px',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    buttonPrimary: {
      backgroundColor: '#0b5394',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      padding: '10px 20px',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    // Form styles
    formContainer: {
      backgroundColor: 'white', 
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      padding: '30px',
      margin: '20px 0',
      transition: 'transform 0.3s ease, opacity 0.3s ease',
    },
    formTitle: {
      color: '#0b5394',
      borderBottom: '2px solid #0b5394',
      paddingBottom: '10px',
      marginBottom: '20px'
    },
    formRow: {
      display: 'flex',
      flexWrap: 'wrap',
      margin: '0 -10px 20px',
      alignItems: 'center'
    },
    formColumn: {
      flex: '1 1 300px',
      padding: '0 10px'
    },
    formLabel: {
      display: 'block',
      marginBottom: '8px',
      color: '#333',
      fontWeight: '500'
    },
    formSelect: {
      width: '100%',
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid #d1d5db',
      fontSize: '16px'
    },
    requiredField: {
      color: 'red'
    },
    errorText: {
      color: 'red',
      marginTop: '10px',
      fontWeight: 'bold',
      textAlign: 'center'
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
      paddingTop: "150px" // Increased to account for fixed header and progress bar
    }}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes progressAnimation {
          from { width: 0%; }
          to { width: 16.67%; }
        }
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(11, 83, 148, 0.7); }
          70% { box-shadow: 0 0 0 10px rgba(11, 83, 148, 0); }
          100% { box-shadow: 0 0 0 0 rgba(11, 83, 148, 0); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .stage1-form.shake {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
        .form-row {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeIn 0.5s forwards;
        }
        .form-row:nth-child(1) { animation-delay: 0.2s; }
        .form-row:nth-child(2) { animation-delay: 0.4s; }
        .form-row:nth-child(3) { animation-delay: 0.6s; }
        .form-buttons { animation-delay: 0.8s; }
        .active-stage {
          animation: pulse 2s infinite;
        }
        .progress-bar-inner {
          animation: progressAnimation 1.5s ease-out forwards;
        }
        .form-select:focus {
          outline: none;
          border-color: #0b5394;
          box-shadow: 0 0 0 3px rgba(11, 83, 148, 0.3);
        }
        .btn-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .language-selector {
          position: relative;
        }
        .language-selector select {
          appearance: none;
          padding-right: 25px;
        }
        .language-selector::after {
          content: '▼';
          font-size: 12px;
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
        }
        .form-container:hover {
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        .footer { background: #111827; color: #d1d5db; padding: 2rem; margin-top: auto; }
        .footer h4 { color: white; margin-bottom: 0.5rem; }
        .footer ul { list-style: none; padding: 0; }
        .footer li { margin-bottom: 0.3rem; }
        .footer a { color: #93c5fd; text-decoration: none; }
        .footer a:hover { text-decoration: underline; }
      `}</style>
      
      {/* Header - Same as Dashboard */}
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
            <div className="language-selector">
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
            </div>
            <button 
              style={styles.logoutBtn} 
              onClick={handleLogout}
              className="btn-hover"
            >
              {t.logout}
            </button>
          </div>
        </div>
      </header>

      {/* Progress Bar - Fixed Position */}
      <div style={styles.progressContainer}>
        <div style={styles.progressInner}>
          <div style={styles.progressText}>
            <span>{t.progress}: {t.stage} 1 {t.of} 6</span>
            <span>{t.progressStatus}</span>
          </div>
          <div style={styles.progressBarOuter}>
            <div style={styles.progressBarInner} className="progress-bar-inner"></div>
          </div>
          <div style={styles.progressStages}>
            {[1, 2, 3, 4, 5, 6].map((stage) => (
              <div 
                key={stage} 
                style={{
                  ...styles.progressStage,
                  ...(stage === 1 ? styles.activeStage : {})
                }}
                className={stage === 1 ? 'active-stage' : ''}
              >
                {stage}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', width: '100%' }}>
        {/* Form Title */}
        
        {/* Main Form */}
        <div 
          className="stage1-form"
          style={{
            ...styles.formContainer,
            opacity: showAnimation ? 1 : 0,
            transform: showAnimation ? 'translateY(0)' : 'translateY(20px)'
          }}
        >
          <h2 style={styles.formTitle}>{t.legalAidApplication}</h2>

          {error && <div style={styles.errorText}>{error}</div>}
          
          <div className="form-row" style={styles.formRow}>
            <div style={styles.formColumn}>
              <label style={styles.formLabel}>
                {t.applicationFor} <span style={styles.requiredField}>*</span>:
              </label>
              <select 
                name="applicationType"
                value={formData.applicationType}
                onChange={handleInputChange}
                style={styles.formSelect}
                className="form-select"
                required
              >
                <option value="">{t.chooseItem}</option>
                <option value="nalsa">{t.nalsa}</option>
                <option value="sclsc">{t.sclsc}</option>
                <option value="hclsc">{t.hclsc}</option>
                <option value="slsa">{t.slsa}</option>
                <option value="dlsa">{t.dlsa}</option>
                <option value="tlsc">{t.tlsc}</option>

              </select>
            </div>
            <div style={styles.formColumn}>
              <label style={styles.formLabel}>
                {t.receivedThrough} <span style={styles.requiredField}>*</span>:
              </label>
              <select 
                name="receivedThrough"
                value={formData.receivedThrough}
                onChange={handleInputChange}
                style={styles.formSelect}
                className="form-select"
                required
              >
                <option value="slf">{t.slf}</option>
                <option value="rep">{t.rep}</option>
                <option value="org">{t.org}</option>
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="form-row form-buttons" style={styles.buttonsContainer}>
            <button 
              onClick={handleBackToDashboard} 
              style={styles.buttonSecondary}
              className="btn-hover"
            >
              {t.backToDashboard}
            </button>
            <button 
              onClick={handleNext} 
              style={styles.buttonPrimary}
              className="btn-hover"
            >
              {t.nextStage} →
            </button>
          </div>
        </div>
      </div>

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

export default Stage1;