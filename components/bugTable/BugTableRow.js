import React, { useState } from 'react';
import { TableRow, TableCell, IconButton, TextField, Select, MenuItem, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

export default function BugTableRow({ bug, onEdit, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedBug, setEditedBug] = useState({ ...bug.fields });

    const handleInputChange = (field, value) => {
        setEditedBug((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        onEdit({ id: bug.id, fields: editedBug });
        setIsEditing(false);
    };

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleDelete = () => {
        onDelete(bug.id);
        setIsDeleteModalOpen(false);
    };

    const handleOpenDeleteModal = () => {
        setIsDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    return (
        <>
            <Dialog
                open={isDeleteModalOpen}
                onClose={handleCloseDeleteModal}
            >
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this bug? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteModal} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
            <TableRow>
                {isEditing ? (
                    <>
                        <TableCell>{bug.fields['Bug ID']}</TableCell>
                        <TableCell>
                            <TextField
                                value={editedBug.Title}
                                onChange={(e) => handleInputChange('Title', e.target.value)}
                                fullWidth
                            />
                        </TableCell>
                        <TableCell>
                            <TextField
                                value={editedBug.Description}
                                onChange={(e) => handleInputChange('Description', e.target.value)}
                                fullWidth
                                multiline
                            />
                        </TableCell>
                        <TableCell>
                            <TextField
                                type="date"
                                value={editedBug['Reported Date']}
                                onChange={(e) => handleInputChange('Reported Date', e.target.value)}
                                fullWidth
                            />
                        </TableCell>
                        <TableCell>
                            <Select
                                value={editedBug.Status}
                                onChange={(e) => handleInputChange('Status', e.target.value)}
                                fullWidth
                            >
                                <MenuItem value="Open">Open</MenuItem>
                                <MenuItem value="In Progress">In Progress</MenuItem>
                                <MenuItem value="Resolved">Resolved</MenuItem>
                                <MenuItem value="Closed">Closed</MenuItem>
                            </Select>
                        </TableCell>
                        <TableCell>
                            <Select
                                value={editedBug.Severity}
                                onChange={(e) => handleInputChange('Severity', e.target.value)}
                                fullWidth
                            >
                                <MenuItem value="Critical">Critical</MenuItem>
                                <MenuItem value="High">High</MenuItem>
                                <MenuItem value="Medium">Medium</MenuItem>
                                <MenuItem value="Low">Low</MenuItem>
                            </Select>
                        </TableCell>
                    </>
                ) : (
                    <>
                        <TableCell>{bug.fields['Bug ID']}</TableCell>
                        <TableCell>{bug.fields.Title}</TableCell>
                        <TableCell>
                            <Typography
                                noWrap
                                title={bug.fields.Description} // Tooltip to show the full description on hover
                                sx={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    maxWidth: '200px', // Adjust the width as needed
                                }}
                            >
                                {bug.fields.Description}
                            </Typography>
                        </TableCell>
                        <TableCell>{bug.fields['Reported Date']}</TableCell>
                        <TableCell>{bug.fields.Status}</TableCell>
                        <TableCell>{bug.fields.Severity}</TableCell>
                    </>
                )}
                <TableCell>
                    {isEditing ? (
                        <>
                            <IconButton onClick={handleSave}><CheckIcon /></IconButton>
                            <IconButton onClick={() => setIsEditing(false)}><CloseIcon /></IconButton>
                        </>
                    ) : (
                        <>
                            <IconButton onClick={() => setIsEditing(true)}><EditIcon /></IconButton>
                            <IconButton onClick={() => handleOpenDeleteModal(bug.id)}><DeleteIcon /></IconButton>
                        </>
                    )}
                </TableCell>
            </TableRow>
        </>
    );
}