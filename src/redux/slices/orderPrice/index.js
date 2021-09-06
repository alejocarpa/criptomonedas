//Se importa el hook createSlices para crear el slice y configurar sus estados
import { createSlice } from "@reduxjs/toolkit";

//Se crea el hook priceSlice que sirve para almacenar el estado del click en el boton Price
//inicialmente se carga vacia y luego se llena atraves del dispacth en el componente Header.js
export const priceSlice = createSlice({
    name: 'rowPrice',
    initialState: { rowPrice: false},
    reducers:{
        setArrowDown: (state, action) => {
            state.rowPrice = action.payload;
        }
    }
})

export const { setArrowDown } = priceSlice.actions; 

export default priceSlice.reducer;