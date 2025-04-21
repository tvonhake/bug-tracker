import Airtable from 'airtable';

const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_TABLE_NAME } = process.env;

if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID || !AIRTABLE_TABLE_NAME) {
    throw new Error('Missing Airtable configuration.');
}

Airtable.configure({
    apiKey: AIRTABLE_API_KEY,
    endpointUrl: 'https://api.airtable.com',
});

export const base = Airtable.base(AIRTABLE_BASE_ID);
export const table = base(AIRTABLE_TABLE_NAME);