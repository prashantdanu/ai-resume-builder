import { format } from 'date-fns'
import modernPdf from './tempexample/MTeck_s_Resume.pdf'

function ModernTemplate({ data, isPreview = false, usePdfTemplate = false }) {
  const { personalInfo = {}, experience = [], education = [], skills = [], projects = [], certifications = [], achievements = [] } = data || {}

  const formatDate = (dateString) => {
    if (!dateString) return ''
    try { return format(new Date(dateString), 'MMM yyyy') } catch { return dateString }
  }

  if (usePdfTemplate) {
    return (
      <div className={isPreview ? 'max-w-4xl mx-auto shadow-lg' : ''}>
        <object
          data={modernPdf}
          type="application/pdf"
          width="100%"
          height="900"
          aria-label="Modern resume template preview"
        >
          <p>
            Your browser does not support PDFs. You can download the template
            <a href={modernPdf} target="_blank" rel="noopener noreferrer"> here</a>.
          </p>
        </object>
      </div>
    )
  }

  return (
    <div className={`bg-white dark:bg-gray-900 text-gray-900 dark:text-white ${isPreview ? 'max-w-4xl mx-auto shadow-lg' : ''}`}>
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-700 dark:to-primary-900 text-white p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">{personalInfo?.firstName} {personalInfo?.lastName}</h1>
          {personalInfo?.summary && <p className="text-lg opacity-90 max-w-2xl mx-auto">{personalInfo.summary}</p>}
        </div>
        <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm">
          {personalInfo?.email && <span>{personalInfo.email}</span>}
          {personalInfo?.phone && <span>{personalInfo.phone}</span>}
          {personalInfo?.linkedin && <span>LinkedIn: {personalInfo.linkedin}</span>}
          {personalInfo?.github && <span>GitHub: {personalInfo.github}</span>}
        </div>
      </div>

      <div className="p-8 space-y-8">
        {experience && experience.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-6 border-b-2 border-primary-600 dark:border-primary-400 pb-2">Professional Experience</h2>
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <div key={index} className="border-l-4 border-gray-200 dark:border-gray-700 pl-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{exp.position}</h3>
                      <p className="text-lg text-primary-700 font-medium">{exp.company}{exp.location ? ` • ${exp.location}` : ''}</p>
                    </div>
                    <div className="text-right text-sm text-gray-600">{formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}</div>
                  </div>
                  {exp.description && <p className="text-gray-700 mb-3">{exp.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default ModernTemplate
