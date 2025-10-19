import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useResume } from '../contexts/ResumeContext'
import { 
  Plus, 
  FileText, 
  Download, 
  Eye, 
  Edit, 
  Trash2, 
  Copy,
  MoreVertical,
  Search,
  Filter,
  Calendar,
  TrendingUp,
  Users,
  Clock
} from 'lucide-react'
import { format } from 'date-fns'

function DashboardPage() {
  const { user, isAuthenticated } = useAuth()
  const { 
    resumes, 
    isLoading, 
    loadResumes, 
    deleteResume, 
    duplicateResume,
    generatePDF,
    generateDOCX 
  } = useResume()
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  useEffect(() => {
    if (isAuthenticated) {
      loadResumes()
    } else {
      navigate('/login')
    }
  }, [isAuthenticated, navigate])

  const filteredResumes = resumes.filter(resume => {
    const matchesSearch = resume.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resume.personalInfo?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resume.personalInfo?.lastName?.toLowerCase().includes(searchTerm.toLowerCase())
    
    if (filterStatus === 'all') return matchesSearch
    if (filterStatus === 'recent') {
      const oneWeekAgo = new Date()
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
      return matchesSearch && new Date(resume.updatedAt) > oneWeekAgo
    }
    if (filterStatus === 'templates') {
      return matchesSearch && resume.template
    }
    
    return matchesSearch
  })

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      await deleteResume(id)
    }
  }

  const handleDuplicate = async (id) => {
    await duplicateResume(id)
  }

  const handleDownload = async (id, format) => {
    if (format === 'pdf') {
      await generatePDF(id)
    } else {
      await generateDOCX(id)
    }
  }

  const stats = [
    {
      label: 'Total Resumes',
      value: resumes.length,
      icon: FileText,
  color: 'text-primary-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20'
    },
    {
      label: 'This Week',
      value: resumes.filter(r => {
        const oneWeekAgo = new Date()
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
        return new Date(r.createdAt) > oneWeekAgo
      }).length,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/20'
    },
    {
      label: 'Templates Used',
      value: new Set(resumes.map(r => r.template)).size,
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20'
    },
    {
      label: 'Last Updated',
      value: resumes.length > 0 ? format(new Date(resumes[0].updatedAt), 'MMM d') : 'Never',
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100 dark:bg-orange-900/20'
    }
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading your resumes...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, {user?.firstName}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your resumes and create new ones with AI assistance
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="card p-6">
                <div className="flex items-center">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Actions and Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <Link
              to="/builder"
              className="btn btn-primary btn-md inline-flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create New Resume
            </Link>
            <Link
              to="/templates"
              className="btn btn-outline btn-md inline-flex items-center"
            >
              <FileText className="w-5 h-5 mr-2" />
              Browse Templates
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search resumes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10 w-full sm:w-64"
              />
            </div>

            {/* Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="input w-full sm:w-32"
            >
              <option value="all">All</option>
              <option value="recent">Recent</option>
              <option value="templates">Templates</option>
            </select>
          </div>
        </div>

        {/* Resumes Grid */}
        {filteredResumes.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {searchTerm || filterStatus !== 'all' ? 'No resumes found' : 'No resumes yet'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {searchTerm || filterStatus !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'Get started by creating your first resume with AI assistance'
              }
            </p>
            {!searchTerm && filterStatus === 'all' && (
              <Link
                to="/builder"
                className="btn btn-primary btn-md inline-flex items-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Your First Resume
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResumes.map((resume) => (
              <div key={resume._id} className="card hover:shadow-lg transition-shadow">
                <div className="card-header">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="card-title text-lg">{resume.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {resume.personalInfo?.firstName} {resume.personalInfo?.lastName}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        Updated {format(new Date(resume.updatedAt), 'MMM d, yyyy')}
                      </p>
                    </div>
                    <div className="relative group">
                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                        <MoreVertical className="w-4 h-4 text-gray-400" />
                      </button>
                      
                      {/* Dropdown menu */}
                      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                        <button
                          onClick={() => navigate(`/builder/${resume._id}`)}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </button>
                        <button
                          onClick={() => navigate(`/preview/${resume._id}`)}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Preview
                        </button>
                        <button
                          onClick={() => handleDuplicate(resume._id)}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Duplicate
                        </button>
                        <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                        <button
                          onClick={() => handleDelete(resume._id, resume.title)}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card-content">
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900/20 dark:text-primary-400">
                      {resume.template || 'Modern'} Template
                    </span>
                    {resume.aiEnhancements?.atsScore && (
                      <span className={`ats-score ${
                        resume.aiEnhancements.atsScore >= 80 ? 'excellent' :
                        resume.aiEnhancements.atsScore >= 60 ? 'good' : 'poor'
                      }`}>
                        ATS: {resume.aiEnhancements.atsScore}%
                      </span>
                    )}
                  </div>

                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      Created {format(new Date(resume.createdAt), 'MMM d, yyyy')}
                    </div>
                    {resume.experience?.length > 0 && (
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2" />
                        {resume.experience.length} experience{resume.experience.length !== 1 ? 's' : ''}
                      </div>
                    )}
                  </div>
                </div>

                <div className="card-footer">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleDownload(resume._id, 'pdf')}
                      className="btn btn-outline btn-sm flex-1"
                    >
                      <Download className="w-4 h-4 mr-1" />
                      PDF
                    </button>
                    <button
                      onClick={() => handleDownload(resume._id, 'docx')}
                      className="btn btn-outline btn-sm flex-1"
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Word
                    </button>
                    <button
                      onClick={() => navigate(`/preview/${resume._id}`)}
                      className="btn btn-primary btn-sm"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default DashboardPage
