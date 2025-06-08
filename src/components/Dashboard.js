import React, { useEffect, useState, useRef } from 'react';
import { Mic, MicOff, Download, FileText, AlertCircle } from 'lucide-react';
import jsPDF from 'jspdf';

const translations = {
  en: {
    welcome: 'Welcome',
    logout: 'Logout',
    language: 'Language',
    overview: 'Overview',
    forms: 'Forms',
    complaints: 'Your Complaints',
    bailApplication: 'Bail Application',
    startRecording: 'Start Recording',
    stopRecording: 'Stop Recording',
    downloadPDF: 'Download as PDF',
    fillAllFields: 'Please fill all required fields through voice input',
    processing: 'Processing voice...',
    speakNext: 'Please speak the',
    recordingAudio: 'Recording audio...',
    // Field names for speech prompts
    courtName: 'Court Name',
    accusedName: 'Accused Name',
    policeStation: 'Police Station',
    firNumber: 'FIR Number',
    section: 'Section',
    custodyDate: 'Custody Date',
    accusedFatherName: 'Accused Father Name',
    arrestDate: 'Arrest Date'
  },
};

const Dashboard = () => {
  const [t, setT] = useState(translations.en);
  const [user, setUser] = useState({ name: 'John Doe', role: 'Citizen' });
  const [loading, setLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [activeTab, setActiveTab] = useState('forms');
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  // Audio recording refs
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // Essential bail application fields in order
  const fieldOrder = [
    'courtName',
    'accusedName', 
    'policeStation',
    'firNumber',
    'section',
    'custodyDate',
    'accusedFatherName',
    'arrestDate'
  ];

  const [currentFieldIndex, setCurrentFieldIndex] = useState(0);
  
  // Bail application form state - only essential fields
  const [bailForm, setBailForm] = useState({
    courtName: '',
    accusedName: '',
    policeStation: '',
    firNumber: '',
    section: '',
    custodyDate: '',
    accusedFatherName: '',
    arrestDate: ''
  });

  useEffect(() => {
    const selected = translations[selectedLanguage] || translations['en'];
    setT(selected);
  }, [selectedLanguage]);

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const handleLogout = () => {
    // Simulate logout
    console.log('Logged out');
  };

  // Helper function to get language code
  const getLanguageCode = (language) => {
    const languageCodes = {
      'en': 'en',
      'te': 'te',
      'ta': 'ta',
      'hi': 'hi',
      'bn': 'bn'
    };
    
    return languageCodes[language] || 'en';
  };
  
  // Helper function to get service ID based on language code
  const getServiceId = (languageCode) => {
    const serviceIdMap = {
      'te': 'bhashini/iitm/asr-dravidian--gpu--t4',
      'hi': 'ai4bharat/conformer-hi-gpu--t4',
      'ta': 'bhashini/iitm/asr-dravidian--gpu--t4',
      'en': 'ai4bharat/whisper-medium-en--gpu--t4',
      'bn': 'bhashini/iitm/asr-indoaryan--gpu--t4'
    };
    
    return serviceIdMap[languageCode] || serviceIdMap['en'];
  };

  const sendAudioToServer = (base64Audio) => {
    setIsProcessing(true);
    setError('');
    
    // Get language code based on selectedLanguage
    const languageCode = getLanguageCode(selectedLanguage);
    const serviceId = getServiceId(languageCode);
    
    // Log request details for debugging
    console.log("Sending audio request with:", {
      languageCode,
      serviceId,
      audioLength: base64Audio.length
    });
    
    const requestBody = {
      "pipelineTasks": [
        {
          "taskType": "asr",
          "config": {
            "language": {
              "sourceLanguage": languageCode
            },
            "serviceId": serviceId,
            "audioFormat": "webm",
            "samplingRate": 16000,
            "postprocessors": [
              "itn"
            ]
          }
        }
      ],
      "inputData": {
        "audio": [
          {
            "audioContent": base64Audio
          }
        ]
      }
    };
    
    // Add a timeout to make sure the request doesn't hang indefinitely
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
    
    fetch('https://dhruva-api.bhashini.gov.in/services/inference/pipeline', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'X4I4l0ijv2j_OV2lELJ2NF5QNvJetBgZGA2gUwfhRF-sCHxcGmZHQehi84nfJKdb',
        'Accept': 'application/json'
      },
      body: JSON.stringify(requestBody),
      signal: controller.signal
    })
    .then(response => {
      clearTimeout(timeoutId);
      console.log("API Response Status:", response.status);
      
      if (!response.ok) {
        return response.text().then(text => {
          console.error("API Error Response:", text);
          throw new Error(`Failed to process audio: ${response.status} ${text || ''}`);
        });
      }
      return response.json();
    })
    .then(data => {
      console.log("API Success Response:", data);
      // Extract the text from the response
      let transcribedText = '';
    
      if (data && 
          data.pipelineResponse && 
          Array.isArray(data.pipelineResponse) && 
          data.pipelineResponse[0] && 
          data.pipelineResponse[0].output && 
          Array.isArray(data.pipelineResponse[0].output) && 
          data.pipelineResponse[0].output[0] && 
          data.pipelineResponse[0].output[0].source) {
        
        transcribedText = data.pipelineResponse[0].output[0].source;
      }
      
      // Update the current field with the transcribed text
      const currentField = fieldOrder[currentFieldIndex];
      setBailForm(prev => ({
        ...prev,
        [currentField]: transcribedText || prev[currentField]
      }));
      
      // Move to next field if transcription was successful and not at the end
      if (transcribedText && currentFieldIndex < fieldOrder.length - 1) {
        setCurrentFieldIndex(prev => prev + 1);
      }
    })
    .catch(error => {
      clearTimeout(timeoutId);
      console.error('Error processing audio:', error);
      setError(`Error processing audio: ${error.message}. Please try again or type manually.`);
    })
    .finally(() => {
      setIsProcessing(false);
    });
  };

  // Convert blob to base64
  const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Remove the data URL prefix to get just the base64 string
        const base64String = reader.result.split(',')[1];
        resolve(base64String);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  // Voice recording functions
  const startRecording = async () => {
    try {
      setError('');
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          sampleRate: 16000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true
        } 
      });
      
      // Clear previous chunks
      audioChunksRef.current = [];
      
      // Create MediaRecorder with webm format
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });
      
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = async () => {
        // Stop all tracks to release microphone
        stream.getTracks().forEach(track => track.stop());
        
        // Create blob from recorded chunks
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        
        try {
          // Convert to base64
          const base64Audio = await blobToBase64(audioBlob);
          
          // Send to Bhashini API
          sendAudioToServer(base64Audio);
        } catch (error) {
          console.error('Error converting audio to base64:', error);
          setError('Error processing audio. Please try again.');
          setIsProcessing(false);
        }
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      console.log('Recording started');
      
    } catch (error) {
      console.error('Error starting recording:', error);
      setError('Error accessing microphone. Please check permissions.');
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      console.log('Recording stopped');
    }
  };

  const isFormComplete = () => {
    return fieldOrder.every(field => bailForm[field].trim() !== '');
  };

  const getCurrentFieldName = () => {
    if (currentFieldIndex >= fieldOrder.length) return '';
    return t[fieldOrder[currentFieldIndex]] || fieldOrder[currentFieldIndex];
  };

  const downloadPDF = () => {
    try {
      // Create new jsPDF instance
      const doc = new jsPDF();
      
      // Set font size and style for title
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      
      // Add title
      doc.text("BAIL APPLICATION", 105, 20, { align: "center" });
      
      // Set normal font for content
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      
      // Add court section
      doc.text("IN THE COURT OF " + (bailForm.courtName || "____________________"), 20, 40);
      
      // Add case details section
      doc.text("IN THE MATTER OF", 20, 60);
      doc.text("STATE", 20, 75);
      doc.text("VS", 20, 85);
      doc.text(bailForm.accusedName || "____________________", 20, 95);
      doc.text("S/O " + (bailForm.accusedFatherName || "____________________"), 20, 105);
      
      // Add case information
      doc.text("Police Station: " + (bailForm.policeStation || "____________________"), 20, 125);
      doc.text("FIR NO: " + (bailForm.firNumber || "____________________"), 20, 135);
      doc.text("U/S: " + (bailForm.section || "____________________"), 20, 145);
      doc.text("Accused under police custody since: " + (bailForm.custodyDate || "____________________"), 20, 155);
      
      // Add application header
      doc.setFont("helvetica", "bold");
      doc.text("APPLICATION UNDER SECTION 439 Cr. Pc FOR GRANT OF BAIL", 20, 175);
      doc.text("ON BEHALF OF THE ACCUSED", 20, 185);
      
      // Add respectfully submitted section
      doc.text("MOST RESPECTFULLY SUBMITTED AS UNDER :-", 20, 205);
      
      // Set normal font for paragraphs
      doc.setFont("helvetica", "normal");
      
      // Add paragraphs with text wrapping
      const paragraphs = [
        "1. That the police has falsely implicated the applicant in the present case and have arrested him without any reason on " + (bailForm.arrestDate || "____________________") + ", the applicant is in police custody since then.",
        "2. That the applicant is innocent and has been falsely implicated in the present case.",
        "3. That the applicant is ready to furnish bail bond and surety as may be required by this Hon'ble Court.",
        "4. That the applicant has deep roots in society and is not likely to flee from justice.",
        "5. That the applicant has been in custody since " + (bailForm.custodyDate || "____________________") + " and has suffered enough."
      ];
      
      let yPosition = 220;
      
      paragraphs.forEach((paragraph) => {
        const lines = doc.splitTextToSize(paragraph, 170);
        doc.text(lines, 20, yPosition);
        yPosition += lines.length * 7 + 5;
        
        // Add new page if content exceeds page height
        if (yPosition > 270) {
          doc.addPage();
          yPosition = 20;
        }
      });
      
      // Add prayer section
      const prayerText = "Therefore, it is most respectfully prayed that this Hon'ble Court may be pleased to grant bail to the applicant.";
      const prayerLines = doc.splitTextToSize(prayerText, 170);
      doc.text(prayerLines, 20, yPosition);
      yPosition += prayerLines.length * 7 + 20;
      
      // Add signature section
      doc.text("Yours faithfully,", 20, yPosition);
      doc.text("[Advocate Name]", 20, yPosition + 10);
      doc.text("Advocate for the Applicant", 20, yPosition + 20);
      
      // Add date
      const currentDate = new Date().toLocaleDateString();
      doc.text("Date: " + currentDate, 20, yPosition + 40);
      
      // Save the PDF
      const fileName = `bail_application_${bailForm.accusedName.replace(/\s+/g, '_') || 'application'}.pdf`;
      doc.save(fileName);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      setError('Error generating PDF. Please try again.');
    }
  };

  const resetForm = () => {
    setBailForm({
      courtName: '',
      accusedName: '',
      policeStation: '',
      firNumber: '',
      section: '',
      custodyDate: '',
      accusedFatherName: '',
      arrestDate: ''
    });
    setCurrentFieldIndex(0);
    setError('');
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
            <div style={styles.logoPlaceholder}>🏛️</div>
            <div style={styles.logoPlaceholder}>⚖️</div>
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
        <div style={styles.contentContainer}>
          {/* Voice Recording Section */}
          <div style={styles.voiceSection}>
            <div style={styles.micContainer}>
              <button
                style={isRecording ? { ...styles.micButton, ...styles.micButtonRecording } : styles.micButton}
                onClick={isRecording ? stopRecording : startRecording}
                disabled={isProcessing || isFormComplete()}
              >
                {isRecording ? <MicOff size={32} /> : <Mic size={32} />}
              </button>
              <p style={styles.micStatus}>
                {isProcessing ? t.processing : 
                 isRecording ? t.recordingAudio : 
                 isFormComplete() ? 'All fields completed!' :
                 `${t.speakNext} ${getCurrentFieldName()}`}
              </p>
              
              {/* Error display */}
              {error && (
                <div style={styles.errorContainer}>
                  <AlertCircle size={16} />
                  <p style={styles.errorText}>{error}</p>
                </div>
              )}
              
              {/* Progress indicator */}
              <div style={styles.progressContainer}>
                <div style={styles.progressBar}>
                  <div 
                    style={{
                      ...styles.progressFill,
                      width: `${((currentFieldIndex) / fieldOrder.length) * 100}%`
                    }}
                  />
                </div>
                <p style={styles.progressText}>
                  {currentFieldIndex}/{fieldOrder.length} fields completed
                </p>
              </div>

              {/* Reset button */}
              <button style={styles.resetButton} onClick={resetForm}>
                Reset Form
              </button>
            </div>
          </div>

          {/* Bail Application Document */}
          <div style={styles.bailFormContainer}>
            <div style={styles.bailFormHeader}>
              <FileText size={24} />
              <h2 style={styles.bailFormTitle}>{t.bailApplication}</h2>
            </div>
            
            <div style={styles.bailApplicationDocument}>
              <div style={styles.documentContent}>
                <h3 style={styles.documentTitle}>BAIL APPLICATION</h3>
                
                <div style={styles.courtSection}>
                  <p style={styles.documentText}>
                    IN THE COURT OF <span style={styles.fillableField}>
                      {bailForm.courtName || '____________________'}
                    </span>
                  </p>
                </div>

                <div style={styles.documentSection}>
                  <p style={styles.documentText}>IN THE MATTER OF</p>
                  <br/>
                  <p style={styles.documentText}>STATE</p>
                  <br/>
                  <p style={styles.documentText}>VS</p>
                  <br/>
                  <p style={styles.documentText}>
                    <span style={styles.fillableField}>
                      {bailForm.accusedName || '____________________'}
                    </span>
                  </p>
                  <p style={styles.documentText}>
                    S/O <span style={styles.fillableField}>
                      {bailForm.accusedFatherName || '____________________'}
                    </span>
                  </p>
                </div>

                <div style={styles.documentSection}>
                  <p style={styles.documentText}>
                    Police Station: <span style={styles.fillableField}>
                      {bailForm.policeStation || '____________________'}
                    </span>
                  </p>
                  <p style={styles.documentText}>
                    FIR NO: <span style={styles.fillableField}>
                      {bailForm.firNumber || '____________________'}
                    </span>
                  </p>
                  <p style={styles.documentText}>
                    U/S: <span style={styles.fillableField}>
                      {bailForm.section || '____________________'}
                    </span>
                  </p>
                  <p style={styles.documentText}>
                    Accused under police custody since: <span style={styles.fillableField}>
                      {bailForm.custodyDate || '____________________'}
                    </span>
                  </p>
                </div>

                <div style={styles.documentSection}>
                  <p style={styles.documentText}>
                    <strong>APPLICATION UNDER SECTION 439 Cr. Pc FOR GRANT OF BAIL ON BEHALF OF THE ACCUSED</strong>
                  </p>
                </div>

                <div style={styles.documentSection}>
                  <p style={styles.documentText}>
                    <strong><u>MOST RESPECTFULLY SUBMITTED AS UNDER :-</u></strong>
                  </p>
                  <br/>
                  <p style={styles.documentText}>
                    1. That the police has falsely implicated the applicant in the present case and have arrested him without any reason on <span style={styles.fillableField}>
                      {bailForm.arrestDate || '____________________'}
                    </span>, the applicant is in police custody since then.
                  </p>
                  <br/>
                  <p style={styles.documentText}>
                    2. That the applicant is innocent and has been falsely implicated in the present case.
                  </p>
                  <br/>
                  <p style={styles.documentText}>
                    3. That the applicant is ready to furnish bail bond and surety as may be required by this Hon'ble Court.
                  </p>
                  <br/>
                  <p style={styles.documentText}>
                    4. That the applicant has deep roots in society and is not likely to flee from justice.
                  </p>
                  <br/>
                  <p style={styles.documentText}>
                    5. That the applicant has been in custody since <span style={styles.fillableField}>
                      {bailForm.custodyDate || '____________________'}
                    </span> and has suffered enough.
                  </p>
                  <br/>
                  <p style={styles.documentText}>
                    Therefore, it is most respectfully prayed that this Hon'ble Court may be pleased to grant bail to the applicant.
                  </p>
                  <br/>
                  <p style={styles.documentText}>
                    Yours faithfully,<br/>
                    [Advocate Name]<br/>
                    Advocate for the Applicant
                  </p>
                </div>
              </div>
              
              <div style={styles.downloadSection}>
                <button
                  style={isFormComplete() ? styles.downloadButton : styles.downloadButtonDisabled}
                  onClick={downloadPDF}
                  disabled={!isFormComplete()}
                >
                  <Download size={20} />
                  {t.downloadPDF}
                </button>
                {!isFormComplete() && (
                  <p style={styles.warningText}>{t.fillAllFields}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
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
  logoPlaceholder: {
    fontSize: 32,
    width: 42,
    height: 42,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
    height: 'fit-content',
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
    gap: 4,
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '12px 16px',
    borderRadius: 8,
    backgroundColor: 'transparent',
    color: '#334155',
    fontSize: 14,
    fontWeight: 500,
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    textAlign: 'left',
  },
  activeNavItem: {
    backgroundColor: '#eff6ff',
    color: '#0b5394',
    fontWeight: 600,
  },
  navIcon: {
    fontSize: 18,
  },
  contentContainer: {
    flex: 1,
    display: 'flex',
    gap: 24,
  },
  voiceSection: {
    display: 'flex',
    flexDirection: 'column',
    width: 320,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    height: 'fit-content',
    position: 'sticky',
    top: 100,
  },
  micContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 16,
  },
  micButton: {
    width: 80,
    height: 80,
    borderRadius: '50%',
    border: 'none',
    backgroundColor: '#0b5394',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 6px 20px rgba(11, 83, 148, 0.3)',
  },
  micButtonRecording: {
    backgroundColor: '#dc2626',
    boxShadow: '0 6px 20px rgba(220, 38, 38, 0.4)',
    animation: 'pulse 1.5s infinite',
  },
  micStatus: {
    fontSize: 14,
    fontWeight: 500,
    color: '#475569',
    textAlign: 'center',
    margin: 0,
    lineHeight: 1.4,
  },
  errorContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '12px 16px',
    backgroundColor: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: 8,
    width: '100%',
  },
  errorText: {
    fontSize: 13,
    color: '#dc2626',
    margin: 0,
    fontWeight: 500,
  },
  progressContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#0b5394',
    borderRadius: 4,
    transition: 'width 0.3s ease',
  },
  progressText: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
    margin: 0,
    fontWeight: 500,
  },
  resetButton: {
    padding: '8px 16px',
    backgroundColor: '#f1f5f9',
    color: '#475569',
    border: '1px solid #e2e8f0',
    borderRadius: 6,
    fontSize: 14,
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  bailFormContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    overflow: 'hidden',
  },
  bailFormHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '20px 24px',
    borderBottom: '1px solid #e2e8f0',
    backgroundColor: '#f8fafc',
  },
  bailFormTitle: {
    fontSize: 18,
    fontWeight: 600,
    color: '#1e293b',
    margin: 0,
  },
  bailApplicationDocument: {
    padding: 24,
  },
  documentContent: {
    backgroundColor: '#fefefe',
    border: '1px solid #e2e8f0',
    borderRadius: 8,
    padding: 32,
    marginBottom: 24,
    fontFamily: "'Times New Roman', serif",
    lineHeight: 1.6,
    minHeight: 600,
  },
  documentTitle: {
    fontSize: 20,
    fontWeight: 700,
    textAlign: 'center',
    margin: '0 0 24px 0',
    color: '#1e293b',
    textDecoration: 'underline',
  },
  courtSection: {
    marginBottom: 20,
  },
  documentSection: {
    marginBottom: 20,
  },
  documentText: {
    fontSize: 14,
    color: '#1e293b',
    margin: '8px 0',
    textAlign: 'justify',
  },
  fillableField: {
    backgroundColor: '#fef3c7',
    padding: '2px 4px',
    borderRadius: 3,
    fontWeight: 600,
    color: '#92400e',
    border: '1px solid #fbbf24',
  },
  downloadSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
  },
  downloadButton: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '12px 24px',
    backgroundColor: '#059669',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    fontSize: 16,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 4px 12px rgba(5, 150, 105, 0.3)',
  },
  downloadButtonDisabled: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '12px 24px',
    backgroundColor: '#9ca3af',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    fontSize: 16,
    fontWeight: 600,
    cursor: 'not-allowed',
    opacity: 0.6,
  },
  warningText: {
    fontSize: 14,
    color: '#dc2626',
    textAlign: 'center',
    margin: 0,
    fontWeight: 500,
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    gap: 16,
  },
  spinner: {
    width: 40,
    height: 40,
    border: '4px solid #e2e8f0',
    borderTop: '4px solid #0b5394',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
};
export default Dashboard;