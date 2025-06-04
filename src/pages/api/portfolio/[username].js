import { connectToDatabase } from '../../../lib/mongodb';

export default async function handler(req, res) {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('portfolios');

    if (req.method === 'GET') {
      // Get portfolio data
      try {
        const portfolio = await collection.findOne({ username });

        if (!portfolio) {
          return res.status(404).json({ error: 'Portfolio not found' });
        }

        // Update view count
        await collection.updateOne(
          { username },
          { 
            $inc: { views: 1 },
            $set: { lastViewed: new Date() }
          }
        );

        // Remove sensitive data before sending
        const { _id, ...portfolioData } = portfolio;

        return res.status(200).json(portfolioData);
      } catch (error) {
        console.error('Error fetching portfolio:', error);
        return res.status(500).json({ error: 'Failed to fetch portfolio' });
      }
    }

    if (req.method === 'PUT') {
      // Update portfolio data (theme, etc.)
      try {
        const updateData = req.body;
        
        // Validate update data
        const allowedUpdates = ['theme', 'name', 'headline', 'about', 'location', 'email', 'phone', 'linkedin', 'website'];
        const updates = {};
        
        Object.keys(updateData).forEach(key => {
          if (allowedUpdates.includes(key)) {
            updates[key] = updateData[key];
          }
        });

        if (Object.keys(updates).length === 0) {
          return res.status(400).json({ error: 'No valid updates provided' });
        }

        // Add update timestamp
        updates.updatedAt = new Date();

        const result = await collection.updateOne(
          { username },
          { $set: updates }
        );

        if (result.matchedCount === 0) {
          return res.status(404).json({ error: 'Portfolio not found' });
        }

        return res.status(200).json({ 
          message: 'Portfolio updated successfully',
          updated: updates 
        });
      } catch (error) {
        console.error('Error updating portfolio:', error);
        return res.status(500).json({ error: 'Failed to update portfolio' });
      }
    }

    if (req.method === 'DELETE') {
      // Delete portfolio
      try {
        const result = await collection.deleteOne({ username });

        if (result.deletedCount === 0) {
          return res.status(404).json({ error: 'Portfolio not found' });
        }

        return res.status(200).json({ message: 'Portfolio deleted successfully' });
      } catch (error) {
        console.error('Error deleting portfolio:', error);
        return res.status(500).json({ error: 'Failed to delete portfolio' });
      }
    }

    // Method not allowed
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });

  } catch (error) {
    console.error('Database connection error:', error);
    return res.status(500).json({ error: 'Database connection failed' });
  }
}
