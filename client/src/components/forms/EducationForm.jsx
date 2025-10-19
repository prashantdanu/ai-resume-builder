import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Plus, Trash2, GraduationCap, Calendar, MapPin } from 'lucide-react'

function EducationForm({ data, onChange }) {
  const [educations, setEducations] = useState(data || [])
  const [editingIndex, setEditingIndex] = useState(-1)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()

  const addEducation = () => {
    const newEducation = {
      institution: '',
      degree: '',
      field: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      gpa: '',
      description: ''
    }
    setEducations([...educations, newEducation])
    setEditingIndex(educations.length)
    reset(newEducation)
  }

  const editEducation = (index) => {
    setEditingIndex(index)
    reset(educations[index])
  }

  const saveEducation = (formData) => {
    const updatedEducations = [...educations]
    if (editingIndex >= 0) {
      updatedEducations[editingIndex] = formData
    } else {
      updatedEducations.push(formData)
    }
    setEducations(updatedEducations)
    onChange(updatedEducations)
    setEditingIndex(-1)
    reset()
  }

  const deleteEducation = (index) => {
    const updatedEducations = educations.filter((_, i) => i !== index)
    setEducations(updatedEducations)
    onChange(updatedEducations)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <GraduationCap className="w-5 h-5 text-primary-600" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Education
          </h2>
        </div>
        <button
          type="button"
          onClick={addEducation}
          className="btn btn-primary btn-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Education
        </button>
      </div>

      {/* Education List */}
      <div className="space-y-4">
        {educations.map((education, index) => (
          <div key={index} className="card p-4">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {education.degree} {education.field && `in ${education.field}`}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {education.institution} • {education.location}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  {education.startDate} - {education.current ? 'Present' : education.endDate}
                </p>
                {education.gpa && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    GPA: {education.gpa}
                  </p>
                )}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => editEducation(index)}
                  className="btn btn-ghost btn-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteEducation(index)}
                  className="btn btn-ghost btn-sm text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {educations.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <GraduationCap className="w-12 h-12 mx-auto mb-4" />
            <p>No education added yet</p>
            <p className="text-sm">Click "Add Education" to get started</p>
          </div>
        )}
      </div>

      {/* Education Form */}
      {editingIndex >= 0 && (
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {editingIndex < educations.length ? 'Edit Education' : 'Add Education'}
          </h3>
          
          <form onSubmit={handleSubmit(saveEducation)} className="space-y-4">
            <div className="form-group">
              <label className="form-label flex items-center">
                <GraduationCap className="w-4 h-4 mr-2" />
                Institution *
              </label>
              <input
                {...register('institution', { required: 'Institution is required' })}
                type="text"
                className={`input ${errors.institution ? 'border-red-500' : ''}`}
                placeholder="University of California, Berkeley"
              />
              {errors.institution && (
                <p className="form-error">{errors.institution.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label className="form-label">Degree *</label>
                <input
                  {...register('degree', { required: 'Degree is required' })}
                  type="text"
                  className={`input ${errors.degree ? 'border-red-500' : ''}`}
                  placeholder="Bachelor of Science"
                />
                {errors.degree && (
                  <p className="form-error">{errors.degree.message}</p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Field of Study</label>
                <input
                  {...register('field')}
                  type="text"
                  className="input"
                  placeholder="Computer Science"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                Location
              </label>
              <input
                {...register('location')}
                type="text"
                className="input"
                placeholder="Berkeley, CA"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label className="form-label flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Start Date *
                </label>
                <input
                  {...register('startDate', { required: 'Start date is required' })}
                  type="date"
                  className={`input ${errors.startDate ? 'border-red-500' : ''}`}
                />
                {errors.startDate && (
                  <p className="form-error">{errors.startDate.message}</p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">End Date</label>
                <input
                  {...register('endDate')}
                  type="date"
                  className="input"
                />
                <div className="flex items-center mt-2">
                  <input
                    {...register('current')}
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    Currently studying
                  </label>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label className="form-label">GPA (Optional)</label>
                <input
                  {...register('gpa')}
                  type="text"
                  className="input"
                  placeholder="3.8"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Description (Optional)</label>
              <textarea
                {...register('description')}
                rows={3}
                className="input"
                placeholder="Relevant coursework, projects, or achievements..."
              />
            </div>

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setEditingIndex(-1)}
                className="btn btn-ghost"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Save Education
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default EducationForm
