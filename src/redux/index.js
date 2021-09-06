//Se importa el Hook configureStore para llenar el Provider o Store
import { configureStore } from '@reduxjs/toolkit';

//Se importan los slices creados para alimentar el reducer y se puedan ver los estados en toda la aplicacion
import name from './slices/nombre';
import coins from './slices/coins';
import price from './slices/orderPrice';
import ranking from './slices/orderRanking';

export const store = configureStore({
    reducer: {
        name: name,
        coins: coins,
        price: price,
        ranking: ranking,
    },
})
