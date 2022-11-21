import React from 'react';
import { useTranslation } from "react-i18next";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Row, Col, Space } from 'antd';
import { ITheme } from '../models';

const { Option } = Select;

interface IProps {
    onSubmit: (theme: ITheme) => void;
    isLoading?: boolean;
    prefill?: ITheme;
    onCancel?: () => void;
}

const iconStyle: React.CSSProperties = {
    display: 'flex', 
    flexDirection: 'row-reverse',
    marginTop: '8px',
}

export const ThemeForm: React.FC<IProps> = (props) => {

    const {onSubmit, onCancel, prefill, isLoading} = props;
    const {t} = useTranslation();

    return (
        <Form
            name="theme_form" 
            onFinish={onSubmit}
            autoComplete="off"
            initialValues={prefill}
            data-testid="themeForm"
        >
            <Form.Item 
                label={t('themes.fieldNames.label')}
                name="label"
                rules={[{ required: true, message: t('common.formErrors.required') }]}
                data-testid="themeLabel-item"
            >
                <Input />
            </Form.Item>

          <Form.List name="questionSet">
            {(fields, { add, remove }) => (
                <>
                    {fields.map(({ key, name, ...restField }) => (
                        <Row key={key} data-testid={`questionItem-${key}`}>
                            <Col lg={14} xs={24}>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'label']}
                                    rules={[{ required: true, message: t('common.formErrors.required') }]}
                                    data-testid={`questionLabel-${key}-item`}
                                >
                                    <Input placeholder={t('themes.questions.label')} />
                                </Form.Item>
                            </Col>
                            <Col lg={5} xs={24}>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'answer']}
                                    rules={[{ required: true, message: t('common.formErrors.required') }]}
                                    data-testid={`questionAnswer-${key}-item`}
                                >
                                    <Input placeholder={t('themes.questions.answer')} />
                                </Form.Item>
                            </Col>
                            <Col lg={4} xs={16}>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'price']}
                                    rules={[{ required: true, message: t('common.formErrors.required') }]}
                                    data-testid={`questionPrice-${key}-item`}
                                >
                                    <Select
                                        style={{ width: 120 }}
                                        placeholder={t('themes.questions.price')}
                                        data-testid="select"
                                    >
                                        <Option value="100" data-testid={`questionPrice-${key}-value-100`}>100</Option>
                                        <Option value="200" data-testid={`questionPrice-${key}-value-200`}>200</Option>
                                        <Option value="300" data-testid={`questionPrice-${key}-value-300`}>300</Option>
                                        <Option value="400" data-testid={`questionPrice-${key}-value-400`}>400</Option>
                                        <Option value="500" data-testid={`questionPrice-${key}-value-500`}>500</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col lg={1} style={iconStyle} xs={8}>
                                <MinusCircleOutlined
                                    onClick={() => remove(name)}
                                    data-testid={`questionDelete-${key}-item`}
                                />
                            </Col>
                        </Row>
                    ))}
                    <Form.Item data-testid="addQuestion-item">
                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                            {t('themes.addQuestion')}
                        </Button>
                    </Form.Item>
                </>
            )}
            </Form.List>
            <Form.Item data-testid="formSubmit-item">
                <Space>
                    <Button data-testid="submit" type="primary" htmlType="submit" disabled={isLoading}>
                        {t('common.action.submit')}
                    </Button>
                    {onCancel && (
                        <Button data-testid="cancel" onClick={onCancel}>
                            {t('common.action.cancel')}
                        </Button>
                    )}
                </Space>
            </Form.Item>
        </Form>
    );
}
