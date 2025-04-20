import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Reuse translations from Stage1 and add Stage2-specific translations
const translations = {
  en: {
    welcome: 'Welcome',
    governmentOfIndia: 'Government of India',
    ministryOfLaw: 'Ministry of Law and Justice',
    applicationForm: 'APPLICATION FORM FOR LEGAL AID / Grievance',
    legalAidApplication: 'Legal Aid / Grievance Application',
    nextStage: 'Next Stage',
    backToDashboard: 'Back to Dashboard',
    chooseItem: '-- Choose an Item --',
    stage: 'Stage',
    of: 'of',
    logout: '🚪 Logout',
    language: '🌐 Language',
    progress: 'Progress',
    errorMessage: 'Please fill all required fields',
    progressStatus: 'Stage 2 of 6: Problem Details',
    faq: 'FAQs',
    userGuide: 'User Guide',
    govPortal: 'Government Portal',
    terms: 'Terms and Conditions',
    contact: 'Contact',
    phone: 'Phone',
    email: 'Email',
    saveDraft: 'Save Draft',
    quickLinks: 'Quick Links',
    faqs: 'FAQs',
    // Stage2 specific translations
    natureOfLegalAid: 'Nature of Legal Aid / Grievance',
    problemSummary: 'Summary of problem for which legal aid / Grievance is sought',
    enterSummaryHere: 'Text Here...',
    corruption: 'Allegation of corruption/malpractices',
    harassment: 'Allegation of harrassment/misbehaviour',
    central_misc: 'Central Govt: Miscellaneous',
    civic_amenities: 'Civic amenities/Quality of service Compensations/Refunds',
    counselling: 'Counselling and Conciliation',
    delay_decision: 'Delay in decision/implementation of decision',
    law_order: 'Law & Order',
    legal_advice: 'Legal Advice',
    legal_redress: 'Legal Redress',
    panel_defend: 'Panel Lawyer for defending court case',
    panel_newcase: 'Panel Lawyer for filing new case',
    requests: 'Requests',
    retirement_dues: 'Retirement dues',
    revenue_tax: 'Revenue/Land/Tax',
    reserved_matter: 'Scheduled castes/STs/Backward Service matters',
    social_evils: 'Social Evils',
    state_misc: 'State Govt : Miscellaneous',
    draft_application: 'To Draft an Application/Representation/Notice/Petition/Reply'
  },
  hi: {
    welcome: 'स्वागत है',
    governmentOfIndia: 'भारत सरकार',
    ministryOfLaw: 'कानून और न्याय मंत्रालय',
    applicationForm: 'कानूनी सहायता / शिकायत के लिए आवेदन पत्र',
    legalAidApplication: 'कानूनी सहायता / शिकायत आवेदन',
    nextStage: 'अगला चरण',
    backToDashboard: 'डैशबोर्ड पर वापस जाएं',
    stage: 'चरण',
    of: 'का',
    logout: '🚪 लॉगआउट',
    language: '🌐 भाषा',
    progress: 'प्रगति',
    errorMessage: 'कृपया सभी आवश्यक फ़ील्ड भरें',
    progressStatus: 'चरण 2 में से 6: समस्या विवरण',
    faq: 'अक्सर पूछे जाने वाले प्रश्न',
    userGuide: 'उपयोगकर्ता मार्गदर्शिका',
    govPortal: 'सरकारी पोर्टल',
    terms: 'नियम और शर्तें',
    contact: 'संपर्क करें',
    phone: 'फ़ोन',
    email: 'ईमेल',
    saveDraft: 'ड्राफ्ट सहेजें',
    quickLinks: 'त्वरित लिंक',
    faqs: 'अक्सर पूछे जाने वाले प्रश्न',
    // Stage2 specific translations
    natureOfLegalAid: 'कानूनी सहायता / शिकायत की प्रकृति',
    problemSummary: 'समस्या का सारांश जिसके लिए कानूनी सहायता / शिकायत की मांग की गई है',
    enterSummaryHere: 'यहां टेक्स्ट दर्ज करें...',
    chooseItem: '-- एक विकल्प चुनें --',
    corruption: 'भ्रष्टाचार/दुरुपयोग का आरोप',
    harassment: 'उत्पीड़न/दुव्यवहार का आरोप',
    central_misc: 'केंद्र सरकार: विविध',
    civic_amenities: 'नागरिक सुविधाएं/सेवा की गुणवत्ता मुआवजा/रिफंड',
    counselling: 'परामर्श और सुलह',
    delay_decision: 'निर्णय/कार्यान्वयन में देरी',
    law_order: 'कानून और व्यवस्था',
    legal_advice: 'कानूनी सलाह',
    legal_redress: 'कानूनी समाधान',
    panel_defend: 'मुकदमे की रक्षा हेतु पैनल वकील',
    panel_newcase: 'नए मुकदमे हेतु पैनल वकील',
    requests: 'अनुरोध',
    retirement_dues: 'सेवानिवृत्ति बकाया',
    revenue_tax: 'राजस्व/भूमि/कर',
    reserved_matter: 'अनुसूचित जाति/जनजाति/पिछड़े वर्ग के मामले',
    social_evils: 'सामाजिक बुराइयाँ',
    state_misc: 'राज्य सरकार: विविध',
    draft_application: 'आवेदन/प्रतिनिधित्व/नोटिस/याचिका/जवाब का मसौदा तैयार करना'
  },
  te: {
    welcome: 'స్వాగతం',
    governmentOfIndia: 'భారత ప్రభుత్వం',
    ministryOfLaw: 'చట్ట మరియు న్యాయ మంత్రిత్వ శాఖ',
    applicationForm: 'న్యాయ సహాయం / ఫిర్యాదు కోసం దరఖాస్తు పత్రం',
    legalAidApplication: 'న్యాయ సహాయం / ఫిర్యాదు దరఖాస్తు',
    nextStage: 'తర్వాత దశ',
    backToDashboard: 'డాష్‌బోర్డ్‌కి వెనక్కి',
    chooseItem: '-- అంశాన్ని ఎంచుకోండి --',
    stage: 'దశ',
    of: 'లో',
    logout: '🚪 లాగ్ అవుట్',
    language: '🌐 భాష',
    progress: 'ప్రగతి',
    errorMessage: 'దయచేసి అన్ని అవసరమైన వివరాలు పూరించండి',
    progressStatus: 'దశ 2 / 6: సమస్య వివరాలు',
    faq: 'తరచుగా అడిగే ప్రశ్నలు',
    userGuide: 'వినియోగదారు గైడ్',
    govPortal: 'ప్రభుత్వ పోర్టల్',
    terms: 'నిబంధనలు మరియు షరతులు',
    contact: 'సంప్రదించండి',
    phone: 'ఫోన్',
    email: 'ఇమెయిల్',
    saveDraft: 'డ్రాఫ్ట్‌ను సేవ్ చేయండి',
    quickLinks: 'త్వరిత లింకులు',
    faqs: 'తరచుగా అడిగే ప్రశ్నలు',
    natureOfLegalAid: 'న్యాయ సహాయం / ఫిర్యాదు స్వరూపం',
    problemSummary: 'న్యాయ సహాయం / ఫిర్యాదు కోసం సమస్య సారాంశం',
    enterSummaryHere: 'ఇక్కడ టెక్స్ట్ నమోదు చేయండి...',
    corruption: 'అక్రమాలు/దుర్వినియోగాల ఆరోపణ',
    harassment: 'హింస/తప్పుదిద్దుబాటు ఆరోపణ',
    central_misc: 'కేంద్ర ప్రభుత్వం: వివిధ',
    civic_amenities: 'పౌర సౌకర్యాలు/సేవా నాణ్యత నష్టపరిహారాలు/రిఫండ్‌లు',
    counselling: 'సలహా మరియు మాధ్యస్థం',
    delay_decision: 'నిర్ణయం/అమలు ఆలస్యం',
    law_order: 'శాంతి భద్రతలు',
    legal_advice: 'చట్ట సలహా',
    legal_redress: 'చట్ట పరిష్కారం',
    panel_defend: 'కోర్టు కేసు రక్షణ కోసం ప్యానెల్ న్యాయవాది',
    panel_newcase: 'కొత్త కేసు దాఖలాకు ప్యానెల్ న్యాయవాది',
    requests: 'అభ్యర్థనలు',
    retirement_dues: 'రిటైర్‌మెంట్ బకాయిలు',
    revenue_tax: 'ఆదాయం/భూమి/పన్ను',
    reserved_matter: 'ప్రతిష్టాత్మక కులాలు/జాతులు/వెనుకబడిన సేవల అంశాలు',
    social_evils: 'సామాజిక చెడులు',
    state_misc: 'రాష్ట్ర ప్రభుత్వం: వివిధ',
    draft_application: 'దరఖాస్తు/ప్రాతినిధ్యం/నోటీసు/అర్జీ/స్పందనను తయారు చేయడం',
  },
  
  ta: {
    welcome: 'வரவேற்பு',
    governmentOfIndia: 'இந்திய அரசு',
    ministryOfLaw: 'சட்டம் மற்றும் நீதித்துறை அமைச்சகம்',
    applicationForm: 'சட்ட உதவி / புகார் விண்ணப்ப படிவம்',
    legalAidApplication: 'சட்ட உதவி / புகார் விண்ணப்பம்',
    nextStage: 'அடுத்த கட்டம்',
    backToDashboard: 'டாஷ்போர்டுக்கு திரும்பு',
    chooseItem: '-- ஒரு உருப்படியை தேர்வுசெய்க --',
    stage: 'கட்டம்',
    of: 'இன்',
    logout: '🚪 வெளியேறு',
    language: '🌐 மொழி',
    progress: 'முன்னேற்றம்',
    errorMessage: 'தயவுசெய்து தேவையான அனைத்து பகுதிகளையும் பூர்த்தி செய்யவும்',
    progressStatus: 'கட்டம் 2 / 6: பிரச்சினை விவரங்கள்',
    faq: 'அடிக்கடி கேட்கப்படும் கேள்விகள்',
    userGuide: 'பயனர் வழிகாட்டி',
    govPortal: 'அரசு போர்டல்',
    terms: 'விதிமுறைகள் மற்றும் நிபந்தனைகள்',
    contact: 'தொடர்பு',
    phone: 'தொலைபேசி',
    email: 'மின்னஞ்சல்',
    saveDraft: 'வரைவு சேமிக்கவும்',
    quickLinks: 'விரைவு இணைப்புகள்',
    faqs: 'அடிக்கடி கேட்கப்படும் கேள்விகள்',
    natureOfLegalAid: 'சட்ட உதவி / புகாரின் தன்மை',
    problemSummary: 'சட்ட உதவி / புகாருக்கான பிரச்சினையின் சுருக்கம்',
    enterSummaryHere: 'இங்கே உள்ளிடுக...',
    corruption: 'அழுக்காறு/தவறான நடைமுறைகள் குற்றச்சாட்டு',
    harassment: 'துன்புறுத்தல்/முறையீடு குற்றச்சாட்டு',
    central_misc: 'மத்திய அரசு: பலதரப்பட்டவை',
    civic_amenities: 'நகர்ப்புற வசதிகள்/சேவை தரம் இழப்பீடு/மீளளிப்பு',
    counselling: 'ஆலோசனை மற்றும் சமரசம்',
    delay_decision: 'முடிவு/செயலாக்கத்தில் தாமதம்',
    law_order: 'சட்டம் மற்றும் ஒழுங்கு',
    legal_advice: 'சட்ட ஆலோசனை',
    legal_redress: 'சட்ட நிவாரணம்',
    panel_defend: 'நடப்புள்ள வழக்குக்கு சட்டத்தரணி நியமனம்',
    panel_newcase: 'புதிய வழக்குக்கு சட்டத்தரணி நியமனம்',
    requests: 'வேண்டுகோள்கள்',
    retirement_dues: 'ஓய்வூதியத் தொகைகள்',
    revenue_tax: 'வருமானம்/நிலம்/வரி',
    reserved_matter: 'அதிகாரம் பெற்ற/இனத்தினர் தொடர்பான சேவை விவகாரங்கள்',
    social_evils: 'சமூக தீமைகள்',
    state_misc: 'மாநில அரசு: பலதரப்பட்டவை',
    draft_application: 'விண்ணப்பம்/தகவல்/குற்றச்சாட்டு/மனு/பதில் வரைதல்'
  },
  
  bn: {
    welcome: 'স্বাগতম',
    governmentOfIndia: 'ভারত সরকার',
    ministryOfLaw: 'আইন ও ন্যায় মন্ত্রণালয়',
    applicationForm: 'আইনি সহায়তা / অভিযোগের জন্য আবেদন ফর্ম',
    legalAidApplication: 'আইনি সহায়তা / অভিযোগ আবেদন',
    nextStage: 'পরবর্তী ধাপ',
    backToDashboard: 'ড্যাশবোর্ডে ফিরে যান',
    chooseItem: '-- একটি আইটেম নির্বাচন করুন --',
    stage: 'পর্যায়',
    of: 'এর',
    logout: '🚪 লগআউট',
    language: '🌐 ভাষা',
    progress: 'অগ্রগতি',
    errorMessage: 'দয়া করে সব প্রয়োজনীয় ঘর পূরণ করুন',
    progressStatus: 'পর্যায় ২ / ৬: সমস্যার বিবরণ',
    faq: 'প্রায়শই জিজ্ঞাসিত প্রশ্নাবলি',
    userGuide: 'ব্যবহারকারী নির্দেশিকা',
    govPortal: 'সরকারি পোর্টাল',
    terms: 'শর্তাবলি',
    contact: 'যোগাযোগ',
    phone: 'ফোন',
    email: 'ইমেল',
    saveDraft: 'খসড়া সংরক্ষণ করুন',
    quickLinks: 'দ্রুত লিঙ্কসমূহ',
    faqs: 'প্রায়শই জিজ্ঞাসিত প্রশ্নাবলি',
    natureOfLegalAid: 'আইনি সহায়তা / অভিযোগের প্রকৃতি',
    problemSummary: 'যে সমস্যার জন্য আইনি সহায়তা / অভিযোগ চাওয়া হচ্ছে তার সংক্ষিপ্তসার',
    enterSummaryHere: 'এখানে লিখুন...',
    corruption: 'দুর্নীতি/অনিয়মের অভিযোগ',
    harassment: 'হয়রানি/অভব্য আচরণের অভিযোগ',
    central_misc: 'কেন্দ্রীয় সরকার: বিবিধ',
    civic_amenities: 'নাগরিক সুবিধা/পরিষেবার মান ক্ষতিপূরণ/ফেরত',
    counselling: 'পরামর্শ এবং মীমাংসা',
    delay_decision: 'সিদ্ধান্ত/বাস্তবায়নে বিলম্ব',
    law_order: 'আইন ও শৃঙ্খলা',
    legal_advice: 'আইনি পরামর্শ',
    legal_redress: 'আইনি প্রতিকার',
    panel_defend: 'মামলা পরিচালনার জন্য প্যানেল আইনজীবী',
    panel_newcase: 'নতুন মামলার জন্য প্যানেল আইনজীবী',
    requests: 'অনুরোধ',
    retirement_dues: 'অবসর বকেয়া',
    revenue_tax: 'রাজস্ব/জমি/কর',
    reserved_matter: 'তালিকাভুক্ত জাতি/উপজাতি/পিছিয়ে পড়া শ্রেণীর বিষয়',
    social_evils: 'সামাজিক কুপ্রথা',
    state_misc: 'রাজ্য সরকার: বিবিধ',
    draft_application: 'আবেদন/প্রতিনিধিত্ব/নোটিশ/পিটিশন/উত্তরের খসড়া তৈরি'
  },
  
};

