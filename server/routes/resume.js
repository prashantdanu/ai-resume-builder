const express = require('express');
const { body, validationResult } = require('express-validator');
const Resume = require('../models/Resume');
const auth = require('../middleware/auth');
const generatePDF = require('../utils/pdfGenerator');
const generateDOCX = require('../utils/docxGenerator');

const router = express.Router();

// @route   GET /api/resume
// @desc    Get all resumes for user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.userId })
      .select('-aiEnhancements')
      .sort({ updatedAt: -1 });

    res.json({ resumes });
  } catch (error) {
    console.error('Get resumes error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/resume/:id
// @desc    Get single resume
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const resume = await Resume.findOne({ 
      _id: req.params.id, 
      userId: req.userId 
    });

    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    res.json({ resume });
  } catch (error) {
    console.error('Get resume error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/resume
// @desc    Create new resume
// @access  Private
router.post('/', auth, [
  body('title').trim().notEmpty(),
  body('personalInfo').isObject(),
  body('personalInfo.firstName').trim().notEmpty(),
  body('personalInfo.lastName').trim().notEmpty(),
  body('personalInfo.email').isEmail()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const resumeData = {
      ...req.body,
      userId: req.userId
    };

    const resume = new Resume(resumeData);
    await resume.save();

    res.status(201).json({ 
      message: 'Resume created successfully',
      resume 
    });
  } catch (error) {
    console.error('Create resume error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   PUT /api/resume/:id
// @desc    Update resume
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const resume = await Resume.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    res.json({ 
      message: 'Resume updated successfully',
      resume 
    });
  } catch (error) {
    console.error('Update resume error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   DELETE /api/resume/:id
// @desc    Delete resume
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const resume = await Resume.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });

    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    res.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    console.error('Delete resume error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/resume/:id/duplicate
// @desc    Duplicate resume
// @access  Private
router.post('/:id/duplicate', auth, async (req, res) => {
  try {
    const originalResume = await Resume.findOne({
      _id: req.params.id,
      userId: req.userId
    });

    if (!originalResume) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    const duplicateData = originalResume.toObject();
    delete duplicateData._id;
    delete duplicateData.createdAt;
    delete duplicateData.updatedAt;
    duplicateData.title = `${duplicateData.title} (Copy)`;

    const duplicateResume = new Resume(duplicateData);
    await duplicateResume.save();

    res.status(201).json({
      message: 'Resume duplicated successfully',
      resume: duplicateResume
    });
  } catch (error) {
    console.error('Duplicate resume error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/resume/:id/pdf
// @desc    Generate PDF
// @access  Private
router.get('/:id/pdf', auth, async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.userId
    });

    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    const pdfBuffer = await generatePDF(resume);
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${resume.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf"`);
    res.send(pdfBuffer);
  } catch (error) {
    console.error('PDF generation error:', error);
    res.status(500).json({ error: 'Failed to generate PDF' });
  }
});

// @route   GET /api/resume/:id/docx
// @desc    Generate DOCX
// @access  Private
router.get('/:id/docx', auth, async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.userId
    });

    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    const docxBuffer = await generateDOCX(resume);
    
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.setHeader('Content-Disposition', `attachment; filename="${resume.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.docx"`);
    res.send(docxBuffer);
  } catch (error) {
    console.error('DOCX generation error:', error);
    res.status(500).json({ error: 'Failed to generate DOCX' });
  }
});

// @route   POST /api/resume/:id/share
// @desc    Generate share link
// @access  Private
router.post('/:id/share', auth, async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.userId
    });

    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    const shareToken = resume.generateShareToken();
    resume.isPublic = true;
    await resume.save();

    const shareUrl = `${req.protocol}://${req.get('host')}/api/resume/shared/${shareToken}`;

    res.json({
      message: 'Share link generated successfully',
      shareUrl,
      shareToken
    });
  } catch (error) {
    console.error('Share generation error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/resume/shared/:token
// @desc    Get shared resume
// @access  Public
router.get('/shared/:token', async (req, res) => {
  try {
    const resume = await Resume.findOne({
      shareToken: req.params.token,
      isPublic: true
    });

    if (!resume) {
      return res.status(404).json({ error: 'Resume not found or not shared' });
    }

    res.json({ resume });
  } catch (error) {
    console.error('Get shared resume error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/resume/:id/unshare
// @desc    Remove share link
// @access  Private
router.post('/:id/unshare', auth, async (req, res) => {
  try {
    const resume = await Resume.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { 
        $unset: { shareToken: 1 },
        $set: { isPublic: false }
      },
      { new: true }
    );

    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    res.json({ message: 'Share link removed successfully' });
  } catch (error) {
    console.error('Unshare error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
