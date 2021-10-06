import { Button, Grid, IconButton, Paper, Rating, Typography } from '@material-ui/core'
import { Box } from '@material-ui/system'
import { Close } from "@material-ui/icons"
import img from '../img/youtube.png'

export default function Modal({handleCloseModal, film}) {
    return <>
        <Paper elevation={6}>
            <Box  p={3} position='relative'>
                <Grid container direction='column' justifyContent='space-around' alignItems='center'>
                    <Typography mt={3} variant='h5'>Hello!</Typography>
                    <Typography mt={3} gutterBottom color='gray' variant='p'>{`You chosen a movie "${film?.label}", have a nice watching`}</Typography>
                    {film && <Rating
                            readOnly
                            precision={0.5}
                            name="stars"
                            value={film.rating}
                            max={10}
                    />}

                    <Box mt={5} px={10} >
                        <img src={img} alt="img youtube player"/>
                    </Box>
                    
                    <Box mt={5} width={180}>
                        <Button fullWidth  onClick={handleCloseModal} variant="contained">OK</Button>
                    </Box>
                </Grid>
                <IconButton
                    onClick={handleCloseModal}
                    style={{ position: 'absolute', top: 10, right: 10, zIndex:10 }}
                >
                        <Close/>
                </IconButton>
            </Box>
        </Paper>
    </>
}
