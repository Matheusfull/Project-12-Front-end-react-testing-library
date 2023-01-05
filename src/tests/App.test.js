import React from 'react';
import { screen, render } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import App from '../App';
// import renderWithRouter from './renderWithRouter';

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
    // const { history } = renderWithRouter(<App />);
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    history.push('/matheus');

    expect(screen.getByText(/Page requested not found/i)).toBeInTheDocument();
  });
});

/*
Requisito 1
-------------------------------   MemoryRouter   ----------------------------------
Quando vamos testar rotas, o Browser cria um histórico de nagevação e com isso nossos testes falham, pois há contaminação de um teste para outro. Por exemplo, se eu tiver na home da página e clicar no link de about e for redirecionado, agora estarei na página about. Até ai tudo bem. Porém se eu for fazer outras testes, por exemplo na página de favoritos, todos os meus testes de favoristos falharão, pois o meu histórico ainda está no about, permanece lá tudo que há naquela página. Ou seja, o resultado do teste anterior, o clinar no about e testar as coisas de lá, vão interferir nos próximos testes. Para isso, vamos ter que isolar cada teste, criando assim um histórico próprio, para cada teste. Para isso, basta usar a função MemoryRouter para gravar o histórico daquele teste na memória e não no browserRouter.

Testes de link
1 - Só precisa pegar os links pela função, role, o nome da função e o nome do elemento no DOM.
2 - Depois só ver se está na tela com o match toBeInTheDocument.

Testes de redirecionamento
1 - Faz exatamente como nos passos anteriores
2 - Pega o botão e clica
3 - Só fazer como no passo 1 dos testes de redicionamento. Só ver se tem algo na tela que comprove que mudou de página. Às vezes é só um título, um botão, uma imagem, ou seja, qualquer coisa que comprove a mudança de tela.
*/

/*
Requisito 1
Último teste - 404, indo direto para um página, sem interação do usuário
----------------------     createMemoryHistory       --------------------------------
1 - Vamos criar um history novo, só para esse teste. Para isso vamos usar a função createMemoryHistory. Nessa função funciona como um history.Por isso podemos dar o history.push
2 - Vamos usar então o objeto Router e passar como props o history. O MemoryRouter não funciona pois fica desconectado.
3 - Colocaremos então o Router.
4 - Feito o histórico 'local', só dar um redirecionamento, ou seja, um push ( até porque não há como clicar em nenhum botão para ser redirecionado, logo, precisamos desse push para um rota não cadastrada para ir à página 404 )
5 - Lá que vamos fazer o padrão:
1 - Pegar algo da tela, tipo a mensagem de not found
2 - Ver se está na tela com o toBeInTheDocument.
*/
