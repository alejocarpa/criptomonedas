//Se importa el hook createSlices para crear el slice y configurar sus estados
import { createSlice } from "@reduxjs/toolkit";

//Se crea el hook nameSlice que sirve para almacenar el estado del dato ingresado en la barra de busqueda
//inicialmente se carga vacia y luego se llena atraves del dispacth en el componente Header.js
export const nameSlice = createSlice({
    name: 'name',
    initialState: { name: ''},
    reducers:{
        setName: (state, action) => {
            state.name = action.payload;
        }
    }
})

export const { setName } = nameSlice.actions; 

export default nameSlice.reducer;