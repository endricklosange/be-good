import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../lib/db';
import { RowDataPacket } from 'mysql2';

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
    try {
        const results = await query('SELECT * FROM events', []) as RowDataPacket[];
        let csv: string= "";
        results.forEach((row : RowDataPacket) => {
            csv += `${row.title};${row.participant};${row.location};${row.start_at};${row.end_at};${row.start_time};${row.end_time};${row.description}\n`;
        });
        return res.json(JSON.stringify(csv));
    } catch (error) {
        if (error) throw error;
    }        
}