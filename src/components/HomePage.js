import {
  Backdrop,
  Grid,
  Box,
  Paper,
  Autocomplete,
  TextField,
  InputLabel,
  Select,
  FormControl,
  MenuItem,
  Rating
} from '@material-ui/core';
import { useEffect, useState } from 'react'
import Modal from './Modal';
import films from '../data/films.json'

export default function HomePage () {

  const [modal, setModal] = useState(false);
  const [film, setFilm] = useState({});
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState("");
  const [showingFilms, setShowingFilms] = useState(films);

  const handleChangeGenre = (event) => {
    setGenre(event.target.value);
  };

  const handleChangeRating = (event) => {
    setRating(event.target.value);
  };
  
  const handleCloseModal = () => {
    setModal(false);
  }

  const onBackdropClick = (e) => {
    if (e.target === e.currentTarget) setModal(false);
  }

  const genres = Array.from(new Set(films.map(({ genre }) => genre)).add("Any genre"))

  useEffect(() => {
    if (genre )  setShowingFilms(films.filter((film) =>  film.genre === genre ))
    if (rating) setShowingFilms(films.filter((film) => film.rating >= rating))
    if (genre === "Any genre")  setShowingFilms(films)
    if (rating === "Any rating")  setShowingFilms(films)
    if (rating === "Any rating" && genre === "Any genre") return setShowingFilms(films)
    if (rating === "Any rating" && genre) return setShowingFilms(films.filter((film) => film.genre === genre))
    if (genre === "Any genre" && rating) return setShowingFilms(films.filter((film) =>  film.rating >= rating ))
    if (genre && rating) return setShowingFilms(films.filter((film) => film.genre === genre && film.rating >= rating))
  }, [genre, rating])


  return <>
      <Box width="100%" height="100vh" p={5}>
        <Grid
          width='100%'
          height='100%'
          container
          justifyContent='center'
          alignItems='start'
        >
          <Paper elevation={3}>
            <Box width={940}  p={3}>
              <Grid
                width='100%'
                height='100%'
                container
                justifyContent='space-evenly'
              >
                <Autocomplete
                  fullWidth
                  disablePortal
                  id="combo-box-demo"
                  options={showingFilms}
                  onChange={(e, newValue) => {
                    if (!newValue) return
                    setFilm(newValue)
                    setModal(true)
                  }}
                  sx={{ width: 400 }}
                  renderInput={(params) => <TextField {...params} label="Movie" />}
                  renderOption={(props, option) => (
                    <Box component="li"  {...props}>
                      <Grid
                        container
                        justifyContent='space-between'
                        alignItems='center'
                      >
                        <Box>
                          <Grid
                            container
                            flexDirection='column'
                            justifyContent='center'
                            alignItems='start'
                          >
                            {option.label}
                            <Rating
                              readOnly
                              precision={0.5}
                              name="stars"
                              value={option.rating}
                              max={10}
                            />
                          </Grid>
                        </Box>
                        {option.genre}
                      </Grid>
                    </Box>
                  )}
                />
                      
                <Box sx={{ width: 300 }}>
                  <FormControl fullWidth>
                    <InputLabel id="select-label">Rating</InputLabel>
                    <Select
                      labelId="select-label"
                      id="select"
                      value={rating}
                      label="Rating"
                      onChange={handleChangeRating}
                    >
                      <MenuItem value={rating}>
                        <Rating
                          name="rating"
                          value={rating}
                          max={10}
                          onChange={(e, newValue)=>{setRating(newValue)}}
                        />
                      </MenuItem>
                      <MenuItem style={{color: 'gray'}} value="Any rating">
                        Any rating
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                
                <Box sx={{ width: 150 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Genre</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={genre}
                      label="Genre"
                      onChange={handleChangeGenre}
                    >
                    {genres.map((genre) =>
                      <MenuItem
                        style={genre === "Any genre"
                          ? { color: 'gray' }
                          : {}
                        }
                        key={genre}
                        value={genre}
                      >
                        {genre}
                      </MenuItem>)}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Box>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={modal}
        onClick={onBackdropClick}
      >
        <Modal
          film={film}
          handleCloseModal={handleCloseModal}
        />
      </Backdrop>
  </>
}