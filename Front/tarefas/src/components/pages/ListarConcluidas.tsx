import React, { useEffect, useState } from 'react';
import { Tarefa} from '../../models/tarefa';

function ListarConcluidas() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  useEffect(() => {
    carregarTarefas();
  }, []);

  function carregarTarefas() {

    fetch("http://localhost:5000/tarefas/concluidas")
      .then((resposta) => resposta.json())
      .then((tarefas: Tarefa[]) => {
        console.table(tarefas);
        setTarefas(tarefas);
      });
  }

  return (
    <div>
      <main>
        <h1>Listar Tarefas concluidas</h1>
        <table>
          <thead>
            <tr>
              <th>Titulo</th>
              <th>Descrição</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tarefas.map(tarefa => (
              <tr key={tarefa.tarefaId}>
                <td>{tarefa.titulo}</td>
                <td>{tarefa.descricao}</td>
                <td>{tarefa.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default ListarConcluidas;