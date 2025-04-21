import { table } from '../airtable';

export default async function handleGet(req, res) {
    try {
        const records = await table.select().all();
        res.status(200).json({ records });
    } catch (error) {
        console.error('Error fetching bugs from Airtable:', error);
        res.status(500).json({ error: 'Error retrieving records from Airtable.' });
    }
}