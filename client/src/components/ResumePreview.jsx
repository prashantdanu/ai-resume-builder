import { useState, useEffect } from 'react'
import { Download, Eye, Maximize2, Minimize2 } from 'lucide-react'
import ModernTemplate from '../templates/ModernTemplate'
import ClassicTemplate from '../templates/ClassicTemplate'
import ElegantTemplate from '../templates/ElegantTemplate'
import CreativeTemplate from '../templates/CreativeTemplate'
import Template1 from '../templates/Template1'
import Template2 from '../templates/Template2'
import Template3 from '../templates/Template3'
import Template4 from '../templates/Template4'
import Template5 from '../templates/Template5'

function ResumePreview({ resumeData, template = 'modern' }) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [lastUpdate, setLastUpdate] = useState(null)

  const renderTemplate = () => {
    const templateProps = {
      data: resumeData,
      isPreview: true
    }

    try {
      switch (template) {
        case 'modern':
          return <ModernTemplate {...templateProps} />
        case 'classic':
          return <ClassicTemplate {...templateProps} />
        case 'elegant':
          return <ElegantTemplate {...templateProps} />
        case 'creative':
          return <CreativeTemplate {...templateProps} />
        case 'template1':
          return <Template1 {...templateProps} />
        case 'template2':
          return <Template2 {...templateProps} />
        case 'template3':
          return <Template3 {...templateProps} />
        case 'template4':
          return <Template4 {...templateProps} />
        case 'template5':
          return <Template5 {...templateProps} />
        default:
          return <ModernTemplate {...templateProps} />
      }
    } catch (err) {
      console.error('Error rendering template', template, err)
      return (
        <div className="p-6 bg-red-50 text-red-700 rounded">
          <h3 className="font-semibold">Preview failed to render</h3>
          <p className="text-sm">There was an error rendering the selected template ({template}). Check console for details.</p>
        </div>
      )
    }
  }

  const handleDownload = () => {
    // This would trigger the download functionality
    console.log('Download triggered')
  }

  // Track resumeData changes to show live indicator
  useEffect(() => {
    setLastUpdate(new Date())
  }, [resumeData])

  return (
    <div className={`resume-preview ${isFullscreen ? 'fixed inset-0 z-50 bg-white dark:bg-gray-900' : ''}`}>
      {/* Preview Header (drag handle) */}
  <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="flex items-center space-x-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Resume Preview
          </h3>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
            Live
          </span>
          {lastUpdate && (
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">Updated {lastUpdate.toLocaleTimeString()}</span>
          )}
        </div>

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
      <div className={`overflow-auto ${isFullscreen ? 'h-full' : ''} bg-gray-50 dark:bg-gray-800`}>
        <div className="p-4">
          {renderTemplate()}
        </div>
      </div>
    </div>
  )
}

export default ResumePreview
