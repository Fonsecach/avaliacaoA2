import React, { useEffect, useState } from 'react';
import { Tarefa} from '../../models/tarefa';

function ListarTarefas() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  useEffect(() => {
    carregarTarefas();
  }, []);

  function carregarTarefas() {
    fetch("http://localhost:5000/tarefas/listar")
      .then((resposta) => resposta.json())
      .then((tarefas: Tarefa[]) => {
        console.table(tarefas);
        setTarefas(tarefas);
      });
  }

  function alterarStatusTarefa(tarefaId: string, novoStatus: string) {
    fetch(`http://localhost:5000/tarefas/alterar/${tarefaId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: novoStatus })
    })
      .then(() => carregarTarefas());
  }

  function handleStatusClick(tarefa: Tarefa) {
    let novoStatus;
    if (tarefa.status === "Não iniciada") {
      novoStatus = "Em andamento";
    } else if (tarefa.status === "Em andamento") {
      novoStatus = "Concluída";
    }
    if (novoStatus) {
      alterarStatusTarefa(tarefa.tarefaId, novoStatus);
    }
  }

  return (
    <div>
      <main>
        <h1>Listar Tarefas</h1>
        <table>
          <thead>
            <tr>
              <th>Titulo</th>
              <th>Descrição</th>
              <th>Status</th>
              <th>Atualizar status</th>
            </tr>
          </thead>
          <tbody>
            {tarefas.map(tarefa => (
              <tr key={tarefa.tarefaId}>
                <td>{tarefa.titulo}</td>
                <td>{tarefa.descricao}</td>
                <td>{tarefa.status}</td>
                <td>
                  <button onClick={() => handleStatusClick(tarefa)}>
                    Atualizar Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default ListarTarefas;
