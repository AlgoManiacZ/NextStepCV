import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';
import { saveAs } from 'file-saver';
import { ResumeData } from '../types';

export const generateWordDocument = async (data: ResumeData) => {
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        // Header
        new Paragraph({
          text: data.name,
          heading: HeadingLevel.HEADING_1,
          spacing: { after: 200 },
        }),
        new Paragraph({
          children: [
            new TextRun({ text: data.email }),
            new TextRun({ text: " | " }),
            new TextRun({ text: data.phone }),
          ],
          spacing: { after: 400 },
        }),

        // Summary
        new Paragraph({
          text: "Professional Summary",
          heading: HeadingLevel.HEADING_2,
          spacing: { after: 200 },
        }),
        new Paragraph({
          text: data.summary,
          spacing: { after: 400 },
        }),

        // Work Experience
        new Paragraph({
          text: "Work Experience",
          heading: HeadingLevel.HEADING_2,
          spacing: { after: 200 },
        }),
        ...data.workExperience.flatMap(exp => [
          new Paragraph({
            text: `${exp.position} at ${exp.company}`,
            heading: HeadingLevel.HEADING_3,
          }),
          new Paragraph({
            text: `${exp.startDate} - ${exp.endDate}`,
          }),
          new Paragraph({
            text: exp.description,
            spacing: { after: 200 },
          }),
        ]),

        // Skills
        new Paragraph({
          text: "Skills",
          heading: HeadingLevel.HEADING_2,
          spacing: { after: 200 },
        }),
        new Paragraph({
          text: "Technical Skills",
          heading: HeadingLevel.HEADING_3,
        }),
        ...data.skills.technical.map(skill => 
          new Paragraph({ text: `• ${skill}` })
        ),
        new Paragraph({
          text: "Soft Skills",
          heading: HeadingLevel.HEADING_3,
        }),
        ...data.skills.soft.map(skill => 
          new Paragraph({ text: `• ${skill}` })
        ),

        // Accomplishments
        new Paragraph({
          text: "Accomplishments",
          heading: HeadingLevel.HEADING_2,
          spacing: { after: 200 },
        }),
        ...data.accomplishments.flatMap(acc => [
          new Paragraph({
            text: acc.title,
            heading: HeadingLevel.HEADING_3,
          }),
          new Paragraph({
            text: acc.description,
            spacing: { after: 200 },
          }),
        ]),

        // Hobbies
        new Paragraph({
          text: "Hobbies & Interests",
          heading: HeadingLevel.HEADING_2,
          spacing: { after: 200 },
        }),
        ...data.hobbies.map(hobby => 
          new Paragraph({ text: `• ${hobby}` })
        ),
      ],
    }],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, "resume.docx");
};