import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { 
  FileText, 
  Sparkles, 
  Download, 
  Eye, 
  Zap, 
  Shield, 
  CheckCircle,
  ArrowRight,
  Star,
  Users,
  Clock
} from 'lucide-react'

function HomePage() {
  const { isAuthenticated } = useAuth()

  const features = [
    {
      icon: Sparkles,
      title: 'AI-Powered Enhancement',
      description: 'Get intelligent suggestions to improve your resume content, optimize for ATS systems, and enhance your professional presentation.'
    },
    {
      icon: FileText,
      title: 'Multiple Templates',
      description: 'Choose from modern, classic, elegant, and creative templates designed for different industries and career levels.'
    },
    {
      icon: Download,
      title: 'Instant Downloads',
      description: 'Export your resume as PDF or Word document with professional formatting and ATS-friendly structure.'
    },
    {
      icon: Eye,
      title: 'Real-time Preview',
      description: 'See your resume come to life as you type with our live preview feature and instant formatting updates.'
    },
    {
      icon: Zap,
      title: 'ATS Optimization',
      description: 'Built-in ATS score calculator and keyword optimization to ensure your resume passes applicant tracking systems.'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your data is encrypted and secure. We never share your personal information with third parties.'
    }
  ]

  const stats = [
    { label: 'Resumes Created', value: '50K+', icon: FileText },
    { label: 'Happy Users', value: '25K+', icon: Users },
    { label: 'Success Rate', value: '95%', icon: CheckCircle },
    { label: 'Time Saved', value: '2hrs', icon: Clock }
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Software Engineer',
      company: 'Tech Corp',
      content: 'The AI suggestions helped me optimize my resume for ATS systems. I got 3x more interview calls!',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Marketing Manager',
      company: 'Growth Inc',
      content: 'Beautiful templates and easy to use. Created a professional resume in just 15 minutes.',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'Data Analyst',
      company: 'Analytics Co',
      content: 'The real-time preview and AI enhancements made resume writing so much easier and effective.',
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Build Your Perfect Resume with{' '}
              <span className="gradient-text">AI Power</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Create professional, ATS-optimized resumes that get you noticed. 
              Our AI-powered platform helps you craft compelling content and choose the perfect template.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="btn btn-primary btn-lg inline-flex items-center"
                >
                  Go to Dashboard
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="btn btn-primary btn-lg inline-flex items-center"
                  >
                    Get Started Free
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                  <Link
                    to="/login"
                    className="btn btn-outline btn-lg"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              No credit card required • Free forever plan available
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg mb-4">
                    <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need to Build the Perfect Resume
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our comprehensive platform combines AI technology with professional design 
              to help you create resumes that stand out from the competition.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="card p-6 hover:shadow-lg transition-shadow">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg mb-4">
                    <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Loved by Job Seekers Worldwide
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              See what our users have to say about their success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4 italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mr-3">
                    <span className="text-primary-600 dark:text-primary-400 font-semibold">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Build Your Perfect Resume?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of successful job seekers who have landed their dream jobs 
            with our AI-powered resume builder.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="btn bg-white text-primary-600 hover:bg-gray-100 btn-lg inline-flex items-center"
              >
                Go to Dashboard
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="btn bg-white text-primary-600 hover:bg-gray-100 btn-lg inline-flex items-center"
                >
                  Start Building Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  to="/templates"
                  className="btn border-2 border-white text-white hover:bg-white hover:text-primary-600 btn-lg"
                >
                  View Templates
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
