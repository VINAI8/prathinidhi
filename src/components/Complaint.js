import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Translations object
const translations = {
  en: {
    legalAidApplication: "Court Case Filing",
    stage: "Stage",
    of: "of",
    progress: "Progress",
    progressStatus: "Case Filing Information",
    logout: "Logout",
    backToDashboard: "Back to Dashboard",
    saveDraft: "Save Draft",
    quickLinks: "Quick Links",
    faq: "FAQs",
    userGuide: "User Guide",
    govPortal: "Government Portal",
    terms: "Terms & Conditions",
    contact: "Contact Us",
    phone: "Phone",
    email: "Email",
    submitForm: "Submit Application",
    formSubmitted: "Case filing application submitted successfully!",
    
    // Court Establishment options
    courtEstablishment: "Select Court Establishment",
    districtCourt: "District Court",
    highCourt: "High Court",
    supremeCourt: "Supreme Court",
    familyCourt: "Family Court",
    consumerCourt: "Consumer Court",
    labourCourt: "Labour Court",
    
    // Case Type options
    caseType: "Case Type",
    civil: "Civil Case",
    criminal: "Criminal Case",
    family: "Family Matter",
    property: "Property Dispute",
    consumer: "Consumer Complaint",
    labour: "Labour Dispute",
    constitutional: "Constitutional Matter",
    writ: "Writ Petition",
    
    // Petitioner Type options
    petitionerType: "Filing as",
    self: "Self (Individual)",
    organization: "Organization/Company",
    trust: "Trust/NGO",
    society: "Society/Association",
    
    // Respondent Details
    respondentDetails: "Respondent Details",
    respondentName: "Respondent Name",
    respondentAddress: "Respondent Address",
    respondentContact: "Contact Information (Phone/Email)",
    addRespondent: "Add Another Respondent",
    removeRespondent: "Remove",
    
    // Case Documents
    caseDocuments: "Case Documents",
    uploadDocuments: "Upload Case Documents",
    selectFiles: "Select Files",
    supportedFormats: "Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB per file)",
    
    // Acts and Sections
    actsAndSections: "Applicable Acts and Sections",
    selectActs: "Select Applicable Acts",
    ipc: "Indian Penal Code (IPC)",
    crpc: "Code of Criminal Procedure (CrPC)",
    cpc: "Code of Civil Procedure (CPC)",
    evidenceAct: "Indian Evidence Act",
    contractAct: "Indian Contract Act",
    propertyAct: "Transfer of Property Act",
    consumerAct: "Consumer Protection Act",
    companyAct: "Companies Act",
    arbitrationAct: "Arbitration and Conciliation Act",
    constitutionOfIndia: "Constitution of India",
    
    // Court Fee
    courtFee: "Court Fee Payment",
    calculateFee: "Calculate Court Fee",
    feeAmount: "Fee Amount",
    paymentMode: "Payment Mode",
    online: "Online Payment",
    challan: "Bank Challan",
    exemption: "Fee Exemption (if applicable)",
    
    // Acknowledgement
    acknowledgement: "Acknowledgement",
    declaration: "I hereby declare that the information provided is true and correct to the best of my knowledge.",
    agreeTerms: "I agree to the terms and conditions",
    acceptService: "I accept electronic service of notices and orders",
    
    errorMessage: "Please complete all required fields before proceeding",
    savingDraft: "Saving draft...",
    draftSaved: "Draft saved successfully!"
  },
   // Other languages would be defined here
};

