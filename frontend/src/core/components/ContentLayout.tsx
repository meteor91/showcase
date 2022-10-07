import React from 'react';
import { Layout } from 'antd';
import { SpaceVertical } from './SpaceVertical';

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
            <SpaceVertical>
                {breadcrumbs}
                {content}
            </SpaceVertical>
        </Content>
    );
};
