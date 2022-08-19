import React from 'react';
import styled from 'styled-components';

const Search = styled.input`
    height: 40px;
    width: 450px;
    outline: none;
    border-radius: 4px;
    position: relative;
    background: #ecf0f1;
    border: 1px solid #ecf0f1;
    padding: 0px 32px 0px 32px;
`;
const Input = ({type, value, onChange, placeholder}) => {
    const inputType = type || 'text';

    return (
        <Search 
            value={value}
            type={inputType}
            onChange={onChange}
            placeholder={placeholder}
        />
    );
};


export default Input;
