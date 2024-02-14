import React, { FunctionComponent } from 'react';

interface LinkProps {
    href: string;
    children: React.ReactNode;
    className: string;
}

const Link: FunctionComponent<LinkProps> = ({ children, ...props }) => <a {...props}>{children}</a>


export default Link