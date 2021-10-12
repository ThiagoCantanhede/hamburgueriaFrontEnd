import { useState, useEffect } from 'react';
import cardapio from '../services/CardapioService.js';
import '../bulma.css';

export default function ListaCardapio(props) {
  const [ListaCardapio, montar] = useState([]);
  const [totalLanche, atualizarTotal] = useState(0);
  const [lanchesSelecionados, atualizarItens] = useState('');
  const listaLanches = [];
  useEffect(async () => {
    montar(await montarGrid());
  }, [lanchesSelecionados, totalLanche]);

  const retornarCardapio = async () => {
    const ingre = await cardapio.get();
    return ingre.data;
  };

  const selecionarLancheECalcularTotal = (lanche) => {
    let total = 0;
    let lanchesSel = '';
    listaLanches.push(lanche);
    listaLanches.forEach((elemento) => {
      lanchesSel =
        lanchesSel !== '' ? lanchesSel + ', ' + elemento.nome : elemento.nome;
      total = total + elemento.valor;
    });
    atualizarTotal(total);
    atualizarItens(lanchesSel);
  };

  const montarGrid = async () => {
    const cardapio = await retornarCardapio();
    return (
      <div>
        <table className="table is-bordered is-striped ">
          <tbody>
            {cardapio.length ? (
              cardapio.map((i, index) => (
                <tr>
                  <td>{i.nome}</td>
                  <td>
                    {i.valor.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </td>
                  <td>
                    <a
                      href="#"
                      onClick={() => selecionarLancheECalcularTotal(i)}
                    >
                      Selecionar
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <div className="input-field col s12 center">
                <p>Nenhum dado para exibir</p>
              </div>
            )}
          </tbody>
        </table>
        <div className="container">
          <div className="column is-10">
            Lanche selecionado: {lanchesSelecionados}
            <br></br>
            Total lanche personalizado:
            {totalLanche.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </div>
        </div>
      </div>
    );
  };

  return <div className="row container">{ListaCardapio}</div>;
}
