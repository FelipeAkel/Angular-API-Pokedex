export interface FormTaskCreateModel {
    name: string,
    priority: string,
    status: string,
    dtExpiration: string,
    responsibleUser: string,
    dependencie: boolean,
    yesTaskDependencie?: string,
    description: string
};

export interface ListTasksModel extends FormTaskCreateModel {
    id: string,
};

export interface FormSelect {
    id: string,
    name: string,
};