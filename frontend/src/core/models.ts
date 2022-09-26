export interface IPaginatedData<T> {
    total: number;
    offset?: number;
    results: T[];
}

export interface IServerError {
    code: string;
    message: string;
    response: {
        data: {
            [key: string]: string;
        }
    }
}