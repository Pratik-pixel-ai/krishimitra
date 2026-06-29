import { useState, useRef, useEffect } from 'react'
import { Send, Sprout, User, Loader2, MessageSquare } from 'lucide-react'
import { aiService } from '../services/api'
import useLanguageStore from '../store/languageStore'
import useThemeStore from '../store/themeStore'

const suggestionKeys = [
  'whichCropsJune',
  'increaseWheatYield',
  'fertilizerRice',
  'protectPests',
  'whenIrrigate',
  'soilTomatoes',
]

export default function Chat() {
  const { t } = useLanguageStore()
  const { isDarkMode } = useThemeStore()

  const suggestions = suggestionKeys.map(key => t(key))

  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: t('welcomeMessage')
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async (text) => {
    const userMsg = text || input
    if (!userMsg.trim()) return

    setMessages(prev => [...prev, { role: 'user', content: userMsg }])
    setInput('')
    setLoading(true)

    try {
      const data = await aiService.chat(userMsg)
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }])
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Sorry, I could not process your request. Please try again."
      }])
    } finally {
      setLoading(false)
    }
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">

      {/* Header */}
      <div className="text-center mb-8">
        <div className="bg-green-600 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <MessageSquare className="text-white w-7 h-7" />
        </div>
        <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-green-400' : 'text-green-900'}`}>{t('aiFarmingAssistantTitle')}</h1>
        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-2`}>{t('askAboutFarming')}</p>
      </div>

      {/* Chat Box */}
      <div className={`${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-green-100'} rounded-3xl shadow-sm border overflow-hidden transition-colors`}>

        {/* Messages */}
        <div className="h-[420px] overflow-y-auto p-6 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${msg.role === 'assistant' ? 'bg-green-600' : 'bg-gray-700'}`}>
                {msg.role === 'assistant'
                  ? <Sprout className="w-5 h-5 text-white" />
                  : <User className="w-5 h-5 text-white" />
                }
              </div>
              <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'assistant'
                  ? `${isDarkMode ? 'bg-green-900/30 text-gray-200' : 'bg-green-50 text-gray-800'} rounded-tl-sm`
                  : 'bg-green-600 text-white rounded-tr-sm'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-3">
              <div className="w-9 h-9 rounded-xl bg-green-600 flex items-center justify-center flex-shrink-0">
                <Sprout className="w-5 h-5 text-white" />
              </div>
              <div className={`${isDarkMode ? 'bg-green-900/30' : 'bg-green-50'} px-4 py-3 rounded-2xl rounded-tl-sm`}>
                <Loader2 className={`w-4 h-4 ${isDarkMode ? 'text-green-400' : 'text-green-600'} animate-spin`} />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Suggestions */}
        {messages.length === 1 && (
          <div className="px-6 pb-4">
            <p className={`text-xs font-medium mb-3 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{t('quickQuestions')}</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(s)}
                  className={`text-xs border px-3 py-1.5 rounded-full transition-colors ${isDarkMode ? 'bg-green-900/30 text-green-400 border-green-700 hover:bg-green-900/50' : 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className={`border-t p-4 ${isDarkMode ? 'border-gray-800' : 'border-green-100'}`}>
          <div className="flex gap-3 items-end">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder={t('askAboutCrops')}
              rows={1}
              className={`flex-1 resize-none border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-400 transition-colors ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-200' : 'bg-white border-gray-200 text-gray-800'}`}
            />
            <button
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white p-3 rounded-xl transition-colors flex-shrink-0"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className={`text-xs mt-2 text-center ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{t('pressEnter')}</p>
        </div>

      </div>
    </div>
  )
}