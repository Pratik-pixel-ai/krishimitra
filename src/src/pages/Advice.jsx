import { useState, useMemo } from 'react'
import {
  BookOpen, Droplets, Bug, Sprout, Sun,
  Wind, ChevronDown, ChevronUp, Search, Clock, AlertTriangle, CheckCircle
} from 'lucide-react'
import useThemeStore from '../store/themeStore'
import useLanguageStore from '../store/languageStore'
import { adviceBase } from '../data/advice/adviceBase'
import advice_en from '../data/advice/advice.en'
import advice_hi from '../data/advice/advice.hi'
import advice_mr from '../data/advice/advice.mr'

const adviceTranslations = { en: advice_en, hi: advice_hi, mr: advice_mr }

const difficultyColorByCode = {
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
  const { t, language } = useLanguageStore()

  const categories = [
    { id: 'all', label: t('allTopics'), icon: <BookOpen className="w-4 h-4" /> },
    { id: 'soil', label: t('soilCategory'), icon: <Sprout className="w-4 h-4" /> },
    { id: 'irrigation', label: t('irrigationCategory'), icon: <Droplets className="w-4 h-4" /> },
    { id: 'pest', label: t('pestControlCategory'), icon: <Bug className="w-4 h-4" /> },
    { id: 'fertilizer', label: t('fertilizersCategory'), icon: <Sun className="w-4 h-4" /> },
    { id: 'harvest', label: t('harvestCategory'), icon: <Wind className="w-4 h-4" /> },
  ]

  // Merge language-independent base data (id, category, emoji, readTime,
  // difficultyCode) with the translated content for the current language
  // (title, summary, tag, sections) — falls back to English for anything
  // missing in the selected language.
  const advice = useMemo(() => {
    const langData = adviceTranslations[language] || adviceTranslations.en
    return adviceBase.map((base) => ({
      ...base,
      ...(adviceTranslations.en[base.id] || {}),
      ...(langData[base.id] || {}),
      difficulty: t(base.difficultyCode),
    }))
  }, [language, t])

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
            key={item.id}
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
                        {item.tag}
                      </span>
                      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${difficultyColorByCode[item.difficultyCode]}`}>
                        {item.difficulty}
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
