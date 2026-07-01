import { useState, useRef, useEffect } from 'react'
import { Bot, User, Send, Sparkles, MessageSquareText } from 'lucide-react'
import useAuthStore from '../store/authStore'
import useThemeStore from '../store/themeStore'
import useLanguageStore from '../store/languageStore'
import { aiService } from '../services/api'

export default function Chat() {
  const { farmer } = useAuthStore()
  const { isDarkMode } = useThemeStore()
  const { t } = useLanguageStore()

  const suggestionKeys = [
    'whichCropsJune',
    'increaseWheatYield',
    'fertilizerRice',
    'protectPests',
    'whenIrrigate',
    'soilTomatoes',
  ]

  const [messages, setMessages] = useState([
    { role: 'assistant', text: t('welcomeMessage') },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const scrollRef = useRef(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, loading])

  const extractReply = (data) => {
    if (!data) return ''
    if (typeof data === 'string') return data
    return data.reply || data.message || data.response || data.answer || data.content || JSON.stringify(data)
  }

  const sendMessage = async (text) => {
    const trimmed = text.trim()
    if (!trimmed || loading) return

    setMessages(prev => [...prev, { role: 'user', text: trimmed }])
    setInput('')
    setError('')
    setLoading(true)

    try {
      const data = await aiService.chat(trimmed)
      const replyText = extractReply(data)
      setMessages(prev => [...prev, { role: 'assistant', text: replyText }])
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    sendMessage(input)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  const showSuggestions = messages.length <= 1

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">

      {/* Header */}
      <div className="text-center mb-6">
        <div className="bg-gradient-to-br from-[#2E7D32] to-[#66BB6A] w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-900/20">
          <MessageSquareText className="text-white w-7 h-7" />
        </div>
        <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-green-400' : 'text-green-900'}`}>{t('aiFarmingAssistantTitle')}</h1>
        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-2`}>{t('askAboutFarming')}</p>
      </div>

      {/* Chat Card */}
      <div className={`rounded-3xl border shadow-sm overflow-hidden flex flex-col transition-colors ${isDarkMode ? 'bg-[#121a15] border-[#1a241d]' : 'bg-white border-green-100'}`}>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-4 h-[55vh] min-h-[360px]">
          {messages.map((m, i) => (
            <div key={i} className={`flex items-start gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center ${
                m.role === 'user'
                  ? (isDarkMode ? 'bg-green-700/40 text-green-300' : 'bg-green-100 text-green-700')
                  : 'bg-gradient-to-br from-[#2E7D32] to-[#66BB6A] text-white'
              }`}>
                {m.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                  m.role === 'user'
                    ? 'bg-green-600 text-white rounded-tr-sm'
                    : `rounded-tl-sm ${isDarkMode ? 'bg-[#1a241d] text-gray-200 border border-[#26332a]' : 'bg-green-50 text-[#1a241d] border border-green-100'}`
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {loading && (
            <div className="flex items-start gap-3">
              <div className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center bg-gradient-to-br from-[#2E7D32] to-[#66BB6A] text-white">
                <Bot className="w-4 h-4" />
              </div>
              <div className={`rounded-2xl rounded-tl-sm px-4 py-3.5 flex items-center gap-1.5 ${isDarkMode ? 'bg-[#1a241d] border border-[#26332a]' : 'bg-green-50 border border-green-100'}`}>
                <span className={`w-1.5 h-1.5 rounded-full animate-bounce ${isDarkMode ? 'bg-gray-500' : 'bg-gray-400'}`} style={{ animationDelay: '0ms' }} />
                <span className={`w-1.5 h-1.5 rounded-full animate-bounce ${isDarkMode ? 'bg-gray-500' : 'bg-gray-400'}`} style={{ animationDelay: '150ms' }} />
                <span className={`w-1.5 h-1.5 rounded-full animate-bounce ${isDarkMode ? 'bg-gray-500' : 'bg-gray-400'}`} style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="flex items-start gap-3">
              <div className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center bg-red-500 text-white">
                <Bot className="w-4 h-4" />
              </div>
              <div className={`rounded-2xl rounded-tl-sm px-4 py-3 text-sm ${isDarkMode ? 'bg-red-900/30 text-red-300 border border-red-700' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                {error}
              </div>
            </div>
          )}

          {/* Quick Questions */}
          {showSuggestions && !loading && (
            <div className="pt-2">
              <p className={`text-xs font-semibold tracking-wide mb-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{t('quickQuestions')}</p>
              <div className="flex flex-wrap gap-2">
                {suggestionKeys.map((key) => (
                  <button
                    key={key}
                    onClick={() => sendMessage(t(key))}
                    className={`flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-xl border transition-colors ${
                      isDarkMode
                        ? 'bg-[#1a241d] border-[#26332a] text-gray-300 hover:border-green-600'
                        : 'bg-white border-green-100 text-gray-600 hover:border-green-300'
                    }`}
                  >
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    {t(key)}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className={`shrink-0 border-t p-3 sm:p-4 ${isDarkMode ? 'border-[#1a241d]' : 'border-green-50'}`}
        >
          <div className="flex items-end gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t('askAboutCrops')}
              rows={1}
              className={`flex-1 resize-none pl-4 pr-4 py-3 border rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400 text-sm transition-colors ${
                isDarkMode ? 'bg-[#1a241d] border-[#26332a] text-gray-200' : 'bg-white border-green-100 text-[#1a241d]'
              }`}
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="shrink-0 bg-green-600 hover:bg-green-700 disabled:opacity-40 disabled:hover:bg-green-600 text-white p-3 rounded-2xl transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className={`text-[11px] mt-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{t('pressEnter')}</p>
        </form>
      </div>
    </div>
  )
}
