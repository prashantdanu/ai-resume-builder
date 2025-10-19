import { useState } from 'react'
import { Plus, Trash2, Code, X } from 'lucide-react'

function SkillsForm({ data, onChange }) {
  const [skills, setSkills] = useState(data || [])

  const addSkillGroup = () => {
    const newSkillGroup = {
      category: '',
      skills: []
    }
    setSkills([...skills, newSkillGroup])
    onChange([...skills, newSkillGroup])
  }

  const updateSkillGroup = (index, field, value) => {
    const updatedSkills = [...skills]
    updatedSkills[index] = {
      ...updatedSkills[index],
      [field]: value
    }
    setSkills(updatedSkills)
    onChange(updatedSkills)
  }

  const addSkill = (groupIndex) => {
    const updatedSkills = [...skills]
    updatedSkills[groupIndex].skills.push('')
    setSkills(updatedSkills)
    onChange(updatedSkills)
  }

  const updateSkill = (groupIndex, skillIndex, value) => {
    const updatedSkills = [...skills]
    updatedSkills[groupIndex].skills[skillIndex] = value
    setSkills(updatedSkills)
    onChange(updatedSkills)
  }

  const removeSkill = (groupIndex, skillIndex) => {
    const updatedSkills = [...skills]
    updatedSkills[groupIndex].skills.splice(skillIndex, 1)
    setSkills(updatedSkills)
    onChange(updatedSkills)
  }

  const removeSkillGroup = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index)
    setSkills(updatedSkills)
    onChange(updatedSkills)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Code className="w-5 h-5 text-primary-600" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Skills
          </h2>
        </div>
        <button
          type="button"
          onClick={addSkillGroup}
          className="btn btn-primary btn-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Skill Category
        </button>
      </div>

      {/* Skills List */}
      <div className="space-y-4">
        {skills.map((skillGroup, groupIndex) => (
          <div key={groupIndex} className="card p-4">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {skillGroup.category || 'Untitled Category'}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800 dark:bg-primary-900/20 dark:text-primary-400"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => removeSkillGroup(groupIndex)}
                className="btn btn-ghost btn-sm text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Edit Form */}
            <div className="space-y-3">
              <div className="form-group">
                <label className="form-label">Category Name</label>
                <input
                  type="text"
                  value={skillGroup.category}
                  onChange={(e) => updateSkillGroup(groupIndex, 'category', e.target.value)}
                  className="input"
                  placeholder="Programming Languages"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Skills</label>
                <div className="space-y-2">
                  {skillGroup.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="flex space-x-2">
                      <input
                        type="text"
                        value={skill}
                        onChange={(e) => updateSkill(groupIndex, skillIndex, e.target.value)}
                        className="input flex-1"
                        placeholder="Enter a skill..."
                      />
                      <button
                        type="button"
                        onClick={() => removeSkill(groupIndex, skillIndex)}
                        className="btn btn-ghost btn-sm text-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addSkill(groupIndex)}
                    className="btn btn-outline btn-sm"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Skill
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {skills.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <Code className="w-12 h-12 mx-auto mb-4" />
            <p>No skills added yet</p>
            <p className="text-sm">Click "Add Skill Category" to get started</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SkillsForm
