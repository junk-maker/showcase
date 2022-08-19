import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: grid;
    min-height: 100vh;
    grid-template-columns: 100%;
    grid-template-rows: auto 1fr auto;
`;

const Frame = ({children}) => <Wrapper>{children}</Wrapper>;


export default Frame;