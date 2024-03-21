import React, { FunctionComponent } from "react";
import AsyncSelect from 'react-select/async';
import type { AsyncProps } from 'react-select/async';

interface SelectProps extends AsyncProps<any, any, any> {
    myOnChange: (search: string) => void;
    className?: string;
    blurLeSelect: any;
}

const MySelect: FunctionComponent<SelectProps> = ({ myOnChange, className = '', blurLeSelect, ...props }) => {
    return (
        <AsyncSelect cacheOptions onChange={blurLeSelect} loadOptions={myOnChange} className={className} isClearable={true} {...props} />
    );
};

export default MySelect;