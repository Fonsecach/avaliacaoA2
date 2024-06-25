import React from 'react';
import './App.css';
import { BrowserRouter, Routes } from 'react-router-dom';
import { Link, Route } from 'react-router-dom';
import  ListarTarefas from './components/pages/ListarTarefas';
import  CadastrarTarefa from './components/pages/CadastrarTarefa';
import  ListarConcluidas from './components/pages/ListarConcluidas';
import  ListarNaoConcluidas from './components/pages/ListarNaoConcluidas';




function App() {
  return (
    <BrowserRouter>
      <div>
        <header className='nav'>
        <nav >
          <ul>
            <li>
              <Link to="/">Lista de Tarefas</Link>
            </li>
            <li>
              <Link to="/cadastrar">Cadastrar Tarefa</Link>
            </li>
            <li>
              <Link to="/concluidas">Tarefas Concluídas</Link>
            </li>
            <li>
              <Link to="/naoconcluidas">Tarefas Não Concluídas</Link> 
            </li>
          </ul>
        </nav>
        </header>
        <Routes>
          <Route path="/" element={<ListarTarefas />} />
          <Route path="/cadastrar" element={<CadastrarTarefa />} />
          <Route path="/concluidas" element={<ListarConcluidas />} />
          <Route path="/naoconcluidas" element={<ListarNaoConcluidas />} />
        </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
