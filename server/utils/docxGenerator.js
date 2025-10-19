const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, Table, TableRow, TableCell, WidthType } = require('docx');

async function generateDOCX(resume) {
  const doc = new Document({
    sections: [{
      properties: {},
      children: createDocumentContent(resume)
    }]
  });

  return Packer.toBuffer(doc);
}

function createDocumentContent(resume) {
  const { personalInfo, experience, education, skills, projects, certifications, achievements } = resume;
  const content = [];

  // Header
  content.push(createHeader(personalInfo));
  content.push(new Paragraph({ text: "" }));

  // Summary
  if (personalInfo.summary) {
    content.push(createSummary(personalInfo.summary));
  }

  // Experience
  if (experience && experience.length > 0) {
    content.push(createExperienceSection(experience));
  }

  // Education
  if (education && education.length > 0) {
    content.push(createEducationSection(education));
  }

  // Skills
  if (skills && skills.length > 0) {
    content.push(createSkillsSection(skills));
  }

  // Projects
  if (projects && projects.length > 0) {
    content.push(createProjectsSection(projects));
  }

  // Certifications
  if (certifications && certifications.length > 0) {
    content.push(createCertificationsSection(certifications));
  }

  // Achievements
  if (achievements && achievements.length > 0) {
    content.push(createAchievementsSection(achievements));
  }

  return content;
}

function createHeader(personalInfo) {
  const { firstName, lastName, email, phone, location, linkedin, github, portfolio } = personalInfo;
  
  const contactInfo = [];
  if (email) contactInfo.push(email);
  if (phone) contactInfo.push(phone);
  if (location) contactInfo.push(location);
  if (linkedin) contactInfo.push(`LinkedIn: ${linkedin}`);
  if (github) contactInfo.push(`GitHub: ${github}`);
  if (portfolio) contactInfo.push(`Portfolio: ${portfolio}`);

  return new Paragraph({
    children: [
      new TextRun({
        text: `${firstName} ${lastName}`,
        bold: true,
        size: 32,
        color: "2563eb"
      })
    ],
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 }
  });
}

function createSummary(summary) {
  return new Paragraph({
    children: [
      new TextRun({
        text: "PROFESSIONAL SUMMARY",
        bold: true,
        size: 24,
        color: "1e40af"
      })
    ],
    spacing: { before: 200, after: 100 }
  });
}

function createExperienceSection(experience) {
  const content = [
    new Paragraph({
      children: [
        new TextRun({
          text: "PROFESSIONAL EXPERIENCE",
          bold: true,
          size: 24,
          color: "1e40af"
        })
      ],
      spacing: { before: 200, after: 100 }
    })
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

    content.push(
      new Paragraph({
        children: [
          new TextRun({
            text: exp.position,
            bold: true,
            size: 20,
            color: "3b82f6"
          })
        ],
        spacing: { before: 100, after: 50 }
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: `${exp.company}${exp.location ? `, ${exp.location}` : ''}`,
            size: 18,
            color: "6b7280"
          })
        ],
        spacing: { after: 50 }
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: `${startDate} - ${endDate}`,
            size: 16,
            color: "9ca3af"
          })
        ],
        spacing: { after: 50 }
      })
    );

    if (exp.description) {
      content.push(
        new Paragraph({
          children: [
            new TextRun({
              text: exp.description,
              size: 18
            })
          ],
          spacing: { after: 50 }
        })
      );
    }

    if (exp.achievements && exp.achievements.length > 0) {
      exp.achievements.forEach(achievement => {
        content.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `• ${achievement}`,
                size: 18
              })
            ],
            indent: { left: 400 },
            spacing: { after: 25 }
          })
        );
      });
    }
  });

  return content;
}

