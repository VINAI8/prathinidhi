
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Calendar, ChevronDown, Bell, Search, FileText, Upload, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const translations = {
  en: {
    welcome: 'Welcome',
    logout: 'Logout',
    language: 'Language',
    searchPlaceholder: 'Search forms...',
    notifications: 'Notifications',
    overview: 'Overview',
    forms: 'Forms',
    complaints: 'Your Complaints',
    newForm: 'File New Legal Form',
    uploadDocuments: 'Upload Documents',
    formsSubmitted: 'Forms Submitted',
    pendingApprovals: 'Pending Approvals',
    rejectedForms: 'Rejected Forms',
    startNewApplication: 'Start a new legal application',
    uploadSupportingDocs: 'Upload supporting documents',
    recentActivity: 'Recent Activity',
    loadingDashboard: 'Loading dashboard...',
    formListDetails: 'Form list and details go here.',
    complaintDetails: 'Complaint details go here.',
    viewAllNotifications: 'View all notifications',
    formApproved: 'Your form #32145 has been approved',
    uploadIncomeProof: 'Please upload your income proof document',
    submissionDeadline: 'Form submission deadline approaching',
    close: 'Close',
    // Activity statuses
    submitted: 'Submitted',
    approved: 'Approved',
    draft: 'Draft',
    pending: 'Pending'
  },
  te: {
    welcome: 'స్వాగతం',
    logout: 'లాగౌట్',
    language: 'భాష',
    searchPlaceholder: 'ఫారాలను వెతకండి...',
    notifications: 'ప్రకటనలు',
    overview: 'అవలోకనం',
    forms: 'ఫారాలు',
    complaints: 'మీ ఫిర్యాదులు',
    newForm: 'కొత్త న్యాయ ఫారం దాఖలు చేయండి',
    uploadDocuments: 'పత్రాలను అప్‌లోడ్ చేయండి',
    formsSubmitted: 'దాఖలు చేసిన ఫారాలు',
    pendingApprovals: 'పెండింగ్ ఆమోదాలు',
    rejectedForms: 'తిరస్కరించిన ఫారాలు',
    startNewApplication: 'కొత్త న్యాయ దరఖాస్తును ప్రారంభించండి',
    uploadSupportingDocs: 'మద్దతు పత్రాలను అప్‌లోడ్ చేయండి',
    recentActivity: 'ఇటీవలి చర్య',
    loadingDashboard: 'డ్యాష్‌బోర్డ్ లోడ్ అవుతోంది...',
    formListDetails: 'ఫారం జాబితా మరియు వివరాలు ఇక్కడ ఉంటాయి.',
    complaintDetails: 'ఫిర్యాదు వివరాలు ఇక్కడ ఉంటాయి.',
    viewAllNotifications: 'అన్ని ప్రకటనలను చూడండి',
    formApproved: 'మీ ఫారం #32145 ఆమోదించబడింది',
    uploadIncomeProof: 'దయచేసి మీ ఆదాయ రుజువు పత్రాన్ని అప్‌లోడ్ చేయండి',
    submissionDeadline: 'ఫారం సమర్పణ గడువు దగ్గర పడుతోంది',
    close: 'మూసివేయండి',
    // Activity statuses
    submitted: 'సమర్పించబడింది',
    approved: 'ఆమోదించబడింది',
    draft: 'మసాలా',
    pending: 'పెండింగ్‌లో ఉంది'
  },
hi : {
  welcome: 'स्वागत है',
logout: 'लॉगआउट',
language: 'भाषा',
searchPlaceholder: 'फॉर्म खोजें...',
notifications: 'सूचनाएं',
overview: 'अवलोकन',
forms: 'फॉर्म्स',
complaints: 'आपकी शिकायतें',
newForm: 'नया कानूनी फॉर्म दाखिल करें',
uploadDocuments: 'दस्तावेज़ अपलोड करें',
formsSubmitted: 'सबमिट किए गए फॉर्म्स',
pendingApprovals: 'लंबित अनुमोदन',
rejectedForms: 'अस्वीकृत फॉर्म्स',
startNewApplication: 'नया कानूनी आवेदन शुरू करें',
uploadSupportingDocs: 'सहायक दस्तावेज़ अपलोड करें',
recentActivity: 'हाल की गतिविधि',
loadingDashboard: 'डैशबोर्ड लोड हो रहा है...',
formListDetails: 'फॉर्म सूची और विवरण यहाँ हैं।',
complaintDetails: 'शिकायत विवरण यहाँ हैं।',
viewAllNotifications: 'सभी सूचनाएं देखें',
formApproved: 'आपका फॉर्म #32145 स्वीकृत हो गया है',
uploadIncomeProof: 'कृपया अपनी आय प्रमाण पत्र अपलोड करें',
submissionDeadline: 'फॉर्म सबमिट करने की अंतिम तिथि निकट है',
close: 'बंद करें',
submitted: 'सबमिट किया गया',
approved: 'स्वीकृत',
draft: 'ड्राफ्ट',
pending: 'लंबित'

},
ta : {
  welcome: 'வரவேற்பு',
logout: 'வெளியேறு',
language: 'மொழி',
searchPlaceholder: 'படிவங்களைத் தேடு...',
notifications: 'அறிவிப்புகள்',
overview: 'மேலோட்டம்',
forms: 'படிவங்கள்',
complaints: 'உங்கள் புகார்கள்',
newForm: 'புதிய சட்டப் படிவத்தை தாக்கல் செய்க',
uploadDocuments: 'ஆவணங்களை பதிவேற்றவும்',
formsSubmitted: 'தாக்கல் செய்யப்பட்ட படிவங்கள்',
pendingApprovals: 'நிலுவையில் உள்ள ஒப்புதல்கள்',
rejectedForms: 'நிராகரிக்கப்பட்ட படிவங்கள்',
startNewApplication: 'புதிய சட்ட விண்ணப்பத்தை தொடங்குங்கள்',
uploadSupportingDocs: 'ஆதரவு ஆவணங்களை பதிவேற்றவும்',
recentActivity: 'சமீபத்திய செயல்பாடு',
loadingDashboard: 'டாஷ்போர்டு ஏற்றப்படுகிறது...',
formListDetails: 'படிவ பட்டியல் மற்றும் விவரங்கள் இங்கே',
complaintDetails: 'புகார் விவரங்கள் இங்கே',
viewAllNotifications: 'அனைத்து அறிவிப்புகளையும் பார்க்கவும்',
formApproved: 'உங்கள் படிவம் #32145 ஒப்புதலாகியுள்ளது',
uploadIncomeProof: 'தயவுசெய்து உங்கள் வருமான ஆதார ஆவணத்தை பதிவேற்றவும்',
submissionDeadline: 'படிவத்தை சமர்ப்பிக்கும் கடைசி நாள் நெருங்குகிறது',
close: 'மூடு',
submitted: 'தாக்கல் செய்யப்பட்டது',
approved: 'ஒப்புதல் வழங்கப்பட்டது',
draft: 'வரைவு',
pending: 'நிலுவையில் உள்ளது'

},
bn : {
  welcome: 'স্বাগতম',
logout: 'লগআউট',
language: 'ভাষা',
searchPlaceholder: 'ফর্ম অনুসন্ধান করুন...',
notifications: 'বিজ্ঞপ্তি',
overview: 'সংক্ষিপ্ত বিবরণ',
forms: 'ফর্মসমূহ',
complaints: 'আপনার অভিযোগ',
newForm: 'নতুন আইনি ফর্ম দাখিল করুন',
uploadDocuments: 'নথিপত্র আপলোড করুন',
formsSubmitted: 'দাখিল করা ফর্মসমূহ',
pendingApprovals: 'অনিষ্পন্ন অনুমোদনসমূহ',
rejectedForms: 'প্রত্যাখ্যাত ফর্মসমূহ',
startNewApplication: 'নতুন আইনি আবেদন শুরু করুন',
uploadSupportingDocs: 'সহায়ক নথিপত্র আপলোড করুন',
recentActivity: 'সাম্প্রতিক কার্যকলাপ',
loadingDashboard: 'ড্যাশবোর্ড লোড হচ্ছে...',
formListDetails: 'ফর্ম তালিকা এবং বিবরণ এখানে।',
complaintDetails: 'অভিযোগের বিবরণ এখানে।',
viewAllNotifications: 'সব বিজ্ঞপ্তি দেখুন',
formApproved: 'আপনার ফর্ম #32145 অনুমোদিত হয়েছে',
uploadIncomeProof: 'অনুগ্রহ করে আপনার আয়ের প্রমাণপত্র আপলোড করুন',
submissionDeadline: 'ফর্ম জমা দেওয়ার শেষ তারিখ ঘনিয়ে আসছে',
close: 'বন্ধ করুন',
submitted: 'দাখিল হয়েছে',
approved: 'অনুমোদিত',
draft: 'খসড়া',
pending: 'অনিষ্পন্ন'

}
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

    fetch('https://api-1-ij19.onrender.com/dashboard', {
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
      <p>{t.loadingDashboard}</p>
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
                placeholder={t.searchPlaceholder}
                style={styles.searchInput}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div style={styles.notificationContainer}>
              <button
                style={styles.iconButton}
                onClick={() => setShowNotifications(!showNotifications)}
                aria-label={t.notifications}
              >
                <Bell size={20} />
                {notifications > 0 && (
                  <span style={styles.notificationBadge}>{notifications}</span>
                )}
              </button>
              {showNotifications && (
                <div style={styles.notificationDropdown}>
                  <h4 style={styles.notificationHeader}>{t.notifications}</h4>
                  <div style={styles.notificationItem}>
                    <div style={styles.notificationDot}></div>
                    <p>{t.formApproved}</p>
                  </div>
                  <div style={styles.notificationItem}>
                    <div style={styles.notificationDot}></div>
                    <p>{t.uploadIncomeProof}</p>
                  </div>
                  <div style={styles.notificationItem}>
                    <div style={styles.notificationDot}></div>
                    <p>{t.submissionDeadline}</p>
                  </div>
                  <button style={styles.viewAllButton}>{t.viewAllNotifications}</button>
                </div>
              )}
            </div>

            <select
              style={styles.languageSelect}
              value={selectedLanguage}
              onChange={handleLanguageChange}
              aria-label={t.language}
            >
              <option value="en">English</option>
              <option value="te">తెలుగు</option>
              <option value="ta">தமிழ்</option>
              <option value="hi">हिंदी</option>
              <option value="bn">বাংলা</option>
            </select>

            <button style={styles.logoutBtn} onClick={handleLogout} aria-label={t.logout}>
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
              {t.overview}
            </button>
            <button
              style={activeTab === 'forms' ? { ...styles.navItem, ...styles.activeNavItem } : styles.navItem}
              onClick={() => setActiveTab('forms')}
            >
              <span style={styles.navIcon}>📝</span>
              {t.forms}
            </button>
            <button
              style={activeTab === 'complaints' ? { ...styles.navItem, ...styles.activeNavItem } : styles.navItem}
              onClick={() => setActiveTab('complaints')}
            >
              <span style={styles.navIcon}>📁</span>
              {t.complaints}
            </button>
          </nav>
        </aside>

        {/* Content Area */}
        <section style={styles.contentArea}>
          {/* Overview tab */}
          {activeTab === 'overview' && (
            <>
              <div style={styles.horizontalStatsContainer}>
                <div style={styles.horizontalStatCard}>
                  <div style={styles.statIcon}>📊</div>
                  <div style={styles.statContent}>
                    <h3 style={styles.statNumber}>{formStatusData.reduce((acc, cur) => acc + cur.value, 0)}</h3>
                    <p style={styles.statLabel}>{t.formsSubmitted}</p>
                  </div>
                </div>
                <div style={styles.horizontalStatCard}>
                  <div style={styles.statIcon}>⏳</div>
                  <div style={styles.statContent}>
                    <h3 style={styles.statNumber}>{formStatusData.find((f) => f.name === 'Under Review')?.value || 0}</h3>
                    <p style={styles.statLabel}>{t.pendingApprovals}</p>
                  </div>
                </div>
                <div style={styles.horizontalStatCard}>
                  <div style={styles.statIcon}>❌</div>
                  <div style={styles.statContent}>
                    <h3 style={styles.statNumber}>{formStatusData.find((f) => f.name === 'Rejected')?.value || 0}</h3>
                    <p style={styles.statLabel}>{t.rejectedForms}</p>
                  </div>
                </div>
              </div>

              <div style={styles.enhancedQuickActions}>
                <button style={styles.enhancedNewFormBtn} onClick={handleNewFormClick}>
                  <div style={styles.buttonIcon}>📄</div>
                  <div style={styles.buttonContent}>
                    <h4 style={styles.buttonTitle}>{t.newForm}</h4>
                    <p style={styles.buttonSubtitle}>{t.startNewApplication}</p>
                  </div>
                  <div style={styles.buttonArrow}>→</div>
                </button>
                
                <button style={styles.enhancedUploadBtn}>
                  <div style={styles.buttonIcon}>📤</div>
                  <div style={styles.buttonContent}>
                    <h4 style={styles.buttonTitle}>{t.uploadDocuments}</h4>
                    <p style={styles.buttonSubtitle}>{t.uploadSupportingDocs}</p>
                  </div>
                  <div style={styles.buttonArrow}>→</div>
                </button>
              </div>

              <div style={styles.recentActivity}>
                <h3>{t.recentActivity}</h3>
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
                            {getStatusIcon(activity.status)} {t[activity.status]}
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
              <h2>{t.forms}</h2>
              <p>{t.formListDetails}</p>
            </div>
          )}

          {/* Complaints tab */}
          {activeTab === 'complaints' && (
            <div>
              <h2>{t.complaints}</h2>
              <p>{t.complaintDetails}</p>
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
            <button onClick={() => setIsPopupOpen(false)}>{t.close}</button>
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
  // Add these to your existing styles object
horizontalStatsContainer: {
  display: 'flex',
  gap: 24,
  marginBottom: 32,
  flexWrap: 'wrap',
},

horizontalStatCard: {
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  borderRadius: 16,
  padding: 24,
  flex: '1 1 280px',
  display: 'flex',
  alignItems: 'center',
  gap: 16,
  boxShadow: '0 8px 25px rgba(102, 126, 234, 0.25)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  cursor: 'pointer',
  border: 'none',
  color: '#fff',
},

statIcon: {
  fontSize: 36,
  opacity: 0.9,
},

statContent: {
  flex: 1,
},

statNumber: {
  fontSize: 32,
  fontWeight: 700,
  margin: '0 0 4px 0',
  color: '#fff',
},

statLabel: {
  fontSize: 14,
  fontWeight: 500,
  margin: 0,
  color: 'rgba(255, 255, 255, 0.85)',
},

enhancedQuickActions: {
  display: 'flex',
  gap: 20,
  marginBottom: 32,
  flexWrap: 'wrap',
},

enhancedNewFormBtn: {
  background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
  border: 'none',
  borderRadius: 16,
  padding: 24,
  flex: '1 1 300px',
  display: 'flex',
  alignItems: 'center',
  gap: 16,
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  boxShadow: '0 8px 25px rgba(79, 70, 229, 0.3)',
  color: '#fff',
  textAlign: 'left',
},

enhancedUploadBtn: {
  background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
  border: 'none',
  borderRadius: 16,
  padding: 24,
  flex: '1 1 300px',
  display: 'flex',
  alignItems: 'center',
  gap: 16,
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  boxShadow: '0 8px 25px rgba(5, 150, 105, 0.3)',
  color: '#fff',
  textAlign: 'left',
},

buttonIcon: {
  fontSize: 32,
  opacity: 0.9,
},

buttonContent: {
  flex: 1,
},

buttonTitle: {
  fontSize: 16,
  fontWeight: 600,
  margin: '0 0 4px 0',
  color: '#fff',
},

buttonSubtitle: {
  fontSize: 12,
  margin: 0,
  color: 'rgba(255, 255, 255, 0.8)',
},

buttonArrow: {
  fontSize: 20,
  fontWeight: 600,
  opacity: 0.7,
  transition: 'transform 0.3s ease',
},
};

export default Dashboard;