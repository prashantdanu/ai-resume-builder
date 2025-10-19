import { format } from 'date-fns'

function CreativeTemplate({ data, isPreview = false }) {
  const { personalInfo = {}, experience = [], skills = [], projects = [], certifications = [] } = data || {}
  const fmt = (d) => { if (!d) return ''; try { return format(new Date(d),'MMM yyyy') } catch { return d } }

  return (
    <div className={`${isPreview ? 'max-w-4xl mx-auto shadow-lg' : ''} bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6`}>
      <div className="flex items-start space-x-6">
        <div className="w-2/3">
          <h1 className="text-3xl font-bold">{personalInfo.firstName} {personalInfo.lastName}</h1>
          {personalInfo.summary && <p className="text-sm text-gray-600 dark:text-gray-300">{personalInfo.summary}</p>}

          <section className="mt-6">
            <h2 className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-3">Experience</h2>
            <div className="space-y-4">
              {experience.map((e,i) => (
                <div key={i} className="">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold">{e.position} <span className="text-sm text-gray-500">@ {e.company}</span></h3>
                      {e.location && <p className="text-sm text-gray-600 dark:text-gray-400">{e.location}</p>}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{fmt(e.startDate)} - {e.current ? 'Present' : fmt(e.endDate)}</div>
                  </div>
                  {e.description && <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">{e.description}</p>}
                </div>
              ))}
            </div>
          </section>

          <section className="mt-6">
            <h2 className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-3">Projects</h2>
            <div className="space-y-3">
              {projects.map((p,i) => (
                <div key={i}>
                  <div className="flex justify-between">
                    <h3 className="font-medium">{p.name}</h3>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{fmt(p.startDate)} - {p.current ? 'Present' : fmt(p.endDate)}</div>
                  </div>
                  {p.description && <p className="text-sm text-gray-700 dark:text-gray-300">{p.description}</p>}
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="w-1/3 space-y-6">
          <div>
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Contact</h4>
            <div className="text-sm text-gray-600 dark:text-gray-400">{personalInfo.email}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{personalInfo.phone}</div>
          </div>

          {skills && skills.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-primary-600 dark:text-primary-400">Skills</h4>
              <ul className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                {skills.map((g,i) => <li key={i}>{g.category}: {g.skills?.join(', ')}</li>)}
              </ul>
            </div>
          )}

          {certifications && certifications.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-primary-600 dark:text-primary-400">Certifications</h4>
              <ul className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                {certifications.map((c,i)=> <li key={i}>{c.name} — {c.issuer}</li>)}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}

export default CreativeTemplate
