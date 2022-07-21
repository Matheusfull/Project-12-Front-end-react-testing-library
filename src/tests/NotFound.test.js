import React from 'react';
import { screen } from '@testing-library/react';
/* import { MemoryRouter } from 'react-router-dom'; */
import App from '../App';
import renderWithRouter from './renderWithRouter';
/* import NotFound from '../pages'; */

describe('requisito 4', () => {
  it('Teste se a página contém um heading h2 com o texto Page requested not found',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('/pagina-que-nao-existe');

      const phrase = /Page requested not found/i;
      const notFound = screen.getByRole('heading', { name: phrase, level: 2 });
      expect(notFound).toBeInTheDocument();
    });

  it('Teste se a página mostra a imagem', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina-que-nao-existe');

    const cry = 'Pikachu crying because the page requested was not found';
    const image = screen.getByAltText(cry);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  /*   const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const image = screen.getByRole('img', { src: url });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', url);
    Não sei o porquê de assim não ir...
    */
  });
});
