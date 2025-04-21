import { Typography, Table, TableHead, TableBody, TableRow, TableCell, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import axios from 'axios';
import BugTableRow from './BugTableRow';
import AddBugRow from './AddBugRow';

export default function BugTable() {
    const [bugs, setBugs] = useState([]);
    const [search, setSearch] = useState('');
    const [showAddFields, setShowAddFields] = useState(false);
    const [newBug, setNewBug] = useState({ Title: '', Status: '', Severity: '' });

    useEffect(() => {
        fetchBugs();
    }, []);

    const fetchBugs = async () => {
        try {
            const res = await axios.get('/api/bugs');
            setBugs(res.data.records);
        } catch (err) {
            console.error('Error fetching bugs:', err);
        }
    };

    const handleAdd = async () => {
        try {
            const bugToAdd = { fields: { Title: newBug.Title, Status: newBug.Status, Severity: newBug.Severity } };
            const res = await axios.post('/api/bugs', bugToAdd);
            setBugs([...bugs, res.data.record]);
        } catch (err) {
            console.error('Error adding bug:', err);
        }
    }

    const handleInputChange = (field, value) => {
        setNewBug({ ...newBug, [field]: value });
    };

    const handleEdit = async (id, updatedBug) => {
        try {
            const res = await axios.patch(`/api/bugs/${id}`, { fields: updatedBug.fields });
            setBugs(bugs.map((bug) => (bug.id === id ? res.data.record : bug)));
        } catch (err) {
            console.error('Error editing bug:', err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/bugs/${id}`);
            setBugs(bugs.filter((bug) => bug.id !== id));
        } catch (err) {
            console.error('Error deleting bug:', err);
        }
    };

    return (
        <>
            <TextField
                label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                fullWidth
                margin="normal"
            />
            <Typography variant="h5" gutterBottom>Bugs</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Severity</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {bugs.map((bug) => (
                        <BugTableRow
                            bug={bug}
                            key={bug.id}
                            onEdit={(updatedBug) => handleEdit(bug.id, updatedBug)}
                            onDelete={() => handleDelete(bug.id)}
                        />
                    ))}
                    {showAddFields && (
                        <AddBugRow
                            onAdd={handleAdd}
                            newBug={newBug}
                            handleInputChange={handleInputChange}
                            setNewBug={setNewBug}
                            setShowAddFields={setShowAddFields}
                        />
                    )}
                </TableBody>
            </Table>
            <IconButton onClick={() => setShowAddFields(!showAddFields)}>
                {showAddFields ? <></> : <AddIcon />}
            </IconButton>
        </>
    );
}