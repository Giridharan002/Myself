export default function Certifications({ data, theme }) {
  if (!data || data.length === 0) return null;

  return (
    <section className="py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className={`text-3xl font-bold mb-8 text-center ${theme.styles.accentText}`}>
          Certifications
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {data.map((cert, index) => (
            <div 
              key={index} 
              className={`${theme.styles.cardBg} rounded-lg shadow-lg p-6 ${theme.styles.cardBorder}`}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className={`text-lg font-bold ${theme.styles.accentText} flex-1`}>
                  {cert.name}
                </h3>
                {cert.date && (
                  <div className={`text-sm font-medium px-3 py-1 rounded-full ${theme.styles.skillTag}`}>
                    {cert.date}
                  </div>
                )}
              </div>
              
              {cert.issuer && (
                <p className={`text-sm font-medium mb-2 ${
                  theme.id === 'tech' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Issued by: {cert.issuer}
                </p>
              )}
              
              {cert.credential_id && (
                <p className={`text-xs ${
                  theme.id === 'tech' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Credential ID: {cert.credential_id}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
