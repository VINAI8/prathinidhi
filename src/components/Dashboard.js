import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mic, MicOff, Download, FileText, AlertCircle, Volume2 } from 'lucide-react';
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
    playingInstruction: 'Playing instruction...',
    listeningFor: 'Listening for',
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
  te: {
  welcome: 'స్వాగతం',
  logout: 'లాగ్ అవుట్',
  language: 'భాష',
  overview: 'అవలోకనం',
  forms: 'ఫారాలు',
  complaints: 'మీ ఫిర్యాదులు',
  bailApplication: 'జామీన్ దరఖాస్తు',
  startRecording: 'రికార్డింగ్ ప్రారంభించండి',
  stopRecording: 'రికార్డింగ్ ఆపండి',
  downloadPDF: 'PDF రూపంలో డౌన్‌లోడ్ చేయండి',
  fillAllFields: 'దయచేసి అవసరమైన అన్ని ఫీల్డ్స్‌ను వాయిస్ ఇన్‌పుట్ ద్వారా నింపండి',
  processing: 'వాయిస్ ప్రాసెసింగ్ జరుగుతోంది...',
  speakNext: 'దయచేసి చెప్పండి',
  recordingAudio: 'ఆడియో రికార్డవుతోంది...',
  playingInstruction: 'సూచనల్ని ప్లే చేస్తున్నాము...',
  listeningFor: 'కోసం వింటోంది',
  // Field names for speech prompts
  courtName: 'కోర్టు పేరు',
  accusedName: 'ఆరోపితుని పేరు',
  policeStation: 'పోలీస్టేషన్ పేరు',
  firNumber: 'FIR నంబర్',
  section: 'శాఖ',
  custodyDate: 'కస్టడీ తేదీ',
  accusedFatherName: 'ఆరోపితుని తండ్రి పేరు',
  arrestDate: 'అరెస్ట్ అయిన తేదీ'
},
hi: {
  welcome: 'स्वागत है',
  logout: 'लॉगआउट',
  language: 'भाषा',
  overview: 'सारांश',
  forms: 'फॉर्म्स',
  complaints: 'आपकी शिकायतें',
  bailApplication: 'जमानत आवेदन',
  startRecording: 'रिकॉर्डिंग शुरू करें',
  stopRecording: 'रिकॉर्डिंग बंद करें',
  downloadPDF: 'PDF डाउनलोड करें',
  fillAllFields: 'कृपया सभी आवश्यक फ़ील्ड्स को वॉयस इनपुट से भरें',
  processing: 'वॉयस प्रोसेसिंग हो रही है...',
  speakNext: 'कृपया बोलें',
  recordingAudio: 'ऑडियो रिकॉर्ड हो रहा है...',
  playingInstruction: 'निर्देश चलाए जा रहे हैं...',
  listeningFor: 'सुन रहा है',
  // Field names for speech prompts
  courtName: 'कोर्ट का नाम',
  accusedName: 'आरोपी का नाम',
  policeStation: 'थाने का नाम',
  firNumber: 'FIR नंबर',
  section: 'धारा',
  custodyDate: 'हिरासत की तारीख',
  accusedFatherName: 'आरोपी के पिता का नाम',
  arrestDate: 'गिरफ्तारी की तारीख'
},
ta: {
  welcome: 'வரவேற்கிறோம்',
  logout: 'வெளியேறு',
  language: 'மொழி',
  overview: 'மேலோட்டம்',
  forms: 'படிவங்கள்',
  complaints: 'உங்கள் புகார்கள்',
  bailApplication: 'ஜாமீன் விண்ணப்பம்',
  startRecording: 'பதிவை தொடங்கு',
  stopRecording: 'பதிவை நிறுத்து',
  downloadPDF: 'PDF ஐ பதிவிறக்கவும்',
  fillAllFields: 'தயவுசெய்து அனைத்து தேவையான புலங்களையும் குரல் உள்ளீட்டின் மூலம் பூர்த்தி செய்யவும்',
  processing: 'குரல் செயலாக்கம் நடைபெறுகிறது...',
  speakNext: 'தயவுசெய்து பேசவும்',
  recordingAudio: 'ஒலி பதிவு செய்யப்படுகிறது...',
  playingInstruction: 'வழிமுறைகள் இயக்கப்படுகின்றன...',
  listeningFor: 'கேட்கப்படுகிறது',
  // Field names for speech prompts
  courtName: 'நீதிமன்ற பெயர்',
  accusedName: 'ஆரோபிக்கப்பட்டவர் பெயர்',
  policeStation: 'போலீஸ் நிலையம்',
  firNumber: 'FIR எண்',
  section: 'பிரிவு',
  custodyDate: 'காவலில் எடுக்கப்பட்ட தேதி',
  accusedFatherName: 'ஆரோபிக்கப்படுபவரின் தந்தை பெயர்',
  arrestDate: 'அரஸ்ட் தேதி'
},
bn: {
  welcome: 'স্বাগত',
  logout: 'লগআউট',
  language: 'ভাষা',
  overview: 'সংক্ষিপ্ত বিবরণ',
  forms: 'ফর্মসমূহ',
  complaints: 'আপনার অভিযোগ',
  bailApplication: 'জামিন আবেদন',
  startRecording: 'রেকর্ডিং শুরু করুন',
  stopRecording: 'রেকর্ডিং বন্ধ করুন',
  downloadPDF: 'PDF হিসাবে ডাউনলোড করুন',
  fillAllFields: 'অনুগ্রহ করে সমস্ত প্রয়োজনীয় ঘরগুলো ভয়েস ইনপুট দিয়ে পূরণ করুন',
  processing: 'ভয়েস প্রক্রিয়াকরণ চলছে...',
  speakNext: 'অনুগ্রহ করে বলুন',
  recordingAudio: 'অডিও রেকর্ড করা হচ্ছে...',
  playingInstruction: 'নির্দেশাবলী চালানো হচ্ছে...',
  listeningFor: 'শোনা হচ্ছে',
  // Field names for speech prompts
  courtName: 'আদালতের নাম',
  accusedName: 'আসামির নাম',
  policeStation: 'থানার নাম',
  firNumber: 'FIR নম্বর',
  section: 'ধারা',
  custodyDate: 'হেফাজতে নেওয়ার তারিখ',
  accusedFatherName: 'আসামির পিতার নাম',
  arrestDate: 'গ্রেপ্তারের তারিখ'
}



};

