import { Categoria } from "./categoria";

export interface Tarefa {
    tarefaId: string;
    titulo: string | null;
    descricao: string | null;
    criadoEm: string;
    categoria: Categoria | null;
    categoriaId: string | null;
    status: string | null;
}