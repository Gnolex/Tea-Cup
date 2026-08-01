const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public'), {
  // The scroll-driven frame extractor needs byte-range requests for the mp4
  acceptRanges: true,
  setHeaders(res, filePath) {
    if (filePath.endsWith('.mp4')) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
  }
}));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

app.listen(3000, () => console.log('Gnolex AI running at http://localhost:3000'));
