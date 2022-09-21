export interface IPaginatedData<T> {
    count: number;
    next: number;
    previous: number;
    results: T[];
}