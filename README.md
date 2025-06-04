# Portfolio Builder

A modern web application that converts PDF resumes into beautiful, responsive portfolio websites using AI technology.

## Features

- 📄 **PDF Resume Upload**: Upload your resume in PDF format
- 🤖 **AI-Powered Extraction**: Uses Google Gemini AI to extract and structure resume data
- 🎨 **Multiple Themes**: Choose from professional, creative, tech, and minimal themes
- 📱 **Responsive Design**: Looks great on all devices
- 🔗 **Shareable Links**: Get a unique URL for your portfolio
- 🖨️ **Print-Friendly**: Optimized for printing
- ⚡ **Fast & Secure**: Built with Next.js and MongoDB

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Node.js, Next.js API Routes
- **Database**: MongoDB
- **AI**: Google Gemini AI
- **File Processing**: PDF-Parse, Multer
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB database
- Google Gemini AI API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio-builder.git
cd portfolio-builder
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your configuration:
```env
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Upload Resume**: Go to the homepage and upload your PDF resume
2. **AI Processing**: The system will extract information using AI
3. **View Portfolio**: Get redirected to your new portfolio
4. **Customize**: Change themes and customize your portfolio
5. **Share**: Share your unique portfolio URL

## API Endpoints

- `POST /api/upload` - Upload and process PDF resume
- `GET /api/portfolio/[username]` - Get portfolio data
- `PUT /api/portfolio/[username]` - Update portfolio
- `DELETE /api/portfolio/[username]` - Delete portfolio
- `GET /api/health` - Health check
- `GET /api/stats` - Application statistics

## Project Structure

```
src/
├── components/          # React components
│   ├── portfolio/      # Portfolio-specific components
│   └── ui/            # Reusable UI components
├── data/              # Static data and configurations
├── hooks/             # Custom React hooks
├── lib/               # Utility libraries
├── pages/             # Next.js pages and API routes
│   ├── api/          # API endpoints
│   └── portfolio/    # Portfolio pages
└── styles/           # CSS styles
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License
