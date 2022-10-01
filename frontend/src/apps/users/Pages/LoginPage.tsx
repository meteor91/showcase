import React from 'react';
import { useDispatch } from 'react-redux';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Layout, Row, Col, Button, Form, Input } from 'antd';
import { ServerValidateErrors } from 'core/models';
import { loginUser } from '../api';
import { ILoginForm, IUserState } from '../models';
import { setCurrentUser } from '../slices';

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
                navigate('/themes/list');
            },
            onError: (error) => {console.log(error);}
        });
    };

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
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>
                
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>
                
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit" disabled={mutation.isLoading}>
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </Layout>
    );
};
