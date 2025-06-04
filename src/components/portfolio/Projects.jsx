import { isValidUrl } from '../../lib/utils';

export default function Projects({ data, theme }) {
  if (!data || data.length === 0) return null;

  return (
    <section className="py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className={`text-3xl font-bold mb-8 text-center ${theme.styles.accentText}`}>
          Projects
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {data.map((project, index) => (
            <div 
              key={index} 
              className={`${theme.styles.cardBg} rounded-lg shadow-lg p-6 ${theme.styles.cardBorder} hover:shadow-xl transition-shadow`}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className={`text-xl font-bold ${theme.styles.accentText} flex-1`}>
                  {project.name}
                </h3>
                {project.url && isValidUrl(project.url) && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`ml-2 ${theme.styles.accentText} hover:opacity-70 transition-opacity`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
              </div>
              
              <p className={`mb-4 leading-relaxed ${
                theme.id === 'tech' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {project.description}
              </p>
              
              {project.technologies && project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className={`text-xs px-2 py-1 rounded ${theme.styles.skillTag}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
