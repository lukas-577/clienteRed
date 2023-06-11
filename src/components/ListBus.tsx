import { Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import { IBusData } from '../interfaces/busData.interface';

export const ListBus = (busList: IBusData[]) => {

    if (busList.length === 0) {
        return null;
    }

    return (
        <>
            <Grid container spacing={12}>
                {busList.map((bus) => (
                    <Grid item key={bus.bus} xs={12} sm={6} md={4} lg={4}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                            <Paper elevation={3} style={{ borderRadius: '50px', padding: '20px', backgroundColor: "#cddc39" }}>
                                <DirectionsBusIcon fontSize="large" />
                                <h4>{bus.bus}</h4>
                                <h5>{bus.seDirige}</h5>
                                <h6>{bus.DesvioPlanificado}</h6>
                                <h6>{bus.tiempoEstimado}</h6>
                            </Paper>
                        </Box>
                    </Grid>
                ))}:
            </Grid>
        </>

    )



}