import React, { useEffect, useState } from 'react';
import { api } from '../lib/api.js';
import { Typography, TextField, Button, Stack, Paper, List, ListItem, ListItemText } from '@mui/material';

export default function BirdsPage() {
  const [birds, setBirds] = useState([]);
  const [form, setForm] = useState({ tagId: '', name: '' });
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const items = await api.listBirds();
      setBirds(items);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function onCreate(e) {
    e.preventDefault();
    if (!form.tagId) return;
    await api.createBird({ tagId: form.tagId, name: form.name || undefined, sex: 'hen' });
    setForm({ tagId: '', name: '' });
    load();
  }

  return (
    <Stack spacing={2}>
      <Typography variant="h5">Birds</Typography>
      <Paper sx={{ p: 2 }}>
        <form onSubmit={onCreate}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField label="Tag ID" value={form.tagId} onChange={(e) => setForm({ ...form, tagId: e.target.value })} required />
            <TextField label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <Button type="submit" variant="contained">Add</Button>
          </Stack>
        </form>
      </Paper>
      <Paper>
        <List dense>
          {birds.map((b) => (
            <ListItem key={b._id} divider>
              <ListItemText primary={`${b.tagId}${b.name ? ' — ' + b.name : ''}`} secondary={`${b.sex || 'unknown'} • ${b.breed || ''}`} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Stack>
  );
}
