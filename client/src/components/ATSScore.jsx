import { useState, useEffect } from 'react'
import { TrendingUp, AlertCircle, CheckCircle, Target } from 'lucide-react'
import { aiAPI } from '../services/api'
import toast from 'react-hot-toast'

function ATSScore({ resumeData, onScoreUpdate }) {
  const [score, setScore] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [strengths, setStrengths] = useState([])
  const [weaknesses, setWeaknesses] = useState([])
  const [suggestions, setSuggestions] = useState([])

  const calculateScore = async () => {
    if (!resumeData) return

    setIsLoading(true)
    try {
      const response = await aiAPI.calculateATSScore({ resumeData })
      const data = response.data

      setScore(data.score)
      setStrengths(data.strengths || [])
      setWeaknesses(data.weaknesses || [])
      setSuggestions(data.suggestions || [])

      if (onScoreUpdate) {
        onScoreUpdate(data.score)
      }
    } catch (error) {
      console.error('ATS score calculation error:', error)
      toast.error('Failed to calculate ATS score')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    calculateScore()
  }, [resumeData])

  const getScoreColor = (score) => {
    if (score >= 80) return 'excellent'
    if (score >= 60) return 'good'
    return 'poor'
  }

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent'
    if (score >= 60) return 'Good'
    if (score >= 40) return 'Fair'
    return 'Poor'
  }

  const getScoreIcon = (score) => {
    if (score >= 80) return CheckCircle
    if (score >= 60) return Target
    return AlertCircle
  }

  if (isLoading) {
    return (
      <div className="card p-6">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          <span className="ml-3 text-gray-600 dark:text-gray-400">Calculating ATS score...</span>
        </div>
      </div>
    )
  }

  if (!score) {
    return (
      <div className="card p-6">
        <div className="text-center text-gray-500 dark:text-gray-400">
          <AlertCircle className="w-8 h-8 mx-auto mb-2" />
          <p>Unable to calculate ATS score</p>
        </div>
      </div>
    )
  }

  const ScoreIcon = getScoreIcon(score)

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          <TrendingUp className="w-5 h-5 mr-2" />
          ATS Compatibility Score
        </h3>
        <button
          onClick={calculateScore}
          className="btn btn-ghost btn-sm"
          disabled={isLoading}
        >
          Refresh
        </button>
      </div>

      {/* Score Display */}
      <div className="text-center mb-6">
        <div className="relative inline-flex items-center justify-center w-24 h-24 mb-4">
          <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-gray-200 dark:text-gray-700"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${(score / 100) * 251.2} 251.2`}
              className={`${
                score >= 80 ? 'text-green-500' :
                score >= 60 ? 'text-yellow-500' : 'text-red-500'
              }`}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              {score}
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-center space-x-2">
          <ScoreIcon className={`w-5 h-5 ${
            score >= 80 ? 'text-green-500' :
            score >= 60 ? 'text-yellow-500' : 'text-red-500'
          }`} />
          <span className={`ats-score ${getScoreColor(score)}`}>
            {getScoreLabel(score)}
          </span>
        </div>
      </div>

      {/* Strengths */}
      {strengths.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-green-800 dark:text-green-400 mb-3 flex items-center">
            <CheckCircle className="w-4 h-4 mr-2" />
            Strengths
          </h4>
          <ul className="space-y-2">
            {strengths.map((strength, index) => (
              <li key={index} className="text-sm text-green-700 dark:text-green-300 flex items-start">
                <span className="text-green-500 mr-2 mt-0.5">•</span>
                {strength}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Weaknesses */}
      {weaknesses.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-red-800 dark:text-red-400 mb-3 flex items-center">
            <AlertCircle className="w-4 h-4 mr-2" />
            Areas for Improvement
          </h4>
          <ul className="space-y-2">
            {weaknesses.map((weakness, index) => (
              <li key={index} className="text-sm text-red-700 dark:text-red-300 flex items-start">
                <span className="text-red-500 mr-2 mt-0.5">•</span>
                {weakness}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-400 mb-3 flex items-center">
            <Target className="w-4 h-4 mr-2" />
            Recommendations
          </h4>
          <ul className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="text-sm text-blue-700 dark:text-blue-300 flex items-start">
                <span className="text-blue-500 mr-2 mt-0.5">•</span>
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default ATSScore
