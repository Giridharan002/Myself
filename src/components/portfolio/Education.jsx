export default function Education({ data, theme }) {
  if (!data || data.length === 0) return null;

  return (
    <section className="py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className={`text-3xl font-bold mb-8 text-center ${theme.styles.accentText}`}>
          Education
        </h2>
        
        <div className="space-y-6">
          {data.map((edu, index) => (
            <div 
              key={index} 
              className={`${theme.styles.cardBg} rounded-lg shadow-lg p-6 ${theme.styles.cardBorder}`}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div className="flex-1">
                  <h3 className={`text-xl font-bold ${theme.styles.accentText} mb-1`}>
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </h3>
                  <h4 className={`text-lg font-semibold mb-2 ${
                    theme.id === 'tech' ? 'text-gray-300' : 'text-gray-800'
                  }`}>
                    {edu.institution}
                  </h4>
                </div>
                <div className="flex flex-col items-end space-y-1">
                  <div className={`text-sm font-medium px-3 py-1 rounded-full ${theme.styles.skillTag}`}>
                    {edu.duration}
                  </div>
                  {edu.gpa && (
                    <div className={`text-sm ${
                      theme.id === 'tech' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      GPA: {edu.gpa}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
