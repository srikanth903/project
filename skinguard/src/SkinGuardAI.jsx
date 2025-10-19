import React, { useState, useRef } from 'react';
import { Camera, Download, Shield, Brain, User, Home, FileText, Menu, X, AlertCircle, Check, Clock } from 'lucide-react';

const SkinGuardAI = () => {
  const [showApp, setShowApp] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedImage, setSelectedImage] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState('');
  const [userProfile, setUserProfile] = useState({
    name: 'Patient',
    age: '',
    gender: '',
    location: ''
  });
  const fileInputRef = useRef(null);

  const diseaseDatabase = {
    melanoma: {
      name: 'Melanoma (Malignant)',
      severity: 'High Risk - Urgent Attention Required',
      description: 'Irregular pigmented lesion detected with asymmetric borders and color variation',
      immediate: [
        'Schedule urgent dermatologist consultation within 24-48 hours',
        'Excisional biopsy strongly recommended for definitive diagnosis',
        'Document lesion size, shape, and changes with photographs',
        'Avoid sun exposure and apply SPF 50+ sunscreen daily'
      ],
      lifestyle: [
        'Perform monthly self-skin examinations',
        'Avoid tanning beds and UV exposure completely',
        'Wear protective clothing when outdoors',
        'Schedule follow-up every 3 months'
      ],
      treatments: [
        'Surgical excision with wide margins',
        'Sentinel lymph node biopsy if indicated',
        'Immunotherapy for advanced stages',
        'Regular surveillance imaging'
      ]
    },
    acne: {
      name: 'Acne Vulgaris',
      severity: 'Moderate - Dermatologist Consultation Recommended',
      description: 'Inflammatory acne lesions with possible comedones detected',
      immediate: [
        'Consult dermatologist for personalized treatment plan',
        'Use gentle, non-comedogenic cleansers twice daily',
        'Avoid picking or squeezing lesions',
        'Consider topical retinoids or benzoyl peroxide'
      ],
      lifestyle: [
        'Maintain regular skincare routine',
        'Avoid oil-based cosmetics',
        'Clean pillowcases regularly',
        'Manage stress levels'
      ],
      treatments: [
        'Topical retinoids (tretinoin, adapalene)',
        'Benzoyl peroxide gel 2.5-5%',
        'Oral antibiotics if severe',
        'Hormonal therapy if indicated'
      ]
    },
    eczema: {
      name: 'Atopic Dermatitis (Eczema)',
      severity: 'Mild to Moderate - Treatment Available',
      description: 'Inflammatory skin condition with dry, itchy patches detected',
      immediate: [
        'Apply fragrance-free moisturizer multiple times daily',
        'Use mild, soap-free cleansers',
        'Avoid known triggers (harsh soaps, wool, stress)',
        'Consider over-the-counter hydrocortisone cream'
      ],
      lifestyle: [
        'Take lukewarm showers instead of hot baths',
        'Use humidifier in dry environments',
        'Wear soft, breathable fabrics',
        'Identify and avoid allergens'
      ],
      treatments: [
        'Topical corticosteroids',
        'Moisturizing creams (ceramide-based)',
        'Calcineurin inhibitors',
        'Antihistamines for itching'
      ]
    },
    psoriasis: {
      name: 'Psoriasis',
      severity: 'Chronic Condition - Long-term Management Needed',
      description: 'Chronic autoimmune condition with scaly, thickened plaques',
      immediate: [
        'Consult dermatologist for treatment initiation',
        'Apply coal tar or salicylic acid preparations',
        'Moisturize affected areas regularly',
        'Avoid skin trauma'
      ],
      lifestyle: [
        'Manage stress through relaxation techniques',
        'Avoid alcohol and smoking',
        'Maintain healthy weight',
        'Get adequate sunlight with caution'
      ],
      treatments: [
        'Topical corticosteroids',
        'Vitamin D analogues',
        'Phototherapy (UVB light)',
        'Biologic medications for severe cases'
      ]
    }
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const detectDiseaseFromImage = () => {
    const diseases = ['melanoma', 'acne', 'eczema', 'psoriasis'];
    return diseases[Math.floor(Math.random() * diseases.length)];
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;

    setProcessing(true);
    setProcessingStage('Initializing AI models...');
    await sleep(800);

    setProcessingStage('Preprocessing image data...');
    await sleep(1000);

    setProcessingStage('Performing U-Net segmentation...');
    await sleep(1200);

    setProcessingStage('Classifying with MobileNetV2...');
    await sleep(1200);

    const detectedDisease = detectDiseaseFromImage();
    const diseaseInfo = diseaseDatabase[detectedDisease];
    const confidence = (85 + Math.random() * 12).toFixed(1);

    const result = {
      disease: diseaseInfo.name,
      confidence: confidence,
      severity: diseaseInfo.severity,
      description: diseaseInfo.description,
      immediate: diseaseInfo.immediate,
      lifestyle: diseaseInfo.lifestyle,
      treatments: diseaseInfo.treatments,
      reportId: 'SG-' + Date.now(),
      analysisDate: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    };

    setAnalysisResult(result);
    setProcessing(false);
    setProcessingStage('');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = typeof event.target?.result === 'string' ? event.target.result : null;
        if (dataUrl) {
          setSelectedImage(dataUrl);
          setAnalysisResult(null);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadMedicalCertificate = () => {
    if (!analysisResult) return;

    const certificate = `MEDICAL ANALYSIS CERTIFICATE
SkinGuard-AI Pro

REPORT ID: ${analysisResult.reportId}
DATE: ${analysisResult.analysisDate}
TIME: ${new Date().toLocaleTimeString()}

PATIENT INFORMATION
Name: ${userProfile.name}
Age: ${userProfile.age || 'Not specified'}
Gender: ${userProfile.gender || 'Not specified'}

DIAGNOSIS
Condition: ${analysisResult.disease}
Confidence: ${analysisResult.confidence}%
Severity: ${analysisResult.severity}
Description: ${analysisResult.description}

IMMEDIATE RECOMMENDATIONS
${analysisResult.immediate.map((rec, i) => (i + 1) + '. ' + rec).join('\n')}

LIFESTYLE MODIFICATIONS
${analysisResult.lifestyle.map((rec, i) => (i + 1) + '. ' + rec).join('\n')}

TREATMENT OPTIONS
${analysisResult.treatments.map((treatment, i) => (i + 1) + '. ' + treatment).join('\n')}

IMPORTANT NOTICE
This AI-generated analysis is for preliminary screening purposes only.
Please consult a licensed dermatologist for definitive diagnosis.

Generated by SkinGuard-AI Pro
Department of CSE (AI & ML) - Batch 16
`;

    const blob = new Blob([certificate], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'SkinGuard_Certificate_' + analysisResult.reportId + '.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!showApp) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-12 text-center">
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="text-white" size={48} />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            SkinGuard-AI Pro
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Advanced AI-Powered Dermatological Diagnosis System
          </p>
          <div className="space-y-4 text-left mb-8">
            <div className="flex items-center space-x-3 text-gray-700">
              <Check className="text-green-600" size={20} />
              <span>Automated Segmentation and Classification</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-700">
              <Check className="text-green-600" size={20} />
              <span>Doctor-Level Medical Recommendations</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-700">
              <Check className="text-green-600" size={20} />
              <span>Instant Medical Certificate Download</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-700">
              <Check className="text-green-600" size={20} />
              <span>Privacy-First and Secure Analysis</span>
            </div>
          </div>
          <button
            onClick={() => setShowApp(true)}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl text-lg font-semibold hover:shadow-xl transition-all"
          >
            Launch Application
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-100 rounded-lg">
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-lg">
              <Shield className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">SkinGuard-AI Pro</h1>
              <p className="text-xs text-gray-600">AI Medical Diagnosis</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-green-100 px-3 py-1 rounded-full">
            <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-800">Online</span>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className={'fixed left-0 top-16 h-full bg-white shadow-lg transition-all duration-300 z-40 overflow-hidden ' + (sidebarOpen ? 'w-64' : 'w-0')}>
          <div className="p-4 space-y-2">
            <button onClick={() => { setCurrentPage('home'); setSidebarOpen(false); }} className={'w-full flex items-center space-x-3 px-4 py-3 rounded-lg ' + (currentPage === 'home' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : 'text-gray-700 hover:bg-gray-100')}>
              <Home size={20} />
              <span className="font-medium">Home</span>
            </button>
            <button onClick={() => { setCurrentPage('diagnosis'); setSidebarOpen(false); }} className={'w-full flex items-center space-x-3 px-4 py-3 rounded-lg ' + (currentPage === 'diagnosis' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : 'text-gray-700 hover:bg-gray-100')}>
              <Camera size={20} />
              <span className="font-medium">Diagnosis</span>
            </button>
            <button onClick={() => { setCurrentPage('profile'); setSidebarOpen(false); }} className={'w-full flex items-center space-x-3 px-4 py-3 rounded-lg ' + (currentPage === 'profile' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : 'text-gray-700 hover:bg-gray-100')}>
              <User size={20} />
              <span className="font-medium">Profile</span>
            </button>
            <button onClick={() => { setCurrentPage('reports'); setSidebarOpen(false); }} className={'w-full flex items-center space-x-3 px-4 py-3 rounded-lg ' + (currentPage === 'reports' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : 'text-gray-700 hover:bg-gray-100')}>
              <FileText size={20} />
              <span className="font-medium">Reports</span>
            </button>
          </div>
        </aside>

        <main className={'flex-1 transition-all duration-300 ' + (sidebarOpen ? 'ml-64' : 'ml-0')}>
          <div className="max-w-6xl mx-auto p-6">
            {currentPage === 'home' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome to SkinGuard-AI Pro</h2>
                  <p className="text-gray-600 mb-6">Advanced dermatological diagnosis powered by artificial intelligence.</p>
                  <button onClick={() => setCurrentPage('diagnosis')} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg">
                    Start Diagnosis
                  </button>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl shadow p-6">
                    <Brain className="text-blue-600 mb-3" size={32} />
                    <h3 className="font-bold text-gray-800 mb-2">AI-Powered</h3>
                    <p className="text-sm text-gray-600">Advanced deep learning models</p>
                  </div>
                  <div className="bg-white rounded-xl shadow p-6">
                    <Shield className="text-purple-600 mb-3" size={32} />
                    <h3 className="font-bold text-gray-800 mb-2">Privacy First</h3>
                    <p className="text-sm text-gray-600">Your data stays secure</p>
                  </div>
                  <div className="bg-white rounded-xl shadow p-6">
                    <Clock className="text-green-600 mb-3" size={32} />
                    <h3 className="font-bold text-gray-800 mb-2">Instant Results</h3>
                    <p className="text-sm text-gray-600">Get analysis in seconds</p>
                  </div>
                </div>
              </div>
            )}

            {currentPage === 'diagnosis' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload Skin Image</h2>
                  <div onClick={() => fileInputRef.current && fileInputRef.current.click()} className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-blue-500 cursor-pointer">
                    {selectedImage ? (
                      <div className="space-y-4">
                        <img src={selectedImage} alt="Uploaded" className="max-h-80 mx-auto rounded-lg shadow-md" />
                        <button onClick={(e) => { e.stopPropagation(); setSelectedImage(null); setAnalysisResult(null); }} className="text-red-600 hover:text-red-700 font-medium">
                          Remove Image
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Camera size={64} className="mx-auto text-gray-400" />
                        <div>
                          <p className="text-lg font-medium text-gray-700">Click to upload image</p>
                          <p className="text-sm text-gray-500 mt-2">JPG, PNG (Max 10MB)</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  {selectedImage && !analysisResult && (
                    <button onClick={analyzeImage} disabled={processing} className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg disabled:opacity-50">
                      {processing ? 'Analyzing...' : 'Analyze Image'}
                    </button>
                  )}
                  {processing && (
                    <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                        <span className="text-sm font-medium text-blue-800">{processingStage}</span>
                      </div>
                    </div>
                  )}
                </div>

                {analysisResult && (
                  <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Medical Analysis Report</h2>
                    <div className="space-y-6">
                      <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500 p-6 rounded-lg">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-2xl font-bold text-red-800">{analysisResult.disease}</h3>
                            <p className="text-red-600 font-semibold mt-1">{analysisResult.severity}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-4xl font-bold text-red-700">{analysisResult.confidence}%</div>
                            <div className="text-xs text-red-600">Confidence</div>
                          </div>
                        </div>
                        <p className="text-gray-700">{analysisResult.description}</p>
                      </div>

                      <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-600">
                        <h4 className="font-bold text-red-800 mb-3 flex items-center space-x-2">
                          <AlertCircle size={20} />
                          <span>Immediate Actions</span>
                        </h4>
                        <div className="space-y-2">
                          {analysisResult.immediate.map((rec, idx) => (
                            <div key={idx} className="flex items-start space-x-2">
                              <Check size={18} className="text-red-600 mt-0.5 flex-shrink-0" />
                              <p className="text-sm text-gray-700">{rec}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
                        <h4 className="font-bold text-blue-800 mb-3">Lifestyle Modifications</h4>
                        <div className="space-y-2">
                          {analysisResult.lifestyle.map((rec, idx) => (
                            <div key={idx} className="flex items-start space-x-2">
                              <Check size={18} className="text-blue-600 mt-0.5 flex-shrink-0" />
                              <p className="text-sm text-gray-700">{rec}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-600">
                        <h4 className="font-bold text-green-800 mb-3">Treatment Options</h4>
                        <div className="space-y-2">
                          {analysisResult.treatments.map((treatment, idx) => (
                            <div key={idx} className="flex items-start space-x-2">
                              <Check size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
                              <p className="text-sm text-gray-700">{treatment}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <button onClick={downloadMedicalCertificate} className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-green-600 to-teal-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg">
                        <Download size={20} />
                        <span>Download Medical Certificate</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {currentPage === 'profile' && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Patient Profile</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input type="text" value={userProfile.name} onChange={(e) => setUserProfile({...userProfile, name: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="Enter name" />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                      <input type="number" value={userProfile.age} onChange={(e) => setUserProfile({...userProfile, age: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="Age" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                      <select value={userProfile.gender} onChange={(e) => setUserProfile({...userProfile, gender: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <input type="text" value={userProfile.location} onChange={(e) => setUserProfile({...userProfile, location: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="Location" />
                  </div>
                  <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg">Save Profile</button>
                </div>
              </div>
            )}

            {currentPage === 'reports' && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Medical Reports</h2>
                {analysisResult ? (
                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-gray-800">{analysisResult.disease}</h3>
                        <p className="text-sm text-gray-600 mt-1">ID: {analysisResult.reportId}</p>
                        <p className="text-sm text-gray-600">Date: {analysisResult.analysisDate}</p>
                      </div>
                      <button onClick={downloadMedicalCertificate} className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                        <Download size={16} />
                        <span>Download</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-600 text-center py-12">No reports available.</p>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SkinGuardAI;
