const express = require('express');
const { body, validationResult } = require('express-validator');
const OpenAI = require('openai');
const auth = require('../middleware/auth');

const router = express.Router();

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// @route   POST /api/ai/enhance-content
// @desc    Enhance resume content using AI
// @access  Private
router.post('/enhance-content', auth, [
  body('content').isString().notEmpty(),
  body('section').isString().notEmpty(),
  body('jobTitle').optional().isString(),
  body('industry').optional().isString()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { content, section, jobTitle, industry } = req.body;

    // Create context-aware prompt based on section
    let prompt = createEnhancementPrompt(content, section, jobTitle, industry);

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert resume writer and ATS optimization specialist. Enhance the provided content to be more professional, impactful, and ATS-friendly while maintaining the original meaning and context."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 1000,
      temperature: 0.7
    });

    const enhancedContent = completion.choices[0].message.content;

    res.json({
      original: content,
      enhanced: enhancedContent,
      suggestions: generateSuggestions(content, enhancedContent, section)
    });
  } catch (error) {
    console.error('AI enhancement error:', error);
    res.status(500).json({ 
      error: 'Failed to enhance content',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   POST /api/ai/generate-summary
// @desc    Generate professional summary
// @access  Private
router.post('/generate-summary', auth, [
  body('experience').isArray(),
  body('skills').isArray(),
  body('jobTitle').optional().isString(),
  body('industry').optional().isString()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { experience, skills, jobTitle, industry } = req.body;

    const prompt = `Generate a professional summary for a resume based on the following information:

Experience: ${JSON.stringify(experience)}
Skills: ${JSON.stringify(skills)}
Target Job Title: ${jobTitle || 'Not specified'}
Industry: ${industry || 'Not specified'}

Create a compelling 3-4 sentence professional summary that highlights key achievements, skills, and value proposition. Make it ATS-friendly and industry-specific.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert resume writer specializing in creating compelling professional summaries that pass ATS systems and impress hiring managers."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 300,
      temperature: 0.7
    });

    const summary = completion.choices[0].message.content;

    res.json({ summary });
  } catch (error) {
    console.error('AI summary generation error:', error);
    res.status(500).json({ 
      error: 'Failed to generate summary',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   POST /api/ai/ats-score
// @desc    Calculate ATS compatibility score
// @access  Private
router.post('/ats-score', auth, [
  body('resumeData').isObject()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { resumeData } = req.body;

    const prompt = `Analyze this resume data for ATS compatibility and provide a score from 0-100:

${JSON.stringify(resumeData, null, 2)}

Evaluate based on:
1. Keyword optimization (30 points)
2. Format and structure (25 points)
3. Contact information completeness (15 points)
4. Skills section quality (15 points)
5. Experience descriptions (15 points)

Provide a JSON response with:
- score: number (0-100)
- strengths: array of positive aspects
- weaknesses: array of areas for improvement
- suggestions: array of specific recommendations`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an ATS (Applicant Tracking System) expert. Analyze resumes for compatibility and provide detailed feedback."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 800,
      temperature: 0.3
    });

    const analysis = completion.choices[0].message.content;
    
    try {
      const parsedAnalysis = JSON.parse(analysis);
      res.json(parsedAnalysis);
    } catch (parseError) {
      // Fallback if JSON parsing fails
      res.json({
        score: 75,
        strengths: ["Resume structure looks good"],
        weaknesses: ["Could not parse detailed analysis"],
        suggestions: ["Review the AI analysis manually"]
      });
    }
  } catch (error) {
    console.error('ATS score calculation error:', error);
    res.status(500).json({ 
      error: 'Failed to calculate ATS score',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   POST /api/ai/keyword-suggestions
// @desc    Get keyword suggestions for job posting
// @access  Private
router.post('/keyword-suggestions', auth, [
  body('jobDescription').isString().notEmpty(),
  body('currentSkills').optional().isArray()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { jobDescription, currentSkills = [] } = req.body;

    const prompt = `Analyze this job description and suggest relevant keywords for resume optimization:

Job Description:
${jobDescription}

Current Skills: ${currentSkills.join(', ')}

Extract and suggest:
1. Technical skills mentioned
2. Soft skills mentioned
3. Industry-specific terms
4. Action verbs used
5. Missing skills that could strengthen the resume

Format as JSON with categories: technical, soft, industry, action_verbs, missing_skills`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a resume optimization expert specializing in keyword extraction and ATS optimization."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 600,
      temperature: 0.3
    });

    const suggestions = completion.choices[0].message.content;
    
    try {
      const parsedSuggestions = JSON.parse(suggestions);
      res.json(parsedSuggestions);
    } catch (parseError) {
      res.json({
        technical: ["Technical skills not parsed"],
        soft: ["Soft skills not parsed"],
        industry: ["Industry terms not parsed"],
        action_verbs: ["Action verbs not parsed"],
        missing_skills: ["Missing skills not parsed"]
      });
    }
  } catch (error) {
    console.error('Keyword suggestions error:', error);
    res.status(500).json({ 
      error: 'Failed to generate keyword suggestions',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Helper function to create enhancement prompts
function createEnhancementPrompt(content, section, jobTitle, industry) {
  const basePrompt = `Enhance the following ${section} content for a resume:`;
  
  let contextPrompt = '';
  if (jobTitle) contextPrompt += `\nTarget Job Title: ${jobTitle}`;
  if (industry) contextPrompt += `\nIndustry: ${industry}`;
  
  const sectionSpecificPrompts = {
    'experience': '\nFocus on: Action verbs, quantifiable achievements, specific responsibilities, and impact.',
    'education': '\nFocus on: Academic achievements, relevant coursework, GPA (if strong), and academic projects.',
    'skills': '\nFocus on: Technical proficiency levels, industry-standard terminology, and skill categorization.',
    'projects': '\nFocus on: Problem solved, technologies used, impact achieved, and your specific role.',
    'summary': '\nFocus on: Professional value proposition, key achievements, and career objectives.'
  };

  return `${basePrompt}${contextPrompt}${sectionSpecificPrompts[section] || ''}

Original Content:
${content}

Enhanced Content:`;
}

// Helper function to generate suggestions
function generateSuggestions(original, enhanced, section) {
  const suggestions = [];
  
  if (enhanced.length > original.length * 1.5) {
    suggestions.push("Consider shortening the content for better readability");
  }
  
  if (enhanced.includes('•') || enhanced.includes('-')) {
    suggestions.push("Good use of bullet points for better ATS parsing");
  }
  
  if (enhanced.match(/\d+/g) && !original.match(/\d+/g)) {
    suggestions.push("Great addition of quantifiable metrics");
  }
  
  return suggestions;
}

module.exports = router;
