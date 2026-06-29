import { useState } from 'react'
import {
  BookOpen, Droplets, Bug, Sprout, Sun,
  Wind, ChevronDown, ChevronUp, Search, Clock, AlertTriangle, CheckCircle, Info, Leaf, Thermometer, FlaskConical
} from 'lucide-react'

const categories = [
  { id: 'all', label: 'All Topics', icon: <BookOpen className="w-4 h-4" /> },
  { id: 'soil', label: 'Soil', icon: <Sprout className="w-4 h-4" /> },
  { id: 'irrigation', label: 'Irrigation', icon: <Droplets className="w-4 h-4" /> },
  { id: 'pest', label: 'Pest Control', icon: <Bug className="w-4 h-4" /> },
  { id: 'fertilizer', label: 'Fertilizers', icon: <Sun className="w-4 h-4" /> },
  { id: 'harvest', label: 'Harvest', icon: <Wind className="w-4 h-4" /> },
]

const advice = [
  {
    category: 'soil',
    title: 'Complete Soil Testing Guide',
    summary: 'Master soil analysis using simple home methods and understand exactly what your results mean for your crops.',
    emoji: '🪱',
    tag: 'Soil Health',
    readTime: '8 min',
    difficulty: 'Beginner',
    sections: [
      {
        type: 'intro',
        text: 'Healthy soil is the foundation of every good harvest. Before spending money on fertilizers or pesticides, understand what your soil already has — and what it lacks. These tests cost almost nothing but can save you thousands.'
      },
      {
        type: 'steps',
        title: '🧪 Test 1 — The Jar Sedimentation Test',
        steps: [
          'Fill a clean glass jar ¾ with soil from your field (take samples from 5 different spots and mix)',
          'Add water to fill the jar, then add 1 tsp of dish soap (helps separate particles)',
          'Shake vigorously for 2-3 minutes, then let it sit undisturbed for 24 hours',
          'Sand (heaviest) settles first at the bottom, then silt in the middle, then clay on top',
          'Measure each layer thickness — this tells you your soil texture percentage',
          'Ideal soil (loam) has roughly 40% sand, 40% silt, 20% clay'
        ]
      },
      {
        type: 'steps',
        title: '👐 Test 2 — The Ribbon/Feel Test (Instant)',
        steps: [
          'Take a handful of moist (not wet) soil and squeeze it in your palm',
          'Try to form a ribbon by pressing between thumb and index finger',
          'Sandy soil: crumbles immediately, feels gritty → add organic matter every season',
          'Silty soil: forms short ribbon (2-3cm), feels smooth and slippery → good drainage needed',
          'Clay soil: forms long ribbon (5cm+), feels sticky → add gypsum and organic matter',
          'Loamy soil: medium ribbon, slightly gritty and smooth → ideal, maintain with organic matter'
        ]
      },
      {
        type: 'steps',
        title: '🌡️ Test 3 — pH Strips (Most Important)',
        steps: [
          'Buy pH strips from any agri-input shop (costs ₹30-50 for 100 strips)',
          'Mix 1 part soil with 2 parts distilled water (or rain water), stir well',
          'Let it settle for 5 minutes, then dip pH strip in the clear water above the sediment',
          'Compare colour to the chart on the packet',
          'pH 6.0–7.0 = ideal for most crops (wheat, vegetables, pulses)',
          'pH below 5.5 = acidic, apply agricultural lime',
          'pH above 7.5 = alkaline, apply gypsum or sulphur',
          'Test at the start of each kharif and rabi season for best results'
        ]
      },
      {
        type: 'steps',
        title: '🐛 Test 4 — Earthworm Count (Biological Health)',
        steps: [
          'Dig a 30×30×30 cm cube of soil in 3-4 locations in your field',
          'Place all the soil on a tarp and count every earthworm you find',
          '15+ worms per cube = excellent biological activity, soil is healthy',
          '5–14 worms per cube = moderate, add more organic matter (compost/FYM)',
          'Less than 5 worms = poor soil biology, avoid excessive chemical fertilizers and pesticides',
          'Earthworms aerate the soil, improve drainage, and break down organic matter'
        ]
      },
      {
        type: 'table',
        title: '📊 Soil Test Frequency Guide',
        headers: ['Soil Parameter', 'How Often', 'Method', 'Cost'],
        rows: [
          ['pH Level', 'Every season', 'pH strips', '₹0.30 per test'],
          ['Texture (Sand/Silt/Clay)', 'Every 3 years', 'Jar test', 'Free'],
          ['Organic Carbon', 'Every 2 years', 'Lab test', '₹200-300'],
          ['NPK Levels', 'Every 2 years', 'Lab test', '₹400-600'],
          ['Micronutrients (Zn, Fe, B)', 'Every 3-5 years', 'Lab test', '₹600-1000'],
          ['Earthworm Count', 'Every season', 'Manual count', 'Free']
        ]
      },
      {
        type: 'warning',
        text: 'Send soil to a government-certified lab (Krishi Vigyan Kendra or state agriculture department lab) for NPK and micronutrient tests. Private labs are fine but always ask for the lab\'s accreditation certificate.'
      },
      {
        type: 'tip',
        text: 'Golden Rule: Collect soil samples from at least 5-7 different spots in your field and mix them together before testing. This gives you a representative average. Sample depth: 0-15cm for most crops, 0-30cm for deep-rooted crops like sugarcane.'
      }
    ]
  },
  {
    category: 'irrigation',
    title: 'Precision Irrigation — Crop-by-Crop Water Management',
    summary: 'Detailed irrigation schedules, water stress signs, and water-saving techniques for every major crop.',
    emoji: '💧',
    tag: 'Water Management',
    readTime: '10 min',
    difficulty: 'Intermediate',
    sections: [
      {
        type: 'intro',
        text: 'Water is the single biggest input cost and the most mismanaged resource on most farms. Overwatering wastes water, promotes fungal diseases, and leaches nutrients. Underwatering at critical stages can cut yields by 30-50%. This guide helps you water precisely.'
      },
      {
        type: 'steps',
        title: '🌿 Reading Your Crop\'s Water Stress Signals',
        steps: [
          'Morning leaf curl or drooping (before 9 AM) = definite water stress, irrigate within 24 hours',
          'Afternoon drooping (after 2 PM) = normal heat response, NOT a water stress sign',
          'Bluish-grey leaf colour (instead of green) = early stress indicator in cereals',
          'Soil dry at 5cm depth when you push your finger in = irrigation needed',
          'Slow or stunted new growth = check for water stress first before applying fertilizers',
          'Yellowing of lower leaves = could be waterlogging OR severe drought — check soil moisture'
        ]
      },
      {
        type: 'table',
        title: '📅 Crop-Wise Irrigation Schedule',
        headers: ['Crop', 'Total Irrigations', 'Critical Stages', 'Water Need per Irrigation', 'Skip If Rain'],
        rows: [
          ['Wheat', '4-6 times', 'Crown root (21d), Tillering (45d), Flowering (75d), Grain fill (90d)', '5-6 cm', '>30mm rain'],
          ['Rice (transplanted)', 'Continuous', 'Maintain 5cm standing water', 'Top up as needed', 'Drain excess'],
          ['Cotton', '6-8 times', 'Flowering, Boll formation', '5-7 cm every 10-15d', '>25mm rain'],
          ['Maize', '4-5 times', 'Knee-high stage, Tasseling, Grain fill', '5-6 cm', '>35mm rain'],
          ['Soybean', '3-4 times', 'Flowering, Pod fill', '4-5 cm', '>30mm rain'],
          ['Tomato', 'Every 4-7 days', 'Flowering, Fruit set, Fruit development', '3-4 cm', '>20mm rain'],
          ['Potato', 'Every 7-10 days', 'Tuber initiation (30-60d)', '4-5 cm', '>25mm rain'],
          ['Onion', 'Every 7-10 days', 'Bulb development', '3-4 cm', '>25mm rain'],
          ['Chickpea', '1-2 times only', 'Pre-flowering, Pod formation', '4-5 cm', 'Yes if >20mm'],
          ['Sugarcane', '8-10 times/year', 'Grand growth period', '7-8 cm', '>40mm rain']
        ]
      },
      {
        type: 'steps',
        title: '⏰ When and How to Irrigate',
        steps: [
          'Best time: Early morning (6-8 AM) — reduces evaporation by 40%, plants absorb better',
          'Second best: Evening (5-7 PM) — acceptable, but increases risk of fungal disease overnight',
          'Never irrigate: Midday (11 AM–3 PM) — up to 50% water is lost to evaporation + thermal shock to roots',
          'Flood irrigation: Level your field first — uneven fields waste 20-30% water in runoff',
          'Check channel losses: If water takes >2 hours to reach far end, your channels are leaking',
          'For sandy soils: Give lighter, more frequent irrigations (smaller quantities more often)'
        ]
      },
      {
        type: 'steps',
        title: '💡 Water-Saving Techniques',
        steps: [
          'Drip irrigation: Saves 40-60% water, delivers directly to root zone, reduces disease — best for vegetables, fruits, sugarcane',
          'Sprinkler irrigation: Saves 25-35% water, good for wheat, vegetables, irregular terrain',
          'Mulching: Apply 5-8cm of dry straw, dry leaves, or plastic mulch between rows — reduces evaporation by 30-40%',
          'Laser land leveling: One-time investment that can save 20-25% irrigation water permanently',
          'Check dams and farm ponds: Capture runoff water for use in dry spells',
          'Alternate wetting and drying (AWD) in rice: Saves 15-30% water with no yield loss — ask your KVK for guidance'
        ]
      },
      {
        type: 'warning',
        text: 'Never irrigate within 3-4 days of applying urea or other nitrogen fertilizers — this causes the fertilizer to leach down below the root zone and you lose the benefit. Wait for soil to be slightly dry before applying nitrogen.'
      },
      {
        type: 'tip',
        text: 'Install a rain gauge (costs ₹200-300) in your field. Knowing exactly how much rain fell helps you decide whether to skip an irrigation and saves water and effort.'
      }
    ]
  },
  {
    category: 'pest',
    title: 'Advanced Integrated Pest Management (IPM)',
    summary: 'Identify 15+ major pests accurately, understand their life cycles, and use the most effective, economical control methods.',
    emoji: '🐛',
    tag: 'Pest Management',
    readTime: '12 min',
    difficulty: 'Advanced',
    sections: [
      {
        type: 'intro',
        text: 'IPM is not about eliminating every pest — it\'s about keeping pest populations below the level where they cause economic damage. Over-spraying kills beneficial insects, creates resistant pest strains, and increases costs. Scout first, spray only when necessary.'
      },
      {
        type: 'steps',
        title: '🔍 How to Properly Scout Your Field',
        steps: [
          'Scout at least twice a week during the crop growth period — early morning is best',
          'Walk in a W or Z pattern across the field to cover all areas, not just field edges',
          'Check 20 random plants per acre — examine upper leaves, lower leaves, stems, and soil near roots',
          'Count pest numbers per plant or per leaf — compare to the Economic Threshold Level (ETL)',
          'Note which pests and which beneficial insects (spiders, ladybugs, wasps) you see',
          'Keep a field diary — patterns across seasons will help you anticipate next year\'s outbreaks'
        ]
      },
      {
        type: 'table',
        title: '🪲 Pest Identification & IPM Control Guide',
        headers: ['Pest', 'Crop', 'How to Identify', 'ETL (spray when...)', 'IPM Control', 'Chemical (last resort)'],
        rows: [
          ['Aphids', 'All crops', 'Clusters of tiny green/black insects on leaf undersides and new shoots', '50+ per plant', 'Neem oil 5ml/L + yellow sticky traps + release ladybugs', 'Imidacloprid 0.3ml/L'],
          ['Cotton Bollworm', 'Cotton', 'Holes in bolls & flowers; caterpillars inside bolls', '5% damaged squares', 'Bt spray + pheromone traps + neem cake in soil', 'Chlorpyrifos 2ml/L'],
          ['Brown Plant Hopper (BPH)', 'Rice', 'Hopperburn (circular yellow-brown patches); insects at base of plants', '10 insects per tiller', 'Drain water 5 days + avoid excess nitrogen + resistant varieties', 'Buprofezin 1ml/L'],
          ['Stem Borer', 'Rice/Wheat', 'Dead hearts (seedling stage) or white ears (grain stage)', '5% dead hearts or 2% white ears', 'Pheromone traps + Trichogramma egg parasitoid release', 'Cartap hydrochloride 2g/L'],
          ['White Fly', 'Cotton/Vegetables', 'Tiny white flies, yellowing leaves, sticky honeydew on leaves', '6 per leaf', 'Yellow sticky traps + neem oil spray + reflective mulch', 'Thiamethoxam 0.5g/L'],
          ['Leaf Miner', 'Vegetables', 'White/silver serpentine tunnels on leaves', '1 mine per leaf (vegetables)', 'Remove infected leaves early + neem spray', 'Spinosad 0.5ml/L'],
          ['Red Spider Mite', 'Cotton/Vegetables', 'Fine webbing under leaves; stippled, bronzed leaves', '5+ mites per leaf', 'Water jet spray + neem oil + predatory mite release', 'Abamectin 0.5ml/L'],
          ['Thrips', 'Onion/Cotton/Chilli', 'Silvery streaks on leaves; curled leaf tips', '20 per plant', 'Blue sticky traps + spinosad + neem spray', 'Fipronil 1.5ml/L'],
          ['Cutworm', 'All crops', 'Seedlings cut off at ground level overnight', '1 cutworm per sq.m', 'Soil drench with Bt + birds roosting in field', 'Chlorpyrifos soil drench'],
          ['Fruit Borer (Tomato)', 'Tomato/Brinjal', 'Caterpillar entry hole in fruit; frass visible', '1% fruit damage', 'Pheromone traps + Bt spray + remove damaged fruit', 'Emamectin benzoate 0.4g/L']
        ]
      },
      {
        type: 'steps',
        title: '🌿 Biological Control — Your First Line of Defence',
        steps: [
          'Trichogramma cards: Small parasitic wasps that destroy stem borer and bollworm eggs — buy from KVK or private suppliers, release 1 card per 5,000 sq.m weekly for 4-6 weeks',
          'Trichoderma: Beneficial fungus that controls soil-borne diseases like damping off and root rot — mix with compost before soil application',
          'Pseudomonas fluorescens: Bacterial spray that suppresses many fungal and bacterial diseases — spray 5g/L every 15 days as preventive',
          'NPV (Nucleopolyhedrovirus): Specific virus that kills bollworm — spray at first sign of larval damage, more effective than many chemicals',
          'Attract beneficial insects: Plant marigold, coriander, sunflower, or mustard as border crops — they harbour predatory insects that control pests naturally'
        ]
      },
      {
        type: 'steps',
        title: '⚠️ Safe Pesticide Use — Critical Rules',
        steps: [
          'Always read the label completely before use — note dilution rate, target pest, waiting period before harvest',
          'Never mix two pesticides unless specifically recommended — chemical reactions can cause toxicity or neutralize effectiveness',
          'Rotate pesticide chemical groups every 2-3 sprays to prevent resistance (never use the same chemical class consecutively)',
          'Wear full protective gear: gloves, long sleeves, mask, and goggles — never spray barefoot or in shorts',
          'Spray in the evening (5-7 PM) to protect honeybees — never spray during flowering if bees are active',
          'Observe Pre-Harvest Interval (PHI) strictly — this is the mandatory gap between last spray and harvest date listed on the label'
        ]
      },
      {
        type: 'warning',
        text: 'If you see the same chemical failing that worked last season, you may have resistant pests. Do NOT increase the dose — this accelerates resistance further. Switch to a completely different chemical class and consult your agriculture officer.'
      }
    ]
  },
  {
    category: 'fertilizer',
    title: 'Complete Fertilizer Management — From Soil to Yield',
    summary: 'Master NPK nutrition, understand deficiency symptoms, create season-wise fertilizer plans, and explore organic alternatives.',
    emoji: '🧪',
    tag: 'Fertilizers',
    readTime: '15 min',
    difficulty: 'Intermediate',
    sections: [
      {
        type: 'intro',
        text: 'Fertilizers are the largest variable input cost on most farms, yet most farmers apply them based on habit rather than crop need. Understanding when, how, and how much to apply can cut costs by 20-30% while improving yields.'
      },
      {
        type: 'steps',
        title: '🌱 Understanding the Three Primary Nutrients',
        steps: [
          'Nitrogen (N): Drives vegetative growth and leaf greenness. Highly mobile in soil — applies in splits to prevent leaching. Sources: Urea (46% N), DAP (18% N), Ammonium sulphate (21% N + 24% S)',
          'Phosphorus (P): Builds root systems, supports flowering and grain formation. Immobile in soil — must be incorporated near root zone at sowing. Sources: DAP (46% P₂O₅), SSP (16% P₂O₅ + 11% S)',
          'Potassium (K): Strengthens cell walls, improves disease resistance, enhances quality. Moderately mobile. Sources: MOP (60% K₂O), SOP (50% K₂O — better for chloride-sensitive crops like potato, grapes)',
          'Sulphur (S): Often the 4th limiting nutrient in Indian soils. Deficiency common after years of using MOP over SSP. Source: Gypsum (18% S), SSP, Ammonium sulphate',
          'Zinc (Zn): Deficiency widespread in paddy-wheat belt. Symptoms: light green to yellow colour between veins of young leaves. Apply ZnSO₄ at 25 kg/acre every 2-3 years',
          'Boron (B): Critical for pollination, fruit set, seed quality. Deficiency causes hollow heart in potato, poor pod fill in pulses. Apply 1-2 kg borax per acre at sowing'
        ]
      },
      {
        type: 'table',
        title: '📊 Recommended Fertilizer Doses (NPK kg per acre)',
        headers: ['Crop', 'N (kg/acre)', 'P₂O₅ (kg/acre)', 'K₂O (kg/acre)', 'Urea qty', 'DAP qty', 'MOP qty'],
        rows: [
          ['Wheat (irrigated)', '50-55', '20-22', '12-15', '110-120 kg', '44-48 kg', '20-25 kg'],
          ['Rice (transplanted)', '40-45', '18-20', '15-18', '88-98 kg', '40-44 kg', '25-30 kg'],
          ['Cotton (hybrid)', '55-60', '22-25', '18-20', '120-130 kg', '48-54 kg', '30-33 kg'],
          ['Maize (hybrid)', '60-65', '25-28', '18-20', '130-141 kg', '54-61 kg', '30-33 kg'],
          ['Tomato', '40-45', '25-28', '30-35', '88-98 kg', '54-61 kg', '50-58 kg'],
          ['Potato', '45-50', '30-35', '40-45', '98-109 kg', '65-76 kg', '67-75 kg'],
          ['Chickpea/Lentil', '8-10', '18-20', '8-10', '18-22 kg', '39-44 kg', '13-17 kg'],
          ['Onion', '35-40', '20-22', '25-28', '76-87 kg', '44-48 kg', '42-47 kg'],
          ['Soybean', '8-10', '20-22', '12-15', '18-22 kg', '44-48 kg', '20-25 kg'],
          ['Sugarcane', '90-100', '35-40', '40-45', '196-217 kg', '76-87 kg', '67-75 kg']
        ]
      },
      {
        type: 'steps',
        title: '⏳ Fertilizer Split Application Strategy',
        steps: [
          'At sowing: Apply ALL phosphorus (DAP/SSP) and potassium (MOP) + 1/3rd of nitrogen — these must be incorporated into soil',
          'First top dressing (25-30 days after sowing): Apply 1/3rd of nitrogen as urea — when crop is establishing its vegetative structure',
          'Second top dressing (50-60 days / at tillering or branching): Apply remaining 1/3rd nitrogen — this drives grain or fruit development',
          'Never apply urea on wet/flooded soil — it volatilizes as ammonia gas and you lose 30-50% of nitrogen to the air',
          'For vegetables and cash crops: Use fertigation (drip irrigation + water-soluble fertilizers) for 30-40% better nutrient efficiency',
          'Foliar spray for micronutrients: 0.5% ZnSO₄ or 0.1% borax spray at flowering gives faster response than soil application'
        ]
      },
      {
        type: 'table',
        title: '🔍 Deficiency Symptom Diagnosis Guide',
        headers: ['Nutrient', 'Which Leaves Affected', 'Colour/Symptom', 'Correction'],
        rows: [
          ['Nitrogen (N)', 'Older/lower leaves first', 'Pale yellow-green, starting from tip', 'Urea top dressing or foliar 2% urea spray'],
          ['Phosphorus (P)', 'Older leaves, undersides', 'Purple/reddish-brown colour', 'SSP or DAP — must be soil applied'],
          ['Potassium (K)', 'Older leaf edges', 'Brown/burnt leaf margins (scorching)', 'MOP soil application or SOP for sensitive crops'],
          ['Zinc (Zn)', 'Young leaves', 'Yellow between veins (interveinal chlorosis), small leaves', 'ZnSO₄ 25 kg/acre soil or 0.5% foliar spray'],
          ['Iron (Fe)', 'Young leaves', 'Bright yellow between veins, veins remain green', 'FeSO₄ foliar spray 1% (acidify water with citric acid)'],
          ['Boron (B)', 'Growing tip dies', 'Hollow stem, poor flower retention, cracked fruit', 'Borax 1-2 kg/acre or 0.1-0.2% foliar spray'],
          ['Sulphur (S)', 'Young leaves uniformly', 'Uniform pale yellow-green, similar to N but young leaves first', 'Gypsum 100 kg/acre or SSP instead of DAP'],
          ['Magnesium (Mg)', 'Older leaves', 'Interveinal chlorosis, leaf edges remain green', 'MgSO₄ foliar spray 2% or kieserite soil application']
        ]
      },
      {
        type: 'warning',
        text: 'Excess fertilizer is as harmful as deficiency. Over-application of nitrogen causes excessive leafy growth at the expense of grain, increases disease susceptibility, causes groundwater contamination, and wastes money. Always match your dose to your crop\'s actual needs and soil test results.'
      },
      {
        type: 'tip',
        text: 'Biofertilizers cost ₹30-50 per treatment and can save 20-25% chemical fertilizer costs. Rhizobium for legumes (chickpea, soybean, groundnut) fixes atmospheric nitrogen. Azospirillum for cereals improves nitrogen uptake. PSB (Phosphate Solubilizing Bacteria) makes bound phosphorus available. Always coat seeds with biofertilizers as the last step before sowing.'
      }
    ]
  },
  {
    category: 'fertilizer',
    title: 'Organic Farming — Full Transition Guide',
    summary: 'Step-by-step roadmap to reduce chemical inputs, build soil health, and eventually achieve organic certification.',
    emoji: '🌿',
    tag: 'Organic',
    readTime: '12 min',
    difficulty: 'Intermediate',
    sections: [
      {
        type: 'intro',
        text: 'Organic farming is not simply "farming without chemicals" — it\'s a complete soil management philosophy. The transition takes 2-3 years and requires planning, but farmers who complete it report 30-50% lower input costs and access to premium markets.'
      },
      {
        type: 'steps',
        title: '📅 Year-by-Year Transition Roadmap',
        steps: [
          'Year 1 — Foundation: Start composting, apply 5 tons FYM/acre, reduce chemical fertilizers by 30%, begin using biofertilizers for all legumes',
          'Year 2 — Reduction: Apply 7 tons FYM/acre, cut chemical fertilizers by 60%, use only organic pesticides (neem, Bt, Trichoderma), plant green manure crops in one season',
          'Year 3 — Organic: Apply 8-10 tons FYM/acre + biofertilizers + vermicompost, zero chemical pesticides, begin certification process',
          'Year 4 onwards: Full organic production with certification premium prices',
          'Important: Keep at least 30% of your land on conventional farming during transition years to maintain income security',
          'Document everything: Keep records of all inputs applied, dates, and quantities — this is required for certification'
        ]
      },
      {
        type: 'steps',
        title: '♻️ Making Quality Compost (Nadepa / Bangalore Method)',
        steps: [
          'Collect materials: crop residue, kitchen waste (no meat), cow dung, dry leaves — aim for 3 parts dry:1 part green material',
          'Build a pit 12ft × 5ft × 3ft deep OR a heap of similar volume — do not make it smaller (heat won\'t build)',
          'Layer 15cm dry material + thin cow dung layer + 15cm green material, repeat until full, water each layer',
          'Cover completely with mud plaster to retain heat and moisture — temperature inside should reach 55-65°C (kills weed seeds)',
          'Turn the pile at 15, 30, and 45 days to aerate and ensure even composting',
          'Compost is ready at 45-60 days when it\'s dark brown, crumbly, earthy-smelling, and has no recognizable materials left'
        ]
      },
      {
        type: 'steps',
        title: '🪱 Vermicomposting (Higher Quality than Regular Compost)',
        steps: [
          'Use Eisenia fetida (red wriggler) worms — available from KVK or private suppliers for ₹200-300/kg',
          'Build a shaded bed 3ft × 6ft × 1.5ft — concrete, brick, or wooden frame works',
          'Add 6 inches of semi-decomposed FYM or compost as bedding, then release worms (1-2 kg per bed)',
          'Feed kitchen waste and soft green material in small quantities every 2-3 days — never add meat, oily food, or citrus',
          'Maintain moisture (like a wrung-out sponge) — not too wet, not dry',
          'Harvest in 45-60 days: push the finished vermicompost to one side, worms will migrate away from it, collect worms for next batch',
          'Apply at 500 kg-1 ton per acre — higher quality than FYM, rich in plant growth hormones'
        ]
      },
      {
        type: 'steps',
        title: '🌾 Green Manure Crops (Free Nitrogen)',
        steps: [
          'Dhaincha (Sesbania): Fixes 60-80 kg N/acre, very fast growing (45-60 days), best for rice fields — plough in just before flowering',
          'Sunhemp (Crotalaria): Fixes 40-50 kg N/acre, also suppresses nematodes in soil, 45-60 day cycle',
          'Cowpea: Dual purpose — harvest first flush of pods for income, then plough in the vegetative parts',
          'Berseem clover: Excellent for rabi season green manure in wheat-belt areas',
          'Sow at start of monsoon, incorporate at 50-60% flowering stage (maximum biomass + maximum nitrogen)',
          'Green manure crops need one irrigation in addition to rain — the nitrogen benefit far outweighs this cost'
        ]
      },
      {
        type: 'tip',
        text: 'Jeevamrit (fermented bio-stimulant): Mix 10 kg cow dung + 10L cow urine + 2 kg jaggery + 2 kg gram flour + 1 handful local soil in 200L water. Ferment 48-72 hours, stirring 3 times daily. Apply 200L per acre as soil drench or diluted as foliar spray. Stimulates soil microorganisms powerfully. Cost: almost zero if you have cattle.'
      }
    ]
  },
  {
    category: 'harvest',
    title: 'Harvest Timing Mastery — Every Crop Explained',
    summary: 'Precise harvest indicators for 12 major crops, plus how to avoid the two biggest post-harvest losses.',
    emoji: '🌾',
    tag: 'Harvesting',
    readTime: '10 min',
    difficulty: 'Beginner',
    sections: [
      {
        type: 'intro',
        text: 'Timing the harvest wrong by even a few days can reduce your income by 10-20%. Harvesting too early means low quality and weight. Harvesting too late means field losses, quality degradation, and vulnerability to weather. Learn the precise indicators for each crop.'
      },
      {
        type: 'table',
        title: '📅 Crop Harvest Readiness Indicators',
        headers: ['Crop', 'Days After Sowing', 'Visual Indicator', 'Physical Test', 'Moisture at Harvest', 'Storage Moisture'],
        rows: [
          ['Wheat', '110-130 days', '75% of crop turns golden; straw dry and brittle', 'Grain hard, not dented by fingernail', '20-25%', '<14%'],
          ['Rice', '105-150 days', '80-85% of grains turn golden yellow', 'Grain hard, milky white', '22-28%', '<14%'],
          ['Maize', '90-110 days', 'Husk turns dry/brown; silk turns dark brown', 'Thumbnail dent stays = dent; no dent = flint', '28-32%', '<14%'],
          ['Cotton', '150-180 days', 'Bolls burst open spontaneously', '3-4 pickings at weekly intervals', 'Dry naturally', 'Below 10%'],
          ['Soybean', '90-110 days', '85-90% of pods turn brown', 'Pods rattle when shaken', '16-20%', '<13%'],
          ['Tomato', '60-80 days', 'First colour change (breaker) for transport; fully red for local', 'Firm, not soft', 'N/A', 'Do not refrigerate green'],
          ['Potato', '70-110 days', 'Vines yellow and die naturally', 'Skin set — rub doesn\'t peel easily; stop irrigation 10d before', '75-80% water content', '4-10°C, dark'],
          ['Onion', '120-150 days', '50-60% of tops have fallen over', 'Outer scales papery', 'Cure 7-10 days in field', 'Cool, dry, dark'],
          ['Chickpea', '90-110 days', '75% of pods turn straw colour', 'Pods rattle; seed hard', '20-25%', '<12%'],
          ['Mustard/Rapeseed', '110-130 days', '75% of siliques turn golden', 'Seeds turn dark brown', '30-35% (before shattering)', '<8%'],
          ['Groundnut', '100-140 days', 'Inner pod wall shows dark markings', 'Pull a test plant — kernel fills shell fully', '35-50%', '<9%'],
          ['Sugarcane', '10-14 months', 'Top leaves yellow, growth slows', 'Brix test 20-22%; talk to mill for optimal date', 'Fresh', 'Process within 24-48 hrs']
        ]
      },
      {
        type: 'steps',
        title: '🕐 Harvesting Best Practices',
        steps: [
          'Harvest cereals in morning after dew has dried but before afternoon heat — hot conditions cause grain shattering',
          'Never harvest wet crops — wet grain/produce in storage is the #1 cause of mould and post-harvest losses',
          'Stage harvesting for large fields: start from the driest/most mature portion, let the rest mature 2-3 more days',
          'For combine harvesting: ensure cutter bar height is correct — too low wastes fuel and picks up soil (contaminates grain), too high leaves crop',
          'Avoid harvesting during or right after rainfall — soil compaction damages next crop\'s root zone',
          'Check weather forecast: have 3-5 clear days ahead before beginning harvest of any major crop'
        ]
      },
      {
        type: 'steps',
        title: '📉 Drying Grain Safely to Storage Moisture',
        steps: [
          'Sun drying on clean tarpaulins or pucca floor: spread 4-5 cm thick, turn every 2-3 hours',
          'Target <14% moisture for safe storage of cereals — test with portable moisture meter (available at ₹1,500-3,000)',
          'Quick field test: Take a handful of grain — if it flows freely and doesn\'t clump, it\'s below 14%. If it clumps together, keep drying',
          'Never dry grain on bare soil — contaminates with soil, weed seeds, and moisture from ground',
          'Avoid drying in full peak afternoon sun (above 45°C) for more than 2 consecutive days — can cause stress cracks in grain',
          'Mechanical drying (batch dryers): Available through FPOs and APMC mandis — costs ₹0.50-1.00 per kg but saves time'
        ]
      },
      {
        type: 'warning',
        text: 'Pre-harvest sprouting occurs when grain gets rained on while still on the plant — this dramatically reduces quality and price. If rains are forecast during your harvest window, harvest at slightly higher moisture (20-22%) and dry artificially rather than risk sprouting losses.'
      }
    ]
  },
  {
    category: 'harvest',
    title: 'Post-Harvest Storage — Zero Loss Strategy',
    summary: 'Eliminate the 10-30% grain losses that happen after harvest with proven storage, fumigation, and marketing strategies.',
    emoji: '🏪',
    tag: 'Storage',
    readTime: '10 min',
    difficulty: 'Intermediate',
    sections: [
      {
        type: 'intro',
        text: 'In India, post-harvest losses account for 10-15% of grain production and up to 30-35% of horticultural produce. This is income you have already grown — don\'t let it walk away. Proper storage is the single highest-return investment a farmer can make.'
      },
      {
        type: 'steps',
        title: '🏚️ Storage Structure Preparation',
        steps: [
          'Clean storage area at least 15 days before new grain arrives — sweep, wash with lime solution (1 kg lime in 10L water)',
          'Fumigate empty structure: use 3g aluminium phosphide (Celphos) per 100 cubic feet, seal for 5-7 days, ventilate completely before adding grain',
          'Check for cracks, holes, and gaps — seal with cement or clay. Even small openings allow rodents (which can destroy 5-10% of stored grain)',
          'Install rat guards (metal collars) on all support pillars and seal gaps where pipes enter the structure',
          'Place bags on wooden pallets at least 12 inches off the floor — never directly on concrete or soil (moisture absorption)',
          'Stack bags in blocks leaving 18-inch aisles between stacks for air circulation and inspection access'
        ]
      },
      {
        type: 'table',
        title: '🐛 Storage Pest Identification & Control',
        headers: ['Storage Pest', 'Crop Affected', 'Identification', 'Control Method', 'Fumigation Chemical'],
        rows: [
          ['Khapra beetle', 'Wheat, Rice, Maize', 'Hairy brown larvae, powdery dust in grain', 'Dust with malathion, fumigate with EDCT mixture', 'ALP 3g/100 cu.ft'],
          ['Rice weevil', 'Rice, Wheat, Maize', 'Small holes in grain; tiny brown insects with snouts', 'Hermetic bags + ALP fumigation', 'ALP 3g/100 cu.ft'],
          ['Pulse beetle', 'All pulses', 'Round holes in seeds; powder residue', 'Mix neem leaves + store; ALP for large stock', 'ALP 1.5g/100 cu.ft'],
          ['Grain moth', 'Wheat, Rice', 'Webbing over grain surface; caterpillar frass', 'Bin sprays + ALP fumigation', 'EDCT 5ml/L spray'],
          ['Flat grain beetle', 'All grains', 'Flat, shiny brown insects; musty smell', 'Dry grain properly, hermetic storage', 'ALP 3g/100 cu.ft'],
          ['Aflatoxin (fungus)', 'Maize, Groundnut, Chilli', 'Green/yellow mould, musty smell, high moisture', 'Store below 14% moisture, good ventilation', 'Prevention ONLY — no cure']
        ]
      },
      {
        type: 'steps',
        title: '🛡️ Safe Fumigation Procedure (Aluminium Phosphide)',
        steps: [
          'ALP (Celphos/Quickphos) releases highly toxic phosphine gas — must be handled by trained persons only',
          'Calculate dose: 3 tablets per metric ton of grain for wheat/rice; 2 tablets per metric ton for pulses',
          'Seal the storage structure completely — cover all ventilators, gaps, and pipe entries with cloth/tape',
          'Place tablets on cloth/paper squares on TOP of the grain stack — never bury inside grain',
          'Seal entry points and vacate completely — no re-entry for minimum 5 days',
          'After 5 days: open all ventilators and entry points from outside, wait 6 hours, then check with candle test — if candle burns normally, it\'s safe to enter',
          'Dispose of spent tablets by burying in soil away from water sources — NEVER in open air or water'
        ]
      },
      {
        type: 'steps',
        title: '💰 Strategic Grain Selling to Maximize Price',
        steps: [
          'Never sell your entire harvest in the first 2-4 weeks — this is when all farmers sell and prices are at their annual lowest',
          'Prices typically rise 15-25% within 3-6 months of harvest when market supply normalizes',
          'Use government warehousing schemes (Warehouse Receipt System): store at a registered warehouse, get a receipt, and borrow 70-80% of grain value as a loan against it — sell when prices rise',
          'Join an FPO (Farmer Producer Organisation): pool storage and selling with other farmers to achieve volumes that attract better buyers',
          'MSP procurement: Register on e-NAM (National Agriculture Market) before harvest season — check if your crop/state is covered',
          'Keep a price tracking habit: check local mandi prices weekly and compare to MSP — sell when price exceeds MSP + 5-10%'
        ]
      },
      {
        type: 'warning',
        text: 'NEVER store wet grain (above 14-15% moisture) — even for a few days. Aflatoxin mould can develop within 24-48 hours in warm, moist conditions. Grain testing above 20 ppb aflatoxin will be rejected at procurement centres and is a serious health risk. Always dry first, then store.'
      },
      {
        type: 'tip',
        text: 'Hermetic storage bags (Purdue Improved Crop Storage — PICS bags) are a low-cost revolution for smallholder farmers. These triple-layer airtight bags cost ₹80-120 per bag and can store grain for 6-12 months with zero chemical inputs, zero fumigation, and zero insect damage — the insects suffocate in the sealed environment. Available at most agri-input shops or through Gram Vaani and e-choupal networks.'
      }
    ]
  },
  {
    category: 'soil',
    title: 'Soil Reclamation — Restoring Problem Soils',
    summary: 'Proven techniques to rehabilitate acidic, saline, waterlogged, and degraded soils back to full productivity.',
    emoji: '🏔️',
    tag: 'Soil Improvement',
    readTime: '11 min',
    difficulty: 'Advanced',
    sections: [
      {
        type: 'intro',
        text: 'Over 100 million hectares of agricultural land in India is degraded — acidic, saline, alkaline, or physically degraded. But no soil is beyond recovery. Understanding the problem and applying the right treatment can turn unproductive land into high-yielding fields within 2-3 seasons.'
      },
      {
        type: 'table',
        title: '📊 Soil Problem Diagnosis & Treatment Guide',
        headers: ['Soil Problem', 'pH Range', 'Signs', 'Root Cause', 'Primary Treatment', 'Supporting Treatment'],
        rows: [
          ['Acidic soil', 'pH < 6.0', 'Yellowing despite fertilizer, poor germination, visible reddish subsoil', 'Heavy rainfall leaching, excess nitrogen use, inherently acidic parent material', 'Ag. lime 200-400 kg/acre (finer = faster action), apply 2-3 months before sowing', 'Add 5 tons FYM, grow acid-tolerant crops (rice, tea) during correction period'],
          ['Highly acidic', 'pH < 5.0', 'Manganese/aluminium toxicity — brown necrotic spots on leaves', 'Same as above, more severe', 'Dolomitic lime 500-600 kg/acre — provides Mg + Ca', 'Avoid DAP (acidifying), use SSP; foliar spray of lime solution 2%'],
          ['Saline soil', 'pH 7-8.5, EC >4 dS/m', 'White salt crust on surface, patchy germination, tip burn on leaves', 'High water table, excess irrigation with saline water, poor drainage', 'Flood-and-drain leaching: 2-3 deep irrigations with drainage; improve drainage channels', 'Grow salt-tolerant crops: barley, mustard, sugarbeet, Karnal local wheat varieties'],
          ['Sodic/Usar soil', 'pH > 8.5 (high Na)', 'Soil seals after rain (black adobe effect), water ponds, slippery when wet', 'Excess exchangeable sodium — structural collapse', 'Gypsum 400-600 kg/acre — Na replaced by Ca; flood-and-drain leaching', 'Deep ploughing (subsoiling) to break hardpan; grow dhaincha as green manure'],
          ['Waterlogged', 'Any pH', 'Standing water after rain, bluish-grey subsoil, root rot, gaseous smell', 'Poor drainage, impermeable hardpan, high water table', 'Open field drains or underground tile drains; subsoil ploughing to break hardpan', 'Raised bed cultivation; grow flood-tolerant crops: rice, taro, pumpkin'],
          ['Sandy degraded', 'Any pH', 'Very low moisture retention, rapid nutrient leaching, loose surface', 'Erosion of topsoil, low organic matter', 'Add 10 tons FYM/acre for 3-5 consecutive years; apply clay/silt if locally available', 'Mulching, cover crops, windbreaks; contour bunding on slopes'],
          ['Hardpan (tillage pan)', 'Any pH', 'Roots can\'t penetrate below 20-25cm, good topsoil but stunted growth', 'Repeated ploughing at same depth creates compacted layer', 'Chisel plough or subsoiler once every 3-5 years — break to 40-50cm depth', 'Grow deep-rooted crops: sunflower, pigeon pea, cassava to break pan biologically']
        ]
      },
      {
        type: 'steps',
        title: '🌊 Reclaiming Saline-Sodic Soil — Step-by-Step Process',
        steps: [
          'Step 1 (Pre-treatment): Bund the field to hold water, check internal drainage — waterlogging worsens sodicity',
          'Step 2 (Gypsum application): Broadcast gypsum at 400-600 kg/acre based on soil test for Exchangeable Sodium Percentage (ESP)',
          'Step 3 (Flood-and-drain): Flood field with 15-20cm freshwater, hold for 3-4 days, then drain — this leaches sodium chloride from soil. Repeat 2-3 times before sowing',
          'Step 4 (Green manuring): Sow dhaincha (Sesbania) at 20 kg seed/acre on residual moisture — do not irrigate unless rainfall is nil. Plough in at 50% flowering',
          'Step 5 (First crop): Sow tolerant variety — in UP/Bihar, KRL 1-19 wheat or CSR 10/30 rice are bred for sodic soils specifically',
          'Full reclamation typically takes 3-5 seasons with consistent treatment. Soil pH and EC improve measurably each year'
        ]
      },
      {
        type: 'steps',
        title: '🌿 Building Organic Matter — The Universal Soil Healer',
        steps: [
          'Apply FYM (well-decomposed farmyard manure) at 5-10 tons/acre every year — this is the single best thing for any soil problem',
          'Never burn crop residue — it destroys organic matter, beneficial fungi, and releases stored soil carbon. Incorporate residue into soil instead',
          'Grow a green manure crop in the field at least once every 2-3 years during a fallow period',
          'Reduce tillage intensity: minimum tillage preserves soil structure, retains moisture, and protects earthworm populations',
          'Each 1% increase in soil organic carbon holds an additional 200,000 litres of water per hectare — more organic matter = drought resilience',
          'Apply biostimulants like Humic acid + Fulvic acid at 2-3 kg/acre at sowing — improves root growth and nutrient absorption especially in degraded soils'
        ]
      },
      {
        type: 'tip',
        text: 'The NABARD\'s Soil Health Card scheme provides free soil tests every 2 years. Carry your Soil Health Card to your agri input shop — the dealer is supposed to give you crop-specific fertilizer recommendations based on the card. If they don\'t, ask your local Agriculture Officer (Krishi Paryavekshak) for a written fertilizer recommendation.'
      }
    ]
  }
]

