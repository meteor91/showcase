export interface IQuestion {
    id?: string;
    label: string;
    answer: string;
    price: number;
    themeLabel?: string;
}

export enum EThemeStatus {
    ON_MODERATION = 'ON_MODERATION',
    ACCEPTED = 'ACCEPTED',
    DECLINED = 'DECLINED',
}

export interface ITheme {
    id?: string;
    label: string;
    questionSet?: IQuestion[];
    status: EThemeStatus;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
}

export type TQuestionSet = {
    [K in keyof Partial<Omit<IQuestion, 'id' | 'themeLabel'>>]: string[];
};

/** Для сложных форм на данный момент проще вручную создавать модель ошибок. */
export type TThemeFieldErrors = {
    label?: string[];
    questionSet?: TQuestionSet[] | string[];
}