import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tarefa } from '../../models/tarefa';
import { Categoria } from '../../models/categoria';

function CadastrarTarefa() {
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoriaId, setCategoriaId] = useState<string>("");
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    carregarCategorias();
  }, []);

  function carregarCategorias() {
    fetch("http://localhost:5000/categoria/listar")
      .then((resposta) => resposta.json())
      .then((categorias: Categoria[]) => {
        console.table(categorias);
        setCategorias(categorias);
      });
  }

  function cadastrarTarefa(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const tarefa: Partial<Tarefa> = {
      titulo,
      descricao,
      categoriaId,
      status: 'Não iniciada'
    };

    fetch("http://localhost:5000/tarefas/cadastrar", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(tarefa)
    })
    .then(response => {
      if (response.ok) {
        navigate('/tarefas'); // Navegar para a lista de tarefas após cadastrar
      }
    });
  }

  return (
    <div>
      <main>
        <h1>Cadastrar Tarefa</h1>
        <form onSubmit={cadastrarTarefa}>
          <br />
          <label>Titulo</label>
          <input type="text" name="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
          
          <br />
          <label>Descrição</label>
          <textarea name="descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
          <br />
          <label>Categoria</label>
          <select name="categoriaId" value={categoriaId} onChange={(e) => setCategoriaId(e.target.value)}>
            <option value="">Selecione uma categoria</option>
            {categorias.map(categoria => (
              <option key={categoria.categoriaId} value={categoria.categoriaId}>
                {categoria.nome}
              </option>
            ))}
          </select>
          <br />
          <input type="submit" value="Cadastrar" />
        </form>
      </main>
    </div>
  );
}

export default CadastrarTarefa;