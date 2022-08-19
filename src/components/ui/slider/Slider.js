import React, {useState} from 'react';
import styled, {css} from 'styled-components';

const SliderWrapper = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background-size: over;
    background-position: center;
`;
const SliderArrow = styled.div`
    z-index: 1;
    bottom: 25%;
    color: #fff;
    font-size: 45px;
    cursor: pointer;
    position: absolute;
    transform: translate(0, -50%);
    left: ${({left}) => (left ? '50px' : null)};
    right: ${({right}) => (right ? '50px' : null)};
`;
const SliderStyle = css`
    height: 100%;
    position: relative;
`;
const SliderBackground = styled.div`
    ${SliderStyle}
    transition-duration: 1s;
    transition-timing-function: ease;
    background-image: url(${({slides, index}) => (slides[index]?.image)});
`;
const SliderDotsContainer = styled.div`
    display: flex;
    justify-content: center;
`;
const SliderDot = styled.div`
    margin: 0 3px;
    color: #213c4a;
    cursor: pointer;
    font-size: 20px;
`;
const Slider = ({slides}) => {
    const [index, setIndex] = useState(0);

    const previous = () => {
      let isFirstSlide = index === 0;
      let newIndex = isFirstSlide ? slides.length - 1 : index - 1;
      setIndex(newIndex);
    };

    const next = () => {
      let isLastSlide = index === slides.length - 1;
      let newIndex = isLastSlide ? 0 : index + 1;
      setIndex(newIndex);
    };

    const slide = slideIndex => setIndex(slideIndex);

    return (
        <SliderWrapper>
            <>
                <SliderArrow onClick={previous} left={true}>❰</SliderArrow>
                <SliderArrow onClick={next} right={true}>❱</SliderArrow>
            </>
            <SliderBackground slides={slides} index={index}></SliderBackground>
            <SliderDotsContainer>
                {slides.map((val, idx) => {
                    return (
                        <SliderDot key={val.id} onClick={() => slide(idx)}>●</SliderDot>
                    );
                })}
            </SliderDotsContainer>
        </SliderWrapper>
    )
};


export default Slider;