const difficultyColor = {
  Beginner: 'bg-green-100 text-green-700',
  Intermediate: 'bg-amber-100 text-amber-700',
  Advanced: 'bg-red-100 text-red-700',
}

function SectionRenderer({ section }) {
  if (section.type === 'intro') {
    return (
      <div className="bg-green-50 border-l-4 border-green-400 rounded-lg p-4 mb-4">
        <p className="text-gray-700 text-sm leading-relaxed">{section.text}</p>
      </div>
    )
  }
  if (section.type === 'steps') {
    return (
      <div className="mb-5">
        <p className="font-semibold text-gray-800 text-sm mb-2">{section.title}</p>
        <ol className="space-y-2">
          {section.steps.map((step, i) => {
            const parts = step.split(/\*\*(.*?)\*\*/g)
            return (
              <li key={i} className="flex gap-3 text-sm text-gray-700 leading-relaxed">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-100 text-amber-700 text-xs font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
                <span>{parts.map((p, j) => j % 2 === 1 ? <strong key={j}>{p}</strong> : p)}</span>
              </li>
            )
          })}
        </ol>
      </div>
    )
  }
  if (section.type === 'table') {
    return (
      <div className="mb-5">
        <p className="font-semibold text-gray-800 text-sm mb-2">{section.title}</p>
        <div className="overflow-x-auto rounded-xl border border-green-100">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="bg-green-700 text-white">
                {section.headers.map((h, i) => (
                  <th key={i} className="px-3 py-2 text-left font-semibold whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.rows.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-green-50'}>
                  {row.map((cell, j) => (
                    <td key={j} className={`px-3 py-2 text-gray-700 align-top ${j === 0 ? 'font-medium text-gray-900' : ''}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
  if (section.type === 'warning') {
    return (
      <div className="flex gap-3 bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
        <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-red-800 leading-relaxed">{section.text}</p>
      </div>
    )
  }
  if (section.type === 'tip') {
    return (
      <div className="flex gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
        <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-amber-900 leading-relaxed">{section.text}</p>
      </div>
    )
  }
  return null
}

export default function Advice() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState(null)

  const filtered = advice.filter(a => {
    const matchCat = activeCategory === 'all' || a.category === activeCategory
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.summary.toLowerCase().includes(search.toLowerCase()) ||
      a.tag.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">

      {/* Header */}
      <div className="text-center mb-8">
        <div className="bg-amber-500 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <BookOpen className="text-white w-7 h-7" />
        </div>
        <h1 className="text-3xl font-bold text-green-900">Farming Advice</h1>
        <p className="text-gray-500 mt-2">In-depth expert guidance on soil, irrigation, pests, fertilizers and more</p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search advice topics..."
          className="w-full pl-11 pr-4 py-3.5 bg-white border border-green-100 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800 placeholder-gray-400"
        />
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              activeCategory === cat.id
                ? 'bg-green-600 text-white shadow-sm'
                : 'bg-white text-gray-600 border border-green-100 hover:border-green-300'
            }`}
          >
            {cat.icon}
            {cat.label}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <p className="text-sm text-gray-500 mb-4">
        Showing <span className="font-semibold text-green-700">{filtered.length}</span> articles
      </p>

      {/* Advice Cards */}
      <div className="space-y-4">
        {filtered.map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-3xl border border-green-100 shadow-sm overflow-hidden"
          >
            {/* Card Header */}
            <button
              className="w-full text-left p-6 flex items-start gap-4"
              onClick={() => setExpanded(expanded === i ? null : i)}
            >
              <span className="text-4xl flex-shrink-0">{item.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full">
                        {item.tag}
                      </span>
                      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${difficultyColor[item.difficulty]}`}>
                        {item.difficulty}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <Clock className="w-3 h-3" />
                        {item.readTime} read
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-800 text-lg leading-tight">{item.title}</h3>
                    <p className="text-gray-500 text-sm mt-1">{item.summary}</p>
                  </div>
                  <div className="flex-shrink-0 mt-1">
                    {expanded === i
                      ? <ChevronUp className="w-5 h-5 text-gray-400" />
                      : <ChevronDown className="w-5 h-5 text-gray-400" />
                    }
                  </div>
                </div>
              </div>
            </button>

            {/* Expanded Content */}
            {expanded === i && (
              <div className="px-6 pb-6 pt-0 border-t border-green-50">
                <div className="mt-4 space-y-2">
                  {item.sections.map((section, j) => (
                    <SectionRenderer key={j} section={section} />
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* No Results */}
      {filtered.length === 0 && (
        <div className="text-center py-16">
          <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p className="text-lg font-medium text-gray-500">No articles found</p>
          <p className="text-sm text-gray-400 mt-1">Try a different search term</p>
        </div>
      )}

    </div>
  )
}
