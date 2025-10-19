export type Gender = '' | 'Male' | 'Female' | 'Other';

export type Recommendations = {
  immediate: string[];
  lifestyle: string[];
};

export type DiseaseInfo = {
  name: string;
  severity: string;
  description: string;
  recommendations: Recommendations;
  treatments: string[];
};

export type DiseaseKey =
  | 'melanoma'
  | 'acne'
  | 'eczema'
  | 'psoriasis'
  | 'basalCell'
  | 'fungal'
  | 'wart';

export type DiseaseDatabase = Record<DiseaseKey, DiseaseInfo>;

export type AnalysisResult = {
  disease: string;
  confidence: string; // percentage string
  severity: string;
  description: string;
  recommendations: Recommendations;
  treatments: string[];
  timestamp: string;
  reportId: string;
  analysisDate: string;
};

export type UserProfile = {
  name: string;
  age: string | number;
  gender: Gender;
  location: string;
};
