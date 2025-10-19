# AI Resume Builder - Setup Guide

This guide will walk you through setting up the AI Resume Builder application step by step.

## 🎯 Quick Setup (5 minutes)

### Prerequisites Check

Before starting, ensure you have:
- [ ] Node.js (v16+) installed
- [ ] MongoDB running locally or Atlas account
- [ ] OpenAI API key
- [ ] Git installed

### Step 1: Clone and Install

```bash
# Clone the repository
git clone <your-repo-url>
cd ai-resume-builder

# Install all dependencies
npm run install-all
```

### Step 2: Environment Configuration

#### Backend Setup
```bash
cd server
cp env.example .env
```

Edit `server/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ai-resume-builder
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
OPENAI_API_KEY=sk-your-openai-api-key-here
NODE_ENV=development
```

#### Frontend Setup
```bash
cd client
echo "VITE_API_URL=http://localhost:5000/api" > .env
```

### Step 3: Start the Application

```bash
# From the root directory
npm run dev
```

### Step 4: Access the Application

- Open http://localhost:3000 in your browser
- Register a new account or use demo credentials
- Start building your resume!

## 🔧 Detailed Setup

### Database Configuration

#### Option A: Local MongoDB

1. **Install MongoDB**
   ```bash
   # macOS with Homebrew
   brew install mongodb-community
   
   # Ubuntu/Debian
   sudo apt-get install mongodb
   
   # Windows
   # Download from https://www.mongodb.com/try/download/community
   ```

2. **Start MongoDB**
   ```bash
   # macOS/Linux
   brew services start mongodb-community
   # or
   sudo systemctl start mongod
   
   # Windows
   # Start MongoDB service from Services
   ```

3. **Verify Connection**
   ```bash
   mongosh
   # Should connect to MongoDB shell
   ```

#### Option B: MongoDB Atlas (Cloud)

1. **Create Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Sign up for a free account

2. **Create Cluster**
   - Click "Create Cluster"
   - Choose "Free" tier
   - Select your region
   - Name your cluster

3. **Configure Access**
   - Go to "Database Access"
   - Add a new database user
   - Set username and password
   - Grant "Read and write to any database" permission

4. **Get Connection String**
   - Go to "Clusters"
   - Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your user password

5. **Update .env**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-resume-builder?retryWrites=true&w=majority
   ```

### OpenAI API Setup

1. **Create Account**
   - Go to [OpenAI Platform](https://platform.openai.com)
   - Sign up for an account

2. **Get API Key**
   - Go to API Keys section
   - Click "Create new secret key"
   - Copy the key (starts with `sk-`)

3. **Add Credits**
   - Go to Billing section
   - Add payment method
   - Add credits to your account ($5-10 is enough for testing)

4. **Update .env**
   ```env
   OPENAI_API_KEY=sk-your-actual-api-key-here
   ```

### Development Environment

#### VS Code Setup (Recommended)

1. **Install Extensions**
   ```
   - ES7+ React/Redux/React-Native snippets
   - Tailwind CSS IntelliSense
   - Prettier - Code formatter
   - ESLint
   - Auto Rename Tag
   - Bracket Pair Colorizer
   ```

2. **Configure Settings**
   Create `.vscode/settings.json`:
   ```json
   {
     "editor.formatOnSave": true,
     "editor.defaultFormatter": "esbenp.prettier-vscode",
     "editor.codeActionsOnSave": {
       "source.fixAll.eslint": true
     },
     "emmet.includeLanguages": {
       "javascript": "javascriptreact"
     }
   }
   ```

#### Alternative IDEs
- WebStorm
- Sublime Text with plugins
- Atom with packages

## 🚀 Running the Application

### Development Mode

```bash
# Start both frontend and backend
npm run dev

# Or start individually:
# Backend only
npm run server

# Frontend only
npm run client
```

### Production Build

```bash
# Build frontend
npm run build

# Start production server
cd server
npm start
```

## 🔍 Verification

### Backend Health Check

```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "AI Resume Builder API is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Frontend Check

