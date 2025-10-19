import { format } from 'date-fns'

function Template1({ data, isPreview = false }) {
  const { personalInfo = {}, experience = [], education = [], skills = [], projects = [] } = data || {}
  const fmt = (d) => { if (!d) return ''; try { return format(new Date(d),'MMM yyyy') } catch { return d } }

  return (
    <div className={`${isPreview ? 'max-w-4xl mx-auto shadow-lg' : ''} bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`} style={{fontFamily: 'Arial, sans-serif'}}>
      <div className="flex min-h-screen">
        {/* Left Sidebar - Contact Info & Skills */}
        <aside className="w-1/3 bg-gray-100 dark:bg-gray-800 p-6">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{personalInfo.firstName} {personalInfo.lastName}</h1>
            {personalInfo.jobTitle && <p className="text-sm text-gray-600 dark:text-gray-300">{personalInfo.jobTitle}</p>}
          </div>

          {/* Contact Information */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3 uppercase tracking-wide">Contact</h3>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              {personalInfo.email && <div>{personalInfo.email}</div>}
              {personalInfo.phone && <div>{personalInfo.phone}</div>}
              {personalInfo.location && <div>{personalInfo.location}</div>}
            </div>
          </div>

          {/* Skills */}
          {skills && skills.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3 uppercase tracking-wide">Skills</h3>
              <div className="space-y-3">
                {skills.map((s,i) => (
                  <div key={i}>
                    <h4 className="text-xs font-semibold text-gray-800 dark:text-gray-200 mb-1">{s.category}</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{s.skills?.join(', ')}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Summary */}
          {personalInfo.summary && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3 uppercase tracking-wide">About</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{personalInfo.summary}</p>
            </div>
          )}
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6">
          {experience && experience.length > 0 && (
            <section className="mb-8">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wide border-b-2 border-gray-300 dark:border-gray-600 pb-1">Experience</h2>
              <div className="space-y-4">
                {experience.map((e, idx) => (
                  <div key={idx} className="mb-4">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{e.position}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{e.company}{e.location ? `, ${e.location}` : ''}</p>
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
            <section className="mb-8">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wide border-b-2 border-gray-300 dark:border-gray-600 pb-1">Education</h2>
              <div className="space-y-3">
                {education.map((ed,i) => (
                  <div key={i} className="mb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{ed.degree}{ed.field ? ` in ${ed.field}` : ''}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{ed.institution}</p>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{fmt(ed.startDate)} - {ed.current ? 'Present' : fmt(ed.endDate)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {projects && projects.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wide border-b-2 border-gray-300 dark:border-gray-600 pb-1">Projects</h2>
              <div className="space-y-3">
                {projects.map((p,i) => (
                  <div key={i} className="mb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{p.name}</h3>
                        {p.description && <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{p.description}</p>}
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{fmt(p.startDate)} - {p.current ? 'Present' : fmt(p.endDate)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  )
}

export default Template1
