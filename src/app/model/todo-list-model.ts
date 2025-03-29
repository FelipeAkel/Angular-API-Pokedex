export interface TasksModel {
    id: number,
    code: string,
    name: string,
    priority: string,
    status: string,
    dtExpiration: string,
    responsibleUser: string,
    dependencie: boolean,
    yesTaskDependencie?: string,
    description: string
};
