import express from 'express';
import { startTest } from './endeca.mjs';
import {main} from './main.mjs'

const app = express();
const port = 3000;

// Middleware to parse JSON body
app.use(express.json());

//Test all query in endeca-query.json
app.get('/api/test/all', async (req, res) => {
  try {
     await main();
     res.json("Completed All Test");
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//Test only one query 
app.post('/api/test', async (req, res) => {
    const { query } = req.body;
    if (!query) return res.status(400).json({ error: 'Query is required' });
  
    try {
        const result = await startTest(query);
        res.json(result);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