// Audio instruction texts for each field
const audioInstructions = {
  courtName: {
    en: "Please speak court name",
    hi: "कृपया अदालत का नाम बोलें",
    te: "దయచేసి కోర్టు పేరు చెప్పండి",
    ta: "தயவுசெய்து நீதிமன்றத்தின் பெயரை கூறுங்கள்",
    bn: "অনুগ্রহ করে আদালতের নাম বলুন"
  },
  accusedName: {
    en: "Please speak accused name",
    hi: "कृपया आरोपी का नाम बोलें",
    te: "దయచేసి నిందితుని పేరు చెప్పండి",
    ta: "தயவுசெய்து குற்றம்சாட்டப்பட்டவரின் பெயரை கூறுங்கள்",
    bn: "অনুগ্রহ করে অভিযুক্তের নাম বলুন"
  },
  policeStation: {
    en: "Please speak police station",
    hi: "कृपया पुलिस स्टेशन का नाम बोलें",
    te: "దయచేసి పోలీస్ స్టేషన్ పేరు చెప్పండి",
    ta: "தயவுசெய்து காவல் நிலையத்தின் பெயரை கூறுங்கள்",
    bn: "অনুগ্রহ করে থানার নাম বলুন"
  },
  firNumber: {
    en: "Please speak FIR number",
    hi: "कृपया एफआईआर नंबर बोलें",
    te: "దయచేసి ఎఫ్ఐఆర్ సంఖ్యను చెప్పండి",
    ta: "தயவுசெய்து எஃப்ஐஆர் எண்ணை கூறுங்கள்",
    bn: "অনুগ্রহ করে এফআইআর নম্বর বলুন"
  },
  section: {
    en: "Please speak the section",
    hi: "कृपया धारा बताएं",
    te: "దయచేసి సెక్షన్ చెప్పండి",
    ta: "தயவுசெய்து பிரிவை கூறுங்கள்",
    bn: "অনুগ্রহ করে ধারা বলুন"
  },
  custodyDate: {
    en: "Please speak custody date",
    hi: "कृपया हिरासत की तारीख बताएं",
    te: "దయచేసి కస్టడీ తేది చెప్పండి",
    ta: "தயவுசெய்து காவலில் எடுத்த தேதி கூறுங்கள்",
    bn: "অনুগ্রহ করে হেফাজতের তারিখ বলুন"
  },
  accusedFatherName: {
    en: "Please speak father name",
    hi: "कृपया पिता का नाम बोलें",
    te: "దయచేసి తండ్రి పేరు చెప్పండి",
    ta: "தயவுசெய்து தந்தையின் பெயரை கூறுங்கள்",
    bn: "অনুগ্রহ করে পিতার নাম বলুন"
  },
  arrestDate: {
    en: "Please speak arrest date",
    hi: "कृपया गिरफ्तारी की तारीख बताएं",
    te: "దయచేసి అరెస్టు తేదీ చెప్పండి",
    ta: "தயவுசெய்து கைது செய்யப்பட்ட தேதி கூறுங்கள்",
    bn: "অনুগ্রহ করে গ্রেফতারের তারিখ বলুন"
  }
};


