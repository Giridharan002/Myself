import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function processWithGemini(resumeText) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
    Extract and structure the following resume information into a JSON format. Be thorough and accurate:

    Resume Text:
    ${resumeText}

    Please extract and return ONLY a valid JSON object with this exact structure:
    {
      "name": "Full Name",
      "headline": "Professional title/role",
      "about": "Professional summary or objective (2-3 sentences)",
      "location": "City, State/Country",
      "email": "email@example.com",
      "phone": "phone number",
      "linkedin": "LinkedIn URL if mentioned",
      "website": "Personal website if mentioned",
      "experience": [
        {
          "company": "Company Name",
          "role": "Job Title",
          "duration": "Start Date - End Date",
          "description": "Job description and achievements",
          "skills_used": ["skill1", "skill2", "skill3"]
        }
      ],
      "education": [
        {
          "institution": "School/University Name",
          "degree": "Degree Type",
          "field": "Field of Study",
          "duration": "Start Year - End Year",
          "gpa": "GPA if mentioned"
        }
      ],
      "skills": ["skill1", "skill2", "skill3"],
      "projects": [
        {
          "name": "Project Name",
          "description": "Project description",
          "technologies": ["tech1", "tech2"],
          "url": "project URL if mentioned"
        }
      ],
      "certifications": [
        {
          "name": "Certification Name",
          "issuer": "Issuing Organization",
          "date": "Date obtained"
        }
      ]
    }

    Important guidelines:
    - Extract ALL information available in the resume
    - If information is not available, use empty string "" or empty array []
    - Ensure all dates are in readable format
    - Make the "about" section compelling and professional
    - Include ALL skills mentioned in the resume
    - Return ONLY the JSON object, no additional text
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // Clean the response to ensure it's valid JSON
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    // Find JSON object in the response
    const jsonStart = text.indexOf('{');
    const jsonEnd = text.lastIndexOf('}') + 1;
    
    if (jsonStart === -1 || jsonEnd === 0) {
      throw new Error('No valid JSON found in AI response');
    }
    
    const jsonText = text.substring(jsonStart, jsonEnd);
    
    try {
      const portfolioData = JSON.parse(jsonText);
      
      // Validate required fields
      if (!portfolioData.name || portfolioData.name.trim() === '') {
        throw new Error('Name is required but not found in resume');
      }
      
      // Ensure arrays exist
      portfolioData.experience = portfolioData.experience || [];
      portfolioData.education = portfolioData.education || [];
      portfolioData.skills = portfolioData.skills || [];
      portfolioData.projects = portfolioData.projects || [];
      portfolioData.certifications = portfolioData.certifications || [];
      
      // Generate headline if missing
      if (!portfolioData.headline || portfolioData.headline.trim() === '') {
        portfolioData.headline = generateHeadline(portfolioData);
      }
      
      // Generate about section if missing
      if (!portfolioData.about || portfolioData.about.trim() === '') {
        portfolioData.about = generateAbout(portfolioData);
      }
      
      console.log('Successfully processed resume for:', portfolioData.name);
      return portfolioData;
      
    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      console.error('Raw AI response:', text);
      throw new Error('Failed to parse AI response as JSON');
    }
    
  } catch (error) {
    console.error('Gemini AI processing error:', error);
    throw new Error(`AI processing failed: ${error.message}`);
  }
}

function generateHeadline(data) {
  if (data.experience && data.experience.length > 0) {
    return data.experience[0].role || 'Professional';
  }
  if (data.skills && data.skills.length > 0) {
    return `${data.skills[0]} Specialist`;
  }
  return 'Professional';
}

function generateAbout(data) {
  let about = `Experienced professional`;
  
  if (data.experience && data.experience.length > 0) {
    about += ` with expertise in ${data.experience[0].role.toLowerCase()}`;
  }
  
  if (data.skills && data.skills.length > 0) {
    about += `. Skilled in ${data.skills.slice(0, 3).join(', ')}`;
  }
  
  about += '. Passionate about delivering high-quality results and continuous learning.';
  
  return about;
}
