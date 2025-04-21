import { Container, Typography, Button } from '@mui/material';
import BugTable from '../components/bugTable';

export default function Home() {
    return (
        <Container maxWidth={false} sx={{ width: '100%' }}>
            <Typography variant="h4" gutterBottom>Bug Tracker</Typography>
            <BugTable />
        </Container>
    );
}