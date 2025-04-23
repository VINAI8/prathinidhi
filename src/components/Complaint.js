import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Translations object
const translations = {
  en: {
    legalAidApplication: "Legal Aid / Grievance",
    stage: "Stage",
    of: "of",
    progress: "Progress",
    progressStatus: "Basic Information",
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
    submitForm: "Submit Form",
    formSubmitted: "Form submitted successfully!",
    
    // Application Type options
    applicationFor: "Nature of Legal Aid / Grievance",
    nalsa: "NALSA",
    sclsc: "SCLSC",
    hclsc: "HCLSC",
    slsa: "SLSA",
    dlsa: "DLSA",
    tlsc: "TLSC",
    
    // Received Through options
    receivedThrough: "Received Through",
    slf: "Self",
    rep: "Representative",
    org: "Organization",
    
    // Around line 36-73 (within the translations.en object)
natureOfApplication: "Nature of Legal Application",
categoryGrievance: "Grievance Redressal & Complaints",
categoryLegalAid: "Legal Aid & Representation",
categoryAdministrative: "Administrative & Policy-Related Matters",

// For grievance category
corruption: "Allegation of corruption/malpractices",
harassment: "Allegation of harassment/misbehaviour",
delay: "Delay in decision/implementation of decision",
civic: "Civic amenities/Quality of service",
compensation: "Compensations/Refunds",
lawOrder: "Law & Order",
socialEvils: "Social Evils",
retirement: "Retirement dues",
requests: "Requests",

// For legal aid category
legalAdvice: "Legal Advice",
legalRedress: "Legal Redress",
panelDefending: "Panel Lawyer for defending court case",
panelFiling: "Panel Lawyer for filing new case",
counselling: "Counselling and Conciliation",
draftApplication: "To Draft an Application/Representation/Notice/Petition/Reply",

// For administrative category
centralGovt: "Central Govt: Miscellaneous",
stateGovt: "State Govt: Miscellaneous",
revenue: "Revenue/Land/Tax",
scheduledCastes: "Scheduled castes/STs/Backward Service matters",

    // Problem Summary
    problemSummary: "Summary of problem for which legal aid / Grievance is sought",
    recordVoice: "Record Voice",
    stopRecording: "Stop Recording",
    submitSummary: "Submit Summary",
    recordingMessage: "Recording... Speak now",
    
    // Religion options
    religion: "Religion",
    hindu: "Hindu",
    muslim: "Muslim",
    christian: "Christian",
    sikh: "Sikh",
    buddhist: "Buddhist",
    jain: "Jain",
    parsi: "Parsi",
    other: "Other",
    
    // Caste options
    caste: "Caste",
    general: "General",
    obc: "OBC",
    sc: "SC",
    st: "ST",
    
    // Occupation options
    occupation: "Occupation",
    government: "Government Employee",
    private: "Private Sector",
    business: "Business",
    agriculture: "Agriculture",
    student: "Student",
    homemaker: "Homemaker",
    retired: "Retired",
    unemployed: "Unemployed",
    
    // Case filed question
    caseFiledQuestion: "Has any case been filed related to this matter?",
    yes: "Yes",
    no: "No",
    caseFileUpload: "Upload Case File",
    
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
    applicationType: '',
    receivedThrough: '',
    natureOfApplication: '',
    problemSummary: '',
    religion: '',
    caste: '',
    occupation: '',
    caseFiledStatus: '',
    caseFile: null
  });
  const [error, setError] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState(langParam);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [showAnimation, setShowAnimation] = useState(false);
  const [progressPercentage, setProgressPercentage] = useState(0);
  
  // Form field visibility states
  const [showApplicationType, setShowApplicationType] = useState(true);
  const [showReceivedThrough, setShowReceivedThrough] = useState(false);
  const [showProblemSummary, setShowProblemSummary] = useState(false);
  const [showReligion, setShowReligion] = useState(false);
  const [showCaste, setShowCaste] = useState(false);
  const [showOccupation, setShowOccupation] = useState(false);
  const [showCaseFiledQuestion, setShowCaseFiledQuestion] = useState(false);
  const [showCaseFileUpload, setShowCaseFileUpload] = useState(false);
  // Add around line 85-100 where other state variables are defined
