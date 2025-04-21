import { table } from '../airtable';
import axios from 'axios';

export default async function handler(req, res) {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ error: 'Bug ID is required.' });
    }

    try {
        if (req.method === 'PATCH') {
            const { fields } = req.body;
            if (!fields) {
                return res.status(400).json({ error: 'Fields are required for updating.' });
            }

            const airtableApiUrl = `https://api.airtable.com/v0/appiN5YQubFNexMWb/Bugs`;
            const airtableApiKey = process.env.AIRTABLE_API_KEY;
            const response = await axios.patch(
                airtableApiUrl,
                {
                    records: [
                        {
                            id: id,
                            fields: fields,
                        },
                    ],
                },
                {
                    headers: {
                        Authorization: `Bearer ${airtableApiKey}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            return res.status(200).json({ record: response.data.records[0] });
        }

        if (req.method === 'DELETE') {
            await table.destroy(id);
            return res.status(200).json({ message: 'Bug deleted successfully.' });
        }

        res.setHeader('Allow', ['PATCH', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    } catch (error) {
        console.error(`Error handling ${req.method} request for bug ID ${id}:`, error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}