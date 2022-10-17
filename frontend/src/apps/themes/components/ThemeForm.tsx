import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
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
    const {t} = useTranslation();
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
                label={t('themes.fieldNames.label')}
                name="label"
                rules={[{ required: true, message: t('common.formErrors.required') }]}
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
                                >
                                    <Input placeholder={t('themes.questions.label')} />
                                </Form.Item>
                            </Col>
                            <Col lg={5} xs={24}>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'answer']}
                                    rules={[{ required: true, message: t('common.formErrors.required') }]}
                                >
                                    <Input placeholder={t('themes.questions.answer')} />
                                </Form.Item>
                            </Col>
                            <Col lg={4} xs={16}>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'price']}
                                    rules={[{ required: true, message: t('common.formErrors.required') }]}
                                >
                                    <Select style={{ width: 120 }} placeholder={t('themes.questions.price')}>
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
                            {t('themes.addQuestion')}
                        </Button>
                    </Form.Item>
                </>
            )}
            </Form.List>
            <Form.Item>
                <Button type="primary" htmlType="submit" disabled={isLoading}>
                    {t('common.action.submit')}
                </Button>
            </Form.Item>
            <Drawer open={drawlerOpened} onClose={() => setDrawlerOpened(false)}>
                <ThemeServerValidationErrors serverErrors={serverValidationErrors}/>
            </Drawer>
        </Form>
    );
}
