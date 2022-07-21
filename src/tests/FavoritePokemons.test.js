import React from 'react';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('requsiito 3- testes no componente FavoritePokemons', () => {
  it('Caso não escolha pokemon, deve aparecer um aviso na página de favotitos', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const favoriteButton = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(favoriteButton).toBeInTheDocument();

    userEvent.click(favoriteButton);

    const warning = screen.getByText('No favorite pokemon found');
    expect(warning).toBeInTheDocument();
  });
  it('Teste se são exibidos todos os cards de pokémons favoritados', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const details = screen.getByRole('link', { name: /More details/i });
    expect(details).toBeInTheDocument();

    userEvent.click(details);

    const checkbox = screen.getByRole('checkbox');
    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    const favorite = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(favorite).toBeInTheDocument();

    userEvent.click(favorite);

    expect(screen.getByText(/Pikachu/i)).toBeDefined();
  });
});
