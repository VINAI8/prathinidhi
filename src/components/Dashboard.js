import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const translations = {
  en: {
    welcome: 'Welcome',
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
    copyright:
      () => `© ${new Date().getFullYear()} Government of India. All Rights Reserved. 🇮🇳`
  },
  ta: {
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
    copyright: () => `© ${new Date().getFullYear()} இந்திய அரசு. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை. 🇮🇳`
  },
  hi: {
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
    copyright: () => `© ${new Date().getFullYear()} भारत सरकार। सर्वाधिकार सुरक्षित। 🇮🇳`
  },
    
  te: {
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
    copyright:
      () => `© ${new Date().getFullYear()} భారత ప్రభుత్వం. అన్ని హక్కులు నిలుపుకోబడ్డాయి. 🇮🇳`
  },
  bn: {
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
    copyright: () => `© ${new Date().getFullYear()} ভারত সরকার। সর্বস্বত্ব সংরক্ষিত। 🇮🇳`
  },
  
};

const Dashboard = ({ userName = 'John Doe' }) => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const langParam = queryParams.get('lang')?.toLowerCase() || 'en';
  
    const [t, setT] = useState(translations.en);
  
    useEffect(() => {
        const selected = translations[langParam] || translations['en'];
      setT(selected);
    }, [langParam]);

  return (
    <div style={{ fontFamily: 'sans-serif', minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'linear-gradient(to bottom right, #f3f4f6, #e0f2fe)' }}>
      <style>{`
        .header {
          padding: 1rem;
          background: white;
          border-bottom: 1px solid #ddd;
          text-align: center;
          position: relative;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .emblem, .justice {
          position: absolute;
          top: 1rem;
        }
        .emblem {
          left: 1rem;
          width: 50px;
        }
        .justice {
          right: 1rem;
          width: 40px;
        }
        .nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background: #4338ca;
          color: white;
        }
        .lang-btn {
          background: white;
          color: #4338ca;
          padding: 0.5rem 1rem;
          margin-right: 0.5rem;
          border: none;
          cursor: pointer;
        }
        .logout-btn {
          background: #ef4444;
          color: white;
          padding: 0.5rem 1rem;
          border: none;
          cursor: pointer;
        }
        .hero {
          display: flex;
          justify-content: center;
          padding: 2rem;
        }
        .hero img {
          width: 100%;
          max-width: 1000px;
          border-radius: 1rem;
          box-shadow: 0 10px 20px rgba(0,0,0,0.15);
        }
        .main {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          padding: 2rem;
        }
        .card {
          background: white;
          padding: 1.5rem;
          border-radius: 1rem;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
        }
        .card:hover {
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        .button-primary {
          background: #4338ca;
          color: white;
          padding: 0.75rem;
          border: none;
          border-radius: 0.5rem;
          margin-bottom: 1rem;
          cursor: pointer;
          width: 100%;
        }
        .button-secondary {
          background: #e5e7eb;
          color: #111827;
          padding: 0.75rem;
          border: none;
          border-radius: 0.5rem;
          width: 100%;
          cursor: pointer;
        }
        .file-input {
          display: block;
          width: 100%;
          margin: 1rem 0;
          padding: 0.5rem;
        }
        .overview {
          grid-column: span 2;
        }
        .status-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }
        .status-box {
          padding: 1rem;
          border-radius: 0.75rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .draft {
          background: #eef2ff;
          color: #4338ca;
        }
        .submitted {
          background: #dcfce7;
          color: #15803d;
        }
        .uploaded {
          background: #fef9c3;
          color: #ca8a04;
        }
        .footer {
          background: #111827;
          color: #d1d5db;
          padding: 2rem;
          margin-top: auto;
        }
        .footer h4 {
          color: white;
          margin-bottom: 0.5rem;
        }
        .footer ul {
          list-style: none;
          padding: 0;
        }
        .footer li {
          margin-bottom: 0.3rem;
        }
        .footer a {
          color: #93c5fd;
          text-decoration: none;
        }
        .footer a:hover {
          text-decoration: underline;
        }
      `}</style>
      <header className="header">
        <img src="/images/emblem-of-india.png" alt="India Emblem" className="emblem" />
        <h2 style={{ margin: 0, color: '#4f46e5' }}>Government of India</h2>
        <p>Ministry of Law and Justice</p>
        <img src="/images/justice-scale.png" alt="Justice Symbol" className="justice" />
      </header>
      <nav className="nav">
        <span>{t.welcome}, {userName}</span>
        <div>
          <button className="lang-btn">{t.language}</button>
          <button className="logout-btn">{t.logout}</button>
        </div>
      </nav>
      <div className="hero">
        <img src="/images/legal-india-banner.jpg" alt="Legal Application India" />
      </div>
      <main className="main">
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
              <li>{t.email}: <a href="mailto:support@legalease.in">support@legalease.in</a></li>
              <li>{t.phone}: +91 98765 43210</li>
              <li>{t.hours}: Mon–Fri, 10AM–6PM</li>
              <li>{t.address}: Ministry of Law, New Delhi</li>
            </ul>
          </div>
          <div>
            <h4>{t.about}</h4>
            <p>{t.aboutText}</p>
            <p style={{ fontSize: '0.8rem' }}>{t.copyright()}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
