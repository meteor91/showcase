const paginationKey = 'pagination';

export const paginationStorage = {
    setItem(key: string, value: number) {
        sessionStorage.setItem(`${paginationKey}-${key}`, `${value}`)
    },
    getItem(key: string): number {
        const val = sessionStorage.getItem(`${paginationKey}-${key}`);
        
        if (val) {
            return +val;
        }

        return 1;
    },
}