const Dashboard = () => {
  const [t, setT] = useState(translations.en);
  const [user, setUser] = useState({ name: 'User', role: 'Citizen' });
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('forms');
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPlayingInstruction, setIsPlayingInstruction] = useState(false);
  const [error, setError] = useState('');
  const [hasPlayedInstruction, setHasPlayedInstruction] = useState({});
  
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get language from URL params
  const queryParams = new URLSearchParams(location.search);
  const urlLanguage = queryParams.get('lang') || 'en';
  const [selectedLanguage, setSelectedLanguage] = useState(urlLanguage || 'en');
  const [language, setLanguage] = useState("en");

  // Token check useEffect
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate(`/?lang=${selectedLanguage}`);
    }
  }, [navigate, selectedLanguage]);

  // Audio recording refs
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const speechSynthRef = useRef(null);

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

  // Auto-start process when component mounts or field changes
  useEffect(() => {
    if (currentFieldIndex < fieldOrder.length && !isFormComplete()) {
      const currentField = fieldOrder[currentFieldIndex];
      if (!hasPlayedInstruction[currentField]) {
        // Small delay to ensure UI is ready
        setTimeout(() => {
          playInstructionAndRecord(currentField);
        }, 1000);
      }
    }
  }, [currentFieldIndex]);

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setSelectedLanguage(newLanguage);
    navigate(`/dashboard?lang=${newLanguage}`, { replace: true });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate(`/?lang=${selectedLanguage}`);
  };

  // Text-to-Speech function
  const playAudioInstruction = (text, fieldName) => {
    return new Promise((resolve, reject) => {
      if ('speechSynthesis' in window) {
        // Cancel any ongoing speech
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.volume = 0.8;
        
        utterance.onstart = () => {
          setIsPlayingInstruction(true);
        };
        
        utterance.onend = () => {
          setIsPlayingInstruction(false);
          setHasPlayedInstruction(prev => ({ ...prev, [fieldName]: true }));
          resolve();
        };
        
        utterance.onerror = (event) => {
          setIsPlayingInstruction(false);
          console.error('Speech synthesis error:', event);
          reject(event);
        };
        
        speechSynthRef.current = utterance;
        window.speechSynthesis.speak(utterance);
      } else {
        console.warn('Speech synthesis not supported');
        setHasPlayedInstruction(prev => ({ ...prev, [fieldName]: true }));
        resolve();
      }
    });
  };

  // Combined function to play instruction and start recording
