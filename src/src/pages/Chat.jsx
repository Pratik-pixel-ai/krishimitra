import { useState } from 'react'
import {
  BookOpen, Droplets, Bug, Sprout, Sun,
  Wind, ChevronDown, ChevronUp, Search, Clock, AlertTriangle, CheckCircle, Info, Leaf, Thermometer, FlaskConical
} from 'lucide-react'
import useThemeStore from '../store/themeStore'
import useLanguageStore from '../store/languageStore'

const getCategories = (t) => [
  { id: 'all', label: t('allTopics'), icon: <BookOpen className="w-4 h-4" /> },
  { id: 'soil', label: t('soilCategory'), icon: <Sprout className="w-4 h-4" /> },
  { id: 'irrigation', label: t('irrigationCategory'), icon: <Droplets className="w-4 h-4" /> },
  { id: 'pest', label: t('pestControlCategory'), icon: <Bug className="w-4 h-4" /> },
  { id: 'fertilizer', label: t('fertilizersCategory'), icon: <Sun className="w-4 h-4" /> },
  { id: 'harvest', label: t('harvestCategory'), icon: <Wind className="w-4 h-4" /> },
]

const advice = [
  {
    category: 'soil',
    title: 'Complete Soil Testing Guide',
    summary: 'Master soil analysis using simple home methods and understand exactly what your results mean for your crops.',
    emoji: '🪱',
    tagKey: 'soilHealth',
    readTime: '8 min',
    difficultyKey: 'beginner',
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
    tagKey: 'waterManagement',
    readTime: '10 min',
    difficultyKey: 'intermediate',
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
    tagKey: 'pestManagement',
    readTime: '12 min',
    difficultyKey: 'advanced',
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
    tagKey: 'soilHealth',
    readTime: '15 min',
    difficultyKey: 'intermediate',
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
    tagKey: 'soilImprovement',
    readTime: '12 min',
    difficultyKey: 'intermediate',
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
    tagKey: 'soilHealth',
    readTime: '10 min',
    difficultyKey: 'beginner',
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
    tagKey: 'waterManagement',
    readTime: '10 min',
    difficultyKey: 'intermediate',
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
    tagKey: 'soilImprovement',
    readTime: '11 min',
    difficultyKey: 'advanced',
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
          ['Acidic soil', 'pH < 6.0', 'Yellowing despite fertilizer, poor germination, visible reddish subsoil', 'Heavy rainfall leaching, excess nitrogen use', 'Ag. lime 200-400 kg/acre, apply 2-3 months before sowing', 'Add 5 tons FYM, grow acid-tolerant crops during correction'],
          ['Saline soil', 'pH 7-8.5, EC >4 dS/m', 'White salt crust on surface, patchy germination, tip burn on leaves', 'High water table, excess irrigation with saline water', 'Flood-and-drain leaching: 2-3 deep irrigations with drainage', 'Grow salt-tolerant crops: barley, mustard, sugarbeet'],
          ['Sodic/Usar soil', 'pH > 8.5 (high Na)', 'Soil seals after rain, water ponds, slippery when wet', 'Excess exchangeable sodium — structural collapse', 'Gypsum 400-600 kg/acre; flood-and-drain leaching', 'Deep ploughing to break hardpan; grow dhaincha'],
          ['Waterlogged', 'Any pH', 'Standing water after rain, bluish-grey subsoil, root rot', 'Poor drainage, impermeable hardpan', 'Open field drains or underground tile drains', 'Raised bed cultivation; flood-tolerant crops'],
          ['Sandy degraded', 'Any pH', 'Very low moisture retention, rapid nutrient leaching', 'Erosion of topsoil, low organic matter', 'Add 10 tons FYM/acre for 3-5 consecutive years', 'Mulching, cover crops, windbreaks']
        ]
      },
      {
        type: 'tip',
        text: 'The NABARD\'s Soil Health Card scheme provides free soil tests every 2 years. Carry your Soil Health Card to your agri input shop — the dealer is supposed to give you crop-specific fertilizer recommendations based on the card. If they don\'t, ask your local Agriculture Officer (Krishi Paryavekshak) for a written fertilizer recommendation.'
      }
    ]
  }
]

const difficultyColorMap = {
  beginner: 'bg-green-100 text-green-700',
  intermediate: 'bg-amber-100 text-amber-700',
  advanced: 'bg-red-100 text-red-700',
}

