import React from 'react';
import { screen, render } from '@testing-library/react';
import Header from './components/header/Header';

describe('se carga correctamente el componente Header', ()=>{

    it('Busqueda captura el value correctamente', ()=>{
        render(<Header />)
        expect(screen.queryByText(/price/i)).toBeInTheDocument();
    })
})