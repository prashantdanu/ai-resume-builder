import { format } from 'date-fns'

function Template3({ data, isPreview = false }) {
  const { personalInfo = {}, experience = [], education = [], skills = [], settings = {} } = data || {}
  const fmt = (d) => { if (!d) return ''; try { return format(new Date(d),'MMM yyyy') } catch { return d } }

  return (
    <div className={`${isPreview ? 'max-w-4xl mx-auto shadow-lg' : ''} bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8`} style={{fontFamily: 'Inter, Arial, sans-serif'}}> 
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{personalInfo.firstName} {personalInfo.lastName}</h1>
        <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
          {personalInfo.email && <div>{personalInfo.email}</div>}
          {personalInfo.phone && <div>{personalInfo.phone}</div>}
          {personalInfo.location && <div>{personalInfo.location}</div>}
        </div>
        {personalInfo.summary && <p className="text-sm text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">{personalInfo.summary}</p>}
      </header>

      <main className="space-y-6">
        {experience && experience.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wide pb-1" style={{borderBottom:'1px solid #e5e7eb'}}>Experience</h2>
            <div className="space-y-4">
              {experience.map((e,i) => (
                <div key={i} className="mb-4">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{e.position}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{e.company}</p>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{fmt(e.startDate)} — {e.current ? 'Present' : fmt(e.endDate)}</span>
                  </div>
                  {e.description && <p className="text-sm text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">{e.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {education && education.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wide pb-1" style={{borderBottom:'1px solid #e5e7eb'}}>Education</h2>
            <div className="space-y-3">
              {education.map((ed,i) => (
                <div key={i} className="mb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{ed.degree}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{ed.institution}</p>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{fmt(ed.startDate)} — {ed.current ? 'Present' : fmt(ed.endDate)}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {skills && skills.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wide pb-1" style={{borderBottom:'1px solid #e5e7eb'}}>Skills</h2>
            <div className="text-sm text-gray-700 dark:text-gray-300">
              {skills.map(s => s.skills?.join(', ')).join(' • ')}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

export default Template3
