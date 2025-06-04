export const portfolioTemplates = {
  default: {
    sections: ['header', 'about', 'experience', 'skills', 'education', 'projects', 'certifications'],
    layout: 'single-column'
  },
  
  developer: {
    sections: ['header', 'about', 'skills', 'projects', 'experience', 'education'],
    layout: 'single-column',
    emphasis: ['skills', 'projects']
  },
  
  business: {
    sections: ['header', 'about', 'experience', 'skills', 'education', 'certifications'],
    layout: 'single-column',
    emphasis: ['experience']
  },
  
  academic: {
    sections: ['header', 'about', 'education', 'experience', 'projects', 'certifications', 'skills'],
    layout: 'single-column',
    emphasis: ['education', 'projects']
  }
};

export const sectionTemplates = {
  header: {
    component: 'Header',
    required: true,
    props: ['name', 'headline', 'location', 'email', 'phone', 'linkedin', 'website']
  },
  
  about: {
    component: 'About',
    required: true,
    props: ['about']
  },
  
  experience: {
    component: 'Experience',
    required: false,
    props: ['experience']
  },
  
  skills: {
    component: 'Skills',
    required: false,
    props: ['skills']
  },
  
  education: {
    component: 'Education',
    required: false,
    props: ['education']
  },
  
  projects: {
    component: 'Projects',
    required: false,
    props: ['projects']
  },
  
  certifications: {
    component: 'Certifications',
    required: false,
    props: ['certifications']
  }
};
