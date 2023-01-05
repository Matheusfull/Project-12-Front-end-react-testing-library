import React from 'react';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('testes para aplicação no about', () => {
  test('página contém as informações e a imagem sobre a Pokédex ', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const about = screen.getByRole('link', { name: /About/i });
    expect(about).toBeInTheDocument();

    userEvent.click(about);

    /* const info = screen.getByText(/This application simulates a Pokédex/i);
    expect(info).toBeInTheDocument(); */

    // Teste se a página contém um heading h2 com o texto About Pokédex;
    const heading = screen.getByRole('heading', { name: /About Pokédex/i });
    expect(heading).toBeDefined();

    // Teste se a página contém dois parágrafos com texto sobre a Pokédex;
    const paraOne = screen.getByText(/This application simulates a Pokédex/i);
    expect(paraOne).toBeDefined();

    const paraTwo = screen.getByText(/One can filter Pokémons by type/i);
    expect(paraTwo).toBeDefined();

    // Teste se a página contém a seguinte imagem de uma Pokédex:
    const image = screen.getByRole('img', { src: 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png' });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});

/*
Requisito 2
Para testar no react as coisas na tela, a princípio é só fazer dois passos:
1 - Pegar o que está na tela através dos seletores: getByText, getByRole, getByLabelText, getByTestId.
2 - Confirma que ele está na tela através : toBeInTheDocument,toBeDefined
3 - Podemos também ver quantos elementos há na tela: toHaveLength
4 - Podemos também ver a propriedade do elemento buscado na tela: toHaveProperty
5 - Além disso tudo, podemos ainda testar o valor do elemento: toHaveProperty
*/
