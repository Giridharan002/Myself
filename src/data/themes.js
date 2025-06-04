export const themes = {
  professional: {
    id: 'professional',
    name: 'Professional',
    description: 'Clean and corporate design perfect for business professionals',
    preview: '/images/themes/professional-preview.png',
    colors: {
      primary: '#2563eb',
      secondary: '#64748b',
      accent: '#3b82f6',
      background: '#ffffff',
      text: '#1f2937',
      muted: '#6b7280'
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter'
    },
    styles: {
      headerBg: 'bg-blue-600',
      cardBg: 'bg-white',
      cardBorder: 'border-l-4 border-blue-600',
      accentText: 'text-blue-600',
      buttonPrimary: 'bg-blue-600 hover:bg-blue-700',
      skillTag: 'bg-blue-100 text-blue-800'
    }
  },
  
  creative: {
    id: 'creative',
    name: 'Creative',
    description: 'Vibrant and artistic design for creative professionals',
    preview: '/images/themes/creative-preview.png',
    colors: {
      primary: '#8b5cf6',
      secondary: '#ec4899',
      accent: '#f59e0b',
      background: '#fefbff',
      text: '#374151',
      muted: '#6b7280'
    },
    fonts: {
      heading: 'Poppins',
      body: 'Poppins'
    },
    styles: {
      headerBg: 'bg-gradient-to-r from-purple-600 to-pink-600',
      cardBg: 'bg-gradient-to-br from-purple-50 to-pink-50',
      cardBorder: 'border-l-4 border-purple-600',
      accentText: 'text-purple-600',
      buttonPrimary: 'bg-purple-600 hover:bg-purple-700',
      skillTag: 'bg-purple-100 text-purple-800'
    }
  },
  
  tech: {
    id: 'tech',
    name: 'Tech',
    description: 'Modern dark theme perfect for developers and tech professionals',
    preview: '/images/themes/tech-preview.png',
    colors: {
      primary: '#10b981',
      secondary: '#6b7280',
      accent: '#34d399',
      background: '#111827',
      text: '#f9fafb',
      muted: '#9ca3af'
    },
    fonts: {
      heading: 'JetBrains Mono',
      body: 'Inter'
    },
    styles: {
      headerBg: 'bg-gray-900',
      cardBg: 'bg-gray-800',
      cardBorder: 'border-l-4 border-green-400',
      accentText: 'text-green-400',
      buttonPrimary: 'bg-green-600 hover:bg-green-700',
      skillTag: 'bg-green-900 text-green-300'
    }
  },
  
  academic: {
    id: 'academic',
    name: 'Academic',
    description: 'Classic and scholarly design for researchers and academics',
    preview: '/images/themes/academic-preview.png',
    colors: {
      primary: '#4b5563',
      secondary: '#9ca3af',
      accent: '#6b7280',
      background: '#ffffff',
      text: '#1f2937',
      muted: '#6b7280'
    },
    fonts: {
      heading: 'Crimson Text',
      body: 'Georgia'
    },
    styles: {
      headerBg: 'bg-gray-600',
      cardBg: 'bg-white',
      cardBorder: 'border-l-4 border-gray-600',
      accentText: 'text-gray-600',
      buttonPrimary: 'bg-gray-600 hover:bg-gray-700',
      skillTag: 'bg-gray-100 text-gray-800'
    }
  }
};

export const getTheme = (themeId) => {
  return themes[themeId] || themes.professional;
};

export const getThemeList = () => {
  return Object.values(themes);
};
