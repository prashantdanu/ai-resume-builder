import { useState } from 'react'
import { Plus, Trash2, FolderOpen } from 'lucide-react'

function ProjectsForm({ data, onChange }) {
  const [projects, setProjects] = useState(data || [])

  const addProject = () => {
    const newProject = {
      name: '',
      description: '',
      technologies: [],
      startDate: '',
      endDate: '',
      current: false,
      url: '',
      github: ''
    }
    setProjects([...projects, newProject])
    onChange([...projects, newProject])
  }

  const updateProject = (index, field, value) => {
    const updatedProjects = [...projects]
    updatedProjects[index] = {
      ...updatedProjects[index],
      [field]: value
    }
    setProjects(updatedProjects)
    onChange(updatedProjects)
  }

  const removeProject = (index) => {
    const updatedProjects = projects.filter((_, i) => i !== index)
    setProjects(updatedProjects)
    onChange(updatedProjects)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FolderOpen className="w-5 h-5 text-primary-600" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Projects
          </h2>
        </div>
        <button
          type="button"
          onClick={addProject}
          className="btn btn-primary btn-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </button>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {projects.map((project, index) => (
          <div key={index} className="card p-4">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {project.name || 'Untitled Project'}
                </h3>
                {project.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {project.description}
                  </p>
                )}
              </div>
              <button
                onClick={() => removeProject(index)}
                className="btn btn-ghost btn-sm text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Edit Form */}
            <div className="space-y-3">
              <div className="form-group">
                <label className="form-label">Project Name</label>
                <input
                  type="text"
                  value={project.name}
                  onChange={(e) => updateProject(index, 'name', e.target.value)}
                  className="input"
                  placeholder="My Awesome Project"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  value={project.description}
                  onChange={(e) => updateProject(index, 'description', e.target.value)}
                  rows={3}
                  className="input"
                  placeholder="Describe your project..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">Start Date</label>
                  <input
                    type="date"
                    value={project.startDate}
                    onChange={(e) => updateProject(index, 'startDate', e.target.value)}
                    className="input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">End Date</label>
                  <input
                    type="date"
                    value={project.endDate}
                    onChange={(e) => updateProject(index, 'endDate', e.target.value)}
                    className="input"
                    disabled={project.current}
                  />
                  <div className="flex items-center mt-2">
                    <input
                      type="checkbox"
                      checked={project.current}
                      onChange={(e) => updateProject(index, 'current', e.target.checked)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Currently working on this project
                    </label>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">Project URL</label>
                  <input
                    type="url"
                    value={project.url}
                    onChange={(e) => updateProject(index, 'url', e.target.value)}
                    className="input"
                    placeholder="https://myproject.com"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">GitHub URL</label>
                  <input
                    type="url"
                    value={project.github}
                    onChange={(e) => updateProject(index, 'github', e.target.value)}
                    className="input"
                    placeholder="https://github.com/username/project"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

        {projects.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <FolderOpen className="w-12 h-12 mx-auto mb-4" />
            <p>No projects added yet</p>
            <p className="text-sm">Click "Add Project" to get started</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProjectsForm
