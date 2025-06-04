import { connectToDatabase } from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('portfolios');

    // Get basic stats
    const totalPortfolios = await collection.countDocuments();
    const totalViews = await collection.aggregate([
      { $group: { _id: null, total: { $sum: '$views' } } }
    ]).toArray();

    // Get recent portfolios
    const recentPortfolios = await collection
      .find({}, { projection: { name: 1, createdAt: 1, views: 1 } })
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray();

    // Get theme distribution
    const themeStats = await collection.aggregate([
      { $group: { _id: '$theme', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]).toArray();

    return res.status(200).json({
      totalPortfolios,
      totalViews: totalViews[0]?.total || 0,
      recentPortfolios,
      themeStats,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Stats API error:', error);
    return res.status(500).json({ error: 'Failed to fetch stats' });
  }
}
