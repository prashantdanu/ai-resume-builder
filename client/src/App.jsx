import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { ResumeProvider } from './contexts/ResumeContext'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import ResumeBuilderPage from './pages/ResumeBuilderPage'
import TemplateSelectorPage from './pages/TemplateSelectorPage'
import PreviewPage from './pages/PreviewPage'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ResumeProvider>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
              </Route>
              
              {/* Protected routes */}
              <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="builder" element={<ResumeBuilderPage />} />
                <Route path="builder/:id" element={<ResumeBuilderPage />} />
                <Route path="templates" element={<TemplateSelectorPage />} />
                <Route path="preview/:id" element={<PreviewPage />} />
              </Route>
            </Routes>
          </div>
        </ResumeProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
