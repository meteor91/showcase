import React, { useEffect, useState } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Drawer, Row, Col } from 'antd';
import { ITheme, TThemeFieldErrors } from '../models';
import { ThemeServerValidationErrors } from './ThemeServerValidationErrors';

const { Option } = Select;

interface IProps {
    onSubmit: (theme: ITheme) => void;
    isLoading?: boolean;
    prefill?: ITheme;
    serverValidationErrors?: TThemeFieldErrors | null;
}

const iconStyle: React.CSSProperties = {
    display: 'flex', 
    flexDirection: 'row-reverse',
    marginTop: '8px',
}

export const ThemeForm: React.FC<IProps> = (props) => {

    const {onSubmit, prefill, serverValidationErrors, isLoading} = props;
    const [drawlerOpened, setDrawlerOpened] = useState(false);

    useEffect(() => {
        serverValidationErrors && setDrawlerOpened(true);
    }, [serverValidationErrors]);

    return (
        <Form
            name="theme_form" 
            onFinish={onSubmit}
            autoComplete="off"
            initialValues={prefill}
        >
            <Form.Item 
                label="Название"
                name="label"
                rules={[{ required: true }]}
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
                                >
                                    <Input placeholder="Вопрос" />
                                </Form.Item>
                            </Col>
                            <Col lg={5} xs={24}>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'answer']}
                                    rules={[{ required: true, message: 'Missing answer' }]}
                                >
                                    <Input placeholder="Ответ" />
                                </Form.Item>
                            </Col>
                            <Col lg={4} xs={16}>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'price']}
                                    rules={[{ required: true, message: 'Missing price' }]}
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
                    ))}
                    <Form.Item>
                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                            Add field
                        </Button>
                    </Form.Item>
                </>
            )}
            </Form.List>
            <Form.Item>
                <Button type="primary" htmlType="submit" disabled={isLoading}>
                    Отправить
                </Button>
            </Form.Item>
            <Drawer open={drawlerOpened} onClose={() => setDrawlerOpened(false)}>
                <ThemeServerValidationErrors serverErrors={serverValidationErrors}/>
            </Drawer>
        </Form>
    );
}
