import List from '../list/List';
import styled from 'styled-components';
import Sorting from '../sorting/Sorting';
import Spinner from '../ui/spiner/Spiner';
import useMain from '../../hooks/main-hook';
import React, {memo, useMemo, useEffect, useCallback} from 'react';

const MainWrapper = styled.section`
    position: relative;
`;
const MainSpinerBox = styled.div`
    left: 50%;
    bottom: 50%;
    position: absolute;
`;

const Main = memo(({api, page, setId, games, count, helpers, setStatus}) => {
    const {
        type, rating, release, platform, loading,
        setType, setRating, setRelease, setLoading, setPlatform, 
    } = useMain();

    const platforms = useMemo(() => `platforms=${platform?.value}`, [platform?.value]);
    const ordering = useMemo(() => rating !== null ? rating === true ? 'ordering=-rating' :'ordering=rating' : null, [rating]);
    const released = useMemo(() => release !== null ? release === true ? 'ordering=-released' :'ordering=released' : null, [release]);
      
    const urls = useMemo(() => {
        return {
            main: `https://rawg.io/api/games?key=${process.env.REACT_APP_KEY}&page=${page}`,
            'platforms': `https://rawg.io/api/games?key=${process.env.REACT_APP_KEY}&page=${page}&${platforms}`,
            'rating-top': `https://rawg.io/api/games?key=${process.env.REACT_APP_KEY}&page=${page}&${ordering}`,
            'released-top': `https://rawg.io/api/games?key=${process.env.REACT_APP_KEY}&page=${page}&${released}`,
            'rating-bottom': `https://rawg.io/api/games?key=${process.env.REACT_APP_KEY}&page=${page}&${ordering}`,
            'released-bottom': `https://rawg.io/api/games?key=${process.env.REACT_APP_KEY}&page=${page}&${released}`,
        };
    }, [page, ordering, released, platforms]);

    const scrollHandler = useCallback(e => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100 && games.length < count) {
            setStatus(true);
        };
    }, [count, setStatus, games.length]);
    
    useEffect(() => {
        if (games.length === 0) {
            setLoading(true);
        } else {
            setLoading(false);
        };
        localStorage.removeItem('id');
        localStorage.removeItem('slug');
    }, [games.length, setLoading]);

    useEffect(() => api.getGame(urls[type]), [api, type, urls]);

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler);
        return () => document.removeEventListener('scroll', scrollHandler);
    }, [scrollHandler]);

    return (
        <MainWrapper>
            {loading ? <MainSpinerBox><Spinner/></MainSpinerBox> : <>
            <Sorting 
                rating={rating}
                helpers={helpers}
                release={release}
                setType={setType}
                platform={platform}
                setRating={setRating}
                setRelease={setRelease}
                setPlatform={setPlatform}
            />
                <List setId={setId} games={games} setStatus={setStatus}/>
            </>}
        </MainWrapper>
    );
});


export default Main;