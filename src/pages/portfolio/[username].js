import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { themes } from '../../data/themes';

// Portfolio Components
import Header from '../../components/portfolio/Header';
import About from '../../components/portfolio/About';
import Experience from '../../components/portfolio/Experience';
import Skills from '../../components/portfolio/Skills';
import Education from '../../components/portfolio/Education';
import Projects from '../../components/portfolio/Projects';
import Certifications from '../../components/portfolio/Certifications';
import ThemeSelector from '../../components/ui/ThemeSelector';
import Loading from '../../components/ui/Loading';

export default function Portfolio() {
  const router = useRouter();
  const { username } = router.query;
  const [portfolioData, setPortfolioData] = useState(null);
  const [currentTheme, setCurrentTheme] = useState('professional');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (username) {
      fetchPortfolioData();
    }
  }, [username]);

  const fetchPortfolioData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/portfolio/${username}`);
      
      if (response.ok) {
        const data = await response.json();
        setPortfolioData(data);
        setCurrentTheme(data.theme || 'professional');
      } else if (response.status === 404) {
        setError('Portfolio not found');
      } else {
        setError('Failed to load portfolio');
      }
    } catch (error) {
      console.error('Error fetching portfolio:', error);
      setError('Failed to load portfolio');
    } finally {
      setLoading(false);
    }
  };

  const handleThemeChange = async (newTheme) => {
    try {
      setCurrentTheme(newTheme);
      
      // Update theme in database
      await fetch(`/api/portfolio/${username}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ theme: newTheme }),
      });
    } catch (error) {
      console.error('Error updating theme:', error);
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${portfolioData.name}'s Portfolio`,
          text: `Check out ${portfolioData.name}'s professional portfolio`,
          url: url,
        });
      } catch (error) {
        console.log('Error sharing:', error);
        copyToClipboard(url);
      }
    } else {
      copyToClipboard(url);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Portfolio URL copied to clipboard!');
    });
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return <Loading message="Loading portfolio..." />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Portfolio Not Found</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.push('/')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create New Portfolio
          </button>
        </div>
      </div>
    );
  }

  if (!portfolioData) {
    return <Loading message="Loading portfolio..." />;
  }

  const theme = themes[currentTheme] || themes.professional;

  return (
    <>
      <Head>
        <title>{portfolioData.name} - Portfolio</title>
        <meta name="description" content={`Professional portfolio of ${portfolioData.name} - ${portfolioData.headline}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={`${portfolioData.name} - Portfolio`} />
        <meta property="og:description" content={portfolioData.about} />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_BASE_URL}/portfolio/${username}`} />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`${portfolioData.name} - Portfolio`} />
        <meta name="twitter:description" content={portfolioData.about} />
      </Head>

      <div className={`min-h-screen theme-${currentTheme} ${currentTheme === 'tech' ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
        {/* Theme Selector */}
        <ThemeSelector
          currentTheme={currentTheme}
          onThemeChange={handleThemeChange}
          className="no-print"
        />

        {/* Action Buttons */}
        <div className="fixed top-4 left-4 z-40 flex space-x-2 no-print">
          <button
            onClick={handleShare}
            className="bg-white shadow-lg rounded-lg p-2 hover:bg-gray-50 transition-colors"
            title="Share Portfolio"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
          </button>
          
          <button
            onClick={handlePrint}
            className="bg-white shadow-lg rounded-lg p-2 hover:bg-gray-50 transition-colors"
            title="Print Portfolio"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
          </button>
        </div>

        {/* Portfolio Content */}
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <Header data={portfolioData} theme={theme} />

          {/* About Section */}
          {portfolioData.about && (
            <About data={portfolioData} theme={theme} />
          )}

          {/* Experience Section */}
          {portfolioData.experience && portfolioData.experience.length > 0 && (
            <Experience data={portfolioData.experience} theme={theme} />
          )}

          {/* Skills Section */}
          {portfolioData.skills && portfolioData.skills.length > 0 && (
            <Skills data={portfolioData.skills} theme={theme} />
          )}

          {/* Projects Section */}
          {portfolioData.projects && portfolioData.projects.length > 0 && (
            <Projects data={portfolioData.projects} theme={theme} />
          )}

          {/* Education Section */}
          {portfolioData.education && portfolioData.education.length > 0 && (
            <Education data={portfolioData.education} theme={theme} />
          )}

          {/* Certifications Section */}
          {portfolioData.certifications && portfolioData.certifications.length > 0 && (
            <Certifications data={portfolioData.certifications} theme={theme} />
          )}

                    {/* Footer */}
          <footer className="py-8 text-center border-t border-gray-200 mt-12">
            <p className={`text-sm ${
              currentTheme === 'tech' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Portfolio generated with Portfolio Builder
            </p>
            <div className="mt-2 no-print">
              <a
                href="/"
                className={`text-sm hover:underline ${
                  currentTheme === 'tech' ? 'text-green-400' : 'text-blue-600'
                }`}
              >
                Create your own portfolio →
              </a>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}

