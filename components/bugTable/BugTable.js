import { Typography, Table, TableHead, TableBody, TableRow, TableCell, IconButton, TextField, InputAdornment, Select, MenuItem, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useEffect, useState } from 'react';
import axios from 'axios';
import BugTableRow from './BugTableRow';
import AddBugRow from './AddBugRow';
import SearchBar from './SearchBar';
import FilterMenu from './FilterMenu';

export default function BugTable() {
    const [bugs, setBugs] = useState([]);
    const [filteredBugs, setFilteredBugs] = useState([]);
    const [sortedBugs, setSortedBugs] = useState([]);
    const [search, setSearch] = useState('');
    const [showAddFields, setShowAddFields] = useState(false);
    const [newBug, setNewBug] = useState({ Title: '', Status: '', Severity: '' });
    const [sortField, setSortField] = useState('Title');
    const [sortDirection, setSortDirection] = useState('asc');
    const [filterStatus, setFilterStatus] = useState('');
    const [filterSeverity, setFilterSeverity] = useState('');

    useEffect(() => {
        fetchBugs();
    }, []);

    const fetchBugs = async () => {
        try {
            const res = await axios.get('/api/bugs');
            const fetchedBugs = res.data.records;

            setBugs(fetchedBugs);
            setFilteredBugs(fetchedBugs);
            setSortedBugs(fetchedBugs);
        } catch (err) {
            console.error('Error fetching bugs:', err);
        }
    };

    const handleAdd = async () => {
        try {
            const bugToAdd = { fields: { Title: newBug.Title, Status: newBug.Status, Severity: newBug.Severity } };
            const res = await axios.post('/api/bugs', bugToAdd);
            const updatedBugs = [...bugs, res.data.record];
            setBugs(updatedBugs);
            setFilteredBugs(updatedBugs);
            setSortedBugs(updatedBugs);
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
            setFilteredBugs(updatedBugs);
            setSortedBugs(updatedBugs);
        } catch (err) {
            console.error('Error editing bug:', err);
        }
    };

    const handleDelete = async (id) => {
        try {
            const updatedBugs = bugs.filter((bug) => bug.id !== id);
            await axios.delete(`/api/bugs/${id}`);
            setBugs(updatedBugs);
            setFilteredBugs(updatedBugs);
            setSortedBugs(updatedBugs);
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
            setFilteredBugs(filtered);
            setSortedBugs(filtered);
        } else {
            setFilteredBugs(bugs);
            setSortedBugs(bugs);
        }
    };

    const handleClearSearch = () => {
        setSearch('');
        setFilteredBugs(bugs);
        setSortedBugs(bugs);
    };

    const handleSort = (field) => {
        const direction = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
        setSortField(field);
        setSortDirection(direction);

        const severityOrder = ['Low', 'Medium', 'High', 'Critical'];

        const sorted = [...filteredBugs].sort((a, b) => {
            if (field === 'Severity') {
                const aIndex = severityOrder.indexOf(a.fields.Severity);
                const bIndex = severityOrder.indexOf(b.fields.Severity);
                return direction === 'asc' ? aIndex - bIndex : bIndex - aIndex;
            } else {
                if (a.fields[field] < b.fields[field]) return direction === 'asc' ? -1 : 1;
                if (a.fields[field] > b.fields[field]) return direction === 'asc' ? 1 : -1;
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

    const handleFilter = (status, severity) => {
        let filtered = [...bugs];

        if (status) {
            filtered = filtered.filter((bug) => bug.fields.Status === status);
        }

        if (severity) {
            filtered = filtered.filter((bug) => bug.fields.Severity === severity);
        }

        setFilteredBugs(filtered);
        setSortedBugs(filtered);
    };

    const handleClearFilters = () => {
        setFilterStatus('');
        setFilterSeverity('');
        setFilteredBugs(bugs);
        setSortedBugs(bugs);
    };

    return (
        <>
            <SearchBar
                search={search}
                handleSearch={handleSearch}
                handleClearSearch={handleClearSearch}
            />
            <FilterMenu
                filterStatus={filterStatus}
                filterSeverity={filterSeverity}
                setFilterStatus={setFilterStatus}
                setFilterSeverity={setFilterSeverity}
                handleFilter={() => handleFilter(filterStatus, filterSeverity)}
                handleClearFilters={handleClearFilters}
            />
            <Typography variant="h5" gutterBottom>Bugs</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell onClick={() => handleSort('Title')} style={{ cursor: 'pointer' }}>
                            Title {getSortIcon('Title')}
                        </TableCell>
                        <TableCell onClick={() => handleSort('Status')} style={{ cursor: 'pointer' }}>
                            Status {getSortIcon('Status')}
                        </TableCell>
                        <TableCell onClick={() => handleSort('Severity')} style={{ cursor: 'pointer' }}>
                            Severity {getSortIcon('Severity')}
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

            <IconButton onClick={() => setShowAddFields(!showAddFields)} style={{ marginTop: '16px' }}>
                {showAddFields ? <CloseIcon /> : <AddIcon />}
            </IconButton>
        </>
    );
}