function createEducationSection(education) {
  const content = [
    new Paragraph({
      children: [
        new TextRun({
          text: "EDUCATION",
          bold: true,
          size: 24,
          color: "1e40af"
        })
      ],
      spacing: { before: 200, after: 100 }
    })
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

    content.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `${edu.degree}${edu.field ? ` in ${edu.field}` : ''}`,
            bold: true,
            size: 20,
            color: "3b82f6"
          })
        ],
        spacing: { before: 100, after: 50 }
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: `${edu.institution}${edu.location ? `, ${edu.location}` : ''}`,
            size: 18,
            color: "6b7280"
          })
        ],
        spacing: { after: 50 }
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: `${startDate} - ${endDate}`,
            size: 16,
            color: "9ca3af"
          })
        ],
        spacing: { after: 50 }
      })
    );

    if (edu.gpa) {
      content.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `GPA: ${edu.gpa}`,
              size: 18
            })
          ],
          spacing: { after: 50 }
        })
      );
    }

    if (edu.description) {
      content.push(
        new Paragraph({
          children: [
            new TextRun({
              text: edu.description,
              size: 18
            })
          ],
          spacing: { after: 50 }
        })
      );
    }
  });

  return content;
}

function createSkillsSection(skills) {
  const content = [
    new Paragraph({
      children: [
        new TextRun({
          text: "SKILLS",
          bold: true,
          size: 24,
          color: "1e40af"
        })
      ],
      spacing: { before: 200, after: 100 }
    })
  ];

  skills.forEach(skillGroup => {
    content.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `${skillGroup.category}: ${skillGroup.skills.join(', ')}`,
            size: 18
          })
        ],
        spacing: { after: 50 }
      })
    );
  });

  return content;
}

function createProjectsSection(projects) {
  const content = [
    new Paragraph({
      children: [
        new TextRun({
          text: "PROJECTS",
          bold: true,
          size: 24,
          color: "1e40af"
        })
      ],
      spacing: { before: 200, after: 100 }
    })
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

    content.push(
      new Paragraph({
        children: [
          new TextRun({
            text: project.name,
            bold: true,
            size: 20,
            color: "3b82f6"
          })
        ],
        spacing: { before: 100, after: 50 }
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: `${startDate} - ${endDate}`,
            size: 16,
            color: "9ca3af"
          })
        ],
        spacing: { after: 50 }
      })
    );

    if (project.description) {
      content.push(
        new Paragraph({
          children: [
            new TextRun({
              text: project.description,
              size: 18
            })
          ],
          spacing: { after: 50 }
        })
      );
    }

    if (project.technologies && project.technologies.length > 0) {
      content.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `Technologies: ${project.technologies.join(', ')}`,
              size: 18,
              color: "6b7280"
            })
          ],
          spacing: { after: 50 }
        })
      );
    }

    if (project.url) {
      content.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `URL: ${project.url}`,
              size: 18,
              color: "2563eb"
            })
          ],
          spacing: { after: 50 }
        })
      );
    }
  });

  return content;
}

function createCertificationsSection(certifications) {
  const content = [
    new Paragraph({
      children: [
        new TextRun({
          text: "CERTIFICATIONS",
          bold: true,
          size: 24,
          color: "1e40af"
        })
      ],
      spacing: { before: 200, after: 100 }
    })
  ];

  certifications.forEach(cert => {
    const date = new Date(cert.date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });

    content.push(
      new Paragraph({
        children: [
          new TextRun({
            text: cert.name,
            bold: true,
            size: 20,
            color: "3b82f6"
          })
        ],
        spacing: { before: 100, after: 50 }
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: cert.issuer,
            size: 18,
            color: "6b7280"
          })
        ],
        spacing: { after: 50 }
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: date,
            size: 16,
            color: "9ca3af"
          })
        ],
        spacing: { after: 50 }
      })
    );
  });

  return content;
}

function createAchievementsSection(achievements) {
  const content = [
    new Paragraph({
      children: [
        new TextRun({
          text: "ACHIEVEMENTS",
          bold: true,
          size: 24,
          color: "1e40af"
        })
      ],
      spacing: { before: 200, after: 100 }
    })
  ];

  achievements.forEach(achievement => {
    const date = new Date(achievement.date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });

    content.push(
      new Paragraph({
        children: [
          new TextRun({
            text: achievement.title,
            bold: true,
            size: 20,
            color: "3b82f6"
          })
        ],
        spacing: { before: 100, after: 50 }
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: date,
            size: 16,
            color: "9ca3af"
          })
        ],
        spacing: { after: 50 }
      })
    );

    if (achievement.description) {
      content.push(
        new Paragraph({
          children: [
            new TextRun({
              text: achievement.description,
              size: 18
            })
          ],
          spacing: { after: 50 }
        })
      );
    }
  });

  return content;
}

module.exports = generateDOCX;
