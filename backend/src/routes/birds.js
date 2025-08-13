import express from 'express';
import Bird from '../models/Bird.js';

const router = express.Router();

// Create bird
router.post('/', async (req, res, next) => {
  try {
    const ownerId = req.ownerId;
    const data = req.body || {};
    if (!ownerId) return res.status(400).json({ error: { code: 'BAD_REQUEST', message: 'ownerId required' } });
    if (!data.tagId) return res.status(400).json({ error: { code: 'BAD_REQUEST', message: 'tagId required' } });
    const bird = await Bird.create({ ownerId, ...data });
    res.json({ data: { bird } });
  } catch (err) {
    next(err);
  }
});

// List birds
router.get('/', async (req, res, next) => {
  try {
    const ownerId = req.ownerId;
    const { status, sex, breed, q, page = 1, limit = 20 } = req.query;
    if (!ownerId) return res.status(400).json({ error: { code: 'BAD_REQUEST', message: 'ownerId required' } });
    const filter = { ownerId };
    if (status) filter.status = status;
    if (sex) filter.sex = sex;
    if (breed) filter.breed = breed;
    if (q) filter.$or = [{ name: new RegExp(q, 'i') }, { tagId: new RegExp(q, 'i') }];
    const items = await Bird.find(filter)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .sort({ createdAt: -1 });
    const total = await Bird.countDocuments(filter);
    res.json({ data: { items, total }, meta: { page: Number(page), limit: Number(limit) } });
  } catch (err) {
    next(err);
  }
});

// Get by id
router.get('/:id', async (req, res, next) => {
  try {
    const bird = await Bird.findById(req.params.id);
    if (!bird) return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Bird not found' } });
    res.json({ data: { bird } });
  } catch (err) {
    next(err);
  }
});

// Patch
router.patch('/:id', async (req, res, next) => {
  try {
    const updates = req.body;
    const bird = await Bird.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!bird) return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Bird not found' } });
    res.json({ data: { bird } });
  } catch (err) {
    next(err);
  }
});

// Set parents
router.post('/:id/parents', async (req, res, next) => {
  try {
    const { sireId, damId } = req.body;
    const bird = await Bird.findByIdAndUpdate(
      req.params.id,
      { $set: { sireId: sireId || null, damId: damId || null } },
      { new: true }
    );
    if (!bird) return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Bird not found' } });
    res.json({ data: { bird } });
  } catch (err) {
    next(err);
  }
});

export default router;
