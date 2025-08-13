import express from 'express';
import Group from '../models/Group.js';

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const ownerId = req.ownerId;
    const { name, purpose, startDate, endDate, notes } = req.body;
    if (!ownerId || !name || !purpose) {
      return res.status(400).json({ error: { code: 'BAD_REQUEST', message: 'ownerId, name, and purpose required' } });
    }
    const group = await Group.create({ ownerId, name, purpose, startDate, endDate, notes });
    res.json({ data: { group } });
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const ownerId = req.ownerId;
    const { purpose } = req.query;
    if (!ownerId) return res.status(400).json({ error: { code: 'BAD_REQUEST', message: 'ownerId required' } });
    const filter = { ownerId };
    if (purpose) filter.purpose = purpose;
    const items = await Group.find(filter).sort({ startDate: -1, createdAt: -1 });
    res.json({ data: { items } });
  } catch (err) {
    next(err);
  }
});

export default router;
