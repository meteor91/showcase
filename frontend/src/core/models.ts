/**
 * Структура пагинированного списка.
 *
 * @prop total Общее количество элементов.
 * @prop offset Отступ от начала.
 * @prop result Текущий срез элементов.
 */
export interface IPaginatedData<T> {
    total: number;
    offset: number;
    results: T[];
}
