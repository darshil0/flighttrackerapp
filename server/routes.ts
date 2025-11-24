import { Router, Request, Response } from 'express';
import { db } from './db';
import { flights } from '../shared/schema';
import { eq, desc } from 'drizzle-orm';

const router = Router();

// Health check endpoint
router.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Get all flights
router.get('/api/flights', async (req: Request, res: Response) => {
  try {
    const allFlights = await db
      .select()
      .from(flights)
      .orderBy(desc(flights.departureTime));
    
    res.json(allFlights);
  } catch (error) {
    console.error('Error fetching flights:', error);
    res.status(500).json({
      error: 'Failed to fetch flights',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get single flight by ID
router.get('/api/flights/:id', async (req: Request, res: Response) => {
  try {
    const flightId = parseInt(req.params.id);
    
    if (isNaN(flightId)) {
      return res.status(400).json({
        error: 'Invalid flight ID',
        message: 'Flight ID must be a number'
      });
    }

    const flight = await db
      .select()
      .from(flights)
      .where(eq(flights.id, flightId))
      .limit(1);

    if (flight.length === 0) {
      return res.status(404).json({
        error: 'Flight not found',
        message: `No flight found with ID ${flightId}`
      });
    }

    res.json(flight[0]);
  } catch (error) {
    console.error('Error fetching flight:', error);
    res.status(500).json({
      error: 'Failed to fetch flight',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Create new flight
router.post('/api/flights', async (req: Request, res: Response) => {
  try {
    const newFlight = await db
      .insert(flights)
      .values(req.body)
      .returning();

    res.status(201).json(newFlight[0]);
  } catch (error) {
    console.error('Error creating flight:', error);
    res.status(500).json({
      error: 'Failed to create flight',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Update flight
router.put('/api/flights/:id', async (req: Request, res: Response) => {
  try {
    const flightId = parseInt(req.params.id);
    
    if (isNaN(flightId)) {
      return res.status(400).json({
        error: 'Invalid flight ID',
        message: 'Flight ID must be a number'
      });
    }

    const updatedFlight = await db
      .update(flights)
      .set({ ...req.body, updatedAt: new Date() })
      .where(eq(flights.id, flightId))
      .returning();

    if (updatedFlight.length === 0) {
      return res.status(404).json({
        error: 'Flight not found',
        message: `No flight found with ID ${flightId}`
      });
    }

    res.json(updatedFlight[0]);
  } catch (error) {
    console.error('Error updating flight:', error);
    res.status(500).json({
      error: 'Failed to update flight',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Delete flight
router.delete('/api/flights/:id', async (req: Request, res: Response) => {
  try {
    const flightId = parseInt(req.params.id);
    
    if (isNaN(flightId)) {
      return res.status(400).json({
        error: 'Invalid flight ID',
        message: 'Flight ID must be a number'
      });
    }

    const deletedFlight = await db
      .delete(flights)
      .where(eq(flights.id, flightId))
      .returning();

    if (deletedFlight.length === 0) {
      return res.status(404).json({
        error: 'Flight not found',
        message: `No flight found with ID ${flightId}`
      });
    }

    res.json({
      message: 'Flight deleted successfully',
      flight: deletedFlight[0]
    });
  } catch (error) {
    console.error('Error deleting flight:', error);
    res.status(500).json({
      error: 'Failed to delete flight',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;
