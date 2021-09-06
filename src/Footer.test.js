import React from 'react';
import { screen, render } from '@testing-library/react';
import Footer from './components/footer/Footer';

describe('Probando el Header', ()=>{

    it('Se carga correctamente el componente Footer', ()=>{
        render(<Footer />)
        expect(screen.queryByText(/alejandro/i)).toBeInTheDocument();
    })
})