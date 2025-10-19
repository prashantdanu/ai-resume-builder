# AI Resume Builder

A comprehensive, AI-powered resume builder built with the MERN stack (MongoDB, Express.js, React.js, Node.js). Create professional, ATS-optimized resumes with AI assistance, multiple templates, and instant PDF/Word downloads.

## 🚀 Features

### Core Features
- **AI-Powered Enhancement**: Get intelligent suggestions to improve resume content
- **Multiple Templates**: Modern, Classic, Elegant, and Creative designs
- **Real-time Preview**: See your resume as you build it
- **ATS Optimization**: Built-in ATS score calculator and keyword optimization
- **Export Options**: Download as PDF or Word document
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Works perfectly on all devices

### AI Features
- Content enhancement and rephrasing
- ATS compatibility scoring
- Keyword suggestions based on job descriptions
- Professional summary generation
- Achievement optimization

### User Management
- User registration and authentication
- Secure password management
- User preferences and settings
- Resume sharing capabilities

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **TailwindCSS** - Styling framework
- **React Router** - Client-side routing
- **React Hook Form** - Form management
- **Axios** - HTTP client
- **Framer Motion** - Animations
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **OpenAI API** - AI integration
- **PDFMake** - PDF generation
- **DocX** - Word document generation

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Nodemon** - Development server
- **Concurrently** - Run multiple commands

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local or cloud instance)
- **Git**

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ai-resume-builder
```

### 2. Install Dependencies

```bash
# Install root dependencies
npm install

# Install all dependencies (root, server, and client)
npm run install-all
```

### 3. Environment Setup

#### Backend Environment Variables

Create a `.env` file in the `server` directory:

```bash
cd server
cp env.example .env
```

Edit the `.env` file with your configuration:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ai-resume-builder
JWT_SECRET=your_super_secret_jwt_key_here
OPENAI_API_KEY=your_openai_api_key_here
NODE_ENV=development
```

#### Frontend Environment Variables

Create a `.env` file in the `client` directory:

```bash
cd client
touch .env
```

Add the following content:

```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Database Setup

#### Option A: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. The application will automatically create the database

#### Option B: MongoDB Atlas (Cloud)
1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Update `MONGODB_URI` in your `.env` file

### 5. OpenAI API Setup

1. Create an OpenAI account at [https://openai.com](https://openai.com)
2. Generate an API key from the dashboard
3. Add the API key to your `.env` file

### 6. Run the Application

#### Development Mode (Recommended)

```bash
# From the root directory
npm run dev
```

This will start both the backend (port 5000) and frontend (port 3000) simultaneously.

#### Manual Setup

If you prefer to run services separately:

```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm run dev
```

### 7. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health

## 📁 Project Structure

```
ai-resume-builder/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   │   ├── forms/      # Form components
│   │   │   └── ...
│   │   ├── contexts/       # React contexts
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── templates/      # Resume templates
│   │   └── utils/          # Utility functions
│   ├── package.json
│   └── vite.config.js
├── server/                 # Node.js backend
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── utils/              # Utility functions
│   ├── package.json
│   └── index.js
├── package.json            # Root package.json
└── README.md
```

## 🔧 Configuration

### Backend Configuration

The backend can be configured through environment variables:

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/ai-resume-builder |
| `JWT_SECRET` | JWT signing secret | Required |
| `OPENAI_API_KEY` | OpenAI API key | Required |
| `NODE_ENV` | Environment | development |

### Frontend Configuration

The frontend can be configured through environment variables:

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | http://localhost:5000/api |

## 🚀 Deployment

### Backend Deployment (Heroku)

1. Create a Heroku app
2. Set environment variables in Heroku dashboard
3. Deploy the server directory

```bash
cd server
git subtree push --prefix=server heroku main
```

### Frontend Deployment (Vercel/Netlify)

1. Build the frontend
2. Deploy the `client/dist` directory

```bash
cd client
npm run build
```

### Environment Variables for Production

Make sure to set these environment variables in your production environment:

- `MONGODB_URI` - Your production MongoDB URI
- `JWT_SECRET` - A strong, random secret
- `OPENAI_API_KEY` - Your OpenAI API key
- `NODE_ENV` - Set to "production"

## 📚 API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/preferences` - Update user preferences

### Resume Endpoints

- `GET /api/resume` - Get all user resumes
- `POST /api/resume` - Create new resume
- `GET /api/resume/:id` - Get specific resume
- `PUT /api/resume/:id` - Update resume
- `DELETE /api/resume/:id` - Delete resume
- `GET /api/resume/:id/pdf` - Download PDF
- `GET /api/resume/:id/docx` - Download Word document

### AI Endpoints

- `POST /api/ai/enhance-content` - Enhance resume content
- `POST /api/ai/generate-summary` - Generate professional summary
- `POST /api/ai/ats-score` - Calculate ATS score
- `POST /api/ai/keyword-suggestions` - Get keyword suggestions

### Template Endpoints

- `GET /api/templates` - Get all templates
- `GET /api/templates/:id` - Get specific template
- `GET /api/templates/:id/preview` - Get template preview data

## 🧪 Testing

### Backend Testing

```bash
cd server
npm test
```

### Frontend Testing

```bash
cd client
npm test
```

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check your connection string
   - Verify network connectivity

2. **OpenAI API Error**
   - Verify your API key is correct
   - Check your OpenAI account has credits
   - Ensure the API key has proper permissions

3. **Port Already in Use**
   - Change the PORT in your .env file
   - Kill the process using the port

4. **Build Errors**
   - Clear node_modules and reinstall
   - Check Node.js version compatibility
   - Verify all environment variables are set

### Debug Mode

Enable debug mode by setting:

```env
NODE_ENV=development
DEBUG=*
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- OpenAI for providing the AI capabilities
- The React and Node.js communities
- All the open-source libraries used in this project

## 📞 Support

If you encounter any issues or have questions:

1. Check the troubleshooting section
2. Search existing issues
3. Create a new issue with detailed information
4. Contact the development team

---

**Happy Resume Building! 🚀**
