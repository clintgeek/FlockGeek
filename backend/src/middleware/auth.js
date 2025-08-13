export function requireOwner(req, res, next) {
  const headerOwner = req.header('X-Owner-Id');
  const ownerId = headerOwner || req.body?.ownerId || req.query?.ownerId;
  if (!ownerId) {
    return res.status(400).json({ error: { code: 'BAD_REQUEST', message: 'ownerId missing (use X-Owner-Id header or include in request)' } });
  }
  req.ownerId = ownerId;
  next();
}
