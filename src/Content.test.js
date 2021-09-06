import React from 'react';
import { screen, render } from '@testing-library/react';
import Content from './components/content/Content';

describe('Probando el Header', ()=>{

    it('se carga correctamente el componente Content', ()=>{
        render(<Content />)
        expect(screen.queryByText(/bitcoin/i)).toBeInTheDocument();
    })
})