import { format } from 'date-fns'

function ModernTemplate({ data, isPreview = false }) {
  const { personalInfo, experience, education, skills, projects, certifications, achievements } = data

  const formatDate = (dateString) => {
    if (!dateString) return ''
    return format(new Date(dateString), 'MMM yyyy')
  }

  return (
    <div className={`bg-white text-gray-900 ${isPreview ? 'max-w-4xl mx-auto shadow-lg' : ''}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">
            {personalInfo?.firstName} {personalInfo?.lastName}
          </h1>
          {personalInfo?.summary && (
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              {personalInfo.summary}
            </p>
          )}
        </div>
        
        {/* Contact Info */}
        <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm">
          {personalInfo?.email && (
            <span>{personalInfo.email}</span>
          )}
          {personalInfo?.phone && (
            <span>{personalInfo.phone}</span>
          )}
          {personalInfo?.address?.city && personalInfo?.address?.state && (
            <span>{personalInfo.address.city}, {personalInfo.address.state}</span>
          )}
          {personalInfo?.linkedin && (
            <span>LinkedIn: {personalInfo.linkedin}</span>
          )}
          {personalInfo?.github && (
            <span>GitHub: {personalInfo.github}</span>
          )}
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* Experience */}
        {experience && experience.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-blue-600 mb-6 border-b-2 border-blue-600 pb-2">
              Professional Experience
            </h2>
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <div key={index} className="border-l-4 border-blue-200 pl-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {exp.position}
                      </h3>
                      <p className="text-lg text-blue-600 font-medium">
                        {exp.company}
                        {exp.location && ` • ${exp.location}`}
                      </p>
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <p>
                        {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                      </p>
                    </div>
                  </div>
                  
                  {exp.description && (
                    <p className="text-gray-700 mb-3">{exp.description}</p>
                  )}
                  
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      {exp.achievements.map((achievement, achievementIndex) => (
                        <li key={achievementIndex}>{achievement}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-blue-600 mb-6 border-b-2 border-blue-600 pb-2">
              Education
            </h2>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div key={index} className="border-l-4 border-blue-200 pl-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {edu.degree} {edu.field && `in ${edu.field}`}
                      </h3>
                      <p className="text-lg text-blue-600 font-medium">
                        {edu.institution}
                        {edu.location && ` • ${edu.location}`}
                      </p>
                      {edu.gpa && (
                        <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
                      )}
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <p>
                        {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-blue-600 mb-6 border-b-2 border-blue-600 pb-2">
              Skills
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((skillGroup, index) => (
                <div key={index}>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {skillGroup.category}
                  </h3>
                  <p className="text-gray-700">
                    {skillGroup.skills?.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-blue-600 mb-6 border-b-2 border-blue-600 pb-2">
              Projects
            </h2>
            <div className="space-y-4">
              {projects.map((project, index) => (
                <div key={index} className="border-l-4 border-blue-200 pl-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {project.name}
                    </h3>
                    <div className="text-right text-sm text-gray-600">
                      <p>
                        {formatDate(project.startDate)} - {project.current ? 'Present' : formatDate(project.endDate)}
                      </p>
                    </div>
                  </div>
                  
                  {project.description && (
                    <p className="text-gray-700 mb-2">{project.description}</p>
                  )}
                  
                  {project.technologies && project.technologies.length > 0 && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Technologies:</span> {project.technologies.join(', ')}
                    </p>
                  )}
                  
                  {project.url && (
                    <p className="text-sm text-blue-600">
                      <a href={project.url} target="_blank" rel="noopener noreferrer">
                        View Project
                      </a>
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-blue-600 mb-6 border-b-2 border-blue-600 pb-2">
              Certifications
            </h2>
            <div className="space-y-3">
              {certifications.map((cert, index) => (
                <div key={index} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {cert.name}
                    </h3>
                    <p className="text-blue-600">{cert.issuer}</p>
                    {cert.credentialId && (
                      <p className="text-sm text-gray-600">ID: {cert.credentialId}</p>
                    )}
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <p>{formatDate(cert.date)}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Achievements */}
        {achievements && achievements.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-blue-600 mb-6 border-b-2 border-blue-600 pb-2">
              Achievements
            </h2>
            <div className="space-y-3">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {achievement.title}
                    </h3>
                    {achievement.description && (
                      <p className="text-gray-700">{achievement.description}</p>
                    )}
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <p>{formatDate(achievement.date)}</p>
                  </div>
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
