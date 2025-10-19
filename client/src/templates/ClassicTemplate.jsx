import Template1 from './Template1'

function ClassicTemplate(props) {
  // Keep classic name but reuse Template1 layout imported from PDFs
  return <Template1 {...props} />
}

export default ClassicTemplate
