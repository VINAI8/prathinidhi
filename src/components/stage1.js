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
    org: 'ORG - Organization',
    quickLinks: 'Quick Links',
    faqs: 'FAQs'
  }
};

// Button selection component

const Stage1 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const langParam = queryParams.get('lang')?.toLowerCase() || localStorage.getItem('preferredLanguage') || 'en';
  const [t, setT] = useState(translations.en);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    applicationType: '',
    receivedThrough: '', // Remove default value to enforce sequence
    state: '',
    district: '',
    taluka: ''
  });
  const [error, setError] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState(langParam);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [showAnimation, setShowAnimation] = useState(false);
  const [showApplicationType, setShowApplicationType] = useState(true);
  const [showReceivedThrough, setShowReceivedThrough] = useState(false);
  const [nextButtonEnabled, setNextButtonEnabled] = useState(false);

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

  const handleApplicationTypeSelect = (value) => {
    setFormData({
      ...formData,
      applicationType: value,
      receivedThrough: '' // Reset when changing application type
    });
    // Hide application type and show received through
    setShowApplicationType(false);
    setShowReceivedThrough(true);
    setNextButtonEnabled(false); // Disable next until received through is selected
  };

  const handleReceivedThroughSelect = (value) => {
    setFormData({
      ...formData,
      receivedThrough: value
    });
    setNextButtonEnabled(true); // Enable next button after selection
  };

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate(`/login?lang=${selectedLanguage}`);
  };

  const handleNext = () => {
    if (!formData.applicationType || !formData.receivedThrough) {
      setError(t.errorMessage);
      // Shake animation for error
      const formElement = document.querySelector('.stage1-form');
      formElement.classList.add('shake');
      setTimeout(() => {
        formElement.classList.remove('shake');
      }, 500);
      return;
    }

    // Reset error if any
    setError('');
    
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
      marginBottom: '20px',
      textAlign: 'center'
    },
    formRow: {
      display: 'flex',
      flexWrap: 'wrap',
      margin: '0 -10px 20px',
      justifyContent: 'center',
      alignItems: 'center'
    },
    formColumn: {
      flex: '1 1 300px',
      padding: '0 10px',
      maxWidth: '600px'
    },
    formLabel: {
      display: 'block',
      marginBottom: '8px',
      color: '#333',
      fontWeight: '500',
      textAlign: 'center'
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
    },
    buttonGroup: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px',
      marginTop: '10px',
      justifyContent: 'center'
    }
  };

  const ButtonSelectionGroup = ({ options, selectedValue, onSelect, title, required = false }) => {
    return (
      <div style={{ marginBottom: '20px' }}>
        <label style={styles.formLabel}>
          {title} {required && <span style={styles.requiredField}>*</span>}:
        </label>
        <div style={styles.buttonGroup}>
          {options.map(option => (
            <button
              key={option.value}
              type="button"
              className={`selection-button ${selectedValue === option.value ? 'selected' : ''}`}
              onClick={() => onSelect(option.value)}
              style={{
                padding: '10px 15px',
                borderRadius: '25px',
                border: selectedValue === option.value 
                  ? '2px solid #0b5394' 
                  : '1px solid #d1d5db',
                backgroundColor: selectedValue === option.value ? '#e1f0ff' : '#fff',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontWeight: selectedValue === option.value ? 'bold' : 'normal',
                boxShadow: selectedValue === option.value 
                  ? '0 0 8px rgba(11, 83, 148, 0.4)' 
                  : 'none',
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    );
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
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeOut {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(-20px); display: none; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce {
          0% { transform: translateY(0); }
          100% { transform: translateY(-3px); }
        }
        .stage1-form.shake {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
        .form-row {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeIn 0.5s forwards;
        }
        .form-row.fade-out {
          animation: fadeOut 0.5s forwards;
        }
        .form-row.slide-up {
          animation: slideUp 0.5s forwards;
        }
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
        .selection-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        .selection-button.selected {
          animation: pulse 1.5s infinite;
        }
        .next-enabled {
          animation: bounce 1s infinite alternate;
        }
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
          
          {/* Application Type Selection - Disappears after selection */}
          {showApplicationType && (
            <div className={`form-row ${showApplicationType ? 'animation-slide-in' : 'fade-out'}`} style={{
              ...styles.formRow,
              opacity: showAnimation ? 1 : 0,
              transform: showAnimation ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.5s ease, transform 0.5s ease',
              transitionDelay: '0.2s'
            }}>
              <div style={styles.formColumn}>
                <ButtonSelectionGroup
                  options={[
                    { value: 'nalsa', label: t.nalsa },
                    { value: 'sclsc', label: t.sclsc },
                    { value: 'hclsc', label: t.hclsc },
                    { value: 'slsa', label: t.slsa },
                    { value: 'dlsa', label: t.dlsa },
                    { value: 'tlsc', label: t.tlsc }
                  ]}
                  selectedValue={formData.applicationType}
                  onSelect={handleApplicationTypeSelect}
                  title={t.applicationFor}
                  required={true}
                />
              </div>
            </div>
          )}

          {/* Received Through Selection - Only shows after application type is selected */}
          {showReceivedThrough && (
            <div className="form-row slide-up" style={{
              ...styles.formRow,
              opacity: 1,
              transform: 'translateY(0)',
              transition: 'opacity 0.5s ease, transform 0.5s ease',
            }}>
              <div style={styles.formColumn}>
                <ButtonSelectionGroup
                  options={[
                    { value: 'slf', label: t.slf },
                    { value: 'rep', label: t.rep },
                    { value: 'org', label: t.org }
                  ]}
                  selectedValue={formData.receivedThrough}
                  onSelect={handleReceivedThroughSelect}
                  title={t.receivedThrough}
                  required={true}
                />
              </div>
            </div>
          )}

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
              style={{
                ...styles.buttonPrimary,
                opacity: nextButtonEnabled ? 1 : 0.5,
                cursor: nextButtonEnabled ? 'pointer' : 'not-allowed',
              }}
              className={`btn-hover ${nextButtonEnabled ? 'next-enabled' : ''}`}
              disabled={!nextButtonEnabled}
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
              <li><a href="/faqs">{t.faq}</a></li>
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