const [showNatureOfApplication, setShowNatureOfApplication] = useState(false);
const [selectedCategory, setSelectedCategory] = useState('');
  // Audio recording states
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  
  // Get token from location state or localStorage
  const token = location.state?.token || localStorage.getItem('token');

  // Update progress percentage when form fields are completed
  useEffect(() => {
    const fieldCount = 7; // Total number of fields including case filed question
    let completedFields = 0;
    
    if (formData.applicationType) completedFields++;
    if (formData.receivedThrough) completedFields++;
    if (formData.natureOfApplication) completedFields++;
    if (formData.problemSummary) completedFields++;
    if (formData.religion) completedFields++;
    if (formData.caste) completedFields++;
    if (formData.occupation) completedFields++;
    if (formData.caseFiledStatus) completedFields++;
    
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

  useEffect(() => {
    // Check if all required fields are complete
    const isFormComplete = 
      formData.applicationType && 
      formData.receivedThrough && 
      formData.problemSummary && 
      formData.religion && 
      formData.caste && 
      formData.occupation &&
      formData.caseFiledStatus &&
      (formData.caseFiledStatus !== 'yes' || formData.caseFile);
      
    // If form is complete and at 100%, show a celebration animation
    if (isFormComplete && progressPercentage === 100) {
      // You could add confetti or another visual indicator here
      console.log("Form complete!");
    }
  }, [progressPercentage, formData]);

  const handleApplicationTypeSelect = (value) => {
    setFormData({
      ...formData,
      applicationType: value
    });
    // Move to next field
    setShowApplicationType(false);
    setShowReceivedThrough(true);
  };

  const handleReceivedThroughSelect = (value) => {
    setFormData({
      ...formData,
      receivedThrough: value
    });
    // Move to nature of application field instead of problem summary
    setShowReceivedThrough(false);
    setShowNatureOfApplication(true);
  };

  const handleNatureOfApplicationSelect = (value) => {
    setFormData({
      ...formData,
      natureOfApplication: value
    });
    // Move to problem summary field
    setShowNatureOfApplication(false);
    setShowProblemSummary(true);
  };

  const handleProblemSummaryChange = (e) => {
    setFormData({
      ...formData,
      problemSummary: e.target.value
    });
  };
  
  const handleProblemSummarySubmit = () => {
    if (formData.problemSummary.trim().length > 0) {
      setShowProblemSummary(false);
      setShowReligion(true);
    } else {
      setError("Please provide a summary before proceeding");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleReligionSelect = (value) => {
    setFormData({
      ...formData,
      religion: value
    });
    // Move to next field
    setShowReligion(false);
    setShowCaste(true);
  };

  const handleCasteSelect = (value) => {
    setFormData({
      ...formData,
      caste: value
    });
    // Move to next field
    setShowCaste(false);
    setShowOccupation(true);
  };

  const handleOccupationSelect = (value) => {
    setFormData({
      ...formData,
      occupation: value
    });
    // Move to next field - show case filed question
    setShowOccupation(false);
    setShowCaseFiledQuestion(true);
  };
  
  const handleCaseFiledStatus = (value) => {
    setFormData({
      ...formData,
      caseFiledStatus: value
    });
    
    if (value === 'yes') {
      setShowCaseFiledQuestion(false);
      setShowCaseFileUpload(true);
    } else {
      // Complete the form if no case filed
      setShowCaseFiledQuestion(false);
      // Form is now complete, no need to go to stage 2
    }
  };
  const handleCaseFileUpload = (e) => {
    setFormData({
      ...formData,
      caseFile: e.target.files[0]
    });
  };

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate(`/login?lang=${selectedLanguage}`);
  };
  
  // Audio recording functions
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];
      
      mediaRecorderRef.current.addEventListener('dataavailable', (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      });
      
      mediaRecorderRef.current.addEventListener('stop', () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/wav' });
        setAudioBlob(audioBlob);
        sendAudioToServer(audioBlob);
        
        // Stop all tracks of the stream
        stream.getTracks().forEach(track => track.stop());
      });
      
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing microphone:', err);
      setError('Microphone access denied. Please check your browser permissions.');
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };
  
  const sendAudioToServer = (audioBlob) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('audio', audioBlob);
    formData.append('language', selectedLanguage);
    
    fetch('https://prathinidhi-backend-r8dj.onrender.com/tts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to process audio');
      }
      return response.json();
    })
    .then(data => {
      // Update the problem summary with the transcribed text
      setFormData(prevData => ({
        ...prevData,
        problemSummary: data.text || prevData.problemSummary
      }));
    })
    .catch(error => {
      console.error('Error processing audio:', error);
      setError('Error processing audio. Please try again or type manually.');
    })
    .finally(() => {
      setLoading(false);
    });
  };

  const saveDraft = () => {
    setLoading(true);
    
    fetch('https://prathinidhi-backend-r8dj.onrender.com/complaint', {
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
        // Show success message
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
    setLoading(true);
    
    fetch('https://prathinidhi-backend-r8dj.onrender.com/complaint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        ...formData,
        status: 'submitted' // Change status to submitted instead of draft
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to submit form');
        }
        return response.json();
      })
      .then(() => {
        // Show success message
        setError(t.formSubmitted || "Form submitted successfully!");
        // Redirect to dashboard after short delay
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
      padding: '8px 0',  // Reduced padding from 15px to 8px
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
      minHeight: '120px',
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
    },
    // Button styles
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
    // Voice recording and microphone styles
    voiceRecordingSection: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '15px'
    },
    micButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      padding: '10px 20px',
      borderRadius: '20px',
      border: 'none',
      color: 'white',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    },
    micIcon: {
      fontSize: '20px'
    },
    recordingMessage: {
      marginTop: '10px',
      color: '#ef4444',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      gap: '5px'
    },
    submitButton: {
      backgroundColor: '#0b5394',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      padding: '10px 25px',
      fontSize: '16px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    // File upload styles
    fileUploadContainer: {
      border: '2px dashed #d1d5db',
      borderRadius: '4px',
      padding: '20px',
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      backgroundColor: '#f9fafb'
    },
    fileInput: {
      width: '100%'
    },
    // Quick links styles
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
    // Footer styles
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
      paddingTop: "120px" // Increased to account for fixed header and progress bar
    }}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes progressAnimation {
          from { width: 0%; }
          to { width: ${progressPercentage}%; }
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
        @keyframes micAnimation {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        @keyframes recordingPulse {
          0% { background-color: rgba(239, 68, 68, 0.7); }
          50% { background-color: rgba(239, 68, 68, 1); }
          100% { background-color: rgba(239, 68, 68, 0.7); }
        }
        .complaint-form.shake {
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
        .mic-button {
          animation: micAnimation 2s infinite;
        }
        .recording-indicator {
          animation: recordingPulse 1.5s infinite;
        }
        .submit-button {
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}
  @keyframes pulseSelected {
  0% { box-shadow: 0 0 0 0 rgba(11, 83, 148, 0.5); }
  70% { box-shadow: 0 0 0 8px rgba(11, 83, 148, 0); }
  100% { box-shadow: 0 0 0 0 rgba(11, 83, 148, 0); }
}

.option-selected {
  animation: pulseSelected 2s infinite;
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
{/* Progress Bar - Fixed Position */}
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
        className="progress-bar-inner"
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
          
          {/* Application Type Selection */}
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

          {/* Received Through Selection */}
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

{/* Nature of Legal Application Selection */}
{showNatureOfApplication && (
  <div className="form-row slide-up" style={{
    ...styles.formRow,
    opacity: 1,
    transform: 'translateY(0)',
    transition: 'opacity 0.5s ease, transform 0.5s ease',
  }}>
    <div style={{width: '100%', maxWidth: '800px', margin: '0 auto'}}>
      <label style={{...styles.formLabel, marginBottom: '20px', fontSize: '18px', fontWeight: 'bold'}}>
        {t.natureOfApplication} <span style={styles.requiredField}>*</span>
      </label>

      {/* Category Container - Display categories horizontally */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '20px',
        width: '100%',
        overflowX: 'auto',
        paddingBottom: '10px',
      }}>
        {/* Category 1: Grievance Redressal & Complaints */}
        <div style={{
          minWidth: '250px',
          padding: '20px',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          backgroundColor: selectedCategory === 'grievance' ? '#f0f7ff' : 'white',
          boxShadow: selectedCategory === 'grievance' ? '0 4px 12px rgba(11, 83, 148, 0.15)' : 'none',
          transition: 'all 0.3s ease',
        }}>
          <h4 style={{
            textAlign: 'center',
            color: '#0b5394',
            margin: '0 0 20px 0',
            fontWeight: 'bold',
            fontSize: '16px',
            borderBottom: '2px solid #e5e7eb',
            paddingBottom: '10px'
          }}>{t.categoryGrievance}</h4>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: '12px',
            justifyContent: 'center'
          }}>
            {['corruption', 'harassment', 'delay', 'civic', 'compensation', 'lawOrder', 'socialEvils', 'retirement', 'requests'].map(option => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  setSelectedCategory('grievance');
                  handleNatureOfApplicationSelect(option);
                }}
                style={{
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '6px',
                  backgroundColor: formData.natureOfApplication === option ? '#0b5394' : '#f9fafb',
                  color: formData.natureOfApplication === option ? '#fff' : '#333',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textAlign: 'center',
                  fontSize: '14px',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: formData.natureOfApplication === option ? '0 2px 5px rgba(0,0,0,0.2)' : 'none',
                  transform: formData.natureOfApplication === option ? 'translateY(-2px)' : 'none',
                }}
                className={formData.natureOfApplication === option ? 'option-selected' : ''}
              >
                {t[option]}
              </button>
            ))}
          </div>
        </div>

        {/* Category 2: Legal Aid & Representation */}
        <div style={{
          minWidth: '250px',
          padding: '20px',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          backgroundColor: selectedCategory === 'legalAid' ? '#f0f7ff' : 'white',
          boxShadow: selectedCategory === 'legalAid' ? '0 4px 12px rgba(11, 83, 148, 0.15)' : 'none',
          transition: 'all 0.3s ease',
        }}>
          <h4 style={{
            textAlign: 'center',
            color: '#0b5394',
            margin: '0 0 20px 0',
            fontWeight: 'bold',
            fontSize: '16px',
            borderBottom: '2px solid #e5e7eb',
            paddingBottom: '10px'
          }}>{t.categoryLegalAid}</h4>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: '12px',
            justifyContent: 'center'
          }}>
            {['legalAdvice', 'legalRedress', 'panelDefending', 'panelFiling', 'counselling', 'draftApplication'].map(option => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  setSelectedCategory('legalAid');
                  handleNatureOfApplicationSelect(option);
                }}
                style={{
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '6px',
                  backgroundColor: formData.natureOfApplication === option ? '#0b5394' : '#f9fafb',
                  color: formData.natureOfApplication === option ? '#fff' : '#333',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textAlign: 'center',
                  fontSize: '14px',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: formData.natureOfApplication === option ? '0 2px 5px rgba(0,0,0,0.2)' : 'none',
                  transform: formData.natureOfApplication === option ? 'translateY(-2px)' : 'none',
                }}
                className={formData.natureOfApplication === option ? 'option-selected' : ''}
              >
                {t[option]}
              </button>
            ))}
          </div>
        </div>

        {/* Category 3: Administrative & Policy-Related Matters */}
        <div style={{
          minWidth: '250px',
          padding: '20px',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          backgroundColor: selectedCategory === 'administrative' ? '#f0f7ff' : 'white',
          boxShadow: selectedCategory === 'administrative' ? '0 4px 12px rgba(11, 83, 148, 0.15)' : 'none',
          transition: 'all 0.3s ease',
        }}>
          <h4 style={{
            textAlign: 'center',
            color: '#0b5394',
            margin: '0 0 20px 0',
            fontWeight: 'bold',
            fontSize: '16px',
            borderBottom: '2px solid #e5e7eb',
            paddingBottom: '10px'
          }}>{t.categoryAdministrative}</h4>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: '12px',
            justifyContent: 'center'
          }}>
            {['centralGovt', 'stateGovt', 'revenue', 'scheduledCastes'].map(option => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  setSelectedCategory('administrative');
                  handleNatureOfApplicationSelect(option);
                }}
                style={{
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '6px',
                  backgroundColor: formData.natureOfApplication === option ? '#0b5394' : '#f9fafb',
                  color: formData.natureOfApplication === option ? '#fff' : '#333',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textAlign: 'center',
                  fontSize: '14px',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: formData.natureOfApplication === option ? '0 2px 5px rgba(0,0,0,0.2)' : 'none',
                  transform: formData.natureOfApplication === option ? 'translateY(-2px)' : 'none',
                }}
                className={formData.natureOfApplication === option ? 'option-selected' : ''}
              >
                {t[option]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
)}
          {/* Problem Summary */}
          {showProblemSummary && (
            <div className="form-row slide-up" style={{
              ...styles.formRow,
              opacity: 1,
              transform: 'translateY(0)',
              transition: 'opacity 0.5s ease, transform 0.5s ease',
            }}>
              <div style={styles.formColumn}>
                <label style={styles.formLabel}>
                  {t.problemSummary} <span style={styles.requiredField}>*</span>:
                </label>
                <div style={{position: 'relative'}}>
                  <textarea
                    style={styles.formTextarea}
                    value={formData.problemSummary}
                    onChange={handleProblemSummaryChange}
                    placeholder="Text Here..."
                    required
                  />
                  
                  {/* Voice Recording Button */}
                  <div style={styles.voiceRecordingSection}>
                    <button 
                      type="button"
                      onClick={isRecording ? stopRecording : startRecording} 
                      style={{
                        ...styles.micButton,
                        backgroundColor: isRecording ? '#ef4444' : '#0b5394',
                      }}
                      className={isRecording ? 'recording-indicator' : 'mic-button'}
                    >
                      {isRecording ? t.stopRecording : t.recordVoice}
                      <span style={styles.micIcon}>🎤</span>
                    </button>
                    
                    {isRecording && (
                      <div style={styles.recordingMessage}>
                        {t.recordingMessage}
                      </div>
                    )}
                  </div>
                  
                  {/* Submit button for summary */}
                  <div style={{marginTop: '15px', textAlign: 'center'}}>
                    <button
                      type="button"
                      onClick={handleProblemSummarySubmit}
                      style={{
                        ...styles.submitButton,
                        opacity: formData.problemSummary ? 1 : 0.5,
                        cursor: formData.problemSummary ? 'pointer' : 'not-allowed',
                      }}
                      disabled={!formData.problemSummary}
                    >
                      {t.submitSummary}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Religion Selection */}
          {showReligion && (
            <div className="form-row slide-up" style={{
              ...styles.formRow,
              opacity: 1,
              transform: 'translateY(0)',
              transition: 'opacity 0.5s ease, transform 0.5s ease',
            }}>
              <div style={styles.formColumn}>
                <ButtonSelectionGroup
                  options={[
                    { value: 'hindu', label: t.hindu },
                    { value: 'muslim', label: t.muslim },
                    { value: 'christian', label: t.christian },
                    { value: 'sikh', label: t.sikh },
                    { value: 'buddhist', label: t.buddhist },
                    { value: 'jain', label: t.jain },
                    { value: 'parsi', label: t.parsi },
                    { value: 'other', label: t.other }
                  ]}
                  selectedValue={formData.religion}
                  onSelect={handleReligionSelect}
                  title={t.religion}
                  required={true}
                />
              </div>
            </div>
          )}

          {/* Caste Selection */}
          {showCaste && (
            <div className="form-row slide-up" style={{
              ...styles.formRow,
              opacity: 1,
              transform: 'translateY(0)',
              transition: 'opacity 0.5s ease, transform 0.5s ease',
            }}>
              <div style={styles.formColumn}>
                <ButtonSelectionGroup
                  options={[
                    { value: 'general', label: t.general },
                    { value: 'obc', label: t.obc },
                    { value: 'sc', label: t.sc },
                    { value: 'st', label: t.st }
                  ]}
                  selectedValue={formData.caste}
                  onSelect={handleCasteSelect}
                  title={t.caste}
                  required={true}
                />
              </div>
            </div>
          )}

          {/* Occupation Selection */}
          {showOccupation && (
            <div className="form-row slide-up" style={{
              ...styles.formRow,
              opacity: 1,
              transform: 'translateY(0)',
              transition: 'opacity 0.5s ease, transform 0.5s ease',
            }}>
              <div style={styles.formColumn}>
                <ButtonSelectionGroup
                  options={[
                    { value: 'government', label: t.government },
                    { value: 'private', label: t.private },
                    { value: 'business', label: t.business },
                    { value: 'agriculture', label: t.agriculture },
                    { value: 'student', label: t.student },
                    { value: 'homemaker', label: t.homemaker },
                    { value: 'retired', label: t.retired },
                    { value: 'unemployed', label: t.unemployed }
                  ]}
                  selectedValue={formData.occupation}
                  onSelect={handleOccupationSelect}
                  title={t.occupation}
                  required={true}
                />
              </div>
            </div>
          )}
          
          {/* Case Filed Question */}
          {showCaseFiledQuestion && (
            <div className="form-row slide-up" style={{
              ...styles.formRow,
              opacity: 1,
              transform: 'translateY(0)',
              transition: 'opacity 0.5s ease, transform 0.5s ease',
            }}>
              <div style={styles.formColumn}>
                <ButtonSelectionGroup
                  options={[
                    { value: 'yes', label: t.yes },
                    { value: 'no', label: t.no }
                  ]}
                  selectedValue={formData.caseFiledStatus}
                  onSelect={handleCaseFiledStatus}
                  title={t.caseFiledQuestion}
                  required={true}
                />
              </div>
            </div>
          )}
          
          {/* Case File Upload */}
          {showCaseFileUpload && (
            <div className="form-row slide-up" style={{
              ...styles.formRow,
              opacity: 1,
              transform: 'translateY(0)',
              transition: 'opacity 0.5s ease, transform 0.5s ease',
            }}>
              <div style={styles.formColumn}>
                <label style={styles.formLabel}>
                  {t.caseFileUpload} <span style={styles.requiredField}>*</span>:
                </label>
                <div style={styles.fileUploadContainer}>
                  <input
                    type="file"
                    onChange={handleCaseFileUpload}
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    style={styles.fileInput}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Buttons */}
{/* Buttons */}
<div className="form-row form-buttons" style={{
  ...styles.formRow,
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '30px',
  opacity: showAnimation ? 1 : 0,
  transform: showAnimation ? 'translateY(0)' : 'translateY(20px)',
  transition: 'opacity 0.5s ease, transform 0.5s ease',
  transitionDelay: '0.4s'
}}>
  <button 
    type="button" 
    onClick={handleBackToDashboard}
    style={styles.buttonSecondary}
    className="btn-hover"
  >
    {t.backToDashboard}
  </button>
  
  {/* Show Submit button when case filed question is answered */}
  {formData.caseFiledStatus || (formData.caseFiledStatus === 'yes' && formData.caseFile) ? (
    <button 
      type="button" 
      onClick={handleSubmit}
      style={{
        ...styles.buttonPrimary,
        backgroundColor: '#4caf50', // Green color for submit
        padding: '12px 30px',
        fontSize: '16px',
        fontWeight: 'bold'
      }}
      className="btn-hover submit-button"
    >
      {t.submitForm || "Submit Form"}
    </button>
  ) : (
    <button 
      type="button" 
      onClick={saveDraft}
      style={styles.buttonPrimary}
      className="btn-hover"
    >
      {t.saveDraft}
    </button>
  )}
</div>
        </div>

        {/* Quick Links */}
        <div style={styles.quickLinksContainer}>
          <h3 style={styles.quickLinksTitle}>{t.quickLinks}</h3>
          <div style={styles.quickLinks}>
            <a href="#" style={styles.quickLink}>{t.faq}</a>
            <a href="#" style={styles.quickLink}>{t.userGuide}</a>
            <a href="#" style={styles.quickLink}>{t.govPortal}</a>
            <a href="#" style={styles.quickLink}>{t.terms}</a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <div style={styles.footerLeft}>
            <img src="/prathinidhi.png" alt="Emblem" style={styles.footerLogo} />
            <p style={styles.footerText}>
              Prathinidhi - National Legal Form Portal <br />
              © 2025 Government of India
            </p>
          </div>
          <div style={styles.footerRight}>
            <div style={styles.contactInfo}>
              <h4 style={styles.contactTitle}>{t.contact}</h4>
              <p>{t.phone}: 1800-123-4567</p>
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
    <div style={{ marginBottom: '20px' }}>
      <label style={{
        display: 'block',
        marginBottom: '10px',
        fontSize: '16px',
        fontWeight: '500',
        color: '#333',
        textAlign: 'center'
      }}>
        {title} {required && <span style={{ color: 'red' }}>*</span>}:
      </label>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        marginTop: '5px',
        justifyContent: 'center'
      }}>
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onSelect(option.value)}
            style={{
              padding: '10px 20px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              backgroundColor: selectedValue === option.value ? '#0b5394' : '#fff',
              color: selectedValue === option.value ? '#fff' : '#333',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontWeight: selectedValue === option.value ? '600' : '400',
              boxShadow: selectedValue === option.value ? '0 2px 5px rgba(0,0,0,0.2)' : 'none',
              flex: '1 0 auto',
              minWidth: '120px',
              textAlign: 'center'
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