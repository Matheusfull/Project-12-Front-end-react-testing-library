import React from 'react';
import { screen } from '@testing-library/react';
/* import { MemoryRouter } from 'react-router-dom'; */
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste se a página contém um heading h2 ', () => {
  it('h2 com o texto Encountered pokémons', () => {
    /*  render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    Por que assim não está renderizando o app e fazendo o simples ???
    */
    renderWithRouter(<App />);

    const title = screen.getByRole('heading', { name: /Encountered pokémons/i });
    expect(title).toBeInTheDocument();
  });
});

describe('testando o botão e slideshow de pokemons', () => {
  it('O botão deve conter o texto Próximo pokémon', () => {
    renderWithRouter(<App />);

    const button = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(button).toBeInTheDocument();
  });

  it('Os próximos pokémons da lista devem ser mostrados', () => {
    renderWithRouter(<App />);

    const pokemon1 = screen.getByText('Pikachu');
    expect(pokemon1).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(button).toBeInTheDocument();
    userEvent.click(button);

    const pokemon2 = screen.getByText('Charmander');
    expect(pokemon2).toBeInTheDocument();

    userEvent.click(button);
    const pokemon3 = screen.getByText('Caterpie');
    expect(pokemon3).toBeInTheDocument();

    userEvent.click(button);
    const pokemon4 = screen.getByText('Ekans');
    expect(pokemon4).toBeInTheDocument();

    userEvent.click(button);
    const pokemon5 = screen.getByText('Alakazam');
    expect(pokemon5).toBeInTheDocument();

    userEvent.click(button);
    const pokemon6 = screen.getByText('Mew');
    expect(pokemon6).toBeInTheDocument();

    userEvent.click(button);
    const pokemon7 = screen.getByText('Rapidash');
    expect(pokemon7).toBeInTheDocument();

    userEvent.click(button);
    const pokemon8 = screen.getByText('Snorlax');
    expect(pokemon8).toBeInTheDocument();

    userEvent.click(button);
    const pokemon9 = screen.getByText('Dragonair');
    expect(pokemon9).toBeInTheDocument();
  });

  it('quando estiver no último bicho, ao clicar no botão vai para o primeiro', () => {
    renderWithRouter(<App />);

    const button = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(button).toBeInTheDocument();
    userEvent.click(button);
    userEvent.click(button);
    userEvent.click(button);
    userEvent.click(button);
    userEvent.click(button);
    userEvent.click(button);
    userEvent.click(button);
    userEvent.click(button);

    const pokemonLast = screen.getByText('Dragonair');
    expect(pokemonLast).toBeInTheDocument();

    userEvent.click(button);

    const pokemonFirst = screen.getByText('Pikachu');
    expect(pokemonFirst).toBeInTheDocument();
  });
});

describe('Teste se a Pokédex tem os botões de filtro', () => {
  it('Há um botão para cada pokemon e ao clicar retorna aquele tipo', () => {
    renderWithRouter(<App />);

    const buttonElectric = screen.getByRole('button', { name: /Electric/i });
    expect(buttonElectric).toBeInTheDocument();
    userEvent.click(buttonElectric);
    expect(screen.getByText('Pikachu')).toBeInTheDocument();

    const buttonFire = screen.getByRole('button', { name: /Fire/i });
    expect(buttonFire).toBeInTheDocument();
    userEvent.click(buttonFire);
    expect(screen.getByText('Charmander')).toBeInTheDocument();

    const buttonBug = screen.getByRole('button', { name: /Bug/i });
    expect(buttonBug).toBeInTheDocument();
    userEvent.click(buttonBug);
    expect(screen.getByText('Caterpie')).toBeInTheDocument();

    const buttonPoison = screen.getByRole('button', { name: /Poison/i });
    expect(buttonPoison).toBeInTheDocument();
    userEvent.click(buttonPoison);
    expect(screen.getByText('Ekans')).toBeInTheDocument();

    const buttonPsychic = screen.getByRole('button', { name: /Psychic/i });
    expect(buttonPsychic).toBeInTheDocument();
    userEvent.click(buttonPsychic);
    expect(screen.getByText('Alakazam')).toBeInTheDocument();

    const buttonNormal = screen.getByRole('button', { name: /Normal/i });
    expect(buttonNormal).toBeInTheDocument();
    userEvent.click(buttonNormal);
    expect(screen.getByText('Snorlax')).toBeInTheDocument();

    const buttonDragon = screen.getByRole('button', { name: /Dragon/i });
    expect(buttonDragon).toBeInTheDocument();
    userEvent.click(buttonDragon);
    expect(screen.getByText('Dragonair')).toBeInTheDocument();

    const all = screen.getByRole('button', { name: /all/i });
    expect(all).toBeInTheDocument();

    const allButton = screen.getAllByTestId('pokemon-type-button');
    const number = 7;
    expect(allButton).toHaveLength(number);
  });
});

describe('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  it('O texto do botão deve ser All', () => {
    renderWithRouter(<App />);

    const all = screen.getByRole('button', { name: /all/i });
    expect(all).toBeInTheDocument();

    userEvent.click(all);

    const pokemon1 = screen.getByText('Pikachu');
    expect(pokemon1).toBeInTheDocument();

    const nextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(nextPokemon).toBeInTheDocument();
    userEvent.click(nextPokemon);
    expect(pokemon1).toBeInTheDocument();
  });
});
