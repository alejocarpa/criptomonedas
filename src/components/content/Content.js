//Se importan los Hooks useEffect que sirve para cargar los efectos al momento de iniciar el componente 
//y useState para manejar estados dentro del componente
import React, { useEffect, useState } from 'react';

//Se importa el Hook useDispatch para cambiar los estados previamente creados en el Provider o Store
//Se importa el Hook useSelector para capturar los estados previamente creados en el Provider o Store
import { useSelector, useDispatch } from 'react-redux';

//Se importa la funcion fetchAllCoins la cual se encarga de obtener datos de la API
import { fetchAllCoins } from '../../redux/slices/coins';
import './Content.css';

//Se importa el componente Line el cual sirve para pintar un grafico de lineas
import { Line } from '@ant-design/charts';

//Se importa el componente Detalle el cual muestra informacion al detalle de cada moneda
import Detalle from './Detalle';

function Content() {

    //Se asigna el Hook useDispatch a la constante dispatch
    const dispatch = useDispatch();

    //Se captura en la constante name el estado del objeto name que viene de la store
    const name = useSelector(state => state.name.name);

    //Se captura en la constante allCoins el estado del objeto coins que viene de la store
    const allCoins = useSelector(state => state.coins.coins);

    //Se captura en la constante orderPrice el estado del objeto price que viene de la store
    const orderPrice = useSelector(state => state.price.rowPrice);

    //Se captura en la constante orderRanking el estado del objeto ranking que viene de la store
    const orderRanking = useSelector(state => state.ranking.rowRanking);

    //Se crea un estado coin para almacenar los datos que arroja la API
    const [coin, setCoin] = useState(allCoins.data);

    //Se crea un estado modal para manejar el evento de la ventana Modal o PopUp
    const [modal, setModal] = useState(false);

    //Se crea un estado id para almacenar el id de la moneda que se quiere observar el detalle
    const [id, setId] = useState(0);

    //Esta funcion se ejecuta al momento de dar click en la moneda para ver el detalle en una ventana modal o PopUp
    const verDetalle = (idCoin) => {
        setModal(!modal);
        setId(idCoin);
    }

    //Esta funcion calcula el precio de cada una de la monedas previamente cargadas a traves de lo que el
    //usuario digite en el campo de texto de unidades de moneda
    const convertir = (event) => {
        let cant = document.getElementById(event.target.id).value;
        let precio = document.getElementById('valorUsd'+event.target.id).value;
        let decimal = 2;

        if(precio < 1){
            decimal = 6;
        }

        document.getElementById('precio'+event.target.id).innerHTML = (cant*precio).toFixed(decimal);
    }

    //Se ejecuta el dispatch para obtener el resultado de monedas de la API al momento de cargar el componente
    useEffect(() => {
        dispatch(fetchAllCoins());
    }, [dispatch]);

    //Se ejecuta este efecto cuando se modifica el campo de nombre en la barra de busqueda para filtrar el objeto
    //por el nombre que se coloque
    useEffect(() => {
        if (allCoins.data) {
            const array_name = allCoins.data.filter(d => d.name.toLowerCase().includes(name));
            setCoin(array_name);
        }
    }, [name, allCoins.data]);

    //Se ejecuta este efecto para llenar el estado global coins con el resultado de la API
    useEffect(() => {
        setCoin(allCoins.data);
    }, [allCoins.data]);


    //Se ejecuta este efecto cuando el estado de orderPrice cambie, para ordenar el objeto por el campo price_usd
    useEffect(() => {

        let order = [];
        if (coin) {
            coin.map((coin) => {
                document.getElementById(coin.id).value = 1;
                return order.push(coin);
            })
        }

        if (orderPrice) {
            if (allCoins.data) {
                order.sort((a, b) => parseFloat(a.price_usd) - parseFloat(b.price_usd))
                
                setCoin(order);
            }
        } else {
            if (allCoins.data) {
                order.sort((a, b) => parseFloat(b.price_usd) - parseFloat(a.price_usd))
                
                setCoin(order);
            }
        }
    }, [orderPrice]);

    //Se ejecuta este efecto cuando el estado de orderRanking cambie, para ordenar el objeto por el campo rank
    useEffect(() => {

        let order = [];
        if (coin) {
            coin.map((coin) => {
                document.getElementById(coin.id).value = 1;
                return order.push(coin)
            })
        }

        if (orderRanking) {
            if (allCoins.data) {
                order.sort((a, b) => parseFloat(b.rank) - parseFloat(a.rank))
                
                setCoin(order);
            }
        } else {
            if (allCoins.data) {
                order.sort((a, b) => parseFloat(a.rank) - parseFloat(b.rank))
                
                setCoin(order);
            }
        }
    }, [orderRanking]);

    return (
        <div className="data-container">
            {
                !coin ? "Loading..."
                    :
                    coin.map((coin, index) => {

                        //Se declara esta variable para poner iconos a todas las monedas
                        let style = `fas fa-coins`;
                        if(coin.nameid.toLowerCase() === "bitcoin"){
                            style = `fab fa-${coin.nameid.toLowerCase()}`
                        }else if(coin.nameid.toLowerCase() === "ethereum"){
                            style = `fab fa-${coin.nameid.toLowerCase()}`
                        }

                        //Se declara esta variable para poner color a todos los iconos
                        let color = 'rgb(0, 202, 61)';
                        let colorIcono = '#169916';
                        if(coin.nameid.toLowerCase() === "bitcoin"){
                            colorIcono = '#FF9D2D';
                        }else if(coin.nameid.toLowerCase() === "ethereum"){
                            colorIcono = '#5000B0';
                        }
                        
                        coin.percent_change_24h < 0 ? color = "red" : color = "rgb(0, 202, 61)";

                        //Se declaran los parametros que usara la grafica de lineas
                        const data = [
                            { time: '7d', value: parseFloat(coin.percent_change_7d) },
                            { time: '24h', value: parseFloat(coin.percent_change_24h) },
                            { time: '1h', value: parseFloat(coin.percent_change_1h) },
                        ];

                        const config = {
                            data,
                            height: 100,
                            padding: 'auto',
                            xField: 'time',
                            yField: 'value',
                            xAxis: { tickCount: 5 },
                        };


                        return <div key={index} className="data-all">
                            <div className="data-coin" onClick={()=>verDetalle(coin.id)}>
                                <div>
                                    <i style={{color : colorIcono}} className={style}></i><span>{coin.name}</span>
                                </div>
                            </div>
                            <div className="data-graph">
                                <div>
                                    <div>
                                    <input className="data-converter" id={coin.id} type="number" defaultValue={1} onChange={convertir}/>
                                    <input className="data-converter" id={'valorUsd'+coin.id} type="hidden" defaultValue={coin.price_usd} />
                                    <label> {coin.symbol} = US$ </label><label id={'precio'+coin.id}>{coin.price_usd}</label>
                                    </div>
                                    <div><span style={{ color: color, fontSize: "25px" }}>{coin.percent_change_24h}%</span> <label className="data-label">24 hours</label></div>
                                </div>
                                <div className="data-chart"><Line {...config} /></div>
                            </div>
                        </div>
                    })
            }
        
        <Detalle open={modal} toggle={verDetalle} id={id} />
        </div>
    )
}

export default Content;