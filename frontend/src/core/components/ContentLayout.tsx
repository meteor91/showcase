import React from 'react';
import { Layout, Col, Row } from 'antd';

const { Content } = Layout;

const contentStyle = {
    margin: '24px 16px',
    padding: 24,
    minHeight: 280,
}

interface IProps {
    breadcrumbs?: React.ReactNode;
    content: React.ReactNode
}

export const ContentLayout: React.FC<IProps> = (props) => {
    const {breadcrumbs, content} = props;

    return (
        <Content
            className="site-layout-background"
            style={contentStyle}
        >
            {breadcrumbs && (
                <Row>
                    <Col span={24}>
                        {breadcrumbs}
                    </Col>
                </Row>
            )}
            <Row style={{height: "100%"}}>
                <Col span={24}>
                    {content}
                </Col>
            </Row>
        </Content>
    );
};
