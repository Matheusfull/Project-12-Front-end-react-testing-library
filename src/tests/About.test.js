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

    const heading = screen.getByRole('heading', { name: /About Pokédex/i });
    expect(heading).toBeDefined();

    const paraOne = screen.getByText(/This application simulates a Pokédex/i);
    expect(paraOne).toBeDefined();

    const paraTwo = screen.getByText(/One can filter Pokémons by type/i);
    expect(paraTwo).toBeDefined();

    const image = screen.getByRole('img', { src: 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png' });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
