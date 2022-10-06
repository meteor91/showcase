import { useState } from 'react';
import { omit } from 'lodash';
import { TThemeFieldErrors } from './models';
import { InternalNamePath } from 'antd/lib/form/interface';

export const useServerValidation = () => {

    const [errors, setErrors] = useState<TThemeFieldErrors | null>();
    const clearFieldError = (fieldPaths: InternalNamePath[]) => {
        let newErrorsState = {...errors};

        fieldPaths.forEach(fieldPath => {
            //@ts-ignore
            newErrorsState = omit(newErrorsState, [fieldPath]);
        });
        setErrors(newErrorsState);
    }

    return {
        errors,
        setErrors,
        clearFieldError
    }
}

const serverError = {
    "label": [
        "Не разрешается использовать нецензурную брань"
    ],
    "question_set": [
        {},
        {
            "label": [
                "Не разрешается использовать нецензурную брань"
            ]
        }
    ]
}

const clientError = {
    "values": {
        "label": "",
        "questionSet": [
            {
                "id": 22,
                "label": "nm,",
                "answer": "bnm",
                "price": 100,
                "themeLabel": "kkkkkiihu"
            },
            {
                "id": 23,
                "label": "",
                "answer": "bnm",
                "price": 200,
                "themeLabel": "kkkkkiihu"
            }
        ]
    },
    "errorFields": [
        {
            "name": [
                "label"
            ],
            "serverValidationErrors": [
                "'label' is required"
            ],
            "warnings": []
        },
        {
            "name": [
                "questionSet",
                1,
                "label"
            ],
            "serverValidationErrors": [
                "Missing label"
            ],
            "warnings": []
        }
    ],
    "outOfDate": false
}