// Language-independent advice article metadata: ids, category/difficulty codes, emoji.
// Translated content (title, summary, tag, section text) lives in
// src/data/translations/advice.<lang>.js, keyed by the `id` below.

export const adviceBase = [
  { id: "soil-testing", category: "soil", emoji: "🪱", readTime: "8 min", difficultyCode: "beginner" },
  { id: "irrigation", category: "irrigation", emoji: "💧", readTime: "10 min", difficultyCode: "intermediate" },
  { id: "ipm", category: "pest", emoji: "🐛", readTime: "12 min", difficultyCode: "advanced" },
  { id: "fertilizer-management", category: "fertilizer", emoji: "🧪", readTime: "15 min", difficultyCode: "intermediate" },
  { id: "organic-farming", category: "fertilizer", emoji: "🌿", readTime: "12 min", difficultyCode: "intermediate" },
  { id: "harvest-timing", category: "harvest", emoji: "🌾", readTime: "10 min", difficultyCode: "beginner" },
  { id: "post-harvest-storage", category: "harvest", emoji: "🏪", readTime: "10 min", difficultyCode: "intermediate" },
  { id: "soil-reclamation", category: "soil", emoji: "🏔️", readTime: "11 min", difficultyCode: "advanced" },
]

export const adviceCategories = [
  { id: "all", icon: "BookOpen" },
  { id: "soil", icon: "Sprout" },
  { id: "irrigation", icon: "Droplets" },
  { id: "pest", icon: "Bug" },
  { id: "fertilizer", icon: "Sun" },
  { id: "harvest", icon: "Wind" },
]
