import { Select, MenuItem, Button } from '@mui/material';

export default function FilterMenu({ filterStatus, filterSeverity, setFilterStatus, setFilterSeverity, handleFilter, handleClearFilters }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
            <Select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                displayEmpty
                style={{ marginRight: '16px', minWidth: '150px' }}
            >
                <MenuItem value="">Filter by Status</MenuItem>
                <MenuItem value="Open">Open</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Resolved">Resolved</MenuItem>
                <MenuItem value="Closed">Closed</MenuItem>
            </Select>
            <Select
                value={filterSeverity}
                onChange={(e) => setFilterSeverity(e.target.value)}
                displayEmpty
                style={{ marginRight: '16px', minWidth: '150px' }}
            >
                <MenuItem value="">Filter by Severity</MenuItem>
                <MenuItem value="Critical">Critical</MenuItem>
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
            </Select>
            <Button onClick={handleFilter} variant="contained" color="primary" style={{ marginRight: '8px' }}>
                Apply Filters
            </Button>
            <Button onClick={handleClearFilters} variant="outlined" color="secondary">
                Clear Filters
            </Button>
        </div>
    )
}