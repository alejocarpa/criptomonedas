import React from 'react';

//Se importa la biblioteca de boopstrap para darle estilo a la ventana modal
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody, Label, List } from 'reactstrap';

//Se importa el Hook useSelector para capturar los estados previamente creados en el Provider o Store
import { useSelector } from 'react-redux';

function Detalle(props) {

    //Se captura en la constante allCoins el estado del objeto coins que viene de la store
    const allCoins = useSelector(state => state.coins.coins.data);

    //Se asignan valores a las constantes que vienen del Content.js a traves de props
    const open = props.open;
    const toggle = props.toggle;
    const idCoin = props.id;
    var arrPorID = false;

    //Condicion que sirve para filtrar el objeto por medio del campo id
    if (allCoins) {
        if (idCoin) {
            arrPorID = allCoins.filter(filter => filter.id === idCoin);
        }
    }
    return (
        <>
            {!arrPorID ? "" :
                arrPorID.map((coin, index) => {
                    return <Modal key={index} isOpen={open} toggle={() => toggle(0)}>
                        <ModalHeader toggle={() => toggle(0)}>{coin.name}</ModalHeader>
                        <ModalBody>
                            <List type="unstyled">
                                <li><Label> <b>ID:</b> {coin.id}</Label></li>
                                <li><Label> <b>NAME ID:</b> {coin.nameid}</Label></li>
                                <li><Label> <b>SYMBOL:</b> {coin.symbol}</Label></li>
                                <li><Label> <b>RANK:</b> {coin.rank}</Label></li>
                                <li><Label> <b>PRICE USD:</b> ${coin.price_usd}</Label></li>
                                <li><Label> <b>PERCENT CHANGE 24 HOURS:</b> {coin.percent_change_24h}%</Label></li>
                                <li><Label> <b>PERCENT CHANGE 1 HOUR:</b> {coin.percent_change_1h}%</Label></li>
                                <li><Label> <b>PERCENT CHANGE 7 DAYS:</b> {coin.percent_change_7d}%</Label></li>
                            </List>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={() => toggle(0)}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                })


            }
        </>
    )
}

export default Detalle;