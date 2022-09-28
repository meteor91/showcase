export interface IQuestion {
    id?: string;
    label: string;
    answer: string;
    price: number;
    themeLabel?: string;
}

export interface ITheme {
    id?: string;
    label: string;
    questionSet?: IQuestion[]
}

export type TQuestionSet = {
    [K in keyof Partial<Omit<IQuestion, 'id' | 'themeLabel'>>]: string[];
}[];

/** Для сложных форм на данный момент проще вручную создавать модель ошибок. */
export type TThemeFieldErrors = {
    label?: string[];
    questionSet?: TQuestionSet[] | string[];
}