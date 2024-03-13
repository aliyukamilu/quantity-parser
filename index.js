const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: "Hello world" });
})

app.post('/duplicate', (req, res) => {
  try {
    const data = req.body;

    if (!data || !Array.isArray(data)) {
      return res.status(400).json({ error: 'Invalid input format' });
    }

    let duplicatedArray = [];
    data.forEach(obj => {
      if (!obj.quantity || typeof obj.quantity !== 'number' || obj.quantity < 1) {
        return res.status(400).json({ error: 'Invalid quantity value' });
      }

      for (let i = 0; i < obj.quantity; i++) {
        duplicatedArray.push({ ...obj });
      }
    });

    res.json({ duplicatedArray });
  } catch (error) {
    console.log(error)
  }

});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
