export interface IPaginatedData<T> {
    count: number;
    next: string;
    previous: string;
    results: T[];
}