export interface IPaginatedData<T> {
    total: number;
    offset?: number;
    // next: string;
    // previous: string;
    results: T[];
}