import { useState } from 'react'
import { Download, Eye, Maximize2, Minimize2 } from 'lucide-react'
import ModernTemplate from '../templates/ModernTemplate'
import ClassicTemplate from '../templates/ClassicTemplate'
import ElegantTemplate from '../templates/ElegantTemplate'
import CreativeTemplate from '../templates/CreativeTemplate'

function ResumePreview({ resumeData, template = 'modern' }) {
  const [isFullscreen, setIsFullscreen] = useState(false)

  const renderTemplate = () => {
    const templateProps = {
      data: resumeData,
      isPreview: true
    }

    switch (template) {
      case 'modern':
        return <ModernTemplate {...templateProps} />
      case 'classic':
        return <ClassicTemplate {...templateProps} />
      case 'elegant':
        return <ElegantTemplate {...templateProps} />
      case 'creative':
        return <CreativeTemplate {...templateProps} />
      default:
        return <ModernTemplate {...templateProps} />
    }
  }

  const handleDownload = () => {
    // This would trigger the download functionality
    console.log('Download triggered')
  }

  return (
    <div className={`resume-preview ${isFullscreen ? 'fixed inset-0 z-50 bg-white dark:bg-gray-900' : ''}`}>
      {/* Preview Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Resume Preview
        </h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleDownload}
            className="btn btn-outline btn-sm"
            title="Download PDF"
          >
            <Download className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="btn btn-ghost btn-sm"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Preview Content */}
      <div className={`overflow-auto ${isFullscreen ? 'h-full' : 'max-h-96'}`}>
        <div className="p-4">
          {renderTemplate()}
        </div>
      </div>
    </div>
  )
}

export default ResumePreview
