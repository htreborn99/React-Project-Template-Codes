// Cannot access unless sign up
import * as React from 'react';
import { useState, useEffect} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

// import Redux
import { useSelector, useDispatch } from 'react-redux';



function Profile() {
  // Storing Redux in local State
  const login_data = useSelector((state) => state.login.login)
  const password = useSelector((state) => state.login.password)
  const email = useSelector ((state) =>  state.login.email)
  const fullname = useSelector((state) => state.login.fullname)




  const [ pokemonsearch, setPokemon ] = useState("")

  const handlepokemon = (event) => {
    setPokemon(event.target.value)
  }

  const [ finalpokemon, setfinalpokemon ] = useState("")

  const handlefinalpokemon = (event) => {
    let url = "https://pokeapi.co/api/v2/pokemon/" + pokemonsearch
    setfinalpokemon(url)
  }

  // UseEffect for API search 
  const [pokemon_name ,setPokemon_name ] = useState("")
  
  const handlePokemon_name = (value) => {
    setPokemon_name(value)
  }

  const [pokemon_image, setPokemon_image] = useState("")

  const handlePokemon_image = (value) => {
    setPokemon_image(value)
  }

  useEffect( () => {
    const abortCont = new AbortController()
    setTimeout(() => {
      fetch(finalpokemon, {signal: abortCont.signal})
      .then (res => {
        if(!res.ok) {
          throw Error("could not fetch the data for that resource")
        }
        return res.json()
      })
      .then(data => {
        handlePokemon_name(data.species.name)
        handlePokemon_image(data.sprites.other.dream_world.front_default)
      })

      .catch(err => {
        if (err.name === "AbortError") {
          console.log('fetch aborted')
        }
        else {
          console.log(err.message)
        }
      })
    })
  },)

    return (
      <div style={{backgroundColor:"white", marginTop:"25px"}}>
        <Typography variant="subtitle1" gutterBottom >
          This is your Profile, not supposed to enter if not signed in. 
          Welcome back {fullname}, your email is {email}, username is {login_data}.
        </Typography>
        {/* Card Example */}

        <Grid container >
          <Grid item xs={12} style={{ display:'flex', justifyContent:'center', marginTop:"25px"}}>
            <Card sx={{maxWidth: 500}}>
              <CardMedia 
                component="img"
                height="auto"
                image={pokemon_image}
                alt="Another pokemon image"
              />
              <CardContent>
                <Typography variant="body2">{pokemon_name}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <TextField id="standard-basic" label="Search Pokemon here." variant="standard" onChange={handlepokemon}/>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" sx={{marginTop:"15px"}} onClick={handlefinalpokemon}>Search Pokemon</Button>
          </Grid>
        </Grid>

        {/* End of Card Example  */}
      </div>
    );
  }
  
export default Profile;