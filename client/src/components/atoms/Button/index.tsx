import React, { FunctionComponent } from "react";
import { Button as ButtonAnt, ButtonProps as ButtonAntProps } from "antd";

interface ButtonProps extends ButtonAntProps {}

const Button: FunctionComponent<ButtonProps> = ({ children, ...props }) => <ButtonAnt {...props}>{children}</ButtonAnt>;

export default Button;
