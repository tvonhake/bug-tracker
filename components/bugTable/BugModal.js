import React, { useState } from 'react';
import { Modal, Box, Typography, Button, Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Select, MenuItem } from '@mui/material';
import TextField from '@mui/material/TextField';

export default function BugModal({ isOpen, onClose, bug, onEdit, onDelete }) {
    const [editableBug, setEditableBug] = useState(bug.fields);
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleInputChange = (field, value) => {
        setEditableBug({ ...editableBug, [field]: value });
    };

    const handleSave = () => {
        onEdit({ id: bug.id, fields: editableBug });
        setIsEditing(false);
    };

    const handleOpenDeleteModal = () => {
        setIsDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    const handleConfirmDelete = () => {
        onDelete(bug.id);
        setIsDeleteModalOpen(false);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <Modal open={isOpen} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 500,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                }}
            >

                {isEditing ? (
                    <TextField
                        fullWidth
                        name="Title"
                        value={editableBug.Title}
                        onChange={(e) => handleInputChange('Title', e.target.value)}
                        variant="outlined"
                        label="Title"
                        sx={{ mb: 2 }}
                    />
                ) : (
                    <Typography variant="h5" component="h2" gutterBottom>
                        {editableBug.Title}
                    </Typography>
                )}

                <Typography variant="subtitle2" gutterBottom paddingBottom={1}>
                    <strong>Bug ID:</strong> {bug.fields['Bug ID']}
                </Typography>

                {isEditing ? (
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography variant="subtitle2" gutterBottom>
                                Status
                            </Typography>
                            <Select
                                fullWidth
                                value={editableBug.Status}
                                onChange={(e) => handleInputChange('Status', e.target.value)}
                                displayEmpty
                            >
                                <MenuItem value="Open">Open</MenuItem>
                                <MenuItem value="In Progress">In Progress</MenuItem>
                                <MenuItem value="Resolved">Resolved</MenuItem>
                                <MenuItem value="Closed">Closed</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle2" gutterBottom>
                                Severity
                            </Typography>
                            <Select
                                fullWidth
                                value={editableBug.Severity}
                                onChange={(e) => handleInputChange('Severity', e.target.value)}
                                displayEmpty
                            >
                                <MenuItem value="Critical">Critical</MenuItem>
                                <MenuItem value="High">High</MenuItem>
                                <MenuItem value="Medium">Medium</MenuItem>
                                <MenuItem value="Low">Low</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle2" gutterBottom>
                                Description
                            </Typography>
                            <TextField
                                fullWidth
                                name="Description"
                                value={editableBug.Description}
                                onChange={(e) => handleInputChange('Description', e.target.value)}
                                multiline
                                rows={4}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle2" gutterBottom>
                                Reported Date
                            </Typography>
                            <TextField
                                fullWidth
                                type="date"
                                name="Reported Date"
                                value={editableBug['Reported Date']}
                                onChange={(e) => handleInputChange('Reported Date', e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                ) : (
                    <>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="body2">
                                    <strong>Status:</strong> {editableBug.Status}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2">
                                    <strong>Severity:</strong> {editableBug.Severity}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Typography variant="body2" sx={{ mt: 2 }}>
                            <strong>Description:</strong> {editableBug.Description}
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 2 }}>
                            <strong>Reported Date:</strong> {editableBug['Reported Date']}
                        </Typography>
                    </>
                )}

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        mt: 3,
                    }}
                >
                    {isEditing ? (
                        <>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSave}
                                sx={{ mr: 1 }}
                            >
                                Save
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={() => setIsEditing(false)}
                                sx={{ mr: 1 }}
                            >
                                Cancel
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => setIsEditing(true)}
                                sx={{ mr: 1 }}
                            >
                                Edit
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={handleOpenDeleteModal}
                                sx={{ mr: 1 }}
                            >
                                Delete
                            </Button>
                        </>
                    )}
                    <Button variant="outlined" onClick={onClose}>
                        Close
                    </Button>
                </Box>

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
                        <Button onClick={handleConfirmDelete} color="error">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Modal>
    );
}