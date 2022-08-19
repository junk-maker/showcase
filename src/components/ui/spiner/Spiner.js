import styled, {keyframes} from "styled-components";

const rotate360 = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;  
const Spinner = styled.div`
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: transparent;
    transform: translateZ(0);
    border-top: 2px solid #213c4a;
    border-left: 4px solid #213c4a;
    border-right: 2px solid #213c4a;
    border-bottom: 2px solid #213c4a;
    animation: ${rotate360} 1s linear infinite;
`;

export default Spinner;