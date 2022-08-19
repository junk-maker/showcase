import styled from 'styled-components';
import Dropdown from '../ui/dropdown/Dropdown';
import React, {memo, useCallback} from 'react';

const SortingWrapper = styled.div`
    width: 900px;
    margin 0 auto;
    display: flex;
    padding-top: 50px;
`;
const SortingContent = styled.div`
    display: flex;
    color: #213c4a;
    text-align: start;
    justify-content: space-between; 
`;
const SortingTitle = styled.div`
    width: 180px;    
`;
const SortingBy = styled.div`
    width: 180px;
`;
const Filtering = styled.div`
    width: 180px;
    cursor: pointer;
`;
const SortingBySpan = styled.span`
    cursor: pointer;
`;

const Sorting = memo(({rating, helpers, release, setType, platform, setRating, setRelease, setPlatform}) => {
    const defaultHandler = useCallback(() => {
        helpers();
        setType('main');
    }, [helpers, setType]);

    const ratingHandler = useCallback(() => {
        if (rating === null) {
            helpers();
            setRating(true);
            setType('rating-top');
        } else {
            let top = () => {
                helpers();
                setRating(true);
                setType('rating-top');
            };
            let bottom = () => {
                helpers();
                setRating(false);
                setType('rating-bottom');
            };
            rating ? bottom() : top();
        };
    }, [rating, setType, helpers, setRating]);

    const dateHandler = useCallback(() => {
        if (release === null) {
            helpers();
            setRelease(true);
            setType('released-top');
        } else {
            let top = () => {
                helpers();
                setRelease(true);
                setType('released-top');
            };
            let bottom = () => {
                helpers();
                setRelease(false);
                setType('released-bottom');
            };
            release ? bottom() : top();
        };
    }, [helpers, release, setType, setRelease]);

    return (
        <SortingWrapper>
            <SortingContent>
                <SortingTitle>Сортировка по:</SortingTitle>
                <SortingBy onClick={defaultHandler}><SortingBySpan>По умолчанию</SortingBySpan></SortingBy>
                <SortingBy onClick={ratingHandler}><SortingBySpan>Рейтинг</SortingBySpan></SortingBy>
                <SortingBy onClick={dateHandler}><SortingBySpan>Дата релиза</SortingBySpan></SortingBy>
                <Filtering>
                    <Dropdown helpers={helpers} setType={setType} platform={platform} setPlatform={setPlatform} placeholder={'Платформы'}/>
                </Filtering>
            </SortingContent>
        </SortingWrapper>
    )
});


export default Sorting;