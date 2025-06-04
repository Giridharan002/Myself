import { useState } from 'react';
import { themes, getThemeList } from '../../data/themes';

export default function ThemeSelector({ currentTheme, onThemeChange, className = '' }) {
  const [isOpen, setIsOpen] = useState(false);
  const themeList = getThemeList();

  const handleThemeSelect = (themeId) => {
    onThemeChange(themeId);
    setIsOpen(false);
  };

  return (
    <div className={`fixed top-4 right-4 z-50 ${className}`}>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white shadow-lg rounded-lg p-3 hover:bg-gray-50 transition-colors flex items-center space-x-2"
          title="Change Theme"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M7 21h10a2 2 0 002-2v-4a2 2 0 00-2-2H9l-2 2H7v6z" />
          </svg>
          <span className="text-sm font-medium text-gray-700">
            {themes[currentTheme]?.name || 'Theme'}
          </span>
          <svg 
            className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)}
            />
            
            {/* Dropdown */}
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
              <div className="p-2">
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide px-3 py-2">
                  Choose Theme
                </div>
                {themeList.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => handleThemeSelect(theme.id)}
                    className={`w-full text-left px-3 py-3 rounded-lg hover:bg-gray-50 transition-colors ${
                      currentTheme === theme.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {/* Theme Color Preview */}
                      <div 
                        className="w-4 h-4 rounded-full border border-gray-200"
                        style={{ backgroundColor: theme.colors.primary }}
                      />
                      <div className="flex-1">
                        <div className={`font-medium text-sm ${
                          currentTheme === theme.id ? 'text-blue-700' : 'text-gray-900'
                        }`}>
                          {theme.name}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {theme.description}
                        </div>
                      </div>
                      {currentTheme === theme.id && (
                        <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
