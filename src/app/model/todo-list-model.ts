export interface FormTaskCreateModel {
    name: string,
    idPriority: number,
    idStatus: number,
    dtExpiration?: string,
    responsibleUser?: string,
    dependencie: boolean,
    yesIdTaskDependencie?: number,
    description?: string
};

export interface ListTasksModel extends FormTaskCreateModel {
    id: number,
};

export interface FormSelectModel {
    id: number,
    name: string,
};