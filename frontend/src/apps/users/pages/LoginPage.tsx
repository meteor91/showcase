import React from 'react';
import { useDispatch } from 'react-redux';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Layout, Row, Col, Button, Form, Input, Typography } from 'antd';
import { ServerValidateErrors } from 'core/models';
import { loginUser } from '../api';
import { ILoginForm, IUserState } from '../models';
import { setCurrentUser } from '../slices';
import { routeMap } from 'core/routeMap';

const { Text } = Typography;

const styles = {
    login: {height: '100vh'},
};

export const LoginPage: React.FC = () => {
    const mutation = useMutation<IUserState, ServerValidateErrors<ILoginForm>, ILoginForm>(loginUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onFinish = (values: ILoginForm) => {
        mutation.mutate(values, {
            onSuccess: (result: IUserState) => {
                dispatch(setCurrentUser(result));
                navigate(routeMap.themes.list.path);
            },
            onError: (error) => {console.log(error);}
        });
    };

    console.log('mutation.error', mutation.error)

    return (
        <Layout style={styles.login}>
            <Row justify="space-around" align="middle" style={styles.login}>
                <Col span={16}>
                    <Form
                        name="login"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        autoComplete="off"
                        // поиграться с этим свойством
                        // onFinishFailed={}
                    >
                        <Form.Item
                            label="Имя пользователя"
                            name="username"
                            rules={[{ required: true, message: 'Введите имя пользователя' }]}
                            data-testid="username-item"
                        >
                            <Input />
                        </Form.Item>
                
                        <Form.Item
                            label="Пароль"
                            name="password"
                            rules={[{ required: true, message: 'Введите пароль' }]}
                            data-testid="password-item"
                        >
                            <Input.Password />
                        </Form.Item>

                        {/* <Form.Item
                            label=""
                            
                            data-testid="serverError-item"
                        >
                            {mutation.error?.nonFieldErrors && <Text type="danger">{mutation.error.nonFieldErrors}</Text>}
                        </Form.Item> */}
                        {mutation.error?.nonFieldErrors && (
                            <Row style={{marginBottom: 24}} data-testid="serverError-item">
                                <Col offset={8} span={16}>
                                    <Text type="danger">{mutation.error.nonFieldErrors}</Text>
                                </Col>
                            </Row>
                        )}
                        
                
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit" disabled={mutation.isLoading} data-testid="submit">
                                Отправить
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </Layout>
    );
};
