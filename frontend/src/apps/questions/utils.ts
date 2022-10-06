import { TThemeFieldErrors, TQuestionSet } from "./models";

/** 
 * DRF возвращает в questionSet ошибки в разных форматах, в зависимости от характера ошибки.
 * Если ошибка валидации внутри Question, возвращается список ошибок по каждой невалидной сущности.
 * Если ошибка валидации внутри Theme, возвращается массив строк с текстом ошибок.
 *
 * Попробовать научить DRF возвращать 2 разных поля.
 */
export const getQuestionSetErrors = (errors?: TThemeFieldErrors | null): {
    questionsSetErrors: TQuestionSet;
    questionsErrors: string[];
}  => {
    const isErrorInSet = typeof errors?.questionSet?.[0] !== 'string';
    return {
        questionsSetErrors: isErrorInSet && errors?.questionSet ? errors.questionSet as TQuestionSet : [],
        questionsErrors: !isErrorInSet && errors?.questionSet ? errors.questionSet as string[] : [],
    }
}