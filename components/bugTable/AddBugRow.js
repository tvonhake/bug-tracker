import React, { useEffect, useState } from 'react';
import { TableRow, TableCell, IconButton, TextField, Select, MenuItem } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

export default function AddBugRow({ onAdd, newBug, handleInputChange, setNewBug, setShowAddFields, bugs }) {
    const [nextBugId, setNextBugId] = useState('');

    useEffect(() => {
        if (bugs.length > 0) {
            const highestBugId = bugs.reduce((max, bug) => {
                const bugIdNumber = parseInt(bug.fields['Bug ID'].replace('BUG-', ''), 10);
                return bugIdNumber > max ? bugIdNumber : max;
            }, 0);

            const newIdNumber = highestBugId + 1;
            setNextBugId(`BUG-${String(newIdNumber).padStart(3, '0')}`);
        } else {
            setNextBugId('BUG-001');
        }
    }, [bugs]);

    return (
        <>
            <TableRow sx={{ height: '56px' }}>
                <TableCell>
                    {nextBugId}
                </TableCell>
                <TableCell>
                    <TextField
                        placeholder="New Title"
                        value={newBug.Title}
                        onChange={(e) => handleInputChange('Title', e.target.value)}
                        fullWidth
                        variant="standard"
                    />
                </TableCell>
                <TableCell>
                    <TextField
                        placeholder="New Description"
                        value={newBug.Description}
                        onChange={(e) => handleInputChange('Description', e.target.value)}
                        fullWidth
                        multiline
                        variant="standard"
                    />
                </TableCell>
                <TableCell>
                    <TextField
                        type="date"
                        value={newBug['Reported Date'] || ''}
                        onChange={(e) => handleInputChange('Reported Date', e.target.value)}
                        fullWidth
                        variant="standard"
                    />
                </TableCell>
                <TableCell>
                    <Select
                        value={newBug.Status}
                        onChange={(e) => handleInputChange('Status', e.target.value)}
                        fullWidth
                        displayEmpty
                        variant="standard"
                    >
                        <MenuItem value="" disabled>
                            Select Status
                        </MenuItem>
                        <MenuItem value="Open">Open</MenuItem>
                        <MenuItem value="In Progress">In Progress</MenuItem>
                        <MenuItem value="Resolved">Resolved</MenuItem>
                        <MenuItem value="Closed">Closed</MenuItem>
                    </Select>
                </TableCell>
                <TableCell>
                    <Select
                        value={newBug.Severity}
                        onChange={(e) => handleInputChange('Severity', e.target.value)}
                        fullWidth
                        displayEmpty
                        variant="standard"
                    >
                        <MenuItem value="" disabled>
                            Select Severity
                        </MenuItem>
                        <MenuItem value="Critical">Critical</MenuItem>
                        <MenuItem value="High">High</MenuItem>
                        <MenuItem value="Medium">Medium</MenuItem>
                        <MenuItem value="Low">Low</MenuItem>
                    </Select>
                </TableCell>
                <TableCell>
                    <IconButton
                        onClick={async () => {
                            const updatedBug = { ...newBug, 'Bug ID': nextBugId };
                            console.log('Updated newBug with Bug ID:', updatedBug);

                            await onAdd(updatedBug);

                            setNewBug({ 'Bug ID': '', Title: '', Description: '', 'Reported Date': '', Status: '', Severity: '' });
                            setShowAddFields(false);
                        }}
                    >
                        <CheckIcon />
                    </IconButton>
                    <IconButton
                        onClick={() => {
                            setNewBug({ 'Bug ID': nextBugId, Title: '', Description: '', 'Reported Date': '', Status: '', Severity: '' });
                            setShowAddFields(false);
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
        </>
    );
}