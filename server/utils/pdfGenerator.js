const PdfPrinter = require('pdfmake');
const fs = require('fs');
const path = require('path');

// Define fonts
const fonts = {
  Roboto: {
    normal: path.join(__dirname, '../fonts/Roboto-Regular.ttf'),
    bold: path.join(__dirname, '../fonts/Roboto-Medium.ttf'),
    italics: path.join(__dirname, '../fonts/Roboto-Italic.ttf'),
    bolditalics: path.join(__dirname, '../fonts/Roboto-MediumItalic.ttf')
  }
};

const printer = new PdfPrinter(fonts);

// Template configurations
const templates = {
  modern: {
    primaryColor: '#2563eb',
    secondaryColor: '#1e40af',
    accentColor: '#3b82f6',
    headerFontSize: 24,
    sectionFontSize: 14,
    bodyFontSize: 10
  },
  classic: {
    primaryColor: '#374151',
    secondaryColor: '#1f2937',
    accentColor: '#6b7280',
    headerFontSize: 22,
    sectionFontSize: 12,
    bodyFontSize: 10
  },
  elegant: {
    primaryColor: '#7c3aed',
    secondaryColor: '#6d28d9',
    accentColor: '#8b5cf6',
    headerFontSize: 26,
    sectionFontSize: 14,
    bodyFontSize: 10
  },
  creative: {
    primaryColor: '#f59e0b',
    secondaryColor: '#d97706',
    accentColor: '#fbbf24',
    headerFontSize: 24,
    sectionFontSize: 14,
    bodyFontSize: 10
  }
};

async function generatePDF(resume) {
  const template = templates[resume.template] || templates.modern;
  const docDefinition = createDocumentDefinition(resume, template);
  
  return new Promise((resolve, reject) => {
    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    const chunks = [];
    
    pdfDoc.on('data', chunk => chunks.push(chunk));
    pdfDoc.on('end', () => resolve(Buffer.concat(chunks)));
    pdfDoc.on('error', reject);
    
    pdfDoc.end();
  });
}

function createDocumentDefinition(resume, template) {
  const { personalInfo, experience, education, skills, projects, certifications, achievements } = resume;
  
  return {
    pageSize: 'A4',
    pageMargins: [40, 60, 40, 60],
    defaultStyle: {
      font: 'Roboto',
      fontSize: template.bodyFontSize
    },
    content: [
      // Header
      createHeader(personalInfo, template),
      { text: '', margin: [0, 10] },
      
      // Summary
      ...(personalInfo.summary ? [createSummary(personalInfo.summary, template)] : []),
      
      // Experience
      ...(experience && experience.length > 0 ? [createExperienceSection(experience, template)] : []),
      
      // Education
      ...(education && education.length > 0 ? [createEducationSection(education, template)] : []),
      
      // Skills
      ...(skills && skills.length > 0 ? [createSkillsSection(skills, template)] : []),
      
      // Projects
      ...(projects && projects.length > 0 ? [createProjectsSection(projects, template)] : []),
      
      // Certifications
      ...(certifications && certifications.length > 0 ? [createCertificationsSection(certifications, template)] : []),
      
      // Achievements
      ...(achievements && achievements.length > 0 ? [createAchievementsSection(achievements, template)] : [])
    ],
    styles: {
      header: {
        fontSize: template.headerFontSize,
        bold: true,
        color: template.primaryColor,
        margin: [0, 0, 0, 10]
      },
      sectionHeader: {
        fontSize: template.sectionFontSize,
        bold: true,
        color: template.secondaryColor,
        margin: [0, 15, 0, 8]
      },
      subHeader: {
        fontSize: 12,
        bold: true,
        color: template.accentColor,
        margin: [0, 5, 0, 3]
      },
      body: {
        fontSize: template.bodyFontSize,
        margin: [0, 2, 0, 2]
      },
      contact: {
        fontSize: 9,
        color: '#666666',
        margin: [0, 1, 0, 1]
      }
    }
  };
}

function createHeader(personalInfo, template) {
  const { firstName, lastName, email, phone, location, linkedin, github, portfolio } = personalInfo;
  
  const contactInfo = [];
  if (email) contactInfo.push(email);
  if (phone) contactInfo.push(phone);
  if (location) contactInfo.push(location);
  if (linkedin) contactInfo.push(`LinkedIn: ${linkedin}`);
  if (github) contactInfo.push(`GitHub: ${github}`);
  if (portfolio) contactInfo.push(`Portfolio: ${portfolio}`);
  
  return {
    columns: [
      {
        width: '*',
        text: `${firstName} ${lastName}`,
        style: 'header'
      }
    ],
    margin: [0, 0, 0, 10]
  };
}

function createSummary(summary, template) {
  return [
    { text: 'PROFESSIONAL SUMMARY', style: 'sectionHeader' },
    { text: summary, style: 'body', margin: [0, 0, 0, 10] }
  ];
}

