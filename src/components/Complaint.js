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
  hi: {
    legalAidApplication: "कानूनी सहायता / शिकायत",
    stage: "चरण",
    of: "का",
    progress: "प्रगति",
    progressStatus: "मूलभूत जानकारी",
    logout: "लॉगआउट",
    backToDashboard: "डैशबोर्ड पर लौटें",
    saveDraft: "ड्राफ्ट सहेजें",
    quickLinks: "त्वरित लिंक",
    faq: "सामान्य प्रश्न",
    userGuide: "उपयोगकर्ता गाइड",
    govPortal: "सरकारी पोर्टल",
    terms: "नियम और शर्तें",
    contact: "संपर्क करें",
    phone: "फोन",
    email: "ईमेल",
    submitForm: "फॉर्म सबमिट करें",
    formSubmitted: "फॉर्म सफलतापूर्वक सबमिट किया गया!",
    applicationFor: "कानूनी सहायता / शिकायत का प्रकार",
    nalsa: "NALSA",
    sclsc: "SCLSC",
    hclsc: "HCLSC",
    slsa: "SLSA",
    dlsa: "DLSA",
    tlsc: "TLSC",
    receivedThrough: "प्राप्त माध्यम",
    slf: "स्वयं",
    rep: "प्रतिनिधि",
    org: "संगठन",
    natureOfApplication: "कानूनी आवेदन का प्रकार",
    categoryGrievance: "शिकायत निवारण और शिकायतें",
    categoryLegalAid: "कानूनी सहायता और प्रतिनिधित्व",
    categoryAdministrative: "प्रशासनिक और नीतिगत मामले",
    corruption: "भ्रष्टाचार/कदाचार का आरोप",
    harassment: "उत्पीड़न/दुव्यवहार का आरोप",
    delay: "निर्णय/कार्यान्वयन में देरी",
    civic: "नागरिक सुविधाएं/सेवा की गुणवत्ता",
    compensation: "मुआवजा/वापसी",
    lawOrder: "कानून व्यवस्था",
    socialEvils: "सामाजिक बुराइयां",
    retirement: "सेवानिवृत्ति देनदारी",
    requests: "अनुरोध",
    legalAdvice: "कानूनी सलाह",
    legalRedress: "कानूनी उपचार",
    panelDefending: "मामले की रक्षा हेतु पैनल वकील",
    panelFiling: "मामला दर्ज करने हेतु पैनल वकील",
    counselling: "परामर्श और सुलह",
    draftApplication: "आवेदन/नोटिस का मसौदा तैयार करना",
    centralGovt: "केंद्रीय सरकार: विविध",
    stateGovt: "राज्य सरकार: विविध",
    revenue: "राजस्व/भूमि/कर",
    scheduledCastes: "अनुसूचित जातियाँ/जनजातियाँ/पिछड़ा वर्ग सेवाएं",
    problemSummary: "जिस समस्या के लिए सहायता मांगी गई है उसका सारांश",
    recordVoice: "आवाज रिकॉर्ड करें",
    stopRecording: "रिकॉर्डिंग रोकें",
    submitSummary: "सारांश सबमिट करें",
    recordingMessage: "रिकॉर्डिंग चालू है... अब बोलें",
    religion: "धर्म",
    hindu: "हिंदू",
    muslim: "मुसलमान",
    christian: "ईसाई",
    sikh: "सिख",
    buddhist: "बौद्ध",
    jain: "जैन",
    parsi: "पारसी",
    other: "अन्य",
    caste: "जाति",
    general: "सामान्य",
    obc: "ओबीसी",
    sc: "अनुसूचित जाति",
    st: "अनुसूचित जनजाति",
    occupation: "पेशा",
    government: "सरकारी कर्मचारी",
    private: "निजी क्षेत्र",
    business: "व्यवसाय",
    agriculture: "कृषि",
    student: "छात्र",
    homemaker: "गृहिणी",
    retired: "सेवानिवृत्त",
    unemployed: "बेरोजगार",
    caseFiledQuestion: "क्या इस विषय पर कोई मामला दर्ज किया गया है?",
    yes: "हाँ",
    no: "नहीं",
    caseFileUpload: "मामले की फाइल अपलोड करें",
    errorMessage: "कृपया सभी आवश्यक फ़ील्ड भरें",
    savingDraft: "ड्राफ्ट सहेजा जा रहा है...",
    draftSaved: "ड्राफ्ट सफलतापूर्वक सहेजा गया!"
  },
  te: {
    legalAidApplication: "చట్ట సహాయం / ఫిర్యాదు",
    stage: "దశ",
    of: "లో",
    progress: "ప్రమాణం",
    progressStatus: "ప్రాథమిక సమాచారం",
    logout: "లాగ్ అవుట్",
    backToDashboard: "డాష్‌బోర్డ్‌కు వెళ్ళండి",
    saveDraft: "డ్రాఫ్ట్‌ను సేవ్ చేయండి",
    quickLinks: "త్వరిత లింకులు",
    faq: "తరచుగా అడిగే ప్రశ్నలు",
    userGuide: "వినియోగదారుల గైడ్",
    govPortal: "ప్రభుత్వ పోర్టల్",
    terms: "నియమాలు & షరతులు",
    contact: "మాకు సంప్రదించండి",
    phone: "ఫోన్",
    email: "ఇమెయిల్",
    submitForm: "ఫారాన్ని సమర్పించండి",
    formSubmitted: "ఫారం విజయవంతంగా సమర్పించబడింది!",
    applicationFor: "చట్ట సహాయం / ఫిర్యాదు స్వభావం",
    nalsa: "NALSA",
    sclsc: "SCLSC",
    hclsc: "HCLSC",
    slsa: "SLSA",
    dlsa: "DLSA",
    tlsc: "TLSC",
    receivedThrough: "ద్వారా అందింది",
    slf: "స్వయం",
    rep: "ప్రతినిధి",
    org: "సంస్థ",
    natureOfApplication: "అప్లికేషన్ స్వభావం",
    categoryGrievance: "ఫిర్యాదుల పరిష్కారం",
    categoryLegalAid: "చట్ట సహాయం & ప్రతినిధిత్వం",
    categoryAdministrative: "అడ్మినిస్ట్రేటివ్ మరియు పాలసీ సంబంధిత అంశాలు",
    corruption: "అనైతికత / అవినీతి ఆరోపణ",
    harassment: "హింస / అనుచిత ప్రవర్తన ఆరోపణ",
    delay: "నిర్ణయం లేదా అమలులో ఆలస్యం",
    civic: "పౌర సదుపాయాలు / సేవా నాణ్యత",
    compensation: "పరిహారం / రిఫండ్‌లు",
    lawOrder: "శాంతి & భద్రత",
    socialEvils: "సామాజిక చెడులు",
    retirement: "రిటైర్మెంట్ బకాయిలు",
    requests: "వినతులు",
    legalAdvice: "చట్ట సలహా",
    legalRedress: "చట్ట పరిష్కారం",
    panelDefending: "కోర్టులో రక్షణ కోసం ప్యానల్ న్యాయవాది",
    panelFiling: "కొత్త కేసు దాఖలుకు ప్యానల్ న్యాయవాది",
    counselling: "సలహా మరియు రాజీ",
    draftApplication: "అప్లికేషన్/ప్రతినిధిత్వం/నోటీస్/పిటిషన్/స్పందన తయారీ",
    centralGovt: "కేంద్ర ప్రభుత్వం: వివిధ",
    stateGovt: "రాష్ట్ర ప్రభుత్వం: వివిధ",
    revenue: "ఆదాయం/భూమి/పన్ను",
    scheduledCastes: "అనుసూచిత కులాలు/జాతులు/వెనుకబడిన వర్గాలు",
    problemSummary: "సహాయం కోరిన సమస్య యొక్క సారాంశం",
    recordVoice: "ధ్వని రికార్డు చేయండి",
    stopRecording: "రికార్డింగ్ ఆపండి",
    submitSummary: "సారాంశాన్ని సమర్పించండి",
    recordingMessage: "రికార్డింగ్ కొనసాగుతుంది... ఇప్పుడే మాట్లాడండి",
    religion: "మతం",
    hindu: "హిందూ",
    muslim: "ముస్లిం",
    christian: "క్రైస్తవం",
    sikh: "సిఖ్",
    buddhist: "బౌద్ధ",
    jain: "జైన్",
    parsi: "పార్సీ",
    other: "ఇతర",
    caste: "జాతి",
    general: "సాధారణ",
    obc: "ఓబీసీ",
    sc: "ఎస్.సి.",
    st: "ఎస్.టి.",
    occupation: "వృత్తి",
    government: "ప్రభుత్వ ఉద్యోగి",
    private: "ప్రైవేట్ రంగం",
    business: "వ్యాపారం",
    agriculture: "వ్యవసాయం",
    student: "విద్యార్థి",
    homemaker: "గృహిణి",
    retired: "రిటైర్డ్",
    unemployed: "ఉద్యోగం లేని",
    caseFiledQuestion: "ఈ విషయం పై కేసు నమోదు చేయబడిందా?",
    yes: "అవును",
    no: "కాదు",
    caseFileUpload: "కేస్ ఫైల్‌ను అప్‌లోడ్ చేయండి",
    errorMessage: "దయచేసి అవసరమైన అన్ని వివరాలను నింపండి",
    savingDraft: "డ్రాఫ్ట్ సేవ్ చేస్తోంది...",
    draftSaved: "డ్రాఫ్ట్ విజయవంతంగా సేవ్ చేయబడింది!"
  },
  ta: {
    legalAidApplication: "சட்ட உதவி / புகார்",
    stage: "நிலை",
    of: "இன்",
    progress: "முன்னேற்றம்",
    progressStatus: "அடிப்படை தகவல்",
    logout: "வெளியேறு",
    backToDashboard: "டாஷ்போர்டிற்கு திரும்பு",
    saveDraft: "முன்வடிவத்தை சேமிக்கவும்",
    quickLinks: "விரைவு இணைப்புகள்",
    faq: "அடிக்கடி கேட்கப்படும் கேள்விகள்",
    userGuide: "பயனர் வழிகாட்டி",
    govPortal: "அரசு போர்டல்",
    terms: "விதிமுறைகள் மற்றும் நிபந்தனைகள்",
    contact: "தொடர்பு கொள்ள",
    phone: "தொலைபேசி",
    email: "மின்னஞ்சல்",
    submitForm: "படிவத்தை சமர்ப்பிக்கவும்",
    formSubmitted: "படிவம் வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது!",
    applicationFor: "சட்ட உதவி / புகாரின் தன்மை",
    nalsa: "NALSA",
    sclsc: "SCLSC",
    hclsc: "HCLSC",
    slsa: "SLSA",
    dlsa: "DLSA",
    tlsc: "TLSC",
    receivedThrough: "மூலம் பெறப்பட்டது",
    slf: "சுயம்",
    rep: "பிரதிநிதி",
    org: "நிறுவனம்",
    natureOfApplication: "விண்ணப்பத்தின் தன்மை",
    categoryGrievance: "புகார் தீர்வு மற்றும் முறையீடுகள்",
    categoryLegalAid: "சட்ட உதவி மற்றும் பிரதிநிதித்துவம்",
    categoryAdministrative: "நிர்வாக மற்றும் கொள்கை சார்ந்த விடயங்கள்",
    corruption: "அழுக்கு / தவறான நடைமுறை குற்றச்சாட்டு",
    harassment: "துன்புறுத்தல் / மோசமான நடத்தை குற்றச்சாட்டு",
    delay: "முடிவு அல்லது செயல்பாட்டில் தாமதம்",
    civic: "மக்கள் வசதிகள் / சேவையின் தரம்",
    compensation: "இழப்பீடுகள் / திருப்பிச் செலுத்தல்கள்",
    lawOrder: "சட்டம் மற்றும் ஒழுங்கு",
    socialEvils: "சமூக தீமைகள்",
    retirement: "ஓய்வூதியத் தொகை மற்றும் கொடுப்பனவுகள்",
    requests: "கோரிக்கைகள்",
    legalAdvice: "சட்ட ஆலோசனை",
    legalRedress: "சட்ட சீரமைப்பு",
    panelDefending: "நீதிமன்ற வழக்கில் பாதுகாக்க வக்கீல்",
    panelFiling: "புதிய வழக்குக்கான தாக்கல் வக்கீல்",
    counselling: "ஆலோசனை மற்றும் சமரசம்",
    draftApplication: "விண்ணப்பம் / பிரதிநிதித்துவம் / நோட்டீஸ் / மனு / பதில் உருவாக்குதல்",
    centralGovt: "மத்திய அரசு: பல்வேறு",
    stateGovt: "மாநில அரசு: பல்வேறு",
    revenue: "வருவாய் / நிலம் / வரி",
    scheduledCastes: "தொகுப்புகளின் பிரிவுகள் / பழங்குடிகள் / பின்தங்கியவர்கள்",
    problemSummary: "சட்ட உதவி / புகார் தேவைப்படும் பிரச்சனையின் சுருக்கம்",
    recordVoice: "குரலை பதிவு செய்யவும்",
    stopRecording: "பதிவை நிறுத்தவும்",
    submitSummary: "சுருக்கத்தை சமர்ப்பிக்கவும்",
    recordingMessage: "பதிவு நடைபெறுகிறது... பேசவும்",
    religion: "மதம்",
    hindu: "இந்து",
    muslim: "முஸ்லிம்",
    christian: "கிறிஸ்தவர்",
    sikh: "சிக்கள்",
    buddhist: "பௌத்தர்",
    jain: "ஜைன்",
    parsi: "பார்சி",
    other: "மற்றவை",
    caste: "சாதி",
    general: "பொது",
    obc: "OBC",
    sc: "SC",
    st: "ST",
    occupation: "தொழில்",
    government: "அரசு ஊழியர்",
    private: "தனியார் துறை",
    business: "வணிகம்",
    agriculture: "விவசாயம்",
    student: "மாணவர்",
    homemaker: "வீட்டுத் தொழிலாளர்",
    retired: "ஓய்வுபெற்றவர்",
    unemployed: "வேலை இல்லாதவர்",
    caseFiledQuestion: "இந்த விவகாரம் தொடர்பான வழக்கு தொடரப்பட்டுள்ளதா?",
    yes: "ஆம்",
    no: "இல்லை",
    caseFileUpload: "வழக்கு கோப்பை பதிவேற்றவும்",
    errorMessage: "தயவுசெய்து தேவையான அனைத்து விவரங்களையும் பூர்த்தி செய்யவும்",
    savingDraft: "முன்வடிவத்தை சேமிக்கிறது...",
    draftSaved: "முன்வடிவு வெற்றிகரமாக சேமிக்கப்பட்டது!"
  },
  bn: {
    legalAidApplication: "আইনি সহায়তা / অভিযোগ",
    stage: "পর্যায়",
    of: "এর",
    progress: "অগ্রগতি",
    progressStatus: "মৌলিক তথ্য",
    logout: "লগ আউট",
    backToDashboard: "ড্যাশবোর্ডে ফিরে যান",
    saveDraft: "ড্রাফট সংরক্ষণ করুন",
    quickLinks: "দ্রুত লিঙ্ক",
    faq: "সচরাচর জিজ্ঞাসা",
    userGuide: "ব্যবহার নির্দেশিকা",
    govPortal: "সরকারি পোর্টাল",
    terms: "শর্তাবলী",
    contact: "যোগাযোগ করুন",
    phone: "ফোন",
    email: "ইমেইল",
    submitForm: "ফর্ম জমা দিন",
    formSubmitted: "ফর্ম সফলভাবে জমা দেওয়া হয়েছে!",
    applicationFor: "আইনি সহায়তা / অভিযোগের প্রকৃতি",
    nalsa: "NALSA",
    sclsc: "SCLSC",
    hclsc: "HCLSC",
    slsa: "SLSA",
    dlsa: "DLSA",
    tlsc: "TLSC",
    receivedThrough: "এর মাধ্যমে প্রাপ্ত",
    slf: "নিজে",
    rep: "প্রতিনিধি",
    org: "সংস্থা",
    natureOfApplication: "আবেদনের প্রকৃতি",
    categoryGrievance: "অভিযোগ নিষ্পত্তি ও অভিযোগসমূহ",
    categoryLegalAid: "আইনি সহায়তা ও প্রতিনিধিত্ব",
    categoryAdministrative: "প্রশাসনিক ও নীতিগত বিষয়",
    corruption: "দুর্নীতি / অনিয়মের অভিযোগ",
    harassment: "হয়রানি / দুর্ব্যবহারের অভিযোগ",
    delay: "সিদ্ধান্ত বা প্রয়োগে বিলম্ব",
    civic: "নাগরিক সুবিধা / সেবার গুণমান",
    compensation: "ক্ষতিপূরণ / ফেরত",
    lawOrder: "আইন-শৃঙ্খলা",
    socialEvils: "সামাজিক কুপ্রথা",
    retirement: "অবসর ভাতা সম্পর্কিত পাওনা",
    requests: "অনুরোধসমূহ",
    legalAdvice: "আইনি পরামর্শ",
    legalRedress: "আইনি প্রতিকার",
    panelDefending: "মামলার জন্য ডিফেন্স প্যানেল আইনজীবী",
    panelFiling: "নতুন মামলা দায়েরের জন্য প্যানেল আইনজীবী",
    counselling: "পরামর্শ ও সমঝোতা",
    draftApplication: "আবেদন/প্রতিনিধিত্ব/নোটিশ/পিটিশন/উত্তর খসড়া করুন",
    centralGovt: "কেন্দ্রীয় সরকার: বিভিন্ন",
    stateGovt: "রাজ্য সরকার: বিভিন্ন",
    revenue: "রাজস্ব / ভূমি / কর",
    scheduledCastes: "তালিকাভুক্ত জাতি/উপজাতি/পিছিয়ে পড়া পরিষেবা সংক্রান্ত বিষয়",
    problemSummary: "যে সমস্যার জন্য আইনি সহায়তা / অভিযোগ চাওয়া হচ্ছে তার সারাংশ",
    recordVoice: "ভয়েস রেকর্ড করুন",
    stopRecording: "রেকর্ডিং বন্ধ করুন",
    submitSummary: "সারাংশ জমা দিন",
    recordingMessage: "রেকর্ডিং হচ্ছে... এখন কথা বলুন",
    religion: "ধর্ম",
    hindu: "হিন্দু",
    muslim: "মুসলিম",
    christian: "খ্রিস্টান",
    sikh: "শিখ",
    buddhist: "বৌদ্ধ",
    jain: "জৈন",
    parsi: "পারসি",
    other: "অন্যান্য",
    caste: "জাতি",
    general: "সাধারণ",
    obc: "ওবিসি",
    sc: "এসসি",
    st: "এসটি",
    occupation: "পেশা",
    government: "সরকারি কর্মচারী",
    private: "বেসরকারি খাত",
    business: "ব্যবসা",
    agriculture: "কৃষি",
    student: "ছাত্র/ছাত্রী",
    homemaker: "গৃহিণী",
    retired: "অবসরপ্রাপ্ত",
    unemployed: "বেকার",
    caseFiledQuestion: "এই বিষয়ে কি কোনো মামলা দায়ের করা হয়েছে?",
    yes: "হ্যাঁ",
    no: "না",
    caseFileUpload: "মামলার ফাইল আপলোড করুন",
    errorMessage: "দয়া করে এগিয়ে যাওয়ার আগে সমস্ত প্রয়োজনীয় ক্ষেত্র পূরণ করুন",
    savingDraft: "ড্রাফট সংরক্ষণ করা হচ্ছে...",
    draftSaved: "ড্রাফট সফলভাবে সংরক্ষণ করা হয়েছে!"
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
      // Request higher quality audio for better transcription
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: 16000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true
        }
      });
      
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: 'audio/webm', // Using webm format for better compatibility
      });
      chunksRef.current = [];
      
      mediaRecorderRef.current.addEventListener('dataavailable', (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      });
      
      mediaRecorderRef.current.addEventListener('stop', () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setAudioBlob(audioBlob);
        
        // Convert the audio blob to base64 and send it
        convertToBase64AndSend(audioBlob);
        
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
  
  const convertToBase64AndSend = (audioBlob) => {
    const reader = new FileReader();
    
    reader.onloadend = () => {
      // Get the base64 string by removing the data URL prefix
      const base64Audio = reader.result.split(',')[1];
      sendAudioToServer(base64Audio);
    };
    
    reader.onerror = () => {
      console.error('Error converting audio to base64');
      setError('Error processing audio. Please try again.');
    };
    
    // Read the blob as a data URL (base64)
    reader.readAsDataURL(audioBlob);
  };
  
  const sendAudioToServer = (base64Audio) => {
    setLoading(true);
    
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
            "audioFormat": "webm", // Changed to match the blob format
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
      
      // Update the problem summary with the transcribed text
      setFormData(prevData => ({
        ...prevData,
        problemSummary: transcribedText || prevData.problemSummary
      }));
    })
    .catch(error => {
      clearTimeout(timeoutId);
      console.error('Error processing audio:', error);
      setError(`Error processing audio: ${error.message}. Please try again or type manually.`);
    })
    .finally(() => {
      setLoading(false);
    });
  };
  
  // Helper function to get language code
  const getLanguageCode = (language) => {
    const languageCodes = {
      'Telugu': 'te',
      'Hindi': 'hi',
      'English': 'en',
      'Tamil': 'ta',
      'Bengali': 'bn'
    };
    
    return languageCodes[language] || 'en'; // Default to English if not found
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
            <img src = "./indian-emblem.png" alt = "Indian Emblem" style = {styles.logo}/>
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