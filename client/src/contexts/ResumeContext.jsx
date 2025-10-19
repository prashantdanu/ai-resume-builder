import { createContext, useContext, useReducer, useEffect } from 'react'
import { resumeAPI, templateAPI } from '../services/api'
import toast from 'react-hot-toast'

const ResumeContext = createContext()

const initialState = {
  resumes: [],
  currentResume: null,
  isLoading: false,
  templates: [],
  selectedTemplate: 'modern'
}

function resumeReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      }
    case 'SET_RESUMES':
      return {
        ...state,
        resumes: action.payload,
        isLoading: false
      }
    case 'SET_CURRENT_RESUME':
      return {
        ...state,
        currentResume: action.payload
      }
    case 'ADD_RESUME':
      return {
        ...state,
        resumes: [action.payload, ...state.resumes]
      }
    case 'UPDATE_RESUME':
      return {
        ...state,
        resumes: state.resumes.map(resume => 
          resume._id === action.payload._id ? action.payload : resume
        ),
        currentResume: state.currentResume?._id === action.payload._id 
          ? action.payload 
          : state.currentResume
      }
    case 'DELETE_RESUME':
      return {
        ...state,
        resumes: state.resumes.filter(resume => resume._id !== action.payload),
        currentResume: state.currentResume?._id === action.payload 
          ? null 
          : state.currentResume
      }
    case 'SET_TEMPLATES':
      return {
        ...state,
        templates: action.payload
      }
    case 'SET_SELECTED_TEMPLATE':
      return {
        ...state,
        selectedTemplate: action.payload
      }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

export function ResumeProvider({ children }) {
  const [state, dispatch] = useReducer(resumeReducer, initialState)

  // Load templates on mount
  useEffect(() => {
    loadTemplates()
  }, [])

  const loadTemplates = async () => {
    try {
      const response = await templateAPI.getTemplates()
      dispatch({ type: 'SET_TEMPLATES', payload: response.data.templates })
    } catch (error) {
      console.error('Failed to load templates:', error)
    }
  }

  const loadResumes = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await resumeAPI.getResumes()
      dispatch({ type: 'SET_RESUMES', payload: response.data.resumes })
    } catch (error) {
      toast.error('Failed to load resumes')
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  const createResume = async (resumeData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await resumeAPI.createResume(resumeData)
      dispatch({ type: 'ADD_RESUME', payload: response.data.resume })
      dispatch({ type: 'SET_CURRENT_RESUME', payload: response.data.resume })
      toast.success('Resume created successfully!')
      return { success: true, resume: response.data.resume }
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to create resume'
      toast.error(message)
      return { success: false, error: message }
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  const updateResume = async (id, resumeData) => {
    try {
      const response = await resumeAPI.updateResume(id, resumeData)
      dispatch({ type: 'UPDATE_RESUME', payload: response.data.resume })
      toast.success('Resume updated successfully!')
      return { success: true, resume: response.data.resume }
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to update resume'
      toast.error(message)
      return { success: false, error: message }
    }
  }

  const deleteResume = async (id) => {
    try {
      await resumeAPI.deleteResume(id)
      dispatch({ type: 'DELETE_RESUME', payload: id })
      toast.success('Resume deleted successfully!')
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to delete resume'
      toast.error(message)
      return { success: false, error: message }
    }
  }

  const duplicateResume = async (id) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await resumeAPI.duplicateResume(id)
      dispatch({ type: 'ADD_RESUME', payload: response.data.resume })
      toast.success('Resume duplicated successfully!')
      return { success: true, resume: response.data.resume }
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to duplicate resume'
      toast.error(message)
      return { success: false, error: message }
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  const loadResume = async (id) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await resumeAPI.getResume(id)
      dispatch({ type: 'SET_CURRENT_RESUME', payload: response.data.resume })
      return { success: true, resume: response.data.resume }
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to load resume'
      toast.error(message)
      return { success: false, error: message }
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  const generatePDF = async (id) => {
    try {
      const response = await resumeAPI.generatePDF(id)
      const blob = new Blob([response.data], { type: 'application/pdf' })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `resume-${id}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
      toast.success('PDF downloaded successfully!')
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to generate PDF'
      toast.error(message)
      return { success: false, error: message }
    }
  }

  const generateDOCX = async (id) => {
    try {
      const response = await resumeAPI.generateDOCX(id)
      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `resume-${id}.docx`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
      toast.success('DOCX downloaded successfully!')
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to generate DOCX'
      toast.error(message)
      return { success: false, error: message }
    }
  }

  const setCurrentResume = (resume) => {
    dispatch({ type: 'SET_CURRENT_RESUME', payload: resume })
  }

  const setSelectedTemplate = (template) => {
    dispatch({ type: 'SET_SELECTED_TEMPLATE', payload: template })
  }

  const reset = () => {
    dispatch({ type: 'RESET' })
  }

  const value = {
    ...state,
    loadResumes,
    createResume,
    updateResume,
    deleteResume,
    duplicateResume,
    loadResume,
    generatePDF,
    generateDOCX,
    setCurrentResume,
    setSelectedTemplate,
    reset
  }

  return (
    <ResumeContext.Provider value={value}>
      {children}
    </ResumeContext.Provider>
  )
}

export function useResume() {
  const context = useContext(ResumeContext)
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider')
  }
  return context
}