1. Open http://localhost:3000
2. You should see the landing page
3. Try registering a new account
4. Check browser console for errors

### Database Check

```bash
# Connect to MongoDB
mongosh

# Switch to your database
use ai-resume-builder

# Check collections
show collections

# Should see: users, resumes
```

## 🐛 Troubleshooting

### Common Issues

#### 1. Port Already in Use

**Error**: `EADDRINUSE: address already in use :::5000`

**Solution**:
```bash
# Find process using port 5000
lsof -ti:5000

# Kill the process
kill -9 <PID>

# Or change port in .env
PORT=5001
```

#### 2. MongoDB Connection Failed

**Error**: `MongoServerError: Authentication failed`

**Solutions**:
- Check MongoDB is running
- Verify connection string
- Check username/password
- Ensure IP is whitelisted (for Atlas)

#### 3. OpenAI API Error

**Error**: `401 Unauthorized`

**Solutions**:
- Verify API key is correct
- Check account has credits
- Ensure API key has proper permissions

#### 4. Build Errors

**Error**: `Module not found` or build failures

**Solutions**:
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear client cache
cd client
rm -rf node_modules package-lock.json
npm install
```

#### 5. CORS Issues

**Error**: `CORS policy` errors

**Solution**: Check that frontend is running on port 3000 and backend on port 5000, or update CORS settings in `server/index.js`

### Debug Mode

Enable detailed logging:

```bash
# Backend debug
cd server
DEBUG=* npm run dev

# Frontend debug
cd client
npm run dev -- --debug
```

### Logs Location

- **Backend logs**: Console output
- **Frontend logs**: Browser DevTools Console
- **Database logs**: MongoDB logs (varies by installation)

## 📊 Performance Optimization

### Backend Optimization

1. **Enable Compression**
   ```javascript
   // In server/index.js
   app.use(compression());
   ```

2. **Database Indexing**
   ```javascript
   // Add indexes in models
   resumeSchema.index({ userId: 1, createdAt: -1 });
   ```

3. **Rate Limiting**
   ```javascript
   // Already configured in server/index.js
   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100 // limit each IP to 100 requests per windowMs
   });
   ```

### Frontend Optimization

1. **Code Splitting**
   ```javascript
   // Lazy load components
   const LazyComponent = React.lazy(() => import('./Component'));
   ```

2. **Image Optimization**
   - Use WebP format
   - Implement lazy loading
   - Compress images

3. **Bundle Analysis**
   ```bash
   cd client
   npm run build
   npx vite-bundle-analyzer dist
   ```

## 🔒 Security Considerations

### Environment Variables

- Never commit `.env` files
- Use strong, unique secrets
- Rotate secrets regularly
- Use different secrets for different environments

### API Security

- Rate limiting is enabled
- CORS is configured
- Helmet.js for security headers
- Input validation with express-validator

### Database Security

- Use strong passwords
- Enable authentication
- Restrict network access
- Regular backups

## 📈 Monitoring

### Health Checks

- Backend: `GET /api/health`
- Database: Check MongoDB status
- Frontend: Check browser console

### Logging

- Backend: Console logs
- Frontend: Browser DevTools
- Database: MongoDB logs

### Metrics

Consider adding:
- Application performance monitoring (APM)
- Error tracking (Sentry)
- Analytics (Google Analytics)

## 🚀 Next Steps

After successful setup:

1. **Customize Templates**: Modify templates in `client/src/templates/`
2. **Add Features**: Extend functionality as needed
3. **Deploy**: Follow deployment guide
4. **Monitor**: Set up monitoring and logging
5. **Scale**: Optimize for production use

## 📞 Support

If you encounter issues:

1. Check this troubleshooting guide
2. Search existing GitHub issues
3. Create a new issue with:
   - Error messages
   - Steps to reproduce
   - Environment details
   - Logs (if applicable)

---

**Happy coding! 🎉**
