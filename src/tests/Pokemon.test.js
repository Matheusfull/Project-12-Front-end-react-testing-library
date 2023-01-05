import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste se é renderizado um card com as informações do pokémon', () => {
  it('testes de renderização', () => {
    renderWithRouter(<App />);

    const name = screen.getByTestId('pokemon-name');
    expect(name).toBeInTheDocument();

    const type = screen.getByTestId('pokemon-type');
    expect(type).toBeInTheDocument();
    /* expect(type).toBe('Electric'); */
    const typePokemon = screen.getAllByText('Electric')[0];
    expect(typePokemon).toBeDefined();
    expect(type).toBe(typePokemon);

    const weight = screen.getByTestId('pokemon-weight');
    expect(weight).toBeInTheDocument();
    expect(screen.getByText(/Average weight: 6.0 kg/i)).toBeInTheDocument();

    const image = screen.getByRole('img', { src: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png' });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');

    const alt = screen.getByAltText(/Pikachu sprite/i);
    expect(alt).toBeInTheDocument();
  });
});

describe('Testes de renderização com URL', () => {
  it('Teste se o pokemon indicado na Pokédex contém um link para detalhes', () => {
    const { history } = renderWithRouter(<App />);

    const details = screen.getByRole('link', { name: /More details/i });
    expect(details).toBeInTheDocument();
    userEvent.click(details);

    // verifica se foi para tal endereço
    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemons/25');
    /* expect(pathname).toHaveTextContent('/25'); */

    const moreDetaisl = screen.getByText(/Summary/i);
    expect(moreDetaisl).toBeInTheDocument();
  });
});

describe('Teste se existe um ícone de estrela nos pokémons favoritados', () => {
  it('O ícone deve ser uma imagem', () => {
    renderWithRouter(<App />);

    const details = screen.getByRole('link', { name: /More details/i });
    expect(details).toBeInTheDocument();
    userEvent.click(details);

    const favorite = screen.getByRole('checkbox');
    // expect(favorite).toBeInTheDocument();
    userEvent.click(favorite);

    const image = screen.getAllByRole('img', { src: '/star-icon.svg' })[1];
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/star-icon.svg');

    const alt = screen.getByAltText(/pikachu is marked as favorite/i);
    expect(alt).toBeInTheDocument();
  });
});

/*
Requisito 6
teste 1 - Vamos verificar todos os elementos no card, como o título, tipo, peso e imagem.

teste 2 - verifica se ao clicar no pokemon, a url leva para um endereço que há o id dele.

teste 3 - teste normalzão: ta na home, clica em mais detalhes, favorita e depois ve se aparece a estrela com o alt
*/
