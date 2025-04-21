import { table } from '../airtable';

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
            const updatedRecord = await table.update(id, fields);
            return res.status(200).json({ record: updatedRecord });
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