//Se importa el hook createSlices para crear el slice y configurar sus estados
import { createSlice } from "@reduxjs/toolkit";

//Se importa Axios para hacer peticiones a la API de manera sencilla
import axios from 'axios';

//Se crea el hook coinSlice que sirve para almacenar el estado de las coins que viene de la respuesta de la API
//inicialmente se carga vacia y luego se llena atraves del dispacth que ejecuta la funcion fetchAllCoins
export const coinsSlice = createSlice({
    name: 'coins',
    initialState: { coins: ''},
    reducers:{
        setCoins: (state, action) => {
            state.coins = action.payload;
        }
    }
})

export const { setCoins } = coinsSlice.actions;

//Funcion que captura el objeto que provee la API gracias al metodo axios
export const fetchAllCoins = () => (dispatch) => {
    axios.get('https://api.coinlore.net/api/tickers/')
    .then(response => {
        const responseJSON = response.data;
        dispatch(setCoins(responseJSON));
    })
    .catch((error) => {
        console.log(error)
    })
}

export default coinsSlice.reducer;