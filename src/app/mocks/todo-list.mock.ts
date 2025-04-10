import { FormSelectModel, ListTasksModel } from "../model/todo-list-model";

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

export const mockListTasks: ListTasksModel[] =  [
    {
        id: 1743619265209,
        name: "Estudar Angular",
        idPriority: 3,
        idStatus: 2,
        dtExpiration: "2025-04-03T03:00:00.000Z",
        responsibleUser: "Felipe Akel Carvalho Florentino",
        dependencie: false,
        yesIdTaskDependencie: undefined,
        description: "O conteúdo é essencial para o desenvolvimento profissional. "
    },
    {
        id: 1743619313717,
        name: "Formulários Reativos",
        idPriority: 4,
        idStatus: 3,
        dtExpiration: "2025-04-01T03:00:00.000Z",
        responsibleUser: "",
        dependencie: true,
        yesIdTaskDependencie: 1743619265209,
        description: "O conteúdo é sobre os formulários reativos."
    },
    {
        id: 1743619354614,
        name: "API Rest",
        idPriority: 2,
        idStatus: 1,
        dtExpiration: "2025-04-15T03:00:00.000Z",
        responsibleUser: "Fulano da Silva",
        dependencie: false,
        yesIdTaskDependencie: undefined,
        description: "API é muito bom."
    },
    {
        id: 1743619401452,
        name: "Limpar a casa",
        idPriority: 1,
        idStatus: 1,
        dtExpiration: "2025-04-16T03:00:00.000Z",
        responsibleUser: "Ciclano de Castro",
        dependencie: false,
        yesIdTaskDependencie: undefined,
        description: "Um ambiente limpo é agradável "
    },
    {
        id: 1743619503947,
        name: "Revisão da bicicleta",
        idPriority: 1,
        idStatus: 1,
        dtExpiration: "2025-04-25T03:00:00.000Z",
        responsibleUser: "Mecânico Paulinho",
        dependencie: false,
        yesIdTaskDependencie: undefined,
        description: "Trocar a corrente e lubrificação dos componentes."
    },
    {
        id: 1743619599265,
        name: "Testes unitários",
        idPriority: 3,
        idStatus: 2,
        dtExpiration: "2025-04-30T03:00:00.000Z",
        responsibleUser: "Felipe Akel Carvalho Florentino",
        dependencie: true,
        yesIdTaskDependencie: 1743619265209,
        description: "Testes unitários são conteúdo para um profissional completo."
    },
    {
        id: 1743619712435,
        name: "Componentes do Angular",
        idPriority: 2,
        idStatus: 2,
        dtExpiration: "2025-04-26T03:00:00.000Z",
        responsibleUser: "",
        dependencie: true,
        yesIdTaskDependencie: 1743619265209,
        description: "Crie um componente utilizando o comando 'ng g c nome-componente' ou 'ng generete component nome-componente'"
    },
    {
        id: 1743619810177,
        name: "SQL com banco de dados",
        idPriority: 3,
        idStatus: 1,
        dtExpiration: "2025-06-19T03:00:00.000Z",
        responsibleUser: "",
        dependencie: false,
        yesIdTaskDependencie: undefined,
        description: "Linguagem de SQL para consultas"
    },
    {
        id: 1743619925041,
        name: "Conteúdo de Variáveis",
        idPriority: 3,
        idStatus: 3,
        dtExpiration: "2025-02-10T03:00:00.000Z",
        responsibleUser: "Ciclano da Silva ",
        dependencie: false,
        yesIdTaskDependencie: undefined,
        description: "Variáveis do tipo LET podem ter seus valores alterados; \nVariáveis do tipo CONST não podem ter seus valores alterados; "
    },
        {
        id: 1743619925049,
        name: "Somente dados obrigatórios",
        idPriority: 4,
        idStatus: 2,
        dtExpiration: undefined,
        responsibleUser: undefined,
        dependencie: false,
        yesIdTaskDependencie: undefined,
        description: undefined
    }
];
