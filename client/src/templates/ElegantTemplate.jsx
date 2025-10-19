import { format } from 'date-fns'

function ElegantTemplate({ data, isPreview = false }) {
  const { personalInfo = {}, experience = [], education = [], skills = [] } = data || {}
  const fmt = (d) => { if (!d) return ''; try { return format(new Date(d),'MMM yyyy') } catch { return d } }

  return (
    <div className={`${isPreview ? 'max-w-4xl mx-auto shadow-lg' : ''} bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8`}>
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-6">
          <h1 className="text-3xl font-bold">{personalInfo.firstName} {personalInfo.lastName}</h1>
          {personalInfo.summary && <p className="text-sm text-gray-600 dark:text-gray-300">{personalInfo.summary}</p>}
        </header>

        {experience && experience.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-3">Experience</h2>
            <div className="space-y-4">
              {experience.map((e,i) => (
                <div key={i}>
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold">{e.position}</h3>
                      <p className="text-sm text-gray-600">{e.company}</p>
                    </div>
                    <div className="text-sm text-gray-600">{fmt(e.startDate)} - {e.current ? 'Present' : fmt(e.endDate)}</div>
                  </div>
                  {e.description && <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{e.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {education && education.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-3">Education</h2>
            <div className="space-y-3">
              {education.map((ed,i) => (
                <div key={i} className="flex justify-between">
                  <div>
                    <h3 className="font-medium">{ed.degree}{ed.field ? `, ${ed.field}` : ''}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{ed.institution}</p>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{fmt(ed.startDate)} - {ed.current ? 'Present' : fmt(ed.endDate)}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {skills && skills.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-3">Skills</h2>
            <p className="text-sm text-gray-700 dark:text-gray-300">{skills.map(s => s.skills?.join(', ')).join(' • ')}</p>
          </section>
        )}
      </div>
    </div>
  )
}

export default ElegantTemplate