const playInstructionAndRecord = async (fieldName) => {
  try {
    setError('');
    const instructionSet = audioInstructions[fieldName];
    const instructionText = instructionSet ? instructionSet[language] || instructionSet['en'] : '';

    if (instructionText) {
      await playAudioInstruction(instructionText, fieldName);
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    await startRecording();
  } catch (error) {
    console.error('Error playing instruction:', error);
    setError('Error playing audio instruction. Starting recording...');
    await startRecording();
  }
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
  
  // Helper function to get service ID based on language code (English only for now)
  const getServiceId = (languageCode) => {
    // Only English transcription as requested
    return 'ai4bharat/whisper-medium-en--gpu--t4';
  };

  const sendAudioToServer = (base64Audio) => {
    setIsProcessing(true);
    setError('');
    
    // Force English for transcription as requested
    const languageCode = 'en';
    const serviceId = getServiceId(languageCode);
    
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
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);
    
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
      
      audioChunksRef.current = [];
      
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
        stream.getTracks().forEach(track => track.stop());
        
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        
        try {
          const base64Audio = await blobToBase64(audioBlob);
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
      
      // Auto-stop recording after 10 seconds
      setTimeout(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
          stopRecording();
        }
      }, 5000);
      
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

  const manualStartRecording = async () => {
    if (!isRecording && !isProcessing && !isPlayingInstruction) {
      await startRecording();
    } else if (isRecording) {
      stopRecording();
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
      const doc = new jsPDF();
      
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("BAIL APPLICATION", 105, 20, { align: "center" });
      
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      
      doc.text("IN THE COURT OF " + (bailForm.courtName || "____________________"), 20, 40);
      
      doc.text("IN THE MATTER OF", 20, 60);
      doc.text("STATE", 20, 75);
      doc.text("VS", 20, 85);
      doc.text(bailForm.accusedName || "____________________", 20, 95);
      doc.text("S/O " + (bailForm.accusedFatherName || "____________________"), 20, 105);
      
      doc.text("Police Station: " + (bailForm.policeStation || "____________________"), 20, 125);
      doc.text("FIR NO: " + (bailForm.firNumber || "____________________"), 20, 135);
      doc.text("U/S: " + (bailForm.section || "____________________"), 20, 145);
      doc.text("Accused under police custody since: " + (bailForm.custodyDate || "____________________"), 20, 155);
      
      doc.setFont("helvetica", "bold");
      doc.text("APPLICATION UNDER SECTION 439 Cr. Pc FOR GRANT OF BAIL", 20, 175);
      doc.text("ON BEHALF OF THE ACCUSED", 20, 185);
      
      doc.text("MOST RESPECTFULLY SUBMITTED AS UNDER :-", 20, 205);
      
      doc.setFont("helvetica", "normal");
      
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
        
        if (yPosition > 270) {
          doc.addPage();
          yPosition = 20;
        }
      });
      
      const prayerText = "Therefore, it is most respectfully prayed that this Hon'ble Court may be pleased to grant bail to the applicant.";
      const prayerLines = doc.splitTextToSize(prayerText, 170);
      doc.text(prayerLines, 20, yPosition);
      yPosition += prayerLines.length * 7 + 20;
      
      doc.text("Yours faithfully,", 20, yPosition);
      doc.text("[Advocate Name]", 20, yPosition + 10);
      doc.text("Advocate for the Applicant", 20, yPosition + 20);
      
      const currentDate = new Date().toLocaleDateString();
      doc.text("Date: " + currentDate, 20, yPosition + 40);
      
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
    setHasPlayedInstruction({});
    setError('');
    // Cancel any ongoing speech
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingInstruction(false);
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
                style={
                  isPlayingInstruction 
                    ? { ...styles.micButton, ...styles.micButtonInstruction }
                    : isRecording 
                      ? { ...styles.micButton, ...styles.micButtonRecording } 
                      : styles.micButton
                }
                onClick={manualStartRecording}
                disabled={isProcessing || isFormComplete() || isPlayingInstruction}
              >
                {isPlayingInstruction ? (
                  <Volume2 size={32} />
                ) : isRecording ? (
                  <MicOff size={32} />
                ) : (
                  <Mic size={32} />
                )}
              </button>
              <p style={styles.micStatus}>
                {isPlayingInstruction ? t.playingInstruction :
                 isProcessing ? t.processing : 
                 isRecording ? `${t.listeningFor} ${getCurrentFieldName()}` : 
                 isFormComplete() ? 'All fields completed!' :
                 `Next: ${getCurrentFieldName()}`}
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
    margin: '4px 0 0 0',
    color: '#e2e8f0',
    fontWeight: 400,
  },
  rightNav: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
  },
  languageSelect: {
    backgroundColor: '#1e40af',
    color: '#fff',
    border: '1px solid #3b82f6',
    borderRadius: 6,
    padding: '8px 12px',
    fontSize: 14,
    fontWeight: 500,
    cursor: 'pointer',
    outline: 'none',
    transition: 'all 0.2s ease',
  },
  logoutBtn: {
    backgroundColor: '#dc2626',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    padding: '8px 16px',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    outline: 'none',
  },
  mainContainer: {
    display: 'flex',
    flex: 1,
    maxWidth: 1300,
    margin: '0 auto',
    width: '100%',
  },
  sidebar: {
    width: 280,
    backgroundColor: '#fff',
    borderRight: '1px solid #e2e8f0',
    padding: '24px 0',
    height: 'calc(100vh - 80px)',
    position: 'sticky',
    top: 80,
    overflowY: 'auto',
  },
  userProfile: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 24px',
    marginBottom: 32,
    gap: 12,
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
    fontSize: 18,
    fontWeight: 600,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 600,
    margin: 0,
    color: '#1e293b',
  },
  userRole: {
    fontSize: 14,
    color: '#64748b',
    margin: '2px 0 0 0',
  },
  sidebarNav: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    padding: '0 16px',
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '12px 16px',
    fontSize: 14,
    fontWeight: 500,
    color: '#64748b',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    textAlign: 'left',
    width: '100%',
    outline: 'none',
  },
  activeNavItem: {
    backgroundColor: '#eff6ff',
    color: '#0b5394',
    fontWeight: 600,
  },
  navIcon: {
    fontSize: 18,
    width: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    padding: '24px',
    backgroundColor: '#f8fafc',
    overflowY: 'auto',
    display: 'flex',
    gap: 24,
  },
  voiceSection: {
    width: 320,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    height: 'fit-content',
    position: 'sticky',
    top: 24,
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
    backgroundColor: '#0b5394',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(11, 83, 148, 0.3)',
    outline: 'none',
  },
  micButtonRecording: {
    backgroundColor: '#dc2626',
    boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)',
    animation: 'pulse 1.5s infinite',
  },
  micButtonInstruction: {
    backgroundColor: '#059669',
    boxShadow: '0 4px 12px rgba(5, 150, 105, 0.3)',
  },
  micStatus: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    margin: 0,
    fontWeight: 500,
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
    fontSize: 12,
    color: '#dc2626',
    margin: 0,
    lineHeight: 1.4,
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
    transition: 'width 0.3s ease',
  },
  progressText: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
    margin: 0,
  },
  resetButton: {
    backgroundColor: '#f59e0b',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    padding: '8px 16px',
    fontSize: 14,
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    outline: 'none',
  },
  bailFormContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
  },
  bailFormHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '20px 24px',
    backgroundColor: '#f8fafc',
    borderBottom: '1px solid #e2e8f0',
  },
  bailFormTitle: {
    fontSize: 18,
    fontWeight: 600,
    color: '#1e293b',
    margin: 0,
  },
  bailApplicationDocument: {
    padding: '24px',
  },
  documentContent: {
    backgroundColor: '#fff',
    border: '1px solid #e2e8f0',
    borderRadius: 8,
    padding: '32px',
    marginBottom: 24,
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
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
    marginBottom: 24,
  },
  documentSection: {
    marginBottom: 24,
    lineHeight: 1.6,
  },
  documentText: {
    fontSize: 14,
    color: '#374151',
    margin: '0 0 8px 0',
    lineHeight: 1.6,
  },
  fillableField: {
    backgroundColor: '#f3f4f6',
    padding: '2px 6px',
    borderRadius: 4,
    color: '#1e293b',
    fontWeight: 600,
    border: '1px solid #d1d5db',
  },
  downloadSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
    padding: '20px',
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    border: '1px solid #e2e8f0',
  },
  downloadButton: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#059669',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    padding: '12px 24px',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    outline: 'none',
  },
  downloadButtonDisabled: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#9ca3af',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    padding: '12px 24px',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'not-allowed',
    transition: 'all 0.2s ease',
    outline: 'none',
    opacity: 0.6,
  },
  warningText: {
    fontSize: 12,
    color: '#dc2626',
    margin: 0,
    textAlign: 'center',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
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