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