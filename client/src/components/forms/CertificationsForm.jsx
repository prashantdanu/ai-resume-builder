import { useState } from 'react'
import { Plus, Trash2, Award } from 'lucide-react'

function CertificationsForm({ data, onChange }) {
  const [certifications, setCertifications] = useState(data || [])

  const addCertification = () => {
    const newCertification = {
      name: '',
      issuer: '',
      date: '',
      expiryDate: '',
      credentialId: '',
      url: ''
    }
    setCertifications([...certifications, newCertification])
    onChange([...certifications, newCertification])
  }

  const updateCertification = (index, field, value) => {
    const updatedCertifications = [...certifications]
    updatedCertifications[index] = {
      ...updatedCertifications[index],
      [field]: value
    }
    setCertifications(updatedCertifications)
    onChange(updatedCertifications)
  }

  const removeCertification = (index) => {
    const updatedCertifications = certifications.filter((_, i) => i !== index)
    setCertifications(updatedCertifications)
    onChange(updatedCertifications)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Award className="w-5 h-5 text-primary-600" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Certifications
          </h2>
        </div>
        <button
          type="button"
          onClick={addCertification}
          className="btn btn-primary btn-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Certification
        </button>
      </div>

      {/* Certifications List */}
      <div className="space-y-4">
        {certifications.map((certification, index) => (
          <div key={index} className="card p-4">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {certification.name || 'Untitled Certification'}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {certification.issuer}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  {certification.date}
                </p>
              </div>
              <button
                onClick={() => removeCertification(index)}
                className="btn btn-ghost btn-sm text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Edit Form */}
            <div className="space-y-3">
              <div className="form-group">
                <label className="form-label">Certification Name</label>
                <input
                  type="text"
                  value={certification.name}
                  onChange={(e) => updateCertification(index, 'name', e.target.value)}
                  className="input"
                  placeholder="AWS Certified Solutions Architect"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Issuing Organization</label>
                <input
                  type="text"
                  value={certification.issuer}
                  onChange={(e) => updateCertification(index, 'issuer', e.target.value)}
                  className="input"
                  placeholder="Amazon Web Services"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">Issue Date</label>
                  <input
                    type="date"
                    value={certification.date}
                    onChange={(e) => updateCertification(index, 'date', e.target.value)}
                    className="input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Expiry Date (Optional)</label>
                  <input
                    type="date"
                    value={certification.expiryDate}
                    onChange={(e) => updateCertification(index, 'expiryDate', e.target.value)}
                    className="input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">Credential ID (Optional)</label>
                  <input
                    type="text"
                    value={certification.credentialId}
                    onChange={(e) => updateCertification(index, 'credentialId', e.target.value)}
                    className="input"
                    placeholder="ABC123456789"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Verification URL (Optional)</label>
                  <input
                    type="url"
                    value={certification.url}
                    onChange={(e) => updateCertification(index, 'url', e.target.value)}
                    className="input"
                    placeholder="https://verify.credential.com"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

        {certifications.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <Award className="w-12 h-12 mx-auto mb-4" />
            <p>No certifications added yet</p>
            <p className="text-sm">Click "Add Certification" to get started</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CertificationsForm
