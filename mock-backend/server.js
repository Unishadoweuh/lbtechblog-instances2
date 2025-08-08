const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

app.get('/api/virtual-machines', (req, res) => {
  res.json([{ id: 1, name: 'vm1', status: 'running' }]);
});

app.listen(port, () => {
  console.log(`Mock backend listening on port ${port}`);
});
