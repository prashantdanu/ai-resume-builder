const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/templates
// @desc    Get all available templates
// @access  Public
router.get('/', (req, res) => {
  const templates = [
    {
      id: 'modern',
      name: 'Modern',
      description: 'Clean and contemporary design with bold typography',
      preview: '/templates/modern-preview.png',
      features: [
        'Clean typography',
        'Color-coded sections',
        'Professional layout',
        'ATS-friendly format'
      ],
      colors: ['#2563eb', '#1e40af', '#1e3a8a'],
      category: 'professional'
    },
    {
      id: 'classic',
      name: 'Classic',
      description: 'Traditional and timeless design for conservative industries',
      preview: '/templates/classic-preview.png',
      features: [
        'Traditional layout',
        'Conservative styling',
        'Clear hierarchy',
        'Professional appearance'
      ],
      colors: ['#374151', '#1f2937', '#111827'],
      category: 'traditional'
    },
    {
      id: 'elegant',
      name: 'Elegant',
      description: 'Sophisticated design with subtle styling and premium feel',
      preview: '/templates/elegant-preview.png',
      features: [
        'Sophisticated design',
        'Subtle accents',
        'Premium feel',
        'Executive style'
      ],
      colors: ['#7c3aed', '#6d28d9', '#5b21b6'],
      category: 'executive'
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Bold and innovative design for creative professionals',
      preview: '/templates/creative-preview.png',
      features: [
        'Bold design elements',
        'Creative layout',
        'Visual hierarchy',
        'Portfolio integration'
      ],
      colors: ['#f59e0b', '#d97706', '#b45309'],
      category: 'creative'
    },
    {
      id: 'template1',
      name: 'AutoCV',
      description: 'Modern two-column layout with sidebar for contact info and skills',
      preview: '/templates/template1-preview.png',
      features: [
        'Two-column layout',
        'Sidebar design',
        'Clean typography',
        'Professional appearance'
      ],
      colors: ['#2563eb', '#1e40af', '#1e3a8a'],
      category: 'professional'
    },
    {
      id: 'template2',
      name: 'Deedy Reversed',
      description: 'Reversed layout with right sidebar and left content area',
      preview: '/templates/template2-preview.png',
      features: [
        'Reversed layout',
        'Right sidebar',
        'Academic style',
        'Clean design'
      ],
      colors: ['#374151', '#1f2937', '#111827'],
      category: 'academic'
    },
    {
      id: 'template3',
      name: 'Engineering',
      description: 'Condensed single-column layout perfect for technical resumes',
      preview: '/templates/template3-preview.png',
      features: [
        'Single column',
        'Condensed layout',
        'Technical focus',
        'ATS-friendly'
      ],
      colors: ['#059669', '#047857', '#065f46'],
      category: 'technical'
    },
    {
      id: 'template4',
      name: 'RenderCV Classic',
      description: 'Classic theme with side accent and bold project sections',
      preview: '/templates/template4-preview.png',
      features: [
        'Classic theme',
        'Side accent',
        'Bold sections',
        'Professional layout'
      ],
      colors: ['#7c3aed', '#6d28d9', '#5b21b6'],
      category: 'traditional'
    },
    {
      id: 'template5',
      name: 'RenderCV Engineering',
      description: 'Engineering-focused theme with centered header and clean sections',
      preview: '/templates/template5-preview.png',
      features: [
        'Engineering focus',
        'Centered header',
        'Clean sections',
        'Technical layout'
      ],
      colors: ['#dc2626', '#b91c1c', '#991b1b'],
      category: 'engineering'
    }
  ];

  res.json({ templates });
});

