import React, { useEffect, useState } from 'react';
import { api } from '../lib/api.js';
import { Typography, TextField, Button, Stack, Paper, List, ListItem, ListItemText, MenuItem } from '@mui/material';

const PURPOSES = ['brood','breeding_pen','growout','layer_flock','meat_run','quarantine','other'];

export default function GroupsPage() {
  const [groups, setGroups] = useState([]);
  const [form, setForm] = useState({ name: '', purpose: 'layer_flock' });

  async function load() {
    const items = await api.listGroups();
    setGroups(items);
  }

  useEffect(() => { load(); }, []);

  async function onCreate(e) {
    e.preventDefault();
    if (!form.name) return;
    await api.createGroup({ name: form.name, purpose: form.purpose });
    setForm({ name: '', purpose: 'layer_flock' });
    load();
  }

  return (
    <Stack spacing={2}>
      <Typography variant="h5">Groups</Typography>
      <Paper sx={{ p: 2 }}>
        <form onSubmit={onCreate}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <TextField select label="Purpose" value={form.purpose} onChange={(e) => setForm({ ...form, purpose: e.target.value })}>
              {PURPOSES.map(p => <MenuItem key={p} value={p}>{p}</MenuItem>)}
            </TextField>
            <Button type="submit" variant="contained">Add</Button>
          </Stack>
        </form>
      </Paper>
      <Paper>
        <List dense>
          {groups.map((g) => (
            <ListItem key={g._id} divider>
              <ListItemText primary={`${g.name}`} secondary={`${g.purpose}`} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Stack>
  );
}
