export default function Skills({ data, theme }) {
  if (!data || data.length === 0) return null;

  return (
    <section className="py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className={`text-3xl font-bold mb-8 text-center ${theme.styles.accentText}`}>
          Skills & Technologies
        </h2>
        
        <div className={`${theme.styles.cardBg} rounded-lg shadow-lg p-8 ${theme.styles.cardBorder}`}>
          <div className="flex flex-wrap gap-3 justify-center">
            {data.map((skill, index) => (
              <span 
                key={index}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-transform hover:scale-105 ${theme.styles.skillTag}`}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
