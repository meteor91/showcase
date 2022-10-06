import React from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space, Select, Typography } from 'antd';
import { ITheme, TThemeFieldErrors } from '../models';
import { getQuestionSetErrors } from '../utils';

const { Text } = Typography;
const { Option } = Select;

interface IProps {
    onSubmit: (theme: ITheme) => void;
    isLoading?: boolean;
    prefill?: ITheme;
    serverError?: TThemeFieldErrors | null;
}

 export const ThemeForm: React.FC<IProps> = (props) => {

    const {onSubmit, prefill, serverError, isLoading} = props;

    const {questionsErrors, questionsSetErrors} = getQuestionSetErrors(serverError);

    return (
        <Form name="theme_form" onFinish={onSubmit} autoComplete="off" initialValues={prefill}>
            <Form.Item 
                label="Название"
                name="label"
                rules={[{ required: true }]}
                validateStatus={serverError?.label ? 'error' : ''}
                help={serverError?.label}
            >
                <Input />
            </Form.Item>

          <Form.List name="questionSet">
            {(fields, { add, remove }) => (
                <>
                    {fields.map(({ key, name, ...restField }) => (
                        <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                            <Form.Item
                                {...restField}
                                name={[name, 'label']}
                                rules={[{ required: true, message: 'Missing label' }]}
                                validateStatus={questionsSetErrors[key]?.label ? 'error' : ''}
                                help={questionsSetErrors[key]?.label}
                            >
                                <Input placeholder="Вопрос" />
                            </Form.Item>
                            <Form.Item
                                {...restField}
                                name={[name, 'answer']}
                                rules={[{ required: true, message: 'Missing answer' }]}
                                validateStatus={questionsSetErrors[key]?.answer ? 'error' : ''}
                                help={questionsSetErrors[key]?.answer}
                            >
                                <Input placeholder="Ответ" />
                            </Form.Item>
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
                            <MinusCircleOutlined onClick={() => remove(name)} />
                        </Space>
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
