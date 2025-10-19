import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useResume } from '../contexts/ResumeContext'
import { Eye, Check, FileText, Download } from 'lucide-react'

function TemplateSelectorPage() {
  const navigate = useNavigate()
  const { templates, createResume } = useResume()
  const [selectedTemplate, setSelectedTemplate] = useState('modern')
  const [isCreating, setIsCreating] = useState(false)

  const handleCreateResume = async () => {
    setIsCreating(true)
    try {
      const result = await createResume({
        title: 'New Resume',
        template: selectedTemplate,
        personalInfo: {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          address: {
            street: '',
            city: '',
            state: '',
            zipCode: '',
            country: ''
          },
          linkedin: '',
          github: '',
          portfolio: '',
          summary: ''
        },
        experience: [],
        education: [],
        skills: [],
        projects: [],
        certifications: [],
        achievements: [],
        languages: []
      })
      
      if (result.success) {
        navigate(`/builder/${result.resume._id}`)
      }
    } catch (error) {
      console.error('Error creating resume:', error)
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Choose Your Resume Template
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Select from our professionally designed templates. Each template is optimized for ATS systems 
            and designed to make your resume stand out.
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`template-card ${selectedTemplate === template.id ? 'selected' : ''}`}
              onClick={() => setSelectedTemplate(template.id)}
            >
              <div className="p-6">
                <div className="aspect-[3/4] bg-white dark:bg-gray-800 rounded-lg shadow-md mb-4 flex items-center justify-center">
                  <FileText className="w-16 h-16 text-gray-400" />
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {template.name}
                </h3>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {template.description}
                </p>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                    Features:
                  </h4>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    {template.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="w-3 h-3 mr-2 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {selectedTemplate === template.id && (
                  <div className="mt-4 flex items-center justify-center">
                    <Check className="w-5 h-5 text-primary-600 mr-2" />
                    <span className="text-sm font-medium text-primary-600">
                      Selected
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="btn btn-outline btn-lg"
          >
            Back to Dashboard
          </button>
          <button
            onClick={handleCreateResume}
            disabled={isCreating}
            className="btn btn-primary btn-lg"
          >
            {isCreating ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Creating Resume...
              </>
            ) : (
              <>
                <FileText className="w-5 h-5 mr-2" />
                Create Resume with {templates.find(t => t.id === selectedTemplate)?.name}
              </>
            )}
          </button>
        </div>

        {/* Template Preview */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Template Preview
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <div className="aspect-[8.5/11] bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <FileText className="w-24 h-24 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Preview for {templates.find(t => t.id === selectedTemplate)?.name} template
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                    This would show a live preview of the selected template
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TemplateSelectorPage
