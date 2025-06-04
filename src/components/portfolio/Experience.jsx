export default function Experience({ data, theme }) {
  if (!data || data.length === 0) return null;

  return (
    <section className="py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className={`text-3xl font-bold mb-8 text-center ${theme.styles.accentText}`}>
          Professional Experience
        </h2>
        
        <div className="space-y-8">
          {data.map((job, index) => (
            <div 
              key={index} 
              className={`${theme.styles.cardBg} rounded-lg shadow-lg p-6 ${theme.styles.cardBorder}`}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div className="flex-1">
                  <h3 className={`text-xl font-bold ${theme.styles.accentText} mb-1`}>
                    {job.role}
                  </h3>
                  <h4 className={`text-lg font-semibold mb-2 ${
                    theme.id === 'tech' ? 'text-gray-300' : 'text-gray-800'
                  }`}>
                    {job.company}
                  </h4>
                </div>
                <div className={`text-sm font-medium px-3 py-1 rounded-full ${theme.styles.skillTag}`}>
                  {job.duration}
                </div>
              </div>
              
              <p className={`mb-4 leading-relaxed ${
                theme.id === 'tech' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {job.description}
              </p>
              
              {job.skills_used && job.skills_used.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {job.skills_used.map((skill, skillIndex) => (
                    <span 
                      key={skillIndex}
                      className={`text-xs px-2 py-1 rounded ${theme.styles.skillTag}`}
                    >
                      {skill}
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
