import { useState } from 'react'
import { Sparkles, Loader2, CheckCircle, X, RefreshCw, Lightbulb } from 'lucide-react'
import { aiAPI } from '../services/api'
import toast from 'react-hot-toast'

function AIEnhancement({ 
  content, 
  section, 
  onEnhance, 
  jobTitle, 
  industry,
  disabled = false 
}) {
  const [isLoading, setIsLoading] = useState(false)
  const [enhancedContent, setEnhancedContent] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  const handleEnhance = async () => {
    if (!content.trim()) {
      toast.error('Please enter some content to enhance')
      return
    }

    setIsLoading(true)
    try {
      const response = await aiAPI.enhanceContent({
        content,
        section,
        jobTitle,
        industry
      })

      setEnhancedContent(response.data.enhanced)
      setSuggestions(response.data.suggestions || [])
      setShowSuggestions(true)
      toast.success('Content enhanced successfully!')
    } catch (error) {
      console.error('AI enhancement error:', error)
      toast.error('Failed to enhance content. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAccept = () => {
    onEnhance(enhancedContent)
    setShowSuggestions(false)
    setEnhancedContent('')
    setSuggestions([])
  }

  const handleReject = () => {
    setShowSuggestions(false)
    setEnhancedContent('')
    setSuggestions([])
  }

  const handleRegenerate = () => {
    handleEnhance()
  }

  return (
    <div className="space-y-4">
      {/* AI Enhancement Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={handleEnhance}
          disabled={isLoading || disabled || !content.trim()}
          className="btn btn-outline btn-sm inline-flex items-center"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4 mr-2" />
          )}
          {isLoading ? 'Enhancing...' : 'Enhance with AI'}
        </button>

        {showSuggestions && (
          <div className="flex space-x-2">
            <button
              onClick={handleRegenerate}
              disabled={isLoading}
              className="btn btn-ghost btn-sm inline-flex items-center"
            >
              <RefreshCw className="w-4 h-4 mr-1" />
              Regenerate
            </button>
          </div>
        )}
      </div>

      {/* Enhanced Content Preview */}
      {showSuggestions && enhancedContent && (
        <div className="ai-suggestion">
          <div className="flex items-start justify-between mb-3">
            <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-100 flex items-center">
              <Lightbulb className="w-4 h-4 mr-2" />
              AI Enhanced Version
            </h4>
            <div className="flex space-x-2">
              <button
                onClick={handleAccept}
                className="btn btn-primary btn-sm inline-flex items-center"
              >
                <CheckCircle className="w-4 h-4 mr-1" />
                Accept
              </button>
              <button
                onClick={handleReject}
                className="btn btn-ghost btn-sm inline-flex items-center"
              >
                <X className="w-4 h-4 mr-1" />
                Reject
              </button>
            </div>
          </div>

          <div className="prose prose-sm max-w-none">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                {enhancedContent}
              </p>
            </div>
          </div>

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="mt-4">
              <h5 className="text-xs font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Suggestions:
              </h5>
              <ul className="space-y-1">
                {suggestions.map((suggestion, index) => (
                  <li key={index} className="text-xs text-blue-700 dark:text-blue-300 flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default AIEnhancement
