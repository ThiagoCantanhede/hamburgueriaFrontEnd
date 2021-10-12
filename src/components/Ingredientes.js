import { useState, useEffect } from 'react';
import ingredientes from '../services/IngredientesService.js';
import '../bulma.css';
import lanchePersonalizadoService from '../services/LanchePersonalizadoService.js';

export default function ListaIngredientes(props) {
  const [ListaIngredientes, montar] = useState([]);
  const [lanchePersonalizado, montarObjeto] = useState(null);
  const [totalLanchePersonalizado, atualizarTotal] = useState(0);
  const [itensLanchePersonalizado, atualizarItens] = useState('');

  useEffect(async () => {
    montar(await montarGrid());
  }, [totalLanchePersonalizado, itensLanchePersonalizado]);

  const retornarIngredientes = async () => {
    const ingre = await ingredientes.get();
    return ingre.data;
  };

  const montarObjetoEEnviarParaCalcularOTotalDoLanchePersonalizado = async (
    ingrediente
  ) => {
    let achou = false;
    let lPersonalizado = null;
    if (lanchePersonalizado) {
      lanchePersonalizado.ingredientes.forEach((elemento, index) => {
        if (ingrediente.nome === elemento.nome) {
          lanchePersonalizado.ingredientes[index].quantidade =
            lanchePersonalizado.ingredientes[index].quantidade + 1;
          achou = true;
        }
      });
      if (!achou) {
        lanchePersonalizado.ingredientes.push(ingrediente);
      }
    } else {
      lPersonalizado = {
        nome: 'Personalizado',
        ingredientes: [
          {
            nome: ingrediente.nome,
            valor: ingrediente.valor,
            quantidade: 1,
          },
        ],
      };
      montarObjeto(lPersonalizado);
    }

    const retorno = lanchePersonalizado
      ? await lanchePersonalizadoService.post(lanchePersonalizado)
      : await lanchePersonalizadoService.post(lPersonalizado);

    atualizarTotal(retorno.data);
    lanchePersonalizado
      ? montarStringComItensDoLanche(lanchePersonalizado)
      : montarStringComItensDoLanche(lPersonalizado);
  };

  const removerItemEmontarObjetoEEnviarParaCalcularOTotalDoLanchePersonalizado = async (
    ingrediente
  ) => {
    if (lanchePersonalizado) {
      lanchePersonalizado.ingredientes.forEach((elemento, index) => {
        if (ingrediente.nome === elemento.nome) {
          if (elemento.quantidade > 1) {
            lanchePersonalizado.ingredientes[index].quantidade =
              lanchePersonalizado.ingredientes[index].quantidade - 1;
          } else {
            lanchePersonalizado.ingredientes.splice(index, 1);
          }
        }
      });
    }

    const retorno = await lanchePersonalizadoService.post(lanchePersonalizado);

    atualizarTotal(retorno.data);
    montarStringComItensDoLanche(lanchePersonalizado);
  };

  const montarStringComItensDoLanche = (lanchePersonalizado) => {
    let stringLanche = ' ';
    lanchePersonalizado.ingredientes.forEach((elemento, index) => {
      stringLanche =
        stringLanche !== ' '
          ? stringLanche +
            ', ' +
            elemento.nome +
            '(' +
            elemento.quantidade +
            ')'
          : elemento.nome + '(' + elemento.quantidade + ')';
    });

    atualizarItens(stringLanche);
  };

  const montarGrid = async () => {
    const ingredientes = await retornarIngredientes();
    return (
      <div>
        <table className="table is-bordered is-striped ">
          <tbody>
            {ingredientes.length ? (
              ingredientes.map((i, index) => (
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
                      onClick={() =>
                        montarObjetoEEnviarParaCalcularOTotalDoLanchePersonalizado(
                          i
                        )
                      }
                    >
                      Adicionar
                    </a>
                  </td>
                  <td>
                    <a
                      href="#"
                      onClick={() =>
                        removerItemEmontarObjetoEEnviarParaCalcularOTotalDoLanchePersonalizado(
                          i
                        )
                      }
                    >
                      Remover
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
            Ingredientes selecionados: {itensLanchePersonalizado}
            <br></br>
            Total lanche personalizado:
            {totalLanchePersonalizado.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </div>
        </div>
      </div>
    );
  };

  return <div className="row container">{ListaIngredientes}</div>;
}
