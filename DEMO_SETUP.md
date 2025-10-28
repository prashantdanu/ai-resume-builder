# Demo Setup for College Fest Showcase

## Quick Start for Demo

### 1. Start the Application
```bash
npm run dev
```

### 2. Access URLs
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/api/health

### 3. Demo Account Setup
Create a demo account with these credentials:
- **Email**: demo@example.com
- **Password**: demo123
- **Name**: Demo User

### 4. Demo Features to Showcase

#### Core Features
1. **User Registration/Login** - Show the authentication flow
2. **Template Selection** - Demonstrate all 9 templates (Modern, Classic, Elegant, Creative, Template1-5)
3. **Resume Builder** - Show the step-by-step form
4. **Real-time Preview** - Demonstrate live preview functionality
5. **PDF/DOCX Export** - Show download capabilities
6. **AI Enhancement** - Demonstrate AI-powered content improvement
7. **ATS Score** - Show ATS optimization features
8. **Dark Mode** - Toggle between light and dark themes

#### Template Showcase
- **Modern**: Clean, contemporary design
- **Classic**: Traditional, professional layout
- **Elegant**: Sophisticated, executive style
- **Creative**: Bold, innovative design
- **Template1 (AutoCV)**: Two-column with sidebar
- **Template2 (Deedy Reversed)**: Academic style
- **Template3 (Engineering)**: Technical, condensed layout
- **Template4 (RenderCV Classic)**: Classic with accent
- **Template5 (RenderCV Engineering)**: Engineering-focused

### 5. Demo Data for Showcase

#### Sample Resume Data
```json
{
  "personalInfo": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@email.com",
    "phone": "+1 (555) 123-4567",
    "location": "San Francisco, CA",
    "summary": "Experienced software engineer with 5+ years of expertise in full-stack development, cloud architecture, and team leadership."
  },
  "experience": [
    {
      "company": "Tech Solutions Inc.",
      "position": "Senior Software Engineer",
      "location": "San Francisco, CA",
      "startDate": "2022-01-01",
      "endDate": null,
      "current": true,
      "description": "Lead development of microservices architecture serving 1M+ users"
    }
  ],
  "education": [
    {
      "institution": "University of California, Berkeley",
      "degree": "Bachelor of Science",
      "field": "Computer Science",
      "location": "Berkeley, CA",
      "startDate": "2016-09-01",
      "endDate": "2020-05-31",
      "current": false,
      "gpa": "3.8"
    }
  ],
  "skills": [
    {
      "category": "Programming Languages",
      "skills": ["JavaScript", "Python", "Java", "TypeScript"]
    },
    {
      "category": "Frameworks & Libraries",
      "skills": ["React", "Node.js", "Express", "Django"]
    }
  ]
}
```

### 6. Troubleshooting for Demo

#### If MongoDB is not running:
```bash
# Start MongoDB service
net start MongoDB
```

#### If ports are in use:
```bash
# Kill processes on ports 3000 and 5000
netstat -ano | findstr :3000
taskkill /f /pid <PID>
netstat -ano | findstr :5000
taskkill /f /pid <PID>
```

#### If environment variables are missing:
- Copy `server/env.example` to `server/.env`
- Copy `client/env.example` to `client/.env`
- Update the values as needed

### 7. Key Points for Presentation

1. **AI-Powered**: Emphasize the AI enhancement features
2. **Multiple Templates**: Show all 9 templates
3. **ATS Optimization**: Demonstrate ATS scoring
4. **Real-time Preview**: Show live updates
5. **Export Options**: PDF and Word downloads
6. **Responsive Design**: Works on all devices
7. **Modern Tech Stack**: MERN stack with AI integration
8. **Professional Quality**: Production-ready application

### 8. Demo Flow

1. **Landing Page** - Show the beautiful homepage
2. **Registration** - Create a new account
3. **Template Selection** - Browse all templates
4. **Resume Builder** - Fill in information step by step
5. **Preview** - Show real-time preview
6. **AI Enhancement** - Demonstrate AI features
7. **Export** - Download PDF/DOCX
8. **Dashboard** - Show user dashboard

### 9. Technical Highlights

- **Frontend**: React 18, Vite, TailwindCSS
- **Backend**: Node.js, Express, MongoDB
- **AI Integration**: OpenAI API
- **PDF Generation**: PDFMake
- **Authentication**: JWT
- **Real-time**: Live preview
- **Responsive**: Mobile-first design

### 10. Success Metrics

- ✅ All 9 templates working
- ✅ PDF/DOCX generation working
- ✅ AI features functional
- ✅ Real-time preview working
- ✅ Authentication working
- ✅ Database connected
- ✅ Responsive design
- ✅ Dark mode toggle
- ✅ ATS scoring working
