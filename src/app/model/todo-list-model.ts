export interface FormTaskModel {
    name: string,
    idPriority: number,
    idStatus: number,
    dtExpiration?: string,
    responsibleUser?: string,
    dependencie: boolean,
    yesIdTaskDependencie?: number,
    description?: string
};

export interface ListTasksModel extends FormTaskModel {
    id: number,
};

export interface FormSelectModel {
    id: number,
    name: string,
};

export interface DependencieTaksModel {
    id?: number,
    name?: string,
};
