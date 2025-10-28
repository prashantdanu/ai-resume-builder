import { format } from 'date-fns'

function Template4({ data, isPreview = false }) {
  const { personalInfo = {}, experience = [], projects = [], skills = [], settings = {} } = data || {}
  const fmt = (d) => { if (!d) return ''; try { return format(new Date(d),'MMM yyyy') } catch { return d } }

  return (
    <div className={`${isPreview ? 'max-w-4xl mx-auto shadow-lg' : ''} bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`} style={{fontFamily: 'Inter, Arial'}}>
      <div className="flex min-h-screen">
        {/* Main Content Area */}
        <main className="flex-1 p-8">
          <header className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{personalInfo.firstName} {personalInfo.lastName}</h1>
            {personalInfo.summary && <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{personalInfo.summary}</p>}
          </header>

          {projects && projects.length > 0 && (
            <section className="mb-8">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wide pb-1" style={{borderBottom:'1px solid #e5e7eb'}}>Featured Projects</h2>
              <div className="space-y-4">
                {projects.map((p,i) => (
                  <div key={i} className="mb-4">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{p.name}</h3>
                      <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{fmt(p.startDate)} — {p.current ? 'Present' : fmt(p.endDate)}</span>
                    </div>
                    {p.description && <p className="text-sm text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">{p.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {experience && experience.length > 0 && (
            <section className="mb-8">
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
        </main>

        {/* Right Sidebar with Accent Color */}
        <aside className="w-64 bg-blue-600 text-white p-6">
          <div className="text-sm">
            <div className="mb-6">
              <h3 className="text-sm font-semibold mb-3 uppercase tracking-wide">Contact</h3>
              <div className="space-y-2">
                {personalInfo.email && <div>{personalInfo.email}</div>}
                {personalInfo.phone && <div>{personalInfo.phone}</div>}
                {personalInfo.location && <div>{personalInfo.location}</div>}
              </div>
            </div>

            {skills && skills.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold mb-3 uppercase tracking-wide">Skills</h3>
                <div className="space-y-3">
                  {skills.map((s,i) => (
                    <div key={i}>
                      <h4 className="text-xs font-semibold mb-1">{s.category}</h4>
                      <p className="text-xs opacity-90">{s.skills?.join(', ')}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}

export default Template4
