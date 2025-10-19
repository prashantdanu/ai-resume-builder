import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useResume } from '../contexts/ResumeContext'
import { useAuth } from '../contexts/AuthContext'
import { 
  Save, 
  Eye, 
  Download, 
  ArrowLeft, 
  Plus, 
  Trash2,
  Loader2,
  FileText,
  Sparkles
} from 'lucide-react'
import PersonalInfoForm from '../components/forms/PersonalInfoForm'
import ExperienceForm from '../components/forms/ExperienceForm'
import EducationForm from '../components/forms/EducationForm'
import SkillsForm from '../components/forms/SkillsForm'
import ProjectsForm from '../components/forms/ProjectsForm'
import CertificationsForm from '../components/forms/CertificationsForm'
import AchievementsForm from '../components/forms/AchievementsForm'
import LanguagesForm from '../components/forms/LanguagesForm'
import ATSScore from '../components/ATSScore'
import ResumePreview from '../components/ResumePreview'
import ResizablePreviewPane from '../components/ResizablePreviewPane'
import toast from 'react-hot-toast'

const defaultResumeData = {
  title: 'My Resume',
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
  languages: [],
  template: 'modern',
  settings: {
    showPhoto: false,
    photoUrl: '',
    fontSize: 'medium',
    colorScheme: 'blue',
    spacing: 'normal'
  }
}

function ResumeBuilderPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { 
    currentResume, 
    loadResume, 
    createResume, 
    updateResume, 
    generatePDF, 
    generateDOCX,
    isLoading 
  } = useResume()

  const [resumeData, setResumeData] = useState(defaultResumeData)
  const [activeSection, setActiveSection] = useState('personal')
  const [isSaving, setIsSaving] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [showSections, setShowSections] = useState(true)
  const [atsScore, setAtsScore] = useState(null)

  const sections = [
    { id: 'personal', label: 'Personal Info', icon: FileText },
    { id: 'experience', label: 'Experience', icon: FileText },
    { id: 'education', label: 'Education', icon: FileText },
    { id: 'skills', label: 'Skills', icon: FileText },
    { id: 'projects', label: 'Projects', icon: FileText },
    { id: 'certifications', label: 'Certifications', icon: FileText },
    { id: 'achievements', label: 'Achievements', icon: FileText },
    { id: 'languages', label: 'Languages', icon: FileText }
  ]

  useEffect(() => {
    if (id) {
      loadResume(id)
    }
  }, [id])

  useEffect(() => {
    if (currentResume) {
      setResumeData(currentResume)
    }
  }, [currentResume])

  const handleSave = async () => {
    setIsSaving(true)
    try {
      if (id) {
        await updateResume(id, resumeData)
      } else {
        const result = await createResume(resumeData)
        if (result.success) {
          navigate(`/builder/${result.resume._id}`)
        }
      }
      toast.success('Resume saved successfully!')
    } catch (error) {
      toast.error('Failed to save resume')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDownload = async (format) => {
    if (!id) {
      toast.error('Please save the resume first')
      return
    }

    if (format === 'pdf') {
      await generatePDF(id)
    } else {
      await generateDOCX(id)
    }
  }

  const handlePreview = () => {
    setShowPreview(!showPreview)
  }

  const updateResumeData = (section, data) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data
    }))
  }

  const sectionIds = sections.map(s => s.id)

  const validateSection = (sectionId) => {
    // lightweight validation for moving forward
    if (sectionId === 'personal') {
      const p = resumeData.personalInfo || {}
      if (!p.firstName || !p.lastName || !p.email) {
        toast.error('Please fill first name, last name, and email before continuing')
        return false
      }
    }
    // other sections could add minimal checks in future
    return true
  }

  const nextSection = () => {
    const idx = sectionIds.indexOf(activeSection)
    if (idx === -1) return
    const next = sectionIds[idx + 1]
    if (!next) return
    if (!validateSection(activeSection)) return
    setActiveSection(next)
  }

  const prevSection = () => {
    const idx = sectionIds.indexOf(activeSection)
    if (idx <= 0) return
    const prev = sectionIds[idx - 1]
    setActiveSection(prev)
  }

  const renderSection = () => {
    switch (activeSection) {
      case 'personal':
        return (
          <PersonalInfoForm
            data={resumeData.personalInfo}
            onChange={(data) => updateResumeData('personalInfo', data)}
          />
        )
      case 'experience':
        return (
          <ExperienceForm
            data={resumeData.experience}
            onChange={(data) => updateResumeData('experience', data)}
          />
        )
      case 'education':
        return (
          <EducationForm
            data={resumeData.education}
            onChange={(data) => updateResumeData('education', data)}
          />
        )
      case 'skills':
        return (
          <SkillsForm
            data={resumeData.skills}
            onChange={(data) => updateResumeData('skills', data)}
          />
        )
      case 'projects':
        return (
          <ProjectsForm
            data={resumeData.projects}
            onChange={(data) => updateResumeData('projects', data)}
          />
        )
      case 'certifications':
        return (
          <CertificationsForm
            data={resumeData.certifications}
            onChange={(data) => updateResumeData('certifications', data)}
          />
        )
      case 'achievements':
        return (
          <AchievementsForm
            data={resumeData.achievements}
            onChange={(data) => updateResumeData('achievements', data)}
          />
        )
      case 'languages':
        return (
          <LanguagesForm
            data={resumeData.languages}
            onChange={(data) => updateResumeData('languages', data)}
          />
        )
      default:
        return null
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading resume...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="btn btn-ghost btn-sm"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {id ? 'Edit Resume' : 'Create New Resume'}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {id ? 'Update your resume information' : 'Build your professional resume with AI assistance'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="btn btn-primary btn-md"
            >
              {isSaving ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              {isSaving ? 'Saving...' : 'Save'}
            </button>
            {/* showSections toggle moved into the sidebar header */}
            <button
              onClick={handlePreview}
              className="btn btn-outline btn-md"
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </button>
            {id && (
              <>
                <button
                  onClick={() => handleDownload('pdf')}
                  className="btn btn-outline btn-md"
                >
                  <Download className="w-4 h-4 mr-2" />
                  PDF
                </button>
                <button
                  onClick={() => handleDownload('docx')}
                  className="btn btn-outline btn-md"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Word
                </button>
              </>
            )}
          </div>
        </div>

        <div className="lg:flex lg:space-x-6">
          {/* Sidebar */}
          {showSections && (
            <div className="hidden lg:block lg:w-80">
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Resume Sections
                </h3>
                <button
                  onClick={() => setShowSections(false)}
                  className="text-sm text-gray-500 hover:text-gray-700"
                  title="Collapse sections"
                >
                  Collapse
                </button>
              </div>
              <nav className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        activeSection === section.id
                          ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800'
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-3" />
                      {section.label}
                    </button>
                  )
                })}
              </nav>

              {/* ATS Score */}
              {atsScore !== null && (
                <div className="mt-6">
                  <ATSScore 
                    resumeData={resumeData} 
                    onScoreUpdate={setAtsScore}
                  />
                </div>
              )}
            </div>
          </div>
          )}

          {/* Floating reopen button when sections are hidden */}
          {!showSections && (
            <button
              onClick={() => setShowSections(true)}
              className="hidden lg:flex items-center justify-center fixed left-2 top-1/3 w-10 h-28 bg-primary-600 text-white rounded-r-md shadow-lg z-50"
              title="Open sections"
            >
              <span className="transform -rotate-90 text-sm">Sections</span>
            </button>
          )}

          {/* Content + Preview split */}
          <div className="flex-1 flex min-h-[400px] bg-transparent">
            {/* Form area (left pane) */}
            <div className="flex-1">
              <div className="card p-6 h-full">
                {renderSection()}
                {/* Next / Previous navigation */}
                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <button
                      type="button"
                      onClick={prevSection}
                      className={`btn btn-ghost mr-2 ${sectionIds.indexOf(activeSection) === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={sectionIds.indexOf(activeSection) === 0}
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      onClick={nextSection}
                      className="btn btn-primary"
                    >
                      Next
                    </button>
                  </div>
                  <div>
                    {/* quick save button */}
                    <button onClick={handleSave} className="btn btn-outline btn-sm">
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Preview splitter and pane (only when showPreview) */}
            {showPreview && (
              <ResizablePreviewPane
                resumeData={resumeData}
                template={resumeData.template}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResumeBuilderPage
