import ModernTemplate from './ModernTemplate'

// For now, use the same template as Modern
// In a real implementation, this would have a different design
function ElegantTemplate(props) {
  return <ModernTemplate {...props} />
}

export default ElegantTemplate
