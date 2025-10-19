import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useResume } from '../contexts/ResumeContext'
import { ArrowLeft, Download, Share2, Maximize2, Minimize2 } from 'lucide-react'
import ResumePreview from '../components/ResumePreview'

function PreviewPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { currentResume, loadResume, generatePDF, generateDOCX, isLoading } = useResume()
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    if (id) {
      loadResume(id)
    }
  }, [id])

  const handleDownload = async (format) => {
    if (format === 'pdf') {
      await generatePDF(id)
    } else {
      await generateDOCX(id)
    }
  }

  const handleShare = () => {
    // Implement sharing functionality
    navigator.clipboard.writeText(window.location.href)
    // Show toast notification
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading resume...</p>
        </div>
      </div>
    )
  }

  if (!currentResume) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Resume Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The resume you're looking for doesn't exist or you don't have permission to view it.
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="btn btn-primary"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="btn btn-ghost btn-sm"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {currentResume.title}
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Resume Preview
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => navigate(`/builder/${id}`)}
                className="btn btn-outline btn-sm"
              >
                Edit Resume
              </button>
              <button
                onClick={() => handleDownload('pdf')}
                className="btn btn-outline btn-sm"
              >
                <Download className="w-4 h-4 mr-2" />
                PDF
              </button>
              <button
                onClick={() => handleDownload('docx')}
                className="btn btn-outline btn-sm"
              >
                <Download className="w-4 h-4 mr-2" />
                Word
              </button>
              <button
                onClick={handleShare}
                className="btn btn-outline btn-sm"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </button>
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="btn btn-ghost btn-sm"
              >
                {isFullscreen ? (
                  <Minimize2 className="w-4 h-4" />
                ) : (
                  <Maximize2 className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Resume Preview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center">
          <div className="w-full max-w-4xl">
            <ResumePreview
              resumeData={currentResume}
              template={currentResume.template}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PreviewPage
