import { connectToDatabase } from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Check database connection
    const { db } = await connectToDatabase();
    await db.admin().ping();

    // Check environment variables
    const requiredEnvVars = ['MONGODB_URI', 'GEMINI_API_KEY'];
    const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

    if (missingEnvVars.length > 0) {
      return res.status(500).json({
        status: 'error',
        message: 'Missing environment variables',
        missing: missingEnvVars
      });
    }

    return res.status(200).json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: 'connected',
      environment: process.env.NODE_ENV || 'development'
    });

  } catch (error) {
    console.error('Health check failed:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Health check failed',
      error: error.message
    });
  }
}
