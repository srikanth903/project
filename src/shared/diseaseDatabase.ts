import { DiseaseDatabase } from './types';

export const diseaseDatabase: DiseaseDatabase = {
  melanoma: {
    name: 'Melanoma (Malignant)',
    severity: 'High Risk - Urgent Attention Required',
    description: 'Irregular pigmented lesion detected with asymmetric borders and color variation',
    recommendations: {
      immediate: [
        'Schedule urgent dermatologist consultation within 24-48 hours',
        'Excisional biopsy strongly recommended for definitive diagnosis',
        'Document lesion size, shape, and changes with photographs',
        'Avoid sun exposure and apply SPF 50+ sunscreen daily',
      ],
      lifestyle: [
        'Perform monthly self-skin examinations',
        'Avoid tanning beds and UV exposure completely',
        'Wear protective clothing when outdoors',
        'Schedule follow-up every 3 months',
      ],
    },
    treatments: [
      'Surgical excision with wide margins',
      'Sentinel lymph node biopsy if indicated',
      'Immunotherapy for advanced stages',
      'Regular surveillance imaging',
    ],
  },
  acne: {
    name: 'Acne Vulgaris',
    severity: 'Moderate - Dermatologist Consultation Recommended',
    description: 'Inflammatory acne lesions with possible comedones detected',
    recommendations: {
      immediate: [
        'Consult dermatologist for personalized treatment plan',
        'Use gentle, non-comedogenic cleansers twice daily',
        'Avoid picking or squeezing lesions',
        'Consider topical retinoids or benzoyl peroxide',
      ],
      lifestyle: [
        'Maintain regular skincare routine',
        'Avoid oil-based cosmetics',
        'Clean pillowcases regularly',
        'Manage stress levels',
      ],
    },
    treatments: [
      'Topical retinoids (tretinoin, adapalene)',
      'Benzoyl peroxide gel 2.5-5%',
      'Oral antibiotics if severe',
      'Hormonal therapy if indicated',
    ],
  },
  eczema: {
    name: 'Atopic Dermatitis (Eczema)',
    severity: 'Mild to Moderate - Treatment Available',
    description: 'Inflammatory skin condition with dry, itchy patches detected',
    recommendations: {
      immediate: [
        'Apply fragrance-free moisturizer multiple times daily',
        'Use mild, soap-free cleansers',
        'Avoid known triggers (harsh soaps, wool, stress)',
        'Consider over-the-counter hydrocortisone cream',
      ],
      lifestyle: [
        'Take lukewarm showers instead of hot baths',
        'Use humidifier in dry environments',
        'Wear soft, breathable fabrics',
        'Identify and avoid allergens',
      ],
    },
    treatments: [
      'Topical corticosteroids',
      'Moisturizing creams (ceramide-based)',
      'Calcineurin inhibitors',
      'Antihistamines for itching',
    ],
  },
  psoriasis: {
    name: 'Psoriasis',
    severity: 'Chronic Condition - Long-term Management Needed',
    description: 'Chronic autoimmune condition with scaly, thickened plaques',
    recommendations: {
      immediate: [
        'Consult dermatologist for treatment initiation',
        'Apply coal tar or salicylic acid preparations',
        'Moisturize affected areas regularly',
        'Avoid skin trauma (Koebner phenomenon)',
      ],
      lifestyle: [
        'Manage stress through relaxation techniques',
        'Avoid alcohol and smoking',
        'Maintain healthy weight',
        'Get adequate sunlight (with caution)',
      ],
    },
    treatments: [
      'Topical corticosteroids',
      'Vitamin D analogues',
      'Phototherapy (UVB light)',
      'Biologic medications for severe cases',
    ],
  },
  basalCell: {
    name: 'Basal Cell Carcinoma',
    severity: 'Moderate Risk - Medical Attention Required',
    description: 'Most common skin cancer, typically slow-growing with pearly appearance',
    recommendations: {
      immediate: [
        'Schedule dermatologist appointment within 2 weeks',
        'Biopsy recommended for confirmation',
        'Avoid sun exposure on affected area',
        'Document any changes in size or appearance',
      ],
      lifestyle: [
        'Use SPF 50+ sunscreen daily',
        'Perform regular skin self-checks',
        'Avoid peak sun hours (10 AM - 4 PM)',
        'Wear protective clothing outdoors',
      ],
    },
    treatments: [
      'Surgical excision',
      'Mohs micrographic surgery',
      'Topical chemotherapy (imiquimod)',
      'Radiation therapy if surgery not feasible',
    ],
  },
  fungal: {
    name: 'Fungal Infection (Tinea)',
    severity: 'Mild - Treatable with Antifungals',
    description: 'Fungal skin infection with characteristic ring-like pattern',
    recommendations: {
      immediate: [
        'Apply over-the-counter antifungal cream',
        'Keep affected area clean and dry',
        'Avoid sharing towels or clothing',
        'Wash hands frequently',
      ],
      lifestyle: [
        'Wear breathable, moisture-wicking fabrics',
        'Change socks daily',
        'Use antifungal powder in shoes',
        'Dry thoroughly after bathing',
      ],
    },
    treatments: [
      'Topical antifungals (clotrimazole, terbinafine)',
      'Oral antifungals for severe cases',
      'Keep area dry and clean',
      'Continue treatment for 2 weeks after clearing',
    ],
  },
  wart: {
    name: 'Common Wart (Verruca Vulgaris)',
    severity: 'Benign - Multiple Treatment Options',
    description: 'Viral infection causing rough, raised growths on skin',
    recommendations: {
      immediate: [
        'Avoid picking or scratching warts',
        'Apply salicylic acid solution as directed',
        'Cover wart to prevent spreading',
        'Consult doctor if painful or spreading',
      ],
      lifestyle: [
        'Do not share towels or personal items',
        'Keep hands and feet clean and dry',
        'Avoid walking barefoot in public areas',
        'Boost immune system with healthy diet',
      ],
    },
    treatments: [
      'Salicylic acid applications',
      'Cryotherapy (freezing)',
      'Laser treatment',
      'Immunotherapy for resistant warts',
    ],
  },
};
