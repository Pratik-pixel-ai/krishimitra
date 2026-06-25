import { useState } from 'react'
import {
  BookOpen, Droplets, Bug, Sprout, Sun,
  Wind, ChevronDown, ChevronUp, Search
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
    title: 'How to Test Your Soil at Home',
    summary: 'Simple methods to understand your soil type without a lab.',
    content: `1. **Jar Test:** Fill a jar with soil and water, shake well and let it settle for 24 hours. Sand settles first, then silt, then clay on top. This tells you your soil composition.

2. **Ribbon Test:** Take moist soil and try to form a ribbon between your thumb and finger. Sandy soil crumbles, silty soil forms a short ribbon, clay soil forms a long smooth ribbon.

3. **pH Test:** Use cheap pH strips from an agri shop. Dip in soil-water mixture. Most crops prefer pH 6.0–7.0.

4. **Worm Count:** Dig a 30cm cube of soil and count earthworms. More than 10 means healthy soil. Less than 5 means soil needs organic matter.

**Best Practice:** Test your soil every 2 years and before each major crop change.`,
    emoji: '🪱', tag: 'Soil Health'
  },
  {
    category: 'irrigation',
    title: 'When and How Much to Irrigate',
    summary: 'Avoid overwatering and underwatering with these simple guidelines.',
    content: `**Signs your crop needs water:**
- Leaves curl or droop in the morning (not afternoon — that's normal)
- Soil is dry 5cm below surface
- Plant growth has slowed suddenly

**General irrigation schedule:**
- Wheat: Every 20-25 days (critical at crown root, tillering, flowering)
- Rice: Maintain 5cm standing water
- Vegetables: Every 4-7 days depending on heat
- Cotton: Every 10-15 days

**Best time to irrigate:** Early morning (6-8 AM) or evening (5-7 PM). Never during peak afternoon heat — causes root shock and water waste.

**Drip irrigation saves 40-60% water** compared to flood irrigation. Consider it for vegetables and orchards.`,
    emoji: '💧', tag: 'Water Management'
  },
  {
    category: 'pest',
    title: 'Common Pest Identification & Control',
    summary: 'Identify the most common crop pests and how to deal with them.',
    content: `**Aphids:** Small green/black insects on leaf undersides. Spray neem oil solution (5ml per litre) or introduce ladybugs naturally.

**Bollworm (Cotton):** Holes in bolls and flowers. Use Bt (Bacillus thuringiensis) spray — safe and organic.

**Brown Plant Hopper (Rice):** Circular brown patches in field. Drain water for 3-5 days and apply recommended insecticide at base of plants.

**Leaf Miner (Vegetables):** White tunnels on leaves. Remove infected leaves early. Apply neem-based pesticide.

**White Fly:** Tiny white flies on leaf undersides. Yellow sticky traps are very effective. Spray in early morning.

**Golden Rule:** Scout your field every 3-4 days. Early detection means cheaper and easier control. Never spray unnecessarily — it kills beneficial insects too.`,
    emoji: '🐛', tag: 'Pest Management'
  },
  {
    category: 'fertilizer',
    title: 'NPK — Understanding Fertilizers Simply',
    summary: 'What N, P, and K mean and when to apply them.',
    content: `**N — Nitrogen (नाइट्रोजन):**
- Makes plants green and leafy
- Sources: Urea, DAP
- Apply: At sowing and 30 days after
- Excess: Too much leaf, less grain

**P — Phosphorus (फास्फोरस):**
- Builds strong roots and flowers
- Sources: DAP, SSP
- Apply: At sowing time only (it stays in soil)
- Deficiency sign: Purple/red colour on leaves

**K — Potassium (पोटेशियम):**
- Makes plants disease-resistant and improves quality
- Sources: MOP (Muriate of Potash)
- Apply: At sowing and flowering
- Deficiency sign: Brown leaf edges

**Simple formula for most crops:**
- Use DAP at sowing (gives P + some N)
- Add Urea at 30-40 days for N top-up
- Add MOP if soil test shows K deficiency

**Organic option:** Well-decomposed cow dung (FYM) at 5-10 tons/acre before sowing improves all nutrients.`,
    emoji: '🧪', tag: 'Fertilizers'
  },
  {
    category: 'fertilizer',
    title: 'Organic Farming — Getting Started',
    summary: 'How to reduce chemical use and improve soil health naturally.',
    content: `**Step 1 — Build your compost:**
Collect crop residue, kitchen waste, cow dung. Layer them in a pit (3ft deep). Turn every 15 days. Ready in 45-60 days.

**Step 2 — Use green manure:**
Grow dhaincha or sunhemp and plough it into soil before it flowers. Adds 40-50 kg nitrogen per acre naturally.

**Step 3 — Biofertilizers:**
- Rhizobium for legume crops (chickpea, soybean)
- Azospirillum for wheat, maize, rice
- Available at agri centres — very cheap, very effective

**Step 4 — Neem-based pest control:**
Neem cake at 100kg/acre controls soil pests. Neem oil spray controls most leaf pests.

**Benefits of organic farming:**
- Lower input costs after 2-3 years
- Premium prices at market
- Healthier soil for future generations
- Eligible for organic certification after 3 years`,
    emoji: '🌿', tag: 'Organic'
  },
  {
    category: 'harvest',
    title: 'Right Time to Harvest — Crop by Crop',
    summary: 'Know exactly when your crop is ready to avoid yield and quality loss.',
    content: `**Wheat:** Harvest when grains are hard and golden. Moisture should be below 14%. Cut when 75% of crop has turned yellow.

**Rice:** Harvest 30-35 days after flowering. 80-85% of grains should be golden yellow. Early harvest = chalky grains. Late harvest = shattering loss.

**Cotton:** Pick bolls as they open — do 3-4 pickings at weekly intervals. Pick in dry weather only.

**Tomato:** Harvest at breaker stage (first colour change) for transport. Harvest fully red for local sale.

**Onion:** Harvest when 50% of tops have fallen. Cure in field for 3-5 days before storing.

**Potato:** Stop irrigation 10 days before harvest. Harvest when skin is firm and doesn't peel easily.

**General rule:** Never harvest wet crops — it causes mould and storage losses. Harvest in the morning after dew has dried.`,
    emoji: '🌾', tag: 'Harvesting'
  },
  {
    category: 'soil',
    title: 'How to Improve Poor Soil',
    summary: 'Turn bad soil into productive farmland with these steps.',
    content: `**Sandy soil (too loose):**
- Add clay or silt if available locally
- Add organic matter (FYM, compost) every season
- Mulch to retain moisture
- Grow cover crops like cowpea

**Clay soil (too hard/waterlogged):**
- Add sand and organic matter
- Make raised beds for vegetables
- Deep ploughing once a year
- Grow subsoil-breaking crops like sunflower

**Acidic soil (pH below 6):**
- Apply agricultural lime at 200-400 kg/acre
- Lime takes 2-3 months to act, apply before sowing
- Grow acid-tolerant crops like rice, tea meanwhile

**Saline/alkaline soil (pH above 8):**
- Apply gypsum at 400-600 kg/acre
- Flood and drain 2-3 times before sowing
- Grow tolerant crops: barley, mustard, sugarbeet

**Universal soil improver:** Add 5-8 tonnes of FYM per acre every year. Within 3-4 years even poor soils become productive.`,
    emoji: '🏔️', tag: 'Soil Improvement'
  },
  {
    category: 'harvest',
    title: 'Post-Harvest Storage Tips',
    summary: 'Prevent losses after harvest with proper storage techniques.',
    content: `**Grain storage (wheat, rice, maize):**
- Dry to below 12-14% moisture before storage
- Use clean, dry gunny bags or metal bins
- Place bags on wooden pallets — never on floor
- Add neem leaves or bay leaves to repel insects
- Use aluminium phosphide tablets for long storage (3+ months)

**Vegetable storage:**
- Never store bruised/damaged vegetables with healthy ones
- Onions: Store in net bags in cool, dry, dark place
- Potatoes: Store in dark at 4-10°C if possible
- Tomatoes: Never refrigerate unripe tomatoes

**Reducing losses:**
- Grain losses in storage can be 10-30% — proper storage saves significant income
- Inspect stored grain every 2 weeks for signs of insect/mould
- Sell strategically — don't sell everything at harvest when prices are lowest

**Golden tip:** Farmer Producer Organisations (FPOs) often have cold storage and warehouse facilities. Connect with your local FPO to access better storage and higher prices.`,
    emoji: '🏪', tag: 'Storage'
  },
]

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

  const renderContent = (content) => {
    return content.split('\n').map((line, i) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={i} className="font-bold text-gray-800 mt-3 mb-1">{line.replace(/\*\*/g, '')}</p>
      }
      if (line.includes('**')) {
        const parts = line.split(/\*\*(.*?)\*\*/g)
        return (
          <p key={i} className="text-gray-700 text-sm leading-relaxed mb-1">
            {parts.map((part, j) => j % 2 === 1 ? <strong key={j}>{part}</strong> : part)}
          </p>
        )
      }
      if (line.startsWith('- ')) {
        return <p key={i} className="text-gray-700 text-sm leading-relaxed mb-1 ml-3">• {line.slice(2)}</p>
      }
      if (line.trim() === '') return <div key={i} className="h-2" />
      return <p key={i} className="text-gray-700 text-sm leading-relaxed mb-1">{line}</p>
    })
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">

      {/* Header */}
      <div className="text-center mb-8">
        <div className="bg-amber-500 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <BookOpen className="text-white w-7 h-7" />
        </div>
        <h1 className="text-3xl font-bold text-green-900">Farming Advice</h1>
        <p className="text-gray-500 mt-2">Expert guidance on soil, irrigation, pests, and more</p>
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
                  <div>
                    <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full">
                      {item.tag}
                    </span>
                    <h3 className="font-bold text-gray-800 text-lg mt-2 leading-tight">{item.title}</h3>
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
                <div className="bg-amber-50/50 rounded-2xl p-5 mt-4">
                  {renderContent(item.content)}
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