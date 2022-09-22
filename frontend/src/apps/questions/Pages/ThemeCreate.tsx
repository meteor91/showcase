import React from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space, Select  } from 'antd';
import { useNavigate } from "react-router-dom";
import { useMutation } from 'react-query';
import { createTheme } from '../api';

const { Option } = Select;

export const ThemeCreate: React.FC = () => {
    const mutation = useMutation(createTheme)
    const navigate = useNavigate();

    const onFinish = (values: any) => {
        mutation.mutate(values, {
            onSuccess: () => navigate('/themes/list')
        });
    };
    

    return (
        <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
            <Form.Item label="Название" name="label" rules={[{ required: true }]}>
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
                    >
                      <Input placeholder="Вопрос" />
                    </Form.Item>
                    <Form.Item
                        {...restField}
                        name={[name, 'answer']}
                        rules={[{ required: true, message: 'Missing answer' }]}
                    >
                      <Input placeholder="Ответ" />
                    </Form.Item>
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
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      );
}