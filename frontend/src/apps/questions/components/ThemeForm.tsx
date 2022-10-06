import React, { useEffect, useCallback } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Typography, Row, Col } from 'antd';
import { ITheme, TThemeFieldErrors } from '../models';
import { getQuestionSetErrors } from '../utils';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import { useServerValidation } from '../useServerValidation';

const { Text } = Typography;
const { Option } = Select;

interface IProps {
    onSubmit: (theme: ITheme) => void;
    isLoading?: boolean;
    prefill?: ITheme;
    serverError?: TThemeFieldErrors | null;
}

const iconStyle: React.CSSProperties = {
    display: 'flex', 
    flexDirection: 'row-reverse',
    marginTop: '8px',
}

 export const ThemeForm: React.FC<IProps> = (props) => {

    const {onSubmit, prefill, serverError, isLoading} = props;
    const {errors, setErrors, clearFieldError} = useServerValidation();

    useEffect(() => {
        serverError && setErrors(serverError);
        serverError && console.log('serverError', serverError)
    }, [serverError])

    const finishFailed = (errors: ValidateErrorEntity<ITheme>) => {
        clearFieldError(errors.errorFields.map(errorField => errorField.name));
        console.log(errors)
    };

    const {questionsErrors, questionsSetErrors} = getQuestionSetErrors(errors);

    const handleSubmit = useCallback((form: ITheme) => {
        setErrors(null);
        onSubmit(form);
    }, []);

    return (
        <Form 
            name="theme_form" 
            onFinish={handleSubmit} 
            autoComplete="off" 
            initialValues={prefill}
            onFinishFailed={finishFailed}
        >
            <Form.Item 
                label="Название"
                name="label"
                rules={[{ required: true }]}
                validateStatus={errors?.label ? 'error' : ''}
                help={errors?.label}
            >
                <Input />
            </Form.Item>

          <Form.List name="questionSet">
            {(fields, { add, remove }) => (
                <>
                    {fields.map(({ key, name, ...restField }) => (
                            <Row key={key}>
                                <Col lg={14} xs={24}>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'label']}
                                        rules={[{ required: true, message: 'Missing label' }]}
                                        validateStatus={questionsSetErrors[key]?.label ? 'error' : ''}
                                        help={questionsSetErrors[key]?.label}
                                    >
                                        <Input placeholder="Вопрос" />
                                    </Form.Item>
                                </Col>
                                <Col lg={5} xs={24}>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'answer']}
                                        rules={[{ required: true, message: 'Missing answer' }]}
                                        validateStatus={questionsSetErrors[key]?.answer ? 'error' : ''}
                                        help={questionsSetErrors[key]?.answer}
                                    >
                                        <Input placeholder="Ответ" />
                                    </Form.Item>
                                </Col>
                                <Col lg={4} xs={16}>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'price']}
                                        rules={[{ required: true, message: 'Missing price' }]}
                                        validateStatus={questionsSetErrors[key]?.price ? 'error' : ''}
                                        help={questionsSetErrors[key]?.price}
                                    >
                                        <Select style={{ width: 120 }}>
                                            <Option value="100">100</Option>
                                            <Option value="200">200</Option>
                                            <Option value="300">300</Option>
                                            <Option value="400">400</Option>
                                            <Option value="500">500</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col lg={1} style={iconStyle} xs={8}>
                                    <MinusCircleOutlined onClick={() => remove(name)} />
                                </Col>
                            </Row>
                        // </Space>
                    ))}
                    <Form.Item>
                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                            Add field
                        </Button>
                    </Form.Item>
                </>
            )}
            </Form.List>
            {questionsErrors.map((error: string) => (
                <Text type="danger" key={error}>{error}</Text>
            ))}
            <Form.Item>
                <Button type="primary" htmlType="submit" disabled={isLoading}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}
