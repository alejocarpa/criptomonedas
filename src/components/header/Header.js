//Se hace la importacion del Hook useState para manejar estados en la aplicacion
import React, { useState } from 'react';
import './Header.css';

//Se importa la funcion setName que viene del slice nombre 
//para manejar el estado global del nombre a colocar en la barra de busqueda
import { setName } from '../../redux/slices/nombre';

//Se importa la funcion setArrowDown que viene del slice orderPrice
//para manejar el estado de la flecha al ser presionada en el boton Price
import { setArrowDown } from '../../redux/slices/orderPrice';

//Se importa la funcion setArrowDownRanking que viene del slice orderRanking
//para manejar el estado de la flecha al ser presionada en el boton Ranking
import { setArrowDownRanking } from '../../redux/slices/orderRanking';

//Se importa el Hook useDispatch para cambiar los estados previamente creados en el Provider o Store
//Se importa el Hook useSelector para capturar los estados previamente creados en el Provider o Store
import { useDispatch, useSelector } from 'react-redux';

function Header() {

    //Se captura en la constante arrowDown el estado del objeto price que viene de la store
    const arrowDown = useSelector( (state) => state?.price?.rowPrice);
    
    //Se captura en la contante arrowDownRanking el estado del objeto ranking que viene de la store
    const arrowDownRanking = useSelector((state) => state?.ranking?.rowRanking);

    //Se crea un estado click para manejar evento click
    const [click, setClick] = useState(false);

    //Se cambia la variable click a false cuando se llame esta constante
    const closeMobileMenu = () => setClick(false);

    //Esta funcion cambia el estado a contrario de lo que este asignado a la variable click
    const handleClick = () => setClick(!click);

    //Se asigna el Hook useDispatch a la constante dispatch
    const dispatch = useDispatch();

    //Se ejecuta la funcion setName previamente cargada a traves del dispath para cambiar el estado name
    //a lo que el usuario coloque en la barra de busqueda
    const handleInputChange = (event) => {
        dispatch(setName(event.target.value.toLowerCase()));
    }

    //Se ejecuta la funcion setArrowDown previamente cargada a traves del dispatch para cambiar el estado
    // de rowPrice cuando el usuario de click en el boton Price
    const orderPrice = () => {
        dispatch(setArrowDown(!arrowDown));
        closeMobileMenu();
    }

    //Se ejecuta la funcion setArrowDownRanking previamente cargada a traves del dispatch para cambiar el estado
    // de rowRanking cuando el usuario de click en el boton Ranking
    const orderRanking = () => {
        dispatch(setArrowDownRanking(!arrowDownRanking));
        closeMobileMenu();
    }

    return (
        <div className="navbar-container">
            <div className="menu-icon" onClick={handleClick}>
                <i className={click ? 'fas fa-times' : 'fas fa-funnel-dollar'} />
            </div>
            <div className={click ? 'navbar-propio active' : 'navbar-propio'}>
                <div>
                    <input className="bar-busqueda" type="text" placeholder="Search Coin..." onChange={handleInputChange} onBlur={closeMobileMenu}/>
                </div>
                <div className="logo-busqueda">
                    <i className="fas fa-search"></i>
                </div>
                <div className="date-busqueda" onClick={orderPrice} >
                    Price
                    <div className="date-arrow">
                        <i className={!arrowDown ? "fas fa-arrow-down" : "fas fa-arrow-up"}></i>
                    </div>
                </div>
                <div className="ranking-busqueda" onClick={orderRanking}>
                    Ranking
                    <div className="ranking-arrow">
                        <i className={!arrowDownRanking ? "fas fa-arrow-down" : "fas fa-arrow-up"}></i>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Header;