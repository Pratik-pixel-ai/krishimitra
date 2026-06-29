import { Link } from 'react-router-dom'
import { CloudSun, MessageSquareText, Sprout, TrendingUp, ShieldCheck, Mic } from 'lucide-react'
import farmBg from "../assets/images/farm-bg.jpg";

const features = [
  {
    icon: <MessageSquareText className="w-7 h-7 text-green-600" />,
    title: "AI Farming Assistant",
    desc: "Ask anything about your crops, soil, or farming practices in your language.",
    bg: "bg-green-50"
  },
  {
    icon: <CloudSun className="w-7 h-7 text-blue-500" />,
    title: "Live Weather Info",
    desc: "Get real-time weather updates and forecasts for your exact location.",
    bg: "bg-blue-50"
  },
  {
    icon: <Sprout className="w-7 h-7 text-emerald-600" />,
    title: "Crop Recommendations",
    desc: "Know which crops to grow based on your soil type and season.",
    bg: "bg-emerald-50"
  },
  {
    icon: <TrendingUp className="w-7 h-7 text-orange-500" />,
    title: "Farming Advice",
    desc: "Get expert tips on irrigation, fertilizers, and best practices.",
    bg: "bg-orange-50"
  },
  {
    icon: <ShieldCheck className="w-7 h-7 text-purple-500" />,
    title: "Trusted & Reliable",
    desc: "Built specifically for Indian farmers with local knowledge.",
    bg: "bg-purple-50"
  },
  {
    icon: <Mic className="w-7 h-7 text-red-500" />,
    title: "Voice Support (Soon)",
    desc: "Talk to the AI assistant in Hindi or your regional language.",
    bg: "bg-red-50"
  }
]

export default function Home() {
  return (
    <div className="relative h-[90vh]">

      {/* Hero Section */}
      <section
  className="relative min-h-screen bg-cover bg-center bg-no-repeat text-white"
  style={{
  backgroundImage: `linear-gradient(
    to right,
    rgba(0,0,0,.75),
    rgba(0,0,0,.55),
    rgba(0,0,0,.15)
  ), url(${farmBg})`,
  backgroundPosition: "right center",
  backgroundSize: "cover",
}}
>
  

  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">

    <div className="max-w-3xl">
            <span className="inline-block bg-green-500/30 border border-green-400/40 text-green-100 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              🌾 Built for Indian Farmers
            </span>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Smart Farming <br />
              <span className="text-yellow-300">Starts Here</span>
            </h1>
            <p className="text-green-100 text-lg md:text-xl mb-8 leading-relaxed max-w-2xl">
              Kisaan AI gives every farmer access to expert advice, live weather, and crop guidance — right from your phone. No experience needed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register" className="bg-yellow-400 hover:bg-yellow-300 text-green-900 font-bold px-8 py-3.5 rounded-xl text-center transition-colors text-lg">
                Start for Free →
              </Link>
              <Link to="/chat" className="border-2 border-white/40 hover:border-white text-white font-semibold px-8 py-3.5 rounded-xl text-center transition-colors text-lg">
                Try AI Chat
              </Link>
            </div>
          </div>
        </div>

        
      </section>

      {/* Stats */}
      <section className="bg-[#f9f6f0] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "10,000+", label: "Farmers Helped" },
              { value: "15+", label: "Crop Types" },
              { value: "24/7", label: "AI Available" },
              { value: "Free", label: "To Use" },
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-green-100">
                <div className="text-3xl font-bold text-green-700">{stat.value}</div>
                <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-[#f9f6f0] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">Everything a Farmer Needs</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">One platform for all your farming questions and decisions.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-green-50 hover:shadow-md transition-shadow">
                <div className={`${f.bg} w-14 h-14 rounded-xl flex items-center justify-center mb-4`}>
                  {f.icon}
                </div>
                <h3 className="font-bold text-gray-800 text-lg mb-2">{f.title}</h3>
                <p className="text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-green-800 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to farm smarter?</h2>
          <p className="text-green-200 text-lg mb-8">Join thousands of farmers already using Kisaan AI.</p>
          <Link to="/register" className="bg-yellow-400 hover:bg-yellow-300 text-green-900 font-bold px-10 py-4 rounded-xl text-lg inline-block transition-colors">
            Create Free Account →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-900 text-green-300 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sprout className="w-5 h-5 text-green-400" />
            <span className="font-bold text-white text-lg">Kisaan AI</span>
          </div>
          <p className="text-sm">Built with ❤️ for Indian Farmers</p>
        </div>
      </footer>

    </div>
  )
}