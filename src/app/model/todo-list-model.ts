export interface FormTaskCreateModel {
    name: string,
    idPriority: number,
    idStatus: number,
    dtExpiration: string,
    responsibleUser: string,
    dependencie: boolean,
    yesIdTaskDependencie?: number,
    description: string
};

export interface ListTasksModel extends FormTaskCreateModel {
    id: string,
};

export interface FormSelectModel {
    id: number, // TODO mudar para number
    name: string,
};