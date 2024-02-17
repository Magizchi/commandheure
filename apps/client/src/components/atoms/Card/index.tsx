import React, { FunctionComponent } from "react";
import { Card as CardAnt, CardProps as CardAntProps } from "antd";

interface CardProps extends CardAntProps {
  children: React.ReactNode;
}

const Card: FunctionComponent<CardProps> = ({ children, ...props }) => <CardAnt {...props}>{children}</CardAnt>;

export default Card;
