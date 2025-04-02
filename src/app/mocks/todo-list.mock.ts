import { FormSelectModel } from "../model/todo-list-model";

export const mockPriority: FormSelectModel[] = [
    {
        id: 1,
        name: 'Baixa'
    }, {
        id: 2,
        name: 'Média'
    }, {
        id: 3,
        name: 'Alta'
    }, {
        id: 4,
        name: 'Urgente'
    }
];

export const mockStatus: FormSelectModel[] = [
    {
        id: 1,
        name: 'Pendente'
    }, {
        id: 2,
        name: 'Em Andamento'
    }, {
        id: 3,
        name: 'Concluída'
    }
];
