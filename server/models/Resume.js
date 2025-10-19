const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  personalInfo: {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, trim: true },
    address: {
      street: { type: String, trim: true },
      city: { type: String, trim: true },
      state: { type: String, trim: true },
      zipCode: { type: String, trim: true },
      country: { type: String, trim: true }
    },
    linkedin: { type: String, trim: true },
    github: { type: String, trim: true },
    portfolio: { type: String, trim: true },
    summary: { type: String, trim: true }
  },
  experience: [{
    company: { type: String, required: true, trim: true },
    position: { type: String, required: true, trim: true },
    location: { type: String, trim: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    current: { type: Boolean, default: false },
    description: { type: String, trim: true },
    achievements: [String]
  }],
  education: [{
    institution: { type: String, required: true, trim: true },
    degree: { type: String, required: true, trim: true },
    field: { type: String, trim: true },
    location: { type: String, trim: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    current: { type: Boolean, default: false },
    gpa: { type: String, trim: true },
    description: { type: String, trim: true }
  }],
  skills: [{
    category: { type: String, required: true, trim: true },
    skills: [String]
  }],
  projects: [{
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    technologies: [String],
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    current: { type: Boolean, default: false },
    url: { type: String, trim: true },
    github: { type: String, trim: true }
  }],
  certifications: [{
    name: { type: String, required: true, trim: true },
    issuer: { type: String, required: true, trim: true },
    date: { type: Date, required: true },
    expiryDate: { type: Date },
    credentialId: { type: String, trim: true },
    url: { type: String, trim: true }
  }],
  achievements: [{
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    date: { type: Date, required: true },
    category: { type: String, trim: true }
  }],
  languages: [{
    language: { type: String, required: true, trim: true },
    proficiency: { 
      type: String, 
      enum: ['Beginner', 'Intermediate', 'Advanced', 'Native'],
      required: true 
    }
  }],
  template: {
    type: String,
    enum: ['modern', 'classic', 'elegant', 'creative'],
    default: 'modern'
  },
  settings: {
    showPhoto: { type: Boolean, default: false },
    photoUrl: { type: String, trim: true },
    fontSize: { type: String, default: 'medium' },
    colorScheme: { type: String, default: 'blue' },
    spacing: { type: String, default: 'normal' }
  },
  aiEnhancements: {
    lastEnhanced: { type: Date },
    atsScore: { type: Number, min: 0, max: 100 },
    suggestions: [String],
    keywords: [String]
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  shareToken: {
    type: String,
    unique: true,
    sparse: true
  }
}, {
  timestamps: true
});

// Index for better query performance
resumeSchema.index({ userId: 1, createdAt: -1 });
resumeSchema.index({ shareToken: 1 });

// Generate share token
resumeSchema.methods.generateShareToken = function() {
  const crypto = require('crypto');
  this.shareToken = crypto.randomBytes(32).toString('hex');
  return this.shareToken;
};

module.exports = mongoose.model('Resume', resumeSchema);
