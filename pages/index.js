import { Container, Typography, Button } from '@mui/material';
import BugTable from '../components/bugTable';

export default function Home() {
    return (
        <Container>
            <Typography variant="h4" gutterBottom>Bug Tracker</Typography>
            <BugTable />
        </Container>
    );
}