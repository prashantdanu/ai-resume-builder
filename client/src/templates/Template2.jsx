import { format } from 'date-fns'

function Template2({ data, isPreview = false }) {
  const { personalInfo = {}, experience = [], skills = [], projects = [] } = data || {}
  const fmt = (d) => { if (!d) return ''; try { return format(new Date(d),'MMM yyyy') } catch { return d } }

  // Two-column layout with right sidebar - inspired by Deedy Reversed
  return (
    <div className={`${isPreview ? 'max-w-4xl mx-auto shadow-lg' : ''} bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`} style={{fontFamily: 'Arial, sans-serif'}}>
      <div className="flex min-h-screen">
        {/* Main Content Area */}
        <div className="w-2/3 p-8">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{personalInfo.firstName} {personalInfo.lastName}</h1>
            {personalInfo.summary && <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{personalInfo.summary}</p>}
          </header>

          {experience && experience.length > 0 && (
            <section className="mb-8">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wide border-b border-gray-300 dark:border-gray-600 pb-1">Experience</h2>
              <div className="space-y-4">
                {experience.map((e,i) => (
                  <div key={i} className="mb-4">
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
        </div>

        {/* Right Sidebar */}
        <aside className="w-1/3 bg-gray-50 dark:bg-gray-800 p-6">
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
        </aside>
      </div>
    </div>
  )
}

export default Template2
