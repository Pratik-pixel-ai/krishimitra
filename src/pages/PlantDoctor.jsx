import { useEffect, useRef, useState } from 'react'
import { AlertTriangle, CheckCircle2, FlaskConical, History, Leaf, Loader2, RotateCcw, ScanLine, ShieldCheck, Upload, X } from 'lucide-react'
import useThemeStore from '../store/themeStore'
import useLanguageStore from '../store/languageStore'
import { diagnosisService } from '../services/api'

const treatmentSections = [
  ['organicTreatment', 'pdOrganicTreatment', Leaf, 'text-green-600'],
  ['chemicalTreatment', 'pdChemicalTreatment', FlaskConical, 'text-sky-600'],
  ['preventionTips', 'pdPrevention', ShieldCheck, 'text-amber-600'],
]

export default function PlantDoctor() {
  const { isDarkMode } = useThemeStore()
  const { t } = useLanguageStore()
  const inputRef = useRef(null)
  const [imageFile, setImageFile] = useState(null)
  const [preview, setPreview] = useState('')
  const [cropName, setCropName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)
  const [history, setHistory] = useState([])

  useEffect(() => {
    diagnosisService.getHistory().then((data) => setHistory(Array.isArray(data) ? data : [])).catch(() => setHistory([]))
  }, [])

  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview) }, [preview])

  const selectFile = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setError(t('pdError'))
      return
    }
    setImageFile(file)
    setPreview(URL.createObjectURL(file))
    setResult(null)
    setError('')
  }

  const reset = () => {
    setImageFile(null)
    setPreview('')
    setCropName('')
    setResult(null)
    setError('')
    if (inputRef.current) inputRef.current.value = ''
  }

  const analyze = async () => {
    if (!imageFile) return setError(t('pdSelectImageFirst'))
    setLoading(true)
    setError('')
    try {
      const diagnosis = await diagnosisService.diagnose(imageFile, cropName.trim())
      setResult(diagnosis)
      setHistory((items) => [diagnosis, ...items])
    } catch (err) {
      setError(err.message || t('pdError'))
    } finally {
      setLoading(false)
    }
  }

  const card = isDarkMode ? 'bg-[#121a15] border-[#26332a] text-gray-100' : 'bg-white border-green-100 text-gray-800'
  const muted = isDarkMode ? 'text-gray-400' : 'text-gray-500'

  return <main className="max-w-3xl mx-auto px-4 py-8">
    <header className="text-center mb-7">
      <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-rose-500 to-orange-500 shadow-lg shadow-rose-900/20"><ScanLine className="w-7 h-7 text-white" /></div>
      <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-green-400' : 'text-green-900'}`}>{t('pdTitle')}</h1>
      <p className={`mt-2 ${muted}`}>{t('pdSubtitle')}</p>
    </header>

    <section className={`rounded-3xl border shadow-sm p-5 sm:p-6 ${card}`}>
      <input ref={inputRef} id="plant-image" type="file" accept="image/*" capture="environment" onChange={selectFile} className="hidden" />
      {!result ? <>
        {!preview ? <label htmlFor="plant-image" className={`flex cursor-pointer flex-col items-center gap-3 rounded-2xl border-2 border-dashed px-4 py-12 ${isDarkMode ? 'border-[#26332a] bg-[#0f1712] hover:border-green-600' : 'border-green-200 bg-green-50/50 hover:border-green-400'}`}>
          <Upload className="w-7 h-7 text-green-600" />
          <span className="font-semibold">{t('pdUploadLabel')}</span><span className={`max-w-sm text-center text-xs ${muted}`}>{t('pdUploadHint')}</span>
        </label> : <>
          <div className="relative"><img src={preview} alt="Selected plant" className="max-h-80 w-full rounded-2xl object-cover" /><button onClick={reset} aria-label="Remove image" className="absolute right-3 top-3 rounded-full bg-black/60 p-1.5 text-white"><X className="w-4 h-4" /></button></div>
          <label className={`mt-5 mb-1.5 block text-sm font-medium ${muted}`}>{t('pdCropNameLabel')}</label>
          <input value={cropName} onChange={(e) => setCropName(e.target.value)} placeholder={t('pdCropNamePlaceholder')} className={`w-full rounded-xl border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-500 ${isDarkMode ? 'border-[#26332a] bg-[#1a241d]' : 'border-green-100'}`} />
          <div className="mt-4 flex gap-3"><button onClick={analyze} disabled={loading} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-600 py-3 font-semibold text-white hover:bg-green-700 disabled:opacity-60">{loading ? <><Loader2 className="w-4 h-4 animate-spin" />{t('pdAnalyzing')}</> : <><ScanLine className="w-4 h-4" />{t('pdAnalyzeBtn')}</>}</button><label htmlFor="plant-image" className="cursor-pointer rounded-xl border border-green-200 px-4 py-3 text-sm font-medium">{t('pdChangeImage')}</label></div>
        </>}
        {error && <p className="mt-4 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"><AlertTriangle className="w-4 h-4" />{error}</p>}
      </> : <DiagnosisResult result={result} preview={preview} t={t} isDarkMode={isDarkMode} card={card} muted={muted} onReset={reset} />}
    </section>

    <section className="mt-8"><h2 className={`mb-3 flex items-center gap-2 font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}><History className="w-4 h-4" />{t('pdHistoryTitle')}</h2>
      {history.length === 0 ? <p className={`text-sm ${muted}`}>{t('pdHistoryEmpty')}</p> : <div className="space-y-2.5">{history.map((item, index) => <div key={item.id || index} className={`flex items-center justify-between rounded-2xl border px-4 py-3 ${card}`}><div className="flex items-center gap-3">{item.healthy ? <CheckCircle2 className="w-4 h-4 text-green-600" /> : <AlertTriangle className="w-4 h-4 text-amber-600" />}<div><p className="text-sm font-medium">{item.diseaseName}</p>{item.cropName && <p className={`text-xs ${muted}`}>{item.cropName}</p>}</div></div><span className={`text-xs font-semibold ${muted}`}>{item.confidence}%</span></div>)}</div>}
    </section>
  </main>
}

function DiagnosisResult({ result, preview, t, isDarkMode, muted, onReset }) {
  return <div className="space-y-5">
    {preview && <img src={preview} alt="Diagnosed plant" className="max-h-64 w-full rounded-2xl object-cover" />}
    <div className={`flex items-center justify-between rounded-2xl border px-4 py-3.5 ${result.healthy ? 'border-green-200 bg-green-50' : 'border-amber-200 bg-amber-50'}`}><div className="flex items-center gap-2.5">{result.healthy ? <CheckCircle2 className="w-5 h-5 text-green-600" /> : <AlertTriangle className="w-5 h-5 text-amber-600" />}<div><p className="font-bold text-gray-800">{result.diseaseName}</p><p className="text-xs text-gray-500">{result.healthy ? t('pdResultHealthy') : t('pdResultDiseased')}</p></div></div><div className="text-right"><p className="text-xs text-gray-500">{t('pdConfidence')}</p><p className="text-lg font-bold text-gray-800">{result.confidence}%</p></div></div>
    {result.description && <div><p className={`mb-1 text-xs font-semibold uppercase ${muted}`}>{t('pdDescription')}</p><p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>{result.description}</p></div>}
    {treatmentSections.map(([field, key, Icon, tint]) => result[field]?.length > 0 && <div key={field}><p className={`mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase ${tint}`}><Icon className="w-4 h-4" />{t(key)}</p><ul className={isDarkMode ? 'space-y-1.5 text-sm text-gray-300' : 'space-y-1.5 text-sm text-gray-600'}>{result[field].map((item, index) => <li key={index}>• {item}</li>)}</ul></div>)}
    <button onClick={onReset} className="flex w-full items-center justify-center gap-2 rounded-xl border border-green-200 py-3 font-semibold"><RotateCcw className="w-4 h-4" />{t('pdScanAnother')}</button>
  </div>
}