// @route   GET /api/templates/:id
// @desc    Get specific template details
// @access  Public
router.get('/:id', (req, res) => {
  const templates = {
    modern: {
      id: 'modern',
      name: 'Modern',
      description: 'Clean and contemporary design with bold typography',
      preview: '/templates/modern-preview.png',
      features: [
        'Clean typography',
        'Color-coded sections',
        'Professional layout',
        'ATS-friendly format'
      ],
      colors: ['#2563eb', '#1e40af', '#1e3a8a'],
      category: 'professional',
      sections: {
        header: {
          name: 'Header',
          fields: ['firstName', 'lastName', 'title', 'email', 'phone', 'location']
        },
        summary: {
          name: 'Professional Summary',
          fields: ['summary']
        },
        experience: {
          name: 'Work Experience',
          fields: ['company', 'position', 'location', 'startDate', 'endDate', 'description', 'achievements']
        },
        education: {
          name: 'Education',
          fields: ['institution', 'degree', 'field', 'location', 'startDate', 'endDate', 'gpa']
        },
        skills: {
          name: 'Skills',
          fields: ['category', 'skills']
        },
        projects: {
          name: 'Projects',
          fields: ['name', 'description', 'technologies', 'startDate', 'endDate', 'url']
        }
      }
    },
    classic: {
      id: 'classic',
      name: 'Classic',
      description: 'Traditional and timeless design for conservative industries',
      preview: '/templates/classic-preview.png',
      features: [
        'Traditional layout',
        'Conservative styling',
        'Clear hierarchy',
        'Professional appearance'
      ],
      colors: ['#374151', '#1f2937', '#111827'],
      category: 'traditional',
      sections: {
        header: {
          name: 'Header',
          fields: ['firstName', 'lastName', 'title', 'email', 'phone', 'address']
        },
        summary: {
          name: 'Objective',
          fields: ['summary']
        },
        experience: {
          name: 'Professional Experience',
          fields: ['company', 'position', 'location', 'startDate', 'endDate', 'description']
        },
        education: {
          name: 'Education',
          fields: ['institution', 'degree', 'field', 'location', 'startDate', 'endDate']
        },
        skills: {
          name: 'Technical Skills',
          fields: ['category', 'skills']
        }
      }
    },
    elegant: {
      id: 'elegant',
      name: 'Elegant',
      description: 'Sophisticated design with subtle styling and premium feel',
      preview: '/templates/elegant-preview.png',
      features: [
        'Sophisticated design',
        'Subtle accents',
        'Premium feel',
        'Executive style'
      ],
      colors: ['#7c3aed', '#6d28d9', '#5b21b6'],
      category: 'executive',
      sections: {
        header: {
          name: 'Header',
          fields: ['firstName', 'lastName', 'title', 'email', 'phone', 'location', 'linkedin']
        },
        summary: {
          name: 'Executive Summary',
          fields: ['summary']
        },
        experience: {
          name: 'Executive Experience',
          fields: ['company', 'position', 'location', 'startDate', 'endDate', 'description', 'achievements']
        },
        education: {
          name: 'Education & Credentials',
          fields: ['institution', 'degree', 'field', 'location', 'startDate', 'endDate', 'gpa']
        },
        skills: {
          name: 'Core Competencies',
          fields: ['category', 'skills']
        },
        certifications: {
          name: 'Certifications',
          fields: ['name', 'issuer', 'date', 'credentialId']
        }
      }
    },
    creative: {
      id: 'creative',
      name: 'Creative',
      description: 'Bold and innovative design for creative professionals',
      preview: '/templates/creative-preview.png',
      features: [
        'Bold design elements',
        'Creative layout',
        'Visual hierarchy',
        'Portfolio integration'
      ],
      colors: ['#f59e0b', '#d97706', '#b45309'],
      category: 'creative',
      sections: {
        header: {
          name: 'Header',
          fields: ['firstName', 'lastName', 'title', 'email', 'phone', 'location', 'portfolio', 'github']
        },
        summary: {
          name: 'About Me',
          fields: ['summary']
        },
        experience: {
          name: 'Experience',
          fields: ['company', 'position', 'location', 'startDate', 'endDate', 'description', 'achievements']
        },
        education: {
          name: 'Education',
          fields: ['institution', 'degree', 'field', 'location', 'startDate', 'endDate']
        },
        skills: {
          name: 'Skills & Tools',
          fields: ['category', 'skills']
        },
        projects: {
          name: 'Featured Projects',
          fields: ['name', 'description', 'technologies', 'startDate', 'endDate', 'url', 'github']
        },
        achievements: {
          name: 'Awards & Recognition',
          fields: ['title', 'description', 'date', 'category']
        }
      }
    },
    template1: {
      id: 'template1',
      name: 'AutoCV',
      description: 'Modern two-column layout with sidebar for contact info and skills',
      preview: '/templates/template1-preview.png',
      features: [
        'Two-column layout',
        'Sidebar design',
        'Clean typography',
        'Professional appearance'
      ],
      colors: ['#2563eb', '#1e40af', '#1e3a8a'],
      category: 'professional',
      sections: {
        header: {
          name: 'Header',
          fields: ['firstName', 'lastName', 'jobTitle', 'email', 'phone', 'location']
        },
        summary: {
          name: 'Professional Summary',
          fields: ['summary']
        },
        experience: {
          name: 'Experience',
          fields: ['company', 'position', 'location', 'startDate', 'endDate', 'description']
        },
        education: {
          name: 'Education',
          fields: ['institution', 'degree', 'field', 'location', 'startDate', 'endDate']
        },
        skills: {
          name: 'Skills',
          fields: ['category', 'skills']
        },
        projects: {
          name: 'Projects',
          fields: ['name', 'description', 'startDate', 'endDate']
        }
      }
    },
    template2: {
      id: 'template2',
      name: 'Deedy Reversed',
      description: 'Reversed layout with right sidebar and left content area',
      preview: '/templates/template2-preview.png',
      features: [
        'Reversed layout',
        'Right sidebar',
        'Academic style',
        'Clean design'
      ],
      colors: ['#374151', '#1f2937', '#111827'],
      category: 'academic',
      sections: {
        header: {
          name: 'Header',
          fields: ['firstName', 'lastName', 'email', 'phone', 'location']
        },
        summary: {
          name: 'Summary',
          fields: ['summary']
        },
        experience: {
          name: 'Experience',
          fields: ['company', 'position', 'location', 'startDate', 'endDate', 'description']
        },
        skills: {
          name: 'Skills',
          fields: ['category', 'skills']
        }
      }
    },
    template3: {
      id: 'template3',
      name: 'Engineering',
      description: 'Condensed single-column layout perfect for technical resumes',
      preview: '/templates/template3-preview.png',
      features: [
        'Single column',
        'Condensed layout',
        'Technical focus',
        'ATS-friendly'
      ],
      colors: ['#059669', '#047857', '#065f46'],
      category: 'technical',
      sections: {
        header: {
          name: 'Header',
          fields: ['firstName', 'lastName', 'email', 'phone', 'location']
        },
        summary: {
          name: 'Summary',
          fields: ['summary']
        },
        experience: {
          name: 'Experience',
          fields: ['company', 'position', 'startDate', 'endDate', 'description']
        },
        education: {
          name: 'Education',
          fields: ['institution', 'degree', 'startDate', 'endDate']
        },
        skills: {
          name: 'Skills',
          fields: ['category', 'skills']
        }
      }
    },
    template4: {
      id: 'template4',
      name: 'RenderCV Classic',
      description: 'Classic theme with side accent and bold project sections',
      preview: '/templates/template4-preview.png',
      features: [
        'Classic theme',
        'Side accent',
        'Bold sections',
        'Professional layout'
      ],
      colors: ['#7c3aed', '#6d28d9', '#5b21b6'],
      category: 'traditional',
      sections: {
        header: {
          name: 'Header',
          fields: ['firstName', 'lastName', 'email', 'phone', 'location']
        },
        summary: {
          name: 'Summary',
          fields: ['summary']
        },
        projects: {
          name: 'Featured Projects',
          fields: ['name', 'description', 'startDate', 'endDate']
        },
        experience: {
          name: 'Experience',
          fields: ['company', 'position', 'startDate', 'endDate', 'description']
        },
        skills: {
          name: 'Skills',
          fields: ['category', 'skills']
        }
      }
    },
    template5: {
      id: 'template5',
      name: 'RenderCV Engineering',
      description: 'Engineering-focused theme with centered header and clean sections',
      preview: '/templates/template5-preview.png',
      features: [
        'Engineering focus',
        'Centered header',
        'Clean sections',
        'Technical layout'
      ],
      colors: ['#dc2626', '#b91c1c', '#991b1b'],
      category: 'engineering',
      sections: {
        header: {
          name: 'Header',
          fields: ['firstName', 'lastName', 'email', 'phone', 'location']
        },
        summary: {
          name: 'Summary',
          fields: ['summary']
        },
        experience: {
          name: 'Experience',
          fields: ['company', 'position', 'startDate', 'endDate', 'description']
        },
        education: {
          name: 'Education',
          fields: ['institution', 'degree', 'startDate', 'endDate']
        },
        achievements: {
          name: 'Achievements',
          fields: ['title', 'description']
        }
      }
    }
  };

  const template = templates[req.params.id];
  if (!template) {
    return res.status(404).json({ error: 'Template not found' });
  }

  res.json({ template });
});

