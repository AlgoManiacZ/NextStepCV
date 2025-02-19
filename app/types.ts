export interface ResumeData {
  // Contact Information
  name: string;
  email: string;
  phone: string;
  
  // Summary
  summary: string;
  
  // Work Experience
  workExperience: {
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  
  // Skills
  skills: {
    technical: string[];
    soft: string[];
  };
  
  // Accomplishments
  accomplishments: {
    title: string;
    description: string;
  }[];
  
  // Other
  hobbies: string[];
}