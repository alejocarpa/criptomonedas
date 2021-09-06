//Se importa el hook createSlices para crear el slice y configurar sus estados
import { createSlice } from "@reduxjs/toolkit";

//Se crea el hook rankingSlice que sirve para almacenar el estado del click en el boton Ranking
//inicialmente se carga vacia y luego se llena atraves del dispacth en el componente Header.js
export const rankingSlice = createSlice({
    name: 'rowRanking',
    initialState: { rowRanking: false},
    reducers:{
        setArrowDownRanking: (state, action) => {
            state.rowRanking = action.payload;
        }
    }
})

export const { setArrowDownRanking } = rankingSlice.actions; 

export default rankingSlice.reducer;