import { useState } from 'react'
import { Plus, Trash2, Trophy } from 'lucide-react'

function AchievementsForm({ data, onChange }) {
  const [achievements, setAchievements] = useState(data || [])

  const addAchievement = () => {
    const newAchievement = {
      title: '',
      description: '',
      date: '',
      category: ''
    }
    setAchievements([...achievements, newAchievement])
    onChange([...achievements, newAchievement])
  }

  const updateAchievement = (index, field, value) => {
    const updatedAchievements = [...achievements]
    updatedAchievements[index] = {
      ...updatedAchievements[index],
      [field]: value
    }
    setAchievements(updatedAchievements)
    onChange(updatedAchievements)
  }

  const removeAchievement = (index) => {
    const updatedAchievements = achievements.filter((_, i) => i !== index)
    setAchievements(updatedAchievements)
    onChange(updatedAchievements)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Trophy className="w-5 h-5 text-primary-600" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Achievements
          </h2>
        </div>
        <button
          type="button"
          onClick={addAchievement}
          className="btn btn-primary btn-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Achievement
        </button>
      </div>

      {/* Achievements List */}
      <div className="space-y-4">
        {achievements.map((achievement, index) => (
          <div key={index} className="card p-4">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {achievement.title || 'Untitled Achievement'}
                </h3>
                {achievement.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {achievement.description}
                  </p>
                )}
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  {achievement.date} {achievement.category && `• ${achievement.category}`}
                </p>
              </div>
              <button
                onClick={() => removeAchievement(index)}
                className="btn btn-ghost btn-sm text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Edit Form */}
            <div className="space-y-3">
              <div className="form-group">
                <label className="form-label">Achievement Title</label>
                <input
                  type="text"
                  value={achievement.title}
                  onChange={(e) => updateAchievement(index, 'title', e.target.value)}
                  className="input"
                  placeholder="Employee of the Year"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  value={achievement.description}
                  onChange={(e) => updateAchievement(index, 'description', e.target.value)}
                  rows={3}
                  className="input"
                  placeholder="Describe your achievement..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">Date</label>
                  <input
                    type="date"
                    value={achievement.date}
                    onChange={(e) => updateAchievement(index, 'date', e.target.value)}
                    className="input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Category (Optional)</label>
                  <input
                    type="text"
                    value={achievement.category}
                    onChange={(e) => updateAchievement(index, 'category', e.target.value)}
                    className="input"
                    placeholder="Professional, Academic, Personal"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

        {achievements.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <Trophy className="w-12 h-12 mx-auto mb-4" />
            <p>No achievements added yet</p>
            <p className="text-sm">Click "Add Achievement" to get started</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AchievementsForm
