import { useState, useRef, useEffect } from 'react'
import ResumePreview from './ResumePreview'

// A simple resizable right pane: click-and-drag the divider to resize the preview width
export default function ResizablePreviewPane({ resumeData, template }) {
  const containerRef = useRef(null)
  const [width, setWidth] = useState(520)
  const isDragging = useRef(false)

  useEffect(() => {
    const onMouseMove = (e) => {
      if (!isDragging.current) return
      // calculate new width from right edge of window
      const newWidth = Math.max(320, window.innerWidth - e.clientX - 40)
      setWidth(newWidth)
    }

    const onMouseUp = () => {
      isDragging.current = false
      document.body.style.cursor = ''
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [])

  const onDividerDown = (e) => {
    isDragging.current = true
    document.body.style.cursor = 'ew-resize'
  }

  return (
    <div ref={containerRef} className="flex-shrink-0 relative" style={{ width }}>
      {/* Divider */}
      <div
        onMouseDown={onDividerDown}
        className="absolute left-0 top-0 bottom-0 w-2 z-40 hover:bg-gray-200 dark:hover:bg-gray-600 bg-transparent cursor-ew-resize"
        style={{ transform: 'translateX(-100%)' }}
        aria-hidden
      />

      <div className="h-full">
        <ResumePreview resumeData={resumeData} template={template} />
      </div>
    </div>
  )
}
