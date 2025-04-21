import React from 'react';
import { TableRow, TableCell, IconButton, TextField, Select, MenuItem } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

export default function AddBugRow({ onAdd, newBug, handleInputChange, setNewBug, setShowAddFields }) {
    return (
        <>
            <TableRow>
                <TableCell>
                    <TextField
                        placeholder="New Title"
                        value={newBug.Title}
                        onChange={(e) => handleInputChange('Title', e.target.value)}
                        fullWidth
                    />
                </TableCell>
                <TableCell>
                    <Select
                        value={newBug.Status}
                        onChange={(e) => handleInputChange('Status', e.target.value)}
                        fullWidth
                        displayEmpty
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
                            await onAdd(newBug);
                            setNewBug({ Title: '', Status: '', Severity: '' });
                            setShowAddFields(false);
                        }}
                    >
                        <CheckIcon />
                    </IconButton>
                    <IconButton
                        onClick={() => {
                            setNewBug({ Title: '', Status: '', Severity: '' });
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