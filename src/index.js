import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//Se importa el provider de la libreria react-redux para cargar los estados en toda la aplicacion
import { Provider } from 'react-redux';

//Se importa la store creada la cual alimenta el Provider con todos los estados asignados
import {store} from './redux/index';

ReactDOM.render(<Provider store={store}><App /></Provider>,document.getElementById('root'));

