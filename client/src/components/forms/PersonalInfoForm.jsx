import { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { User, Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react'
import AIEnhancement from '../AIEnhancement'

function PersonalInfoForm({ data, onChange }) {
  const [jobTitle, setJobTitle] = useState('')
  const [industry, setIndustry] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: data
  })

  const watchedValues = watch()

  // Keep form in sync if `data` prop changes (e.g., loading an existing resume)
  useEffect(() => {
    if (data) {
      reset(data)
    }
  }, [data, reset])

  const onSubmit = (formData) => {
    onChange(formData)
  }

  const handleAIEnhance = (enhancedContent) => {
    onChange({
      ...watchedValues,
      summary: enhancedContent
    })
  }

  // Debounced auto-change: call onChange when form values change so parent state updates
  const debounceTimer = useRef(null)
  useEffect(() => {
    // don't call onChange on initial mount if data is empty
    if (!watchedValues) return

    // debounce to avoid excessive updates
    if (debounceTimer.current) clearTimeout(debounceTimer.current)
    debounceTimer.current = setTimeout(() => {
      onChange(watchedValues)
    }, 400)

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(watchedValues)])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex items-center space-x-2 mb-6">
        <User className="w-5 h-5 text-primary-600" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Personal Information
        </h2>
      </div>

      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-group">
          <label htmlFor="firstName" className="form-label">
            First Name *
          </label>
          <input
            {...register('firstName', { required: 'First name is required' })}
            type="text"
            className={`input ${errors.firstName ? 'border-red-500' : ''}`}
            placeholder="John"
          />
          {errors.firstName && (
            <p className="form-error">{errors.firstName.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="lastName" className="form-label">
            Last Name *
          </label>
          <input
            {...register('lastName', { required: 'Last name is required' })}
            type="text"
            className={`input ${errors.lastName ? 'border-red-500' : ''}`}
            placeholder="Doe"
          />
          {errors.lastName && (
            <p className="form-error">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      {/* Contact Info */}
      <div className="space-y-4">
        <div className="form-group">
          <label htmlFor="email" className="form-label flex items-center">
            <Mail className="w-4 h-4 mr-2" />
            Email Address *
          </label>
          <input
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
            type="email"
            className={`input ${errors.email ? 'border-red-500' : ''}`}
            placeholder="john@example.com"
          />
          {errors.email && (
            <p className="form-error">{errors.email.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="phone" className="form-label flex items-center">
            <Phone className="w-4 h-4 mr-2" />
            Phone Number
          </label>
          <input
            {...register('phone')}
            type="tel"
            className="input"
            placeholder="+1 (555) 123-4567"
          />
        </div>
      </div>

      {/* Address */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
          <MapPin className="w-5 h-5 mr-2" />
          Address
        </h3>
        
        <div className="form-group">
          <label htmlFor="address.street" className="form-label">
            Street Address
          </label>
          <input
            {...register('address.street')}
            type="text"
            className="input"
            placeholder="123 Main Street"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="form-group">
            <label htmlFor="address.city" className="form-label">
              City
            </label>
            <input
              {...register('address.city')}
              type="text"
              className="input"
              placeholder="San Francisco"
            />
          </div>

          <div className="form-group">
            <label htmlFor="address.state" className="form-label">
              State/Province
            </label>
            <input
              {...register('address.state')}
              type="text"
              className="input"
              placeholder="CA"
            />
          </div>

          <div className="form-group">
            <label htmlFor="address.zipCode" className="form-label">
              ZIP/Postal Code
            </label>
            <input
              {...register('address.zipCode')}
              type="text"
              className="input"
              placeholder="94105"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="address.country" className="form-label">
            Country
          </label>
          <input
            {...register('address.country')}
            type="text"
            className="input"
            placeholder="United States"
          />
        </div>
      </div>

      {/* Online Presence */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Online Presence
        </h3>
        
        <div className="form-group">
          <label htmlFor="linkedin" className="form-label flex items-center">
            <Linkedin className="w-4 h-4 mr-2" />
            LinkedIn Profile
          </label>
          <input
            {...register('linkedin')}
            type="url"
            className="input"
            placeholder="https://linkedin.com/in/johndoe"
          />
        </div>

        <div className="form-group">
          <label htmlFor="github" className="form-label flex items-center">
            <Github className="w-4 h-4 mr-2" />
            GitHub Profile
          </label>
          <input
            {...register('github')}
            type="url"
            className="input"
            placeholder="https://github.com/johndoe"
          />
        </div>

        <div className="form-group">
          <label htmlFor="portfolio" className="form-label flex items-center">
            <Globe className="w-4 h-4 mr-2" />
            Portfolio Website
          </label>
          <input
            {...register('portfolio')}
            type="url"
            className="input"
            placeholder="https://johndoe.com"
          />
        </div>
      </div>

      {/* Professional Summary */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Professional Summary
        </h3>
        
        <div className="form-group">
          <label htmlFor="summary" className="form-label">
            Summary
          </label>
          <textarea
            {...register('summary')}
            rows={4}
            className="input"
            placeholder="Write a brief summary of your professional background, key skills, and career objectives..."
          />
          
          {/* AI Enhancement for Summary */}
          <div className="mt-4">
            <AIEnhancement
              content={watchedValues.summary || ''}
              section="summary"
              onEnhance={handleAIEnhance}
              jobTitle={jobTitle}
              industry={industry}
            />
          </div>
        </div>

        {/* Job Title and Industry for AI Context */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label htmlFor="jobTitle" className="form-label">
              Target Job Title (for AI context)
            </label>
            <input
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              type="text"
              className="input"
              placeholder="Software Engineer"
            />
          </div>

          <div className="form-group">
            <label htmlFor="industry" className="form-label">
              Industry (for AI context)
            </label>
            <input
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              type="text"
              className="input"
              placeholder="Technology"
            />
          </div>
        </div>
      </div>

      {/* Auto-save indicator */}
      <div className="text-right">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Changes are saved automatically
        </p>
      </div>
    </form>
  )
}

export default PersonalInfoForm