function SectionRenderer({ section, isDarkMode }) {
  if (section.type === 'intro') {
    return (
      <div className={`border-l-4 rounded-lg p-4 mb-4 ${isDarkMode ? 'bg-green-900/30 border-green-600' : 'bg-green-50 border-green-400'}`}>
        <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{section.text}</p>
      </div>
    )
  }
  if (section.type === 'steps') {
    return (
      <div className="mb-5">
        <p className={`font-semibold text-sm mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>{section.title}</p>
        <ol className="space-y-2">
          {section.steps.map((step, i) => {
            const parts = step.split(/\*\*(.*?)\*\*/g)
            return (
              <li key={i} className={`flex gap-3 text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
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
        <p className={`font-semibold text-sm mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>{section.title}</p>
        <div className={`overflow-x-auto rounded-xl border ${isDarkMode ? 'border-gray-700' : 'border-green-100'}`}>
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
                <tr key={i} className={isDarkMode ? 'bg-gray-800' : (i % 2 === 0 ? 'bg-white' : 'bg-green-50')}>
                  {row.map((cell, j) => (
                    <td key={j} className={`px-3 py-2 align-top ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} ${j === 0 ? 'font-medium ' + (isDarkMode ? 'text-gray-200' : 'text-gray-900') : ''}`}>{cell}</td>
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
      <div className={`flex gap-3 border rounded-xl p-4 mb-4 ${isDarkMode ? 'bg-red-900/30 border-red-700' : 'bg-red-50 border-red-200'}`}>
        <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
        <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-red-300' : 'text-red-800'}`}>{section.text}</p>
      </div>
    )
  }
  if (section.type === 'tip') {
    return (
      <div className={`flex gap-3 border rounded-xl p-4 mb-4 ${isDarkMode ? 'bg-amber-900/30 border-amber-700' : 'bg-amber-50 border-amber-200'}`}>
        <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
        <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-amber-300' : 'text-amber-900'}`}>{section.text}</p>
      </div>
    )
  }
  return null
}

export default function Advice() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState(null)
  const { isDarkMode } = useThemeStore()
  const { t } = useLanguageStore()

  const categories = getCategories(t)

  const filtered = advice.filter(a => {
    const matchCat = activeCategory === 'all' || a.category === activeCategory
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.summary.toLowerCase().includes(search.toLowerCase()) ||
      t(a.tagKey).toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">

      {/* Header */}
      <div className="text-center mb-8">
        <div className="bg-amber-500 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <BookOpen className="text-white w-7 h-7" />
        </div>
        <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-green-400' : 'text-green-900'}`}>{t('farmingAdviceTitle')}</h1>
        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-2`}>{t('farmingAdviceDesc')}</p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t('searchAdvicePlaceholder')}
          className={`w-full pl-11 pr-4 py-3.5 border rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400 transition-colors ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-200' : 'bg-white border-green-100 text-gray-800'}`}
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
                : `${isDarkMode ? 'bg-gray-800 text-gray-300 border-gray-700 hover:border-green-600' : 'bg-white text-gray-600 border border-green-100 hover:border-green-300'}`
            }`}
          >
            {cat.icon}
            {cat.label}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        {t('showingArticles')} <span className={`font-semibold ${isDarkMode ? 'text-green-400' : 'text-green-700'}`}>{filtered.length}</span> {t('articles')}
      </p>

      {/* Advice Cards */}
      <div className="space-y-4">
        {filtered.map((item, i) => (
          <div
            key={i}
            className={`${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-green-100'} rounded-3xl border shadow-sm overflow-hidden transition-colors`}
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
                      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${isDarkMode ? 'text-amber-400 bg-amber-900/30' : 'text-amber-600 bg-amber-50'}`}>
                        {t(item.tagKey)}
                      </span>
                      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${difficultyColorMap[item.difficultyKey]}`}>
                        {t(item.difficultyKey)}
                      </span>
                      <span className={`flex items-center gap-1 text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        <Clock className="w-3 h-3" />
                        {item.readTime} {t('readTime')}
                      </span>
                    </div>
                    <h3 className={`font-bold text-lg leading-tight ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{item.title}</h3>
                    <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-sm mt-1`}>{item.summary}</p>
                  </div>
                  <div className="flex-shrink-0 mt-1">
                    {expanded === i
                      ? <ChevronUp className={`w-5 h-5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                      : <ChevronDown className={`w-5 h-5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                    }
                  </div>
                </div>
              </div>
            </button>

            {/* Expanded Content */}
            {expanded === i && (
              <div className={`px-6 pb-6 pt-0 border-t ${isDarkMode ? 'border-gray-800' : 'border-green-50'}`}>
                <div className="mt-4 space-y-2">
                  {item.sections.map((section, j) => (
                    <SectionRenderer key={j} section={section} isDarkMode={isDarkMode} />
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
          <BookOpen className={`w-16 h-16 mx-auto mb-4 ${isDarkMode ? 'text-gray-700' : 'text-gray-300'}`} />
          <p className={`text-lg font-medium ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>{t('noArticlesFound')}</p>
          <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{t('tryDifferentSearch')}</p>
        </div>
      )}

    </div>
  )
}