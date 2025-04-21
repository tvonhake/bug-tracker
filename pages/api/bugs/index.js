import handleGet from './get';
import handlePost from './post';

const methodHandlers = {
    GET: handleGet, // Handles fetching all bugs
    POST: handlePost, // Handles creating a new bug
};

export default async function handler(req, res) {
    const handler = methodHandlers[req.method];

    if (handler) {
        return handler(req, res);
    } else {
        res.setHeader('Allow', Object.keys(methodHandlers));
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}