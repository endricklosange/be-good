import { query } from '../../lib/db';
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler (_req: NextApiRequest, res: NextApiResponse) {
  try {
    const results = await query('SELECT * FROM events', []);
    res.status(200).json(results);
  } catch (error) {
    if(error) throw error;
  }
}
