import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Plus, Trash2, Building, Calendar, MapPin, Briefcase } from 'lucide-react'
import AIEnhancement from '../AIEnhancement'

function ExperienceForm({ data, onChange }) {
  const [experiences, setExperiences] = useState(data || [])
  const [editingIndex, setEditingIndex] = useState(-1)

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm()

  const watchedValues = watch()

  const addExperience = () => {
    const newExperience = {
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: []
    }
    setExperiences([...experiences, newExperience])
    setEditingIndex(experiences.length)
    reset(newExperience)
  }

  const editExperience = (index) => {
    setEditingIndex(index)
    reset(experiences[index])
  }

  const saveExperience = (formData) => {
    const updatedExperiences = [...experiences]
    if (editingIndex >= 0) {
      updatedExperiences[editingIndex] = formData
    } else {
      updatedExperiences.push(formData)
    }
    setExperiences(updatedExperiences)
    onChange(updatedExperiences)
    setEditingIndex(-1)
    reset()
  }

  const deleteExperience = (index) => {
    const updatedExperiences = experiences.filter((_, i) => i !== index)
    setExperiences(updatedExperiences)
    onChange(updatedExperiences)
  }

  const addAchievement = (experienceIndex) => {
    const updatedExperiences = [...experiences]
    if (!updatedExperiences[experienceIndex].achievements) {
      updatedExperiences[experienceIndex].achievements = []
    }
    updatedExperiences[experienceIndex].achievements.push('')
    setExperiences(updatedExperiences)
    onChange(updatedExperiences)
  }

  const updateAchievement = (experienceIndex, achievementIndex, value) => {
    const updatedExperiences = [...experiences]
    updatedExperiences[experienceIndex].achievements[achievementIndex] = value
    setExperiences(updatedExperiences)
    onChange(updatedExperiences)
  }

  const removeAchievement = (experienceIndex, achievementIndex) => {
    const updatedExperiences = [...experiences]
    updatedExperiences[experienceIndex].achievements.splice(achievementIndex, 1)
    setExperiences(updatedExperiences)
    onChange(updatedExperiences)
  }

  const handleAIEnhance = (enhancedContent) => {
    const updatedExperiences = [...experiences]
    if (editingIndex >= 0) {
      updatedExperiences[editingIndex] = {
        ...updatedExperiences[editingIndex],
        description: enhancedContent
      }
      setExperiences(updatedExperiences)
      onChange(updatedExperiences)
      reset(updatedExperiences[editingIndex])
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Briefcase className="w-5 h-5 text-primary-600" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Work Experience
          </h2>
        </div>
        <button
          type="button"
          onClick={addExperience}
          className="btn btn-primary btn-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Experience
        </button>
      </div>

      {/* Experience List */}
      <div className="space-y-4">
        {experiences.map((experience, index) => (
          <div key={index} className="card p-4">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {experience.position || 'Untitled Position'}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {experience.company} • {experience.location}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  {experience.startDate} - {experience.current ? 'Present' : experience.endDate}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => editExperience(index)}
                  className="btn btn-ghost btn-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteExperience(index)}
                  className="btn btn-ghost btn-sm text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {experience.description && (
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                {experience.description}
              </p>
            )}

            {experience.achievements && experience.achievements.length > 0 && (
              <div className="space-y-1">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  Key Achievements:
                </h4>
                <ul className="list-disc list-inside space-y-1">
                  {experience.achievements.map((achievement, achievementIndex) => (
                    <li key={achievementIndex} className="text-sm text-gray-700 dark:text-gray-300">
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}

        {experiences.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <Briefcase className="w-12 h-12 mx-auto mb-4" />
            <p>No work experience added yet</p>
            <p className="text-sm">Click "Add Experience" to get started</p>
          </div>
        )}
      </div>

      {/* Experience Form */}
      {editingIndex >= 0 && (
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {editingIndex < experiences.length ? 'Edit Experience' : 'Add Experience'}
          </h3>
          
          <form onSubmit={handleSubmit(saveExperience)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label className="form-label flex items-center">
                  <Building className="w-4 h-4 mr-2" />
                  Company *
                </label>
                <input
                  {...register('company', { required: 'Company is required' })}
                  type="text"
                  className={`input ${errors.company ? 'border-red-500' : ''}`}
                  placeholder="Acme Corporation"
                />
                {errors.company && (
                  <p className="form-error">{errors.company.message}</p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Position/Title *</label>
                <input
                  {...register('position', { required: 'Position is required' })}
                  type="text"
                  className={`input ${errors.position ? 'border-red-500' : ''}`}
                  placeholder="Software Engineer"
                />
                {errors.position && (
                  <p className="form-error">{errors.position.message}</p>
                )}
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
                placeholder="San Francisco, CA"
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
                  disabled={watchedValues.current}
                />
                <div className="flex items-center mt-2">
                  <input
                    {...register('current')}
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    I currently work here
                  </label>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Job Description</label>
              <textarea
                {...register('description')}
                rows={3}
                className="input"
                placeholder="Describe your responsibilities and key accomplishments..."
              />
              
              {/* AI Enhancement for Description */}
              <div className="mt-4">
                <AIEnhancement
                  content={watchedValues.description || ''}
                  section="experience"
                  onEnhance={handleAIEnhance}
                />
              </div>
            </div>

            {/* Achievements */}
            <div className="form-group">
              <label className="form-label">Key Achievements</label>
              <div className="space-y-2">
                {watchedValues.achievements?.map((achievement, index) => (
                  <div key={index} className="flex space-x-2">
                    <input
                      {...register(`achievements.${index}`)}
                      type="text"
                      className="input flex-1"
                      placeholder="Enter an achievement..."
                    />
                    <button
                      type="button"
                      onClick={() => removeAchievement(editingIndex, index)}
                      className="btn btn-ghost btn-sm text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )) || []}
                <button
                  type="button"
                  onClick={() => addAchievement(editingIndex)}
                  className="btn btn-outline btn-sm"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Achievement
                </button>
              </div>
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
                Save Experience
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default ExperienceForm
