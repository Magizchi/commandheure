import React from 'react';
import { InputNumber as InputNumberAnt, InputNumberProps as InputNumberAntProps } from 'antd';

interface InputNumberProps extends InputNumberAntProps { }

const InputNumber: React.FunctionComponent<InputNumberProps> = ({ ...props }) => (
    <InputNumberAnt size="large" min={0} max={200} {...props} />
);

export default InputNumber;