function createExperienceSection(experience, template) {
  const experienceContent = [
    { text: 'PROFESSIONAL EXPERIENCE', style: 'sectionHeader' }
  ];
  
  experience.forEach(exp => {
    const startDate = new Date(exp.startDate).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
    const endDate = exp.current ? 'Present' : 
      new Date(exp.endDate).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short' 
      });
    
    experienceContent.push(
      {
        columns: [
          {
            width: '*',
            text: exp.position,
            style: 'subHeader'
          },
          {
            width: 'auto',
            text: `${startDate} - ${endDate}`,
            style: 'body',
            alignment: 'right'
          }
        ],
        margin: [0, 5, 0, 2]
      },
      {
        text: `${exp.company}${exp.location ? `, ${exp.location}` : ''}`,
        style: 'body',
        color: template.accentColor,
        margin: [0, 0, 0, 3]
      }
    );
    
    if (exp.description) {
      experienceContent.push({
        text: exp.description,
        style: 'body',
        margin: [0, 0, 0, 5]
      });
    }
    
    if (exp.achievements && exp.achievements.length > 0) {
      const achievements = exp.achievements.map(achievement => ({
        text: `• ${achievement}`,
        style: 'body',
        margin: [10, 1, 0, 1]
      }));
      experienceContent.push(...achievements);
    }
    
    experienceContent.push({ text: '', margin: [0, 5] });
  });
  
  return experienceContent;
}

function createEducationSection(education, template) {
  const educationContent = [
    { text: 'EDUCATION', style: 'sectionHeader' }
  ];
  
  education.forEach(edu => {
    const startDate = new Date(edu.startDate).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
    const endDate = edu.current ? 'Present' : 
      new Date(edu.endDate).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short' 
      });
    
    educationContent.push(
      {
        columns: [
          {
            width: '*',
            text: `${edu.degree}${edu.field ? ` in ${edu.field}` : ''}`,
            style: 'subHeader'
          },
          {
            width: 'auto',
            text: `${startDate} - ${endDate}`,
            style: 'body',
            alignment: 'right'
          }
        ],
        margin: [0, 5, 0, 2]
      },
      {
        text: `${edu.institution}${edu.location ? `, ${edu.location}` : ''}`,
        style: 'body',
        color: template.accentColor,
        margin: [0, 0, 0, 3]
      }
    );
    
    if (edu.gpa) {
      educationContent.push({
        text: `GPA: ${edu.gpa}`,
        style: 'body',
        margin: [0, 0, 0, 5]
      });
    }
    
    if (edu.description) {
      educationContent.push({
        text: edu.description,
        style: 'body',
        margin: [0, 0, 0, 5]
      });
    }
    
    educationContent.push({ text: '', margin: [0, 5] });
  });
  
  return educationContent;
}

function createSkillsSection(skills, template) {
  const skillsContent = [
    { text: 'SKILLS', style: 'sectionHeader' }
  ];
  
  skills.forEach(skillGroup => {
    skillsContent.push({
      text: `${skillGroup.category}: ${skillGroup.skills.join(', ')}`,
      style: 'body',
      margin: [0, 2, 0, 2]
    });
  });
  
  return skillsContent;
}

function createProjectsSection(projects, template) {
  const projectsContent = [
    { text: 'PROJECTS', style: 'sectionHeader' }
  ];
  
  projects.forEach(project => {
    const startDate = new Date(project.startDate).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
    const endDate = project.current ? 'Present' : 
      new Date(project.endDate).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short' 
      });
    
    projectsContent.push(
      {
        columns: [
          {
            width: '*',
            text: project.name,
            style: 'subHeader'
          },
          {
            width: 'auto',
            text: `${startDate} - ${endDate}`,
            style: 'body',
            alignment: 'right'
          }
        ],
        margin: [0, 5, 0, 2]
      }
    );
    
    if (project.description) {
      projectsContent.push({
        text: project.description,
        style: 'body',
        margin: [0, 0, 0, 3]
      });
    }
    
    if (project.technologies && project.technologies.length > 0) {
      projectsContent.push({
        text: `Technologies: ${project.technologies.join(', ')}`,
        style: 'body',
        color: template.accentColor,
        margin: [0, 0, 0, 3]
      });
    }
    
    if (project.url) {
      projectsContent.push({
        text: `URL: ${project.url}`,
        style: 'body',
        color: template.primaryColor,
        margin: [0, 0, 0, 5]
      });
    }
    
    projectsContent.push({ text: '', margin: [0, 5] });
  });
  
  return projectsContent;
}

function createCertificationsSection(certifications, template) {
  const certContent = [
    { text: 'CERTIFICATIONS', style: 'sectionHeader' }
  ];
  
  certifications.forEach(cert => {
    const date = new Date(cert.date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
    
    certContent.push(
      {
        columns: [
          {
            width: '*',
            text: cert.name,
            style: 'subHeader'
          },
          {
            width: 'auto',
            text: date,
            style: 'body',
            alignment: 'right'
          }
        ],
        margin: [0, 5, 0, 2]
      },
      {
        text: cert.issuer,
        style: 'body',
        color: template.accentColor,
        margin: [0, 0, 0, 5]
      }
    );
  });
  
  return certContent;
}

function createAchievementsSection(achievements, template) {
  const achievementsContent = [
    { text: 'ACHIEVEMENTS', style: 'sectionHeader' }
  ];
  
  achievements.forEach(achievement => {
    const date = new Date(achievement.date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
    
    achievementsContent.push(
      {
        columns: [
          {
            width: '*',
            text: achievement.title,
            style: 'subHeader'
          },
          {
            width: 'auto',
            text: date,
            style: 'body',
            alignment: 'right'
          }
        ],
        margin: [0, 5, 0, 2]
      }
    );
    
    if (achievement.description) {
      achievementsContent.push({
        text: achievement.description,
        style: 'body',
        margin: [0, 0, 0, 5]
      });
    }
  });
  
  return achievementsContent;
}

module.exports = generatePDF;
