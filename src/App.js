import React from 'react';
import './bulma.css';
import ListaIngredientes from './components/Ingredientes.js';
import ListaCardapio from './components/Cardapio.js';

function App() {
  return (
    <div className="App">
      <div className="container">
        <br></br>
        <div class="notification is-$grey">
          <label class="label is-large">Tela para seleção de lanches</label>
        </div>
        <br></br>
        <div className="box columns is-multiline">
          <div className="columns">
            <div className="column is-half">
              <ListaIngredientes />
            </div>

            <div className="column is-half">
              <ListaCardapio />
            </div>
          </div>
          {/* <div className="column is-2"></div>
          <div className="column is-4">Cardápio lanches prontos</div>
          <div className="column is-1"></div>
          <div className="column is-2"></div>
          <div className="column is-4">
            <ListaCardapio />
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default App;
