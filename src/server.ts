import express, { Request, Response } from 'express';

const app = express();
const port = process.env.PORT || 3000;

// Mock data
let activeUsers = 50;
let totalTokens = 1000;

app.get('/api/activeUsers', (req: Request, res: Response) => {
  // TODO: Replace the mock data with actual data fetched from your database
  res.json({ activeUsers });
});

app.get('/api/totalTokens', (req: Request, res: Response) => {
  // TODO: Replace the mock data with actual data fetched from your database
  res.json({ totalTokens });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
