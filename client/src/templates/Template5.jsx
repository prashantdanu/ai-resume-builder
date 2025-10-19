import { format } from 'date-fns'

function Template5({ data, isPreview = false }) {
  const { personalInfo = {}, experience = [], education = [], skills = [], achievements = [] } = data || {}
  const fmt = (d) => { if (!d) return ''; try { return format(new Date(d),'MMM yyyy') } catch { return d } }

  // Elegant-style layout with centered header and separate sections
  return (
    <div className={`${isPreview ? 'max-w-4xl mx-auto shadow-lg' : ''} bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8`} style={{fontFamily: 'Arial, sans-serif'}}> 
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{personalInfo.firstName} {personalInfo.lastName}</h1>
        <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
          {personalInfo.email && <div>{personalInfo.email}</div>}
          {personalInfo.phone && <div>{personalInfo.phone}</div>}
          {personalInfo.location && <div>{personalInfo.location}</div>}
        </div>
        {personalInfo.summary && <p className="text-sm text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">{personalInfo.summary}</p>}
      </header>

      <main className="space-y-8">
        {experience && experience.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wide border-b border-gray-300 dark:border-gray-600 pb-1">Experience</h2>
            <div className="space-y-4">
              {experience.map((e,i) => (
                <div key={i} className="mb-4">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{e.position}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{e.company}</p>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{fmt(e.startDate)} - {e.current ? 'Present' : fmt(e.endDate)}</span>
                  </div>
                  {e.description && <p className="text-sm text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">{e.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {education && education.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wide border-b border-gray-300 dark:border-gray-600 pb-1">Education</h2>
            <div className="space-y-3">
              {education.map((ed,i) => (
                <div key={i} className="mb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{ed.degree}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{ed.institution}</p>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{fmt(ed.startDate)} - {ed.current ? 'Present' : fmt(ed.endDate)}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {achievements && achievements.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wide border-b border-gray-300 dark:border-gray-600 pb-1">Achievements</h2>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              {achievements.map((a,i) => (
                <li key={i} className="flex items-start">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>{a.title || a}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  )
}

export default Template5
