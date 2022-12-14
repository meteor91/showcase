import React from 'react';
import { useDispatch } from 'react-redux';
import { useMutation } from 'react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Layout, Row, Col, Button, Form, Input, Typography } from 'antd';
import { ServerValidateErrors } from 'core/models';
import { loginUser } from 'core/auth/api';
import { ILoginForm, IUser } from 'apps/users/models';
import { setAuthorized } from 'core/auth/slices';
import { routeMap } from 'core/routeMap';

const { Text } = Typography;

const styles = {
    login: {height: '100vh'},
};

export const LoginPage: React.FC = () => {
    const mutation = useMutation<IUser, ServerValidateErrors<ILoginForm>, ILoginForm>(loginUser);
    const navigate = useNavigate();
    let [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const {t} = useTranslation();

    const onFinish = (values: ILoginForm) => {
        mutation.mutate(values, {
            onSuccess: (user: IUser) => {
                dispatch(setAuthorized(user));
                const redirectTo = searchParams.get('redirectTo')
                navigate(redirectTo ? redirectTo : routeMap.themes.list.path);
            }
        });
    };

    return (
        <Layout style={styles.login}>
            <Row justify="space-around" align="middle" style={styles.login}>
                <Col span={16}>
                    <Form
                        name="login"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 8 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        autoComplete="off"
                        // поиграться с этим свойством
                        // onFinishFailed={}
                    >
                        <Form.Item
                            label={t('login.form.username.label')}
                            name="username"
                            rules={[{ required: true, message: t('login.form.username.rules.required')}]}
                            data-testid="username-item"
                        >
                            <Input />
                        </Form.Item>
                
                        <Form.Item
                            label={t('login.form.password.label')}
                            name="password"
                            rules={[{ required: true, message: t('login.form.password.rules.required') }]}
                            data-testid="password-item"
                        >
                            <Input.Password />
                        </Form.Item>

                        {mutation.error?.nonFieldErrors && (
                            <Row style={{marginBottom: 24}} data-testid="serverError-item">
                                <Col offset={8} span={8}>
                                    <Text type="danger">{mutation.error.nonFieldErrors}</Text>
                                </Col>
                            </Row>
                        )}
                
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit" disabled={mutation.isLoading} data-testid="submit">
                                {t('common.action.submit')}
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </Layout>
    );
};
