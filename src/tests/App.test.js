import React from 'react';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
/* import createMemoryHistory from 'history'; */
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('testes para aplicação no App', () => {
  it('teste para ver se os links estão na tela', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const homeLink = screen.getByRole('link', { name: /Home/i });
    expect(homeLink).toBeInTheDocument();

    const homeAbout = screen.getByRole('link', { name: /About/i });
    expect(homeAbout).toBeInTheDocument();

    const homeFavorite = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(homeFavorite).toBeInTheDocument();
  });

  it('Ao clinar no home deve ir para a página correspondente', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const homeLink = screen.getByRole('link', { name: /Home/i });
    expect(homeLink).toBeInTheDocument();
    userEvent.click(homeLink);

    const homeTest = screen.getByRole('heading', { name: /Pokédex/i });
    expect(homeTest).toBeInTheDocument();
  });

  it('Ao clinar no About deve ir para a página correspondente', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const homeAbout = screen.getByRole('link', { name: /About/i });
    expect(homeAbout).toBeInTheDocument();
    userEvent.click(homeAbout);

    const homeTest = screen.getByText('About Pokédex');
    expect(homeTest).toBeInTheDocument();
  });

  it('Ao clinar no Favorite deve ir para a página correspondente', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const homeFavorite = screen.getByRole('link', { name: /Favorite/i });
    expect(homeFavorite).toBeInTheDocument();
    userEvent.click(homeFavorite);

    const homeTest = screen.getByText('Favorite pokémons');
    expect(homeTest).toBeInTheDocument();
  });

  it('Para um URL desconhecida, deve-se aparecer a Not Found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/matheus');

    expect(screen.getByText(/Page requested not found/i)).toBeInTheDocument();
  });
});