const Complaint = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const langParam = queryParams.get('lang')?.toLowerCase() || localStorage.getItem('preferredLanguage') || 'en';
  const [t, setT] = useState(translations.en);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    courtEstablishment: '',
    caseType: '',
    petitionerType: '',
    respondents: [{ name: '', address: '', contact: '' }],
    caseDocuments: [],
    selectedActs: [],
    courtFee: {
      amount: '',
      paymentMode: '',
      exemption: false
    },
    acknowledgement: {
      declaration: false,
      agreeTerms: false,
      acceptService: false
    }
  });
  const [error, setError] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState(langParam);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [showAnimation, setShowAnimation] = useState(false);
  const [progressPercentage, setProgressPercentage] = useState(0);
  
  // Form field visibility states
  const [showCourtEstablishment, setShowCourtEstablishment] = useState(true);
  const [showCaseType, setShowCaseType] = useState(false);
  const [showPetitionerType, setShowPetitionerType] = useState(false);
  const [showRespondentDetails, setShowRespondentDetails] = useState(false);
  const [showCaseDocuments, setShowCaseDocuments] = useState(false);
  const [showActsAndSections, setShowActsAndSections] = useState(false);
  const [showCourtFee, setShowCourtFee] = useState(false);
  const [showAcknowledgement, setShowAcknowledgement] = useState(false);
  
  // Get token from location state or localStorage
  const token = location.state?.token || localStorage.getItem('token');

  // Update progress percentage when form fields are completed
  useEffect(() => {
    const fieldCount = 8; // Total number of form sections
    let completedFields = 0;
    
    if (formData.courtEstablishment) completedFields++;
    if (formData.caseType) completedFields++;
    if (formData.petitionerType) completedFields++;
    if (formData.respondents[0].name && formData.respondents[0].address) completedFields++;
    if (formData.caseDocuments.length > 0) completedFields++;
    if (formData.selectedActs.length > 0) completedFields++;
    if (formData.courtFee.amount && formData.courtFee.paymentMode) completedFields++;
    if (formData.acknowledgement.declaration && formData.acknowledgement.agreeTerms) completedFields++;
    
    const percentage = (completedFields / fieldCount) * 100;
    setProgressPercentage(percentage);
  }, [formData]);

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

    fetch('https://prathinidhi-gndeeye6bvd4atbh.centralindia-01.azurewebsites.net/dashboard', {
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

  // Field transition handlers
  const handleCourtEstablishmentSelect = (value) => {
    setFormData({ ...formData, courtEstablishment: value });
    setShowCourtEstablishment(false);
    setShowCaseType(true);
  };

  const handleCaseTypeSelect = (value) => {
    setFormData({ ...formData, caseType: value });
    setShowCaseType(false);
    setShowPetitionerType(true);
  };

  const handlePetitionerTypeSelect = (value) => {
    setFormData({ ...formData, petitionerType: value });
    setShowPetitionerType(false);
    setShowRespondentDetails(true);
  };

  const handleRespondentSubmit = () => {
    if (formData.respondents[0].name && formData.respondents[0].address) {
      setShowRespondentDetails(false);
      setShowCaseDocuments(true);
    } else {
      setError("Please provide respondent name and address");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleDocumentsSubmit = () => {
    if (formData.caseDocuments.length > 0) {
      setShowCaseDocuments(false);
      setShowActsAndSections(true);
    } else {
      setError("Please upload at least one case document");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleActsSubmit = () => {
    if (formData.selectedActs.length > 0) {
      setShowActsAndSections(false);
      setShowCourtFee(true);
    } else {
      setError("Please select at least one applicable act");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleCourtFeeSubmit = () => {
    if (formData.courtFee.amount && formData.courtFee.paymentMode) {
      setShowCourtFee(false);
      setShowAcknowledgement(true);
    } else {
      setError("Please complete court fee details");
      setTimeout(() => setError(""), 3000);
    }
  };

  // Respondent management
  const addRespondent = () => {
    setFormData({
      ...formData,
      respondents: [...formData.respondents, { name: '', address: '', contact: '' }]
    });
  };

  const removeRespondent = (index) => {
    const newRespondents = formData.respondents.filter((_, i) => i !== index);
    setFormData({ ...formData, respondents: newRespondents });
  };

  const updateRespondent = (index, field, value) => {
    const newRespondents = [...formData.respondents];
    newRespondents[index][field] = value;
    setFormData({ ...formData, respondents: newRespondents });
  };

  // File upload handler
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData({
      ...formData,
      caseDocuments: [...formData.caseDocuments, ...files]
    });
  };

  // Acts selection handler
  const toggleAct = (act) => {
    const newSelectedActs = formData.selectedActs.includes(act)
      ? formData.selectedActs.filter(a => a !== act)
      : [...formData.selectedActs, act];
    setFormData({ ...formData, selectedActs: newSelectedActs });
  };

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate(`/login?lang=${selectedLanguage}`);
  };

  const saveDraft = () => {
    setLoading(true);
    
    fetch('https://prathinidhi-gndeeye6bvd4atbh.centralindia-01.azurewebsites.net/complaint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        ...formData,
        status: 'draft'
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to save draft');
        }
        return response.json();
      })
      .then(() => {
        setError(t.draftSaved);
        setTimeout(() => setError(""), 3000);
      })
      .catch(error => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSubmit = () => {
    // Validate acknowledgement
    if (!formData.acknowledgement.declaration || !formData.acknowledgement.agreeTerms) {
      setError("Please complete all acknowledgement requirements");
      return;
    }

    setLoading(true);
    
    fetch('https://prathinidhi-gndeeye6bvd4atbh.centralindia-01.azurewebsites.net/complaint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        ...formData,
        status: 'submitted'
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to submit form');
        }
        return response.json();
      })
      .then(() => {
        setError(t.formSubmitted);
        setTimeout(() => {
          navigate(`/dashboard?lang=${selectedLanguage}`);
        }, 1500);
      })
      .catch(error => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleBackToDashboard = () => {
    navigate(`/dashboard?lang=${selectedLanguage}`);
  };

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
      padding: '8px 0',
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
      background: 'linear-gradient(90deg, #0b5394, #4285f4)',
      borderRadius: '6px',
      transition: 'width 1s ease-in-out',
      boxShadow: '0 0 5px rgba(11, 83, 148, 0.5)'
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
    formInput: {
      width: '100%',
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid #d1d5db',
      fontSize: '16px',
      marginBottom: '10px'
    },
    formTextarea: {
      width: '100%',
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid #d1d5db',
      fontSize: '16px',
      minHeight: '80px',
      resize: 'vertical',
      marginBottom: '10px'
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
    buttonSecondary: {
      backgroundColor: '#e2e8f0',
      color: '#333',
      border: 'none',
      borderRadius: '4px',
      padding: '10px 20px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontWeight: '500'
    },
    buttonPrimary: {
      backgroundColor: '#0b5394',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      padding: '10px 20px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontWeight: '500'
    },
    submitButton: {
      backgroundColor: '#4caf50',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      padding: '12px 30px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    fileUploadContainer: {
      border: '2px dashed #d1d5db',
      borderRadius: '4px',
      padding: '20px',
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      backgroundColor: '#f9fafb',
      marginBottom: '10px'
    },
    checkboxContainer: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '10px',
      textAlign: 'left'
    },
    quickLinksContainer: {
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      padding: '20px',
      margin: '20px 0 40px'
    },
    quickLinksTitle: {
      color: '#0b5394',
      borderBottom: '1px solid #e5e7eb',
      paddingBottom: '10px',
      marginBottom: '15px'
    },
    quickLinks: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '15px'
    },
    quickLink: {
      color: '#0b5394',
      textDecoration: 'none',
      padding: '8px 15px',
      borderRadius: '4px',
      backgroundColor: '#f0f4f8',
      transition: 'all 0.3s ease'
    },
    footer: {
      backgroundColor: '#0b5394',
      color: 'white',
      padding: '30px 0',
      marginTop: 'auto'
    },
    footerInner: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px',
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '20px'
    },
    footerLeft: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px'
    },
    footerLogo: {
      height: '40px'
    },
    footerText: {
      margin: 0,
      fontSize: '14px'
    },
    footerRight: {
      display: 'flex',
      flexDirection: 'column'
    },
    contactInfo: {
      fontSize: '14px'
    },
    contactTitle: {
      fontSize: '16px',
      fontWeight: 'bold',
      marginBottom: '10px',
      marginTop: 0
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
      paddingTop: "120px"
    }}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeOut {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(-20px); }
        }
        .form-row {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeIn 0.5s forwards;
        }
        .form-row.slide-up {
          animation: slideUp 0.5s forwards;
        }
        .form-row.fade-out {
          animation: fadeOut 0.5s forwards;
        }
        .submit-button {
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
      `}</style>
      
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContainer}>
          <div style={styles.logoSection}>
            <img src="./indian-emblem.png" alt="Indian Emblem" style={styles.logo}/>
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
            >
              {t.logout}
            </button>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div style={styles.progressContainer}>
        <div style={styles.progressInner}>
          <div style={styles.progressText}>
            <span>{t.progress}</span>
            <span>{t.progressStatus}</span>
          </div>
          <div style={styles.progressBarOuter}>
            <div 
              style={{
                ...styles.progressBarInner,
                width: `${progressPercentage}%`
              }}
            ></div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', width: '100%' }}>
        {/* Main Form */}
        <div 
          className="complaint-form"
          style={{
            ...styles.formContainer,
            opacity: showAnimation ? 1 : 0,
            transform: showAnimation ? 'translateY(0)' : 'translateY(20px)'
          }}
        >
          <h2 style={styles.formTitle}>{t.legalAidApplication}</h2>

          {error && <div style={styles.errorText}>{error}</div>}
          
          {/* Court Establishment Selection */}
          {showCourtEstablishment && (
            <div className="form-row">
              <div style={styles.formColumn}>
                <ButtonSelectionGroup
                  options={[
                    { value: 'districtCourt', label: t.districtCourt },
                    { value: 'highCourt', label: t.highCourt },
                    { value: 'supremeCourt', label: t.supremeCourt },
                    { value: 'familyCourt', label: t.familyCourt },
                    { value: 'consumerCourt', label: t.consumerCourt },
                    { value: 'labourCourt', label: t.labourCourt }
                  ]}
                  selectedValue={formData.courtEstablishment}
                  onSelect={handleCourtEstablishmentSelect}
                  title={t.courtEstablishment}
                  required={true}
                />
              </div>
            </div>
          )}

          {/* Case Type Selection */}
          {showCaseType && (
            <div className="form-row slide-up">
              <div style={styles.formColumn}>
                <ButtonSelectionGroup
                  options={[
                    { value: 'civil', label: t.civil },
                    { value: 'criminal', label: t.criminal },
                    { value: 'family', label: t.family },
                    { value: 'property', label: t.property },
                    { value: 'consumer', label: t.consumer },
                    { value: 'labour', label: t.labour },
                    { value: 'constitutional', label: t.constitutional },
                    { value: 'writ', label: t.writ }
                  ]}
                  selectedValue={formData.caseType}
                  onSelect={handleCaseTypeSelect}
                  title={t.caseType}
                  required={true}
                />
              </div>
            </div>
          )}

          {/* Petitioner Type Selection */}
          {showPetitionerType && (
            <div className="form-row slide-up">
              <div style={styles.formColumn}>
                <ButtonSelectionGroup
                  options={[
                    { value: 'self', label: t.self },
                    { value: 'organization', label: t.organization },
                    { value: 'trust', label: t.trust },
                    { value: 'society', label: t.society }
                  ]}
                  selectedValue={formData.petitionerType}
                  onSelect={handlePetitionerTypeSelect}
                  title={t.petitionerType}
                  required={true}
                />
              </div>
            </div>
          )}

          {/* Respondent Details */}
          {showRespondentDetails && (
            <div className="form-row slide-up">
              <div style={{ width: '100%' }}>
                <h3 style={{ ...styles.formLabel, fontSize: '18px', marginBottom: '20px' }}>
                  {t.respondentDetails} <span style={styles.requiredField}>*</span>
                </h3>
                {formData.respondents.map((respondent, index) => (
                  <div key={index} style={{ 
                    border: '1px solid #e5e7eb', 
                    padding: '20px', 
                    borderRadius: '8px', 
                    marginBottom: '15px',
                    backgroundColor: '#f9fafb'
                  }}>
                    <h4 style={{ marginTop: 0, color: '#0b5394' }}>
                      Respondent {index + 1}
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => removeRespondent(index)}
                          style={{
                            ...styles.buttonSecondary,
                            backgroundColor: '#ef4444',
                            color: 'white',
                            marginLeft: '10px',
                            padding: '5px 10px',
                            fontSize: '12px'
                          }}
                        >
                          {t.removeRespondent}
                        </button>
                      )}
                    </h4>
                    
                    <div style={styles.formRow}>
                      <div style={styles.formColumn}>
                        <label style={styles.formLabel}>
                          {t.respondentName} <span style={styles.requiredField}>*</span>
                        </label>
                        <input
                          type="text"
                          style={styles.formInput}
                          value={respondent.name}
                          onChange={(e) => updateRespondent(index, 'name', e.target.value)}
                          placeholder="Enter respondent name"
                          required
                        />
                      </div>
                    </div>

                    <div style={styles.formRow}>
                      <div style={styles.formColumn}>
                        <label style={styles.formLabel}>
                          {t.respondentAddress} <span style={styles.requiredField}>*</span>
                        </label>
                        <textarea
                          style={styles.formTextarea}
                          value={respondent.address}
                          onChange={(e) => updateRespondent(index, 'address', e.target.value)}
                          placeholder="Enter complete address"
                          required
                        />
                      </div>
                    </div>

                    <div style={styles.formRow}>
                      <div style={styles.formColumn}>
                        <label style={styles.formLabel}>
                          {t.respondentContact}
                        </label>
                        <input
                          type="text"
                          style={styles.formInput}
                          value={respondent.contact}
                          onChange={(e) => updateRespondent(index, 'contact', e.target.value)}
                          placeholder="Phone number or email"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
                  <button
                    type="button"
                    onClick={addRespondent}
                    style={styles.buttonSecondary}
                  >
                    {t.addRespondent}
                  </button>
                  <button
                    type="button"
                    onClick={handleRespondentSubmit}
                    style={styles.buttonPrimary}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Case Documents */}
          {showCaseDocuments && (
            <div className="form-row slide-up">
              <div style={{ width: '100%' }}>
                <h3 style={{ ...styles.formLabel, fontSize: '18px', marginBottom: '20px' }}>
                  {t.caseDocuments} <span style={styles.requiredField}>*</span>
                </h3>
                
                <div style={styles.fileUploadContainer}>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.png"
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
                    <div style={{ fontSize: '48px', marginBottom: '10px' }}>📎</div>
                    <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '5px' }}>
                      {t.selectFiles}
                    </div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      {t.supportedFormats}
                    </div>
                  </label>
                </div>

                {formData.caseDocuments.length > 0 && (
                  <div style={{ marginTop: '15px' }}>
                    <h4>Uploaded Files:</h4>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {formData.caseDocuments.map((file, index) => (
                        <li key={index} style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '8px',
                          backgroundColor: '#f0f4f8',
                          marginBottom: '5px',
                          borderRadius: '4px'
                        }}>
                          <span>{file.name}</span>
                          <button
                            type="button"
                            onClick={() => {
                              const newFiles = formData.caseDocuments.filter((_, i) => i !== index);
                              setFormData({ ...formData, caseDocuments: newFiles });
                            }}
                            style={{
                              backgroundColor: '#ef4444',
                              color: 'white',
                              border: 'none',
                              borderRadius: '4px',
                              padding: '4px 8px',
                              fontSize: '12px',
                              cursor: 'pointer'
                            }}
                          >
                            Remove
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                  <button
                    type="button"
                    onClick={handleDocumentsSubmit}
                    style={styles.buttonPrimary}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Acts and Sections */}
          {showActsAndSections && (
            <div className="form-row slide-up">
              <div style={{ width: '100%' }}>
                <h3 style={{ ...styles.formLabel, fontSize: '18px', marginBottom: '20px' }}>
                  {t.actsAndSections} <span style={styles.requiredField}>*</span>
                </h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '10px' }}>
                  {[
                    { value: 'ipc', label: t.ipc },
                    { value: 'crpc', label: t.crpc },
                    { value: 'cpc', label: t.cpc },
                    { value: 'evidenceAct', label: t.evidenceAct },
                    { value: 'contractAct', label: t.contractAct },
                    { value: 'propertyAct', label: t.propertyAct },
                    { value: 'consumerAct', label: t.consumerAct },
                    { value: 'companyAct', label: t.companyAct },
                    { value: 'arbitrationAct', label: t.arbitrationAct },
                    { value: 'constitutionOfIndia', label: t.constitutionOfIndia }
                  ].map((act) => (
                    <div key={act.value} style={styles.checkboxContainer}>
                      <input
                        type="checkbox"
                        id={act.value}
                        checked={formData.selectedActs.includes(act.value)}
                        onChange={() => toggleAct(act.value)}
                        style={{ marginRight: '8px' }}
                      />
                      <label htmlFor={act.value} style={{ cursor: 'pointer' }}>
                        {act.label}
                      </label>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                  <button
                    type="button"
                    onClick={handleActsSubmit}
                    style={styles.buttonPrimary}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Court Fee */}
          {showCourtFee && (
            <div className="form-row slide-up">
              <div style={{ width: '100%' }}>
                <h3 style={{ ...styles.formLabel, fontSize: '18px', marginBottom: '20px' }}>
                  {t.courtFee} <span style={styles.requiredField}>*</span>
                </h3>
                
                <div style={styles.formRow}>
                  <div style={styles.formColumn}>
                    <label style={styles.formLabel}>
                      {t.feeAmount} <span style={styles.requiredField}>*</span>
                    </label>
                    <input
                      type="number"
                      style={styles.formInput}
                      value={formData.courtFee.amount}
                      onChange={(e) => setFormData({
                        ...formData,
                        courtFee: { ...formData.courtFee, amount: e.target.value }
                      })}
                      placeholder="Enter fee amount in INR"
                      required
                    />
                  </div>
                </div>

                <div style={styles.formRow}>
                  <div style={styles.formColumn}>
                    <label style={styles.formLabel}>
                      {t.paymentMode} <span style={styles.requiredField}>*</span>
                    </label>
                    <select
                      style={styles.formInput}
                      value={formData.courtFee.paymentMode}
                      onChange={(e) => setFormData({
                        ...formData,
                        courtFee: { ...formData.courtFee, paymentMode: e.target.value }
                      })}
                      required
                    >
                      <option value="">Select payment mode</option>
                      <option value="online">{t.online}</option>
                      <option value="challan">{t.challan}</option>
                    </select>
                  </div>
                </div>

                <div style={styles.checkboxContainer}>
                  <input
                    type="checkbox"
                    id="fee-exemption"
                    checked={formData.courtFee.exemption}
                    onChange={(e) => setFormData({
                      ...formData,
                      courtFee: { ...formData.courtFee, exemption: e.target.checked }
                    })}
                    style={{ marginRight: '8px' }}
                  />
                  <label htmlFor="fee-exemption" style={{ cursor: 'pointer' }}>
                    {t.exemption}
                  </label>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                  <button
                    type="button"
                    onClick={handleCourtFeeSubmit}
                    style={styles.buttonPrimary}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Acknowledgement */}
          {showAcknowledgement && (
            <div className="form-row slide-up">
              <div style={{ width: '100%' }}>
                <h3 style={{ ...styles.formLabel, fontSize: '18px', marginBottom: '20px' }}>
                  {t.acknowledgement} <span style={styles.requiredField}>*</span>
                </h3>
                
                <div style={styles.checkboxContainer}>
                  <input
                    type="checkbox"
                    id="declaration"
                    checked={formData.acknowledgement.declaration}
                    onChange={(e) => setFormData({
                      ...formData,
                      acknowledgement: { ...formData.acknowledgement, declaration: e.target.checked }
                    })}
                    style={{ marginRight: '8px' }}
                    required
                  />
                  <label htmlFor="declaration" style={{ cursor: 'pointer' }}>
                    {t.declaration} <span style={styles.requiredField}>*</span>
                  </label>
                </div>

                <div style={styles.checkboxContainer}>
                  <input
                    type="checkbox"
                    id="agree-terms"
                    checked={formData.acknowledgement.agreeTerms}
                    onChange={(e) => setFormData({
                      ...formData,
                      acknowledgement: { ...formData.acknowledgement, agreeTerms: e.target.checked }
                    })}
                    style={{ marginRight: '8px' }}
                    required
                  />
                  <label htmlFor="agree-terms" style={{ cursor: 'pointer' }}>
                    {t.agreeTerms} <span style={styles.requiredField}>*</span>
                  </label>
                </div>

                <div style={styles.checkboxContainer}>
                  <input
                    type="checkbox"
                    id="accept-service"
                    checked={formData.acknowledgement.acceptService}
                    onChange={(e) => setFormData({
                      ...formData,
                      acknowledgement: { ...formData.acknowledgement, acceptService: e.target.checked }
                    })}
                    style={{ marginRight: '8px' }}
                  />
                  <label htmlFor="accept-service" style={{ cursor: 'pointer' }}>
                    {t.acceptService}
                  </label>
                </div>

                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '30px' }}>
                  <button
                    type="button"
                    onClick={saveDraft}
                    style={styles.buttonSecondary}
                    disabled={loading}
                  >
                    {loading ? t.savingDraft : t.saveDraft}
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    style={{
                      ...styles.submitButton,
                      opacity: (formData.acknowledgement.declaration && formData.acknowledgement.agreeTerms) ? 1 : 0.6
                    }}
                    disabled={loading || !formData.acknowledgement.declaration || !formData.acknowledgement.agreeTerms}
                    className="submit-button"
                  >
                    {loading ? 'Submitting...' : t.submitForm}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div style={styles.quickLinksContainer}>
          <h3 style={styles.quickLinksTitle}>{t.quickLinks}</h3>
          <div style={styles.quickLinks}>
            <a href="#" style={styles.quickLink}>{t.faq}</a>
            <a href="#" style={styles.quickLink}>{t.userGuide}</a>
            <a href="#" style={styles.quickLink}>{t.govPortal}</a>
            <a href="#" style={styles.quickLink}>{t.terms}</a>
            <button 
              onClick={handleBackToDashboard}
              style={{...styles.quickLink, border: 'none', cursor: 'pointer'}}
            >
              {t.backToDashboard}
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <div style={styles.footerLeft}>
            <img src="./indian-emblem.png" alt="Indian Emblem" style={styles.footerLogo}/>
            <div>
              <p style={styles.footerText}>
                राष्ट्रीय बहुभाषी विधिक फॉर्म पोर्टल
              </p>
              <p style={styles.footerText}>
                National Legal Form Portal
              </p>
            </div>
          </div>
          <div style={styles.footerRight}>
            <h4 style={styles.contactTitle}>{t.contact}</h4>
            <div style={styles.contactInfo}>
              <p>{t.phone}: +91-11-2338-5055</p>
              <p>{t.email}: support@prathinidhi.gov.in</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Button Selection Group Component
const ButtonSelectionGroup = ({ options, selectedValue, onSelect, title, required }) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ 
        color: '#0b5394', 
        marginBottom: '20px',
        fontSize: '18px'
      }}>
        {title} {required && <span style={{ color: 'red' }}>*</span>}
      </h3>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '10px',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onSelect(option.value)}
            style={{
              padding: '15px 20px',
              border: selectedValue === option.value ? '2px solid #0b5394' : '1px solid #d1d5db',
              borderRadius: '8px',
              backgroundColor: selectedValue === option.value ? '#e3f2fd' : 'white',
              color: selectedValue === option.value ? '#0b5394' : '#333',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontWeight: selectedValue === option.value ? 'bold' : 'normal',
              fontSize: '14px'
            }}
            onMouseOver={(e) => {
              if (selectedValue !== option.value) {
                e.target.style.backgroundColor = '#f5f5f5';
              }
            }}
            onMouseOut={(e) => {
              if (selectedValue !== option.value) {
                e.target.style.backgroundColor = 'white';
              }
            }}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Complaint;
