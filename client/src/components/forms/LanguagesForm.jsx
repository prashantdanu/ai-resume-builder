import { useState } from 'react'
import { Plus, Trash2, Globe } from 'lucide-react'

function LanguagesForm({ data, onChange }) {
  const [languages, setLanguages] = useState(data || [])

  const addLanguage = () => {
    const newLanguage = {
      language: '',
      proficiency: 'Intermediate'
    }
    setLanguages([...languages, newLanguage])
    onChange([...languages, newLanguage])
  }

  const updateLanguage = (index, field, value) => {
    const updatedLanguages = [...languages]
    updatedLanguages[index] = {
      ...updatedLanguages[index],
      [field]: value
    }
    setLanguages(updatedLanguages)
    onChange(updatedLanguages)
  }

  const removeLanguage = (index) => {
    const updatedLanguages = languages.filter((_, i) => i !== index)
    setLanguages(updatedLanguages)
    onChange(updatedLanguages)
  }

  const proficiencyLevels = [
    'Beginner',
    'Intermediate', 
    'Advanced',
    'Native'
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Globe className="w-5 h-5 text-primary-600" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Languages
          </h2>
        </div>
        <button
          type="button"
          onClick={addLanguage}
          className="btn btn-primary btn-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Language
        </button>
      </div>

      {/* Languages List */}
      <div className="space-y-4">
        {languages.map((language, index) => (
          <div key={index} className="card p-4">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {language.language || 'Untitled Language'}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {language.proficiency}
                </p>
              </div>
              <button
                onClick={() => removeLanguage(index)}
                className="btn btn-ghost btn-sm text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Edit Form */}
            <div className="space-y-3">
              <div className="form-group">
                <label className="form-label">Language</label>
                <input
                  type="text"
                  value={language.language}
                  onChange={(e) => updateLanguage(index, 'language', e.target.value)}
                  className="input"
                  placeholder="Spanish"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Proficiency Level</label>
                <select
                  value={language.proficiency}
                  onChange={(e) => updateLanguage(index, 'proficiency', e.target.value)}
                  className="input"
                >
                  {proficiencyLevels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        ))}

        {languages.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <Globe className="w-12 h-12 mx-auto mb-4" />
            <p>No languages added yet</p>
            <p className="text-sm">Click "Add Language" to get started</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default LanguagesForm
