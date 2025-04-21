import { table } from '../airtable';

export default async function handlePost(req, res) {
    const { fields } = req.body;

    if (!fields) {
        return res.status(400).json({ error: 'Fields are required for creating a record.' });
    }

    try {
        const newRecord = await table.create(fields);
        res.status(200).json({ record: newRecord });
    } catch (error) {
        console.error('Error creating record in Airtable:', error);
        res.status(500).json({ error: 'Error creating record in Airtable.' });
    }
}