const Stage2 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const langParam = queryParams.get('lang')?.toLowerCase() || localStorage.getItem('preferredLanguage') || 'en';
  const [t, setT] = useState(translations.en);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    natureOfLegalAid: '',
    problemSummary: ''
  });
  const [error, setError] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState(langParam);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [showAnimation, setShowAnimation] = useState(false);

  // Get token and previous form data from location state or localStorage
  const token = location.state?.token || localStorage.getItem('token');
  const previousFormData = location.state?.formData || {};

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
    if (!formData.natureOfLegalAid || !formData.problemSummary) {
      setError(t.errorMessage);
      // Shake animation for error
      const formElement = document.querySelector('.stage2-form');
      formElement.classList.add('shake');
      setTimeout(() => {
        formElement.classList.remove('shake');
      }, 500);
      return;
    }

    // Navigate to next stage with form data and token
    navigate('/stage3', {
      state: { 
        token,
        formData: { ...previousFormData, ...formData }
      },
      search: `?lang=${selectedLanguage}`
    });
  };

  const handleSaveDraft = () => {
    // Here you would implement logic to save the form data as a draft
    alert('Draft saved successfully!');
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
      width: '33.33%', // 2/6 = 33.33%
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
    completedStage: {
      backgroundColor: '#4caf50',
      color: 'white'
    },
    // Buttons at the bottom
    buttonsContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '30px'
    },
    buttonGroup: {
      display: 'flex',
      gap: '10px'
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
    buttonSave: {
      backgroundColor: '#4caf50',
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
      flexDirection: 'column',
      margin: '0 0 20px',
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
    formTextarea: {
      width: '100%',
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid #d1d5db',
      fontSize: '16px',
      minHeight: '150px',
      resize: 'vertical'
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
          from { width: 16.67%; }
          to { width: 33.33%; }
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
        .stage2-form.shake {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
        .form-row {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeIn 0.5s forwards;
        }
        .form-row:nth-child(1) { animation-delay: 0.2s; }
        .form-row:nth-child(2) { animation-delay: 0.4s; }
        .form-buttons { animation-delay: 0.6s; }
        .active-stage {
          animation: pulse 2s infinite;
        }
        .progress-bar-inner {
          animation: progressAnimation 1.5s ease-out forwards;
        }
        .form-select:focus, .form-textarea:focus {
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
            <span>{t.progress}: {t.stage} 2 {t.of} 6</span>
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
                  ...(stage === 2 ? styles.activeStage : {}),
                  ...(stage < 2 ? styles.completedStage : {})
                }}
                className={stage === 2 ? 'active-stage' : ''}
              >
                {stage}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', width: '100%' }}>
        {/* Main Form */}
        <div 
          className="stage2-form"
          style={{
            ...styles.formContainer,
            opacity: showAnimation ? 1 : 0,
            transform: showAnimation ? 'translateY(0)' : 'translateY(20px)'
          }}
        >
          <h2 style={styles.formTitle}>{t.legalAidApplication}</h2>

          {error && <div style={styles.errorText}>{error}</div>}
          
          <div className="form-row" style={styles.formRow}>
            <label style={styles.formLabel}>
              {t.natureOfLegalAid} <span style={styles.requiredField}>*</span>:
            </label>
            <select 
              name="natureOfLegalAid"
              value={formData.natureOfLegalAid}
              onChange={handleInputChange}
              style={styles.formSelect}
              className="form-select"
              required
            >
              <option value="">{t.chooseItem}</option>
                <option value="corruption">{t.corruption}</option>
                <option value="harassment">{t.harassment}</option>
                <option value="central_misc">{t.central_misc}</option>
                <option value="civic_amenities">{t.civic_amenities}</option>
                <option value="counselling">{t.counselling}</option>
                <option value="delay_decision">{t.delay_decision}</option>
                <option value="law_order">{t.law_order}</option>
                <option value="legal_advice">{t.legal_advice}</option>
                <option value="legal_redress">{t.legal_redress}</option>
                <option value="panel_defend">{t.panel_defend}</option>
                <option value="panel_newcase">{t.panel_newcase}</option>
                <option value="requests">{t.requests}</option>
                <option value="retirement_dues">{t.retirement_dues}</option>
                <option value="revenue_tax">{t.revenue_tax}</option>
                <option value="reserved_matter">{t.reserved_matter}</option>
                <option value="social_evils">{t.social_evils}</option>
                <option value="state_misc">{t.state_misc}</option>
                <option value="draft_application">{t.draft_application}</option>

            </select>
          </div>

          <div className="form-row" style={styles.formRow}>
            <label style={styles.formLabel}>
              {t.problemSummary} <span style={styles.requiredField}>*</span>:
            </label>
            <textarea 
              name="problemSummary"
              value={formData.problemSummary}
              onChange={handleInputChange}
              placeholder={t.enterSummaryHere}
              style={styles.formTextarea}
              className="form-textarea"
              required
            />
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
            <div style={styles.buttonGroup}>
              <button 
                onClick={handleSaveDraft} 
                style={styles.buttonSave}
                className="btn-hover"
              >
                {t.saveDraft}
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

export default Stage2;