import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell 
} from 'recharts';
import { Calendar, ChevronDown, Bell, Search, FileText, Upload, Clock, CheckCircle, AlertCircle } from 'lucide-react';
const translations = {
  en: { welcome: 'Welcome',
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
    name : "Name",
    role:"Role",
    address: 'Address',
    about: 'About Platform',
    aboutText: 'This platform is developed under the Digital India initiative to streamline legal application services for all citizens in multiple regional languages.',
    copyright: () => `© ${new Date().getFullYear()} Government of India. All Rights Reserved. 🇮🇳`,
    popupTitle: 'Select Language',
    applicationType: "Application Type",
    receivedThrough: "Received Through",
    problemSummary: "Problem Summary",
    religion: "Religion",
    caste: "Caste",
    occupation: "Occupation",
    timestamp: "Timestamp",

    // 🔽 New labels for dashboard (Charts, Activity, Footer, etc.)
    formStatus: 'Form Status Distribution',
    monthlySubmissions: 'Monthly Submissions',
    recentActivity: 'Recent Activity',
    viewAllActivity: 'View All Activity',
    quickActions: 'Quick Actions',
    checkStatus: 'Check Status',
    notifications: 'Notifications',
    complaints: 'Your Complaints',
    status: 'Status',
    inProgress: 'In Progress',

    // Footer enhancements
    followUs: 'Follow Us',
    termsAndConditions: 'Terms & Conditions',
  
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
    popupTitle: 'மொழியை தேர்ந்தெடுக்கவும்',
    applicationType: "விண்ணப்ப வகை",
receivedThrough: "பெறப்பட்ட வழி",
problemSummary: "பிரச்சனை சுருக்கம்",
religion: "மதம்",
caste: "சாதி",
occupation: "தொழில்",
timestamp: "நேரமுத்திரை",
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
    popupTitle: 'भाषा चुनें',
    applicationType: "आवेदन का प्रकार",
receivedThrough: "प्राप्त माध्यम",
problemSummary: "समस्या का सारांश",
religion: "धर्म",
caste: "जाति",
occupation: "व्यवसाय",
timestamp: "समय टिकट",
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
    popupTitle: 'భాష ఎంచుకోండి',
    applicationType: "దరఖాస్తు రకం",
receivedThrough: "అందిన మార్గం",
problemSummary: "సమస్య సంగ్రహం",
religion: "మతం",
caste: "కులం",
occupation: "వృత్తి",
timestamp: "సమయ ముద్ర",

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
    popupTitle: 'ভাষা নির্বাচন করুন',
    applicationType: "আবেদন প্রকার",
receivedThrough: "প্রাপ্তির মাধ্যম",
problemSummary: "সমস্যার সারাংশ",
religion: "ধর্ম",
caste: "জাতি",
occupation: "পেশা",
timestamp: "টাইমস্ট্যাম্প",
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
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState(3);
  const [showNotifications, setShowNotifications] = useState(false);

  // Mock data for charts
  const formStatusData = [
    { name: 'Drafts', value: 4, color: '#3B82F6' },
    { name: 'Submitted', value: 10, color: '#10B981' },
    { name: 'Rejected', value: 2, color: '#EF4444' },
    { name: 'Under Review', value: 6, color: '#F59E0B' },
  ];

  const monthlySubmissionsData = [
    { month: 'Jan', submissions: 3 },
    { month: 'Feb', submissions: 5 },
    { month: 'Mar', submissions: 2 },
    { month: 'Apr', submissions: 7 },
    { month: 'May', submissions: 4 },
    { month: 'Jun', submissions: 9 }
  ];

  // Mock recent activity data
  const recentActivity = [
    { id: 1, type: 'submission', title: 'Tenant Complaint Form', status: 'submitted', date: '12 May 2025' },
    { id: 2, type: 'upload', title: 'ID Proof Document', status: 'approved', date: '10 May 2025' },
    { id: 3, type: 'form', title: 'Property Dispute', status: 'draft', date: '08 May 2025' },
    { id: 4, type: 'upload', title: 'Income Certificate', status: 'pending', date: '05 May 2025' },
  ];

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

    fetch('https://prathinidhi-backend-b6cg.onrender.com/dashboard', {
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

  const handleNewFormClick = () => {
    const token = localStorage.getItem('token');
    localStorage.setItem('preferredLanguage', selectedLanguage);
    navigate('/Complaint', {
      state: { token },
      search: `?lang=${selectedLanguage}`
    });
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'submitted': return styles.statusSubmitted;
      case 'approved': return styles.statusApproved;
      case 'draft': return styles.statusDraft;
      case 'pending': return styles.statusPending;
      default: return {};
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'submitted':
      case 'approved':
        return <CheckCircle size={16} />;
      case 'draft':
        return <Clock size={16} />;
      case 'pending':
        return <AlertCircle size={16} />;
      default:
        return null;
    }
  };

  if (loading) return (
    <div style={styles.loadingContainer}>
      <div style={styles.spinner}></div>
      <p>Loading dashboard...</p>
    </div>
  );

  return (
    <div style={styles.appContainer}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContainer}>
          <div style={styles.logoSection}>
            <img src="./indian-emblem.png" alt="Indian Emblem" style={styles.logo} />
            <img src="/prathinidhi.png" alt="Prathinidhi Logo" style={styles.logo} />
            <div>
              <h1 style={styles.title}>Prathinidhi</h1>
              <p style={styles.subtitle}>
                राष्ट्रीय बहुभाषी विधिक फॉर्म पोर्टल | National Legal Form Portal
              </p>
            </div>
          </div>
          <div style={styles.rightNav}>
            <div style={styles.searchContainer}>
              <Search size={16} color="#64748b" />
              <input
                type="text"
                placeholder={t.searchPlaceholder || "Search forms..."}
                style={styles.searchInput}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div style={styles.notificationContainer}>
              <button
                style={styles.iconButton}
                onClick={() => setShowNotifications(!showNotifications)}
                aria-label="Notifications"
              >
                <Bell size={20} />
                {notifications > 0 && (
                  <span style={styles.notificationBadge}>{notifications}</span>
                )}
              </button>
              {showNotifications && (
                <div style={styles.notificationDropdown}>
                  <h4 style={styles.notificationHeader}>Notifications</h4>
                  <div style={styles.notificationItem}>
                    <div style={styles.notificationDot}></div>
                    <p>Your form #32145 has been approved</p>
                  </div>
                  <div style={styles.notificationItem}>
                    <div style={styles.notificationDot}></div>
                    <p>Please upload your income proof document</p>
                  </div>
                  <div style={styles.notificationItem}>
                    <div style={styles.notificationDot}></div>
                    <p>Form submission deadline approaching</p>
                  </div>
                  <button style={styles.viewAllButton}>View all notifications</button>
                </div>
              )}
            </div>

            <select
              style={styles.languageSelect}
              value={selectedLanguage}
              onChange={handleLanguageChange}
              aria-label="Select Language"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
              <option value="ta">தமிழ்</option>
              <option value="te">తెలుగు</option>
              <option value="bn">বাংলা</option>
            </select>

            <button style={styles.logoutBtn} onClick={handleLogout} aria-label="Logout">
              {t.logout}
            </button>
          </div>
        </div>
      </header>

      <div style={styles.mainContainer}>
        {/* Sidebar */}
        <aside style={styles.sidebar}>
          <div style={styles.userProfile}>
            <div style={styles.userAvatar}>
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div style={styles.userInfo}>
              <h3 style={styles.userName}>{user?.name || 'User'}</h3>
              <p style={styles.userRole}>{user?.role || 'Guest'}</p>
            </div>
          </div>

          <nav style={styles.sidebarNav}>
            <button
              style={activeTab === 'overview' ? { ...styles.navItem, ...styles.activeNavItem } : styles.navItem}
              onClick={() => setActiveTab('overview')}
            >
              <span style={styles.navIcon}>📊</span>
              {t.overview || 'Overview'}
            </button>
            <button
              style={activeTab === 'forms' ? { ...styles.navItem, ...styles.activeNavItem } : styles.navItem}
              onClick={() => setActiveTab('forms')}
            >
              <span style={styles.navIcon}>📝</span>
              {t.forms || 'Forms'}
            </button>
            <button
              style={activeTab === 'complaints' ? { ...styles.navItem, ...styles.activeNavItem } : styles.navItem}
              onClick={() => setActiveTab('complaints')}
            >
              <span style={styles.navIcon}>📁</span>
              {t.complaints || 'Complaints'}
            </button>
          </nav>
        </aside>

        {/* Content Area */}
        <section style={styles.contentArea}>
          {/* Overview tab */}
          {activeTab === 'overview' && (
            <>
              <div style={styles.statsGrid}>
                <div style={styles.statCard}>
                  <h4>{t.formsSubmitted || 'Forms Submitted'}</h4>
                  <p>{formStatusData.reduce((acc, cur) => acc + cur.value, 0)}</p>
                </div>
                <div style={styles.statCard}>
                  <h4>{t.pendingApprovals || 'Pending Approvals'}</h4>
                  <p>{formStatusData.find((f) => f.name === 'Under Review')?.value || 0}</p>
                </div>
                <div style={styles.statCard}>
                  <h4>{t.rejectedForms || 'Rejected Forms'}</h4>
                  <p>{formStatusData.find((f) => f.name === 'Rejected')?.value || 0}</p>
                </div>
              </div>

              <div style={styles.chartsContainer}>
                <div style={styles.pieChartContainer}>
                  <h4>{t.formStatus || 'Form Status'}</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={formStatusData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label
                      >
                        {formStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div style={styles.barChartContainer}>
                  <h4>{t.monthlySubmissions || 'Monthly Submissions'}</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={monthlySubmissionsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="submissions" fill="#2563EB" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div style={styles.quickActions}>
                <button style={styles.newFormBtn} onClick={handleNewFormClick}>
                  {t.newForm || 'New Form'}
                </button>
                <button style={styles.uploadBtn}>
                  <Upload size={16} />
                  {t.uploadDocuments || 'Upload Documents'}
                </button>
              </div>

              <div style={styles.recentActivity}>
                <h3>{t.recentActivity || 'Recent Activity'}</h3>
                <ul style={styles.activityList}>
                  {recentActivity.map((activity) => (
                    <li key={activity.id} style={styles.activityItem}>
                      <div style={styles.activityIcon}>
                        {activity.type === 'submission' && <FileText size={20} />}
                        {activity.type === 'upload' && <Upload size={20} />}
                        {activity.type === 'form' && <Calendar size={20} />}
                      </div>
                      <div>
                        <h4>{activity.title}</h4>
                        <p>
                          <span style={getStatusClass(activity.status)}>
                            {getStatusIcon(activity.status)} {activity.status}
                          </span>{' '}
                          - {activity.date}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}

          {/* Forms tab */}
          {activeTab === 'forms' && (
            <div>
              <h2>{t.forms || 'Forms'}</h2>
              <p>Form list and details go here.</p>
            </div>
          )}

          {/* Complaints tab */}
          {activeTab === 'complaints' && (
            <div>
              <h2>{t.complaints || 'Complaints'}</h2>
              <p>Complaint details go here.</p>
            </div>
          )}
        </section>
      </div>

      {/* Popup example (if needed) */}
      {isPopupOpen && (
        <div style={styles.popupOverlay} onClick={() => setIsPopupOpen(false)}>
          <div style={styles.popupContent} onClick={(e) => e.stopPropagation()}>
            <h3>Popup Title</h3>
            <p>Popup content...</p>
            <button onClick={() => setIsPopupOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};
// Enhanced styles object
const styles = {
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: '#0b5394',
    color: '#fff',
    padding: '12px 0',
    position: 'sticky',
    top: 0,
    width: '100%',
    zIndex: 1000,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'saturate(180%) blur(12px)',
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
    fontFamily: "'Merriweather', serif",
  },
  headerContainer: {
    maxWidth: 1300,
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoSection: {
    display: 'flex',
    alignItems: 'center',
    gap: 18,
  },
  logo: {
    height: 42,
    objectFit: 'contain',
    filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.15))',
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    margin: 0,
    color: '#fff',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 12,
    margin: '2px 0 0 0',
    color: '#e2e8f0',
    fontWeight: 500,
  },
  rightNav: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 24,
    padding: '6px 16px',
    width: 240,
  },
  searchInput: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#fff',
    marginLeft: 8,
    width: '100%',
    outline: 'none',
    fontSize: 14,
  },
  languageSelect: {
    padding: '8px 12px',
    borderRadius: 6,
    border: 'none',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    color: '#fff',
    fontWeight: 500,
    fontSize: 14,
    cursor: 'pointer',
    outline: 'none',
  },
  logoutBtn: {
    background: 'linear-gradient(45deg, #ffb300, #f29900)',
    color: '#111',
    border: 'none',
    padding: '8px 16px',
    borderRadius: 24,
    fontWeight: 600,
    fontSize: 14,
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(255, 179, 0, 0.4)',
  },
  iconButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    border: 'none',
    borderRadius: '50%',
    width: 36,
    height: 36,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#EF4444',
    color: '#fff',
    borderRadius: '50%',
    width: 18,
    height: 18,
    fontSize: 11,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationContainer: {
    position: 'relative',
  },
  notificationDropdown: {
    position: 'absolute',
    top: 44,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 8,
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    width: 300,
    padding: 12,
    zIndex: 1000,
  },
  notificationHeader: {
    margin: '0 0 12px 0',
    fontSize: 16,
    color: '#1e293b',
  },
  notificationItem: {
    display: 'flex',
    alignItems: 'flex-start',
    padding: '8px 0',
    borderBottom: '1px solid #f1f5f9',
    gap: 10,
  },
  notificationDot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: '#3B82F6',
    marginTop: 6,
  },
  viewAllButton: {
    backgroundColor: '#f8fafc',
    border: 'none',
    borderRadius: 6,
    padding: 8,
    width: '100%',
    marginTop: 8,
    cursor: 'pointer',
    fontSize: 14,
    color: '#64748b',
  },
  mainContainer: {
    display: 'flex',
    flex: 1,
    maxWidth: 1300,
    margin: '0 auto',
    width: '100%',
    padding: 20,
    gap: 24,
  },
  sidebar: {
    width: 250,
    backgroundColor: '#fff',
    borderRadius: 12,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100vh - 140px)',
    position: 'sticky',
    top: 100,
  },
  userProfile: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '12px 0',
    borderBottom: '1px solid #f1f5f9',
    marginBottom: 20,
  },
  userAvatar: {
    width: 48,
    height: 48,
    borderRadius: '50%',
    backgroundColor: '#0b5394',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: 600,
  },
  userInfo: {
    overflow: 'hidden',
  },
  userName: {
    margin: 0,
    fontSize: 16,
    fontWeight: 600,
    color: '#1e293b',
  },
  userRole: {
    margin: '2px 0 0 0',
    fontSize: 12,
    color: '#64748b',
  },
  sidebarNav: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '12px 16px',
    borderRadius: 8,
    margin: '4px 0',
    backgroundColor: 'transparent',
    color: '#334155',
    fontSize: 14,
    fontWeight: 500,
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    textAlign: 'left',
  },
  navItemHover: {
    backgroundColor: '#eff6ff',
    color: '#0b5394',
    fontWeight: 600,
  },
  activeNavItem: {
    backgroundColor: '#eff6ff',
    color: '#0b5394',
    fontWeight: 600,
  },
  navIcon: {
    fontSize: 18,
  },
  sidebarFooter: {
    marginTop: 'auto',
    borderTop: '1px solid #f1f5f9',
    paddingTop: 16,
  },
  sidebarFooterTitle: {
    margin: '0 0 8px 0',
    fontSize: 14,
    fontWeight: 600,
    color: '#334155',
  },
  sidebarFooterText: {
    margin: '4px 0',
    fontSize: 13,
    color: '#64748b',
  },
  sidebarLink: {
    color: '#0b5394',
    textDecoration: 'none',
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
  },
  dashboardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  welcomeMessage: {
    margin: 0,
    fontSize: 24,
    fontWeight: 700,
    color: '#1e293b',
  },
  dashboardSubtitle: {
    margin: '4px 0 0 0',
    fontSize: 14,
    color: '#64748b',
  },
  dateContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontSize: 14,
    color: '#64748b',
    backgroundColor: '#fff',
    padding: '8px 16px',
    borderRadius: 8,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
  },
  quickStats: {
    display: 'flex',
    gap: 24,
    flexWrap: 'wrap',
  },
  statCard: {
    background: 'linear-gradient(135deg, #4f46e5, #2563eb)',
    color: '#fff',
    borderRadius: 12,
    padding: 20,
    flex: '1 1 220px',
    boxShadow: '0 8px 16px rgba(37, 99, 235, 0.3)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  statIcon: {
    fontSize: 36,
    marginBottom: 12,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 700,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: 600,
    opacity: 0.85,
  },
  statsChart: {
    backgroundColor: '#fff',
    borderRadius: 12,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    padding: 20,
  },
  chartTitle: {
    margin: '0 0 12px 0',
    fontSize: 16,
    fontWeight: 700,
    color: '#1e293b',
  },
  recentActivity: {
    backgroundColor: '#fff',
    borderRadius: 12,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    padding: 20,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  recentActivityHeader: {
    margin: '0 0 12px 0',
    fontSize: 18,
    fontWeight: 700,
    color: '#1e293b',
  },
  activityList: {
    overflowY: 'auto',
  },
  activityItem: {
    display: 'flex',
    flexDirection: 'column',
    borderBottom: '1px solid #f1f5f9',
    padding: '12px 0',
    gap: 6,
  },
  activityTitle: {
    margin: 0,
    fontSize: 14,
    fontWeight: 600,
    color: '#0b5394',
  },
  activityDescription: {
    margin: 0,
    fontSize: 13,
    color: '#64748b',
  },
  quickActions: {
    display: 'flex',
    gap: 16,
    flexWrap: 'wrap',
  },
  actionCard: {
    backgroundColor: '#0b5394',
    borderRadius: 12,
    padding: 20,
    flex: '1 1 200px',
    color: '#fff',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    transition: 'background-color 0.3s ease',
  },
  actionCardHover: {
    backgroundColor: '#144e8e',
  },
  actionIcon: {
    fontSize: 28,
  },
  actionLabel: {
    fontSize: 16,
    fontWeight: 600,
  },
  complaintList: {
    backgroundColor: '#fff',
    borderRadius: 12,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    padding: 20,
    marginTop: 24,
  },
  complaintListHeader: {
    margin: '0 0 12px 0',
    fontSize: 18,
    fontWeight: 700,
    color: '#1e293b',
  },
  complaintItem: {
    padding: '12px 0',
    borderBottom: '1px solid #f1f5f9',
  },
  complaintTitle: {
    margin: 0,
    fontSize: 14,
    fontWeight: 600,
    color: '#0b5394',
  },
  complaintStatus: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
  },
};

export default Dashboard;