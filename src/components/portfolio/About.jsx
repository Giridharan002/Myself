export default function About({ data, theme }) {
  const { about } = data;

  if (!about) return null;

  return (
    <section className="py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className={`${theme.styles.cardBg} rounded-lg shadow-lg p-8 ${theme.styles.cardBorder}`}>
          <h2 className={`text-2xl font-bold mb-6 ${theme.styles.accentText}`}>
            About Me
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className={`text-lg leading-relaxed ${
              theme.id === 'tech' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {about}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
