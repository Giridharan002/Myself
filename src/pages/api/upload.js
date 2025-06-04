import multer from 'multer';
import { connectToDatabase } from '../../lib/mongodb';
import { extractTextFromPDF, validatePDFBuffer } from '../../lib/pdfProcessor';
import { processWithGemini } from '../../lib/gemini';
import { generateUsername } from '../../lib/utils';

// Configure multer for file upload
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  },
});

// Disable Next.js body parser for this route
export const config = {
  api: {
    bodyParser: false,
  },
};

// Promisify multer
const uploadMiddleware = upload.single('resume');
const runMiddleware = (req, res, fn) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Handle file upload
    await runMiddleware(req, res, uploadMiddleware);

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    console.log('File uploaded:', req.file.originalname, 'Size:', req.file.size);

    // Validate PDF
    validatePDFBuffer(req.file.buffer);

    // Extract text from PDF
    console.log('Extracting text from PDF...');
    const resumeText = await extractTextFromPDF(req.file.buffer);

    // Process with Gemini AI
    console.log('Processing with AI...');
    const portfolioData = await processWithGemini(resumeText);

    // Generate unique username
    const username = generateUsername(portfolioData.name);
    portfolioData.username = username;

    // Add metadata
    portfolioData.createdAt = new Date();
    portfolioData.updatedAt = new Date();
    portfolioData.theme = 'professional'; // Default theme
    portfolioData.views = 0;
    portfolioData.originalFilename = req.file.originalname;

    // Save to database
    console.log('Saving to database...');
    const { db } = await connectToDatabase();
    const collection = db.collection('portfolios');

    // Check if username already exists and make it unique
    let finalUsername = username;
    let counter = 1;
    while (await collection.findOne({ username: finalUsername })) {
      finalUsername = `${username}-${counter}`;
      counter++;
    }
    portfolioData.username = finalUsername;

    await collection.insertOne(portfolioData);

    console.log('Portfolio created successfully for:', portfolioData.name);

    // Return success response
    return res.status(200).json({
      message: 'Portfolio created successfully',
      portfolioUrl: `/portfolio/${finalUsername}`,
      username: finalUsername,
      name: portfolioData.name
    });

  } catch (error) {
    console.error('Upload processing error:', error);

    // Handle specific error types
    if (error.message.includes('PDF')) {
      return res.status(400).json({ error: error.message });
    }

    if (error.message.includes('AI processing')) {
      return res.status(500).json({ error: 'Failed to process resume content. Please ensure your PDF contains readable text.' });
    }

    if (error.message.includes('Database')) {
      return res.status(500).json({ error: 'Failed to save portfolio. Please try again.' });
    }

    // Generic error
    return res.status(500).json({ 
      error: 'Failed to process resume. Please try again or contact support if the problem persists.' 
    });
  }
}
