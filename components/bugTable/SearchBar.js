import { TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';


export default function SearchBar({ search, handleSearch, handleClearSearch }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
            <TextField
                label="Search"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                fullWidth
                margin="normal"
                slotProps={{
                    input: {
                        endAdornment: (
                            <IconButton onClick={handleClearSearch}>
                                {search ? <ClearIcon /> : <SearchIcon />}
                            </IconButton>
                        ),
                    }
                }}
            />
        </div>
    );
}