// @route   GET /api/templates/:id/preview
// @desc    Get template preview data
// @access  Public
router.get('/:id/preview', (req, res) => {
  const sampleData = {
    personalInfo: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@email.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      linkedin: 'linkedin.com/in/johndoe',
      github: 'github.com/johndoe',
      portfolio: 'johndoe.com'
    },
    summary: 'Experienced software engineer with 5+ years of expertise in full-stack development, cloud architecture, and team leadership. Passionate about building scalable solutions and mentoring junior developers.',
    experience: [
      {
        company: 'Tech Solutions Inc.',
        position: 'Senior Software Engineer',
        location: 'San Francisco, CA',
        startDate: '2022-01-01',
        endDate: null,
        current: true,
        description: 'Lead development of microservices architecture serving 1M+ users',
        achievements: [
          'Reduced system response time by 40%',
          'Led team of 5 developers',
          'Implemented CI/CD pipeline'
        ]
      },
      {
        company: 'StartupXYZ',
        position: 'Full Stack Developer',
        location: 'San Francisco, CA',
        startDate: '2020-06-01',
        endDate: '2021-12-31',
        current: false,
        description: 'Developed and maintained web applications using React and Node.js',
        achievements: [
          'Built responsive web application',
          'Integrated third-party APIs',
          'Improved user engagement by 25%'
        ]
      }
    ],
    education: [
      {
        institution: 'University of California, Berkeley',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        location: 'Berkeley, CA',
        startDate: '2016-09-01',
        endDate: '2020-05-31',
        current: false,
        gpa: '3.8'
      }
    ],
    skills: [
      {
        category: 'Programming Languages',
        skills: ['JavaScript', 'Python', 'Java', 'TypeScript']
      },
      {
        category: 'Frameworks & Libraries',
        skills: ['React', 'Node.js', 'Express', 'Django']
      },
      {
        category: 'Tools & Technologies',
        skills: ['Git', 'Docker', 'AWS', 'MongoDB']
      }
    ],
    projects: [
      {
        name: 'E-commerce Platform',
        description: 'Full-stack e-commerce solution with payment integration',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        startDate: '2021-01-01',
        endDate: '2021-06-30',
        current: false,
        url: 'https://example.com',
        github: 'https://github.com/johndoe/ecommerce'
      }
    ]
  };

  res.json({ sampleData });
});

module.exports = router;
