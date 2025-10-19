import { DiseaseKey } from './types';

export const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export const analyzeImageSimulated = (): { diseaseKey: DiseaseKey; confidence: number } => {
  const randomValue = Math.random();
  let diseaseKey: DiseaseKey = 'wart';
  if (randomValue < 0.15) diseaseKey = 'melanoma';
  else if (randomValue < 0.30) diseaseKey = 'acne';
  else if (randomValue < 0.45) diseaseKey = 'eczema';
  else if (randomValue < 0.60) diseaseKey = 'psoriasis';
  else if (randomValue < 0.75) diseaseKey = 'basalCell';
  else if (randomValue < 0.90) diseaseKey = 'fungal';

  const confidence = 85 + Math.random() * 12;
  return { diseaseKey, confidence };
};
