import { Typography, Table, TableHead, TableBody, TableRow, TableCell, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useEffect, useState } from 'react';
import axios from 'axios';
import BugTableRow from './BugTableRow';
import AddBugRow from './AddBugRow';
import SearchBar from './SearchBar';
import BugModal from './BugModal';

export default function BugTable() {
    const [bugs, setBugs] = useState([]);
    const [sortedBugs, setSortedBugs] = useState([]);
    const [search, setSearch] = useState('');
    const [showAddFields, setShowAddFields] = useState(false);
    const [newBug, setNewBug] = useState({ 'Bug ID': '', Title: '', Description: '', 'Reported Date': '', Status: '', Severity: '' });
    const [sortField, setSortField] = useState('Bug ID');
    const [sortDirection, setSortDirection] = useState('asc');
    const [selectedBug, setSelectedBug] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchBugs();
    }, []);

    const fetchBugs = async () => {
        try {
            const res = await axios.get('/api/bugs');
            const fetchedBugs = res.data.records;

            setBugs(fetchedBugs);
            handleSort('Bug ID', 'asc', fetchedBugs);
        } catch (err) {
            console.error('Error fetching bugs:', err);
        }
    };

    const handleAdd = async (bugToAdd) => {
        try {
            const bugToSend = { fields: { ...bugToAdd } };
            const res = await axios.post('/api/bugs', bugToSend);
            const updatedBugs = [...bugs, res.data.record];
            setBugs(updatedBugs);
            handleSort(sortField, sortDirection, updatedBugs);
        } catch (err) {
            console.error('Error adding bug:', err);
        }
    };

    const handleInputChange = (field, value) => {
        setNewBug({ ...newBug, [field]: value });
    };

    const handleEdit = async (id, updatedBug) => {
        try {
            const res = await axios.patch(`/api/bugs/${id}`, { fields: updatedBug.fields });
            const updatedBugs = bugs.map((bug) => (bug.id === id ? res.data.record : bug));
            setBugs(updatedBugs);
            handleSort(sortField, sortDirection, updatedBugs);
        } catch (err) {
            console.error('Error editing bug:', err);
        }
    };

    const handleDelete = async (id) => {
        try {
            const updatedBugs = bugs.filter((bug) => bug.id !== id);
            await axios.delete(`/api/bugs/${id}`);
            setBugs(updatedBugs);
            handleSort(sortField, sortDirection, updatedBugs);
        } catch (err) {
            console.error('Error deleting bug:', err);
        }
    };

    const handleSearch = (value) => {
        setSearch(value);

        if (typeof value === 'string' && value.trim() !== '') {
            const filtered = bugs.filter((bug) =>
                bug.fields.Title && bug.fields.Title.toLowerCase().includes(value.toLowerCase())
            );
            handleSort(sortField, sortDirection, filtered);
        } else {
            handleSort(sortField, sortDirection, bugs);
        }
    };

    const handleClearSearch = () => {
        setSearch('');
        handleSort(sortField, sortDirection, bugs);
    };

    const handleSort = (field, direction = null, list = bugs) => {
        const newDirection = direction || (sortField === field && sortDirection === 'asc' ? 'desc' : 'asc');

        setSortField(field);
        setSortDirection(newDirection);

        const severityOrder = ['Low', 'Medium', 'High', 'Critical'];

        const sorted = [...list].sort((a, b) => {
            if (field === 'Bug ID') {
                const aId = parseInt(a.fields['Bug ID'].replace('BUG-', ''), 10);
                const bId = parseInt(b.fields['Bug ID'].replace('BUG-', ''), 10);
                return newDirection === 'asc' ? aId - bId : bId - aId;
            } else if (field === 'Severity') {
                const aIndex = severityOrder.indexOf(a.fields.Severity);
                const bIndex = severityOrder.indexOf(b.fields.Severity);
                return newDirection === 'asc' ? aIndex - bIndex : bIndex - aIndex;
            } else if (field === 'Reported Date') {
                const dateA = new Date(a.fields['Reported Date']);
                const dateB = new Date(b.fields['Reported Date']);
                return newDirection === 'asc' ? dateA - dateB : dateB - dateA;
            } else {
                if (a.fields[field] < b.fields[field]) return newDirection === 'asc' ? -1 : 1;
                if (a.fields[field] > b.fields[field]) return newDirection === 'asc' ? 1 : -1;
                return 0;
            }
        });

        setSortedBugs(sorted);
    };

    const getSortIcon = (field) => {
        if (sortField === field) {
            return sortDirection === 'asc' ? <KeyboardArrowUpIcon fontSize="small" /> : <KeyboardArrowDownIcon fontSize="small" />;
        }
        return null;
    };

    const handleOpenModal = (bug) => {
        setSelectedBug(bug);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedBug(null);
        setIsModalOpen(false);
    };

    return (
        <>
            <SearchBar
                search={search}
                handleSearch={handleSearch}
                handleClearSearch={handleClearSearch}
            />
            <Typography variant="h5" gutterBottom>Bugs</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell onClick={() => handleSort('Bug ID')} style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span>Bug ID</span>
                                {getSortIcon('Bug ID')}
                            </div>
                        </TableCell>
                        <TableCell onClick={() => handleSort('Title')} style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span>Title</span>
                                {getSortIcon('Title')}
                            </div>
                        </TableCell>
                        <TableCell onClick={() => handleSort('Description')} style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span>Description</span>
                                {getSortIcon('Description')}
                            </div>
                        </TableCell>
                        <TableCell onClick={() => handleSort('Reported Date')} style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span>Reported Date</span>
                                {getSortIcon('Reported Date')}
                            </div>
                        </TableCell>
                        <TableCell onClick={() => handleSort('Status')} style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span>Status</span>
                                {getSortIcon('Status')}
                            </div>
                        </TableCell>
                        <TableCell onClick={() => handleSort('Severity')} style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span>Severity</span>
                                {getSortIcon('Severity')}
                            </div>
                        </TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedBugs.map((bug) => (
                        <BugTableRow
                            bug={bug}
                            key={bug.id}
                            onEdit={(updatedBug) => handleEdit(bug.id, updatedBug)}
                            onDelete={() => handleDelete(bug.id)}
                            onRowClick={() => handleOpenModal(bug)}
                        />
                    ))}
                    {showAddFields && (
                        <AddBugRow
                            onAdd={handleAdd}
                            newBug={newBug}
                            handleInputChange={handleInputChange}
                            setNewBug={setNewBug}
                            setShowAddFields={setShowAddFields}
                            bugs={bugs}
                        />
                    )}
                </TableBody>
            </Table>

            <IconButton onClick={() => setShowAddFields(!showAddFields)} style={{ marginTop: '16px' }}>
                {showAddFields ? <CloseIcon /> : <AddIcon />}
            </IconButton>

            {selectedBug && (
                <BugModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    bug={selectedBug}
                    onEdit={(updatedBug) => handleEdit(selectedBug.id, updatedBug)}
                    onDelete={(bugId) => handleDelete(bugId)}
                />
            )}
        </>
    );
}