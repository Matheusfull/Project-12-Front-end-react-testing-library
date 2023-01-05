import React from 'react';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testes da renderização da página de detalhes', () => {
  it('testes para ver se alguns elementos estão na tela.', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const linkdetails = screen.getByRole('link', { name: /More details/i });
    expect(linkdetails).toBeInTheDocument();

    userEvent.click(linkdetails);

    const titleDetails = screen.getByRole('heading', { name: /Pikachu Details/i });
    expect(titleDetails).toBeInTheDocument();

    expect(linkdetails).not.toBeInTheDocument();

    const sumaryDetails = screen.getByRole('heading', { name: /Summary/i, level: 2 });
    expect(sumaryDetails).toBeInTheDocument();

    const text = screen.getByText(/This intelligent Pokémon /i);
    expect(text).toBeDefined();
  });

  it('testes para ver se alguns elementos relacionados ao mapa.', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const linkdetails = screen.getByRole('link', { name: /More details/i });
    expect(linkdetails).toBeInTheDocument();

    userEvent.click(linkdetails);

    // Na seção de detalhes deverá existir um heading h2 com o texto Game Locations of <name>; onde <name> é o nome do pokémon exibido;
    const home = screen.getByRole('heading', { name: /Game Locations of Pikachu/i });
    expect(home).toBeInTheDocument();

    // Todas as localizações do pokémon devem ser mostradas na seção de detalhes, para isso vamos pegar o nome de cada localização, a imagem e o alt.
    // nome de cada localização
    const location1 = screen.getByText(/Kanto Viridian Forest/i);
    expect(location1).toBeInTheDocument();

    const location2 = screen.getByText(/Kanto Power Plant/i);
    expect(location2).toBeInTheDocument();

    // imagem de cada local
    /* const image1 = screen.getAllByRole('img', { src: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png' })[2];
    expect(image1).toBeInTheDocument();

    const image2 = screen.getAllByRole('img', { src: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png' })[1];
    expect(image2).toBeInTheDocument(); */

    // alt das imagens
    const alt1 = screen.getAllByAltText(/Pikachu location/i);
    expect(alt1).toBeDefined();
    console.log(alt1[0].src);

    // imagem de cada local
    const img1 = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';

    expect(alt1[0].src).toContain(img1);

    const img2 = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';

    expect(alt1[1].src).toContain(img2);
  });

  it('testes para ver a parte de favoritar um pokemon.', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const linkdetails = screen.getByRole('link', { name: /More details/i });
    expect(linkdetails).toBeInTheDocument();

    userEvent.click(linkdetails);

    // A página deve exibir um checkbox que permite favoritar o pokémon;
    const checkbox = screen.getByRole('checkbox');
    // userEvent.click(checkbox);
    // expect(checkbox).toBeChecked();
    expect(checkbox).toBeInTheDocument();

    // Cliques alternados no checkbox devem adicionar e remover respectivamente o pokémon da lista de favoritos. Para isso, vamos clicar e verificar se aparecerá o icone de favorito. Depois vamos clicar novamente e ver se o ícone desaparece.

    userEvent.click(checkbox);
    const image = screen.getAllByRole('img', { src: '/star-icon.svg' })[3];
    expect(image).toBeInTheDocument();

    // O label do checkbox deve conter o texto Pokémon favoritado?
    const label = screen.getByText(/Pokémon favoritado?/i);
    expect(label).toBeInTheDocument();
  });
});
