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

/*
Requisito 4
Na página not found há 4 coisas para testar:
1 - O título escrito pokédex
2 - Os 3 links que ficam sempre no header ( home, about, favorite pokemns )
3 - O título 'Page requested not found 😭'
4 - A imagem do pokemon chorando kkkkk
obs: Quando vamos testar imagem no react, podemos pegá-la pelo alt e depois ver se tem o atributo src com o endereço.
*/

/*
Aqui começamos a usar o renderWithRouter, que é uma função, para nos ajudar com o histórico.
*/
