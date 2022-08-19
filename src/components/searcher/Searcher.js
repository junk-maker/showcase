import List from '../list/List';
import styled from 'styled-components';
import Spinner from '../ui/spiner/Spiner';
import useMain from '../../hooks/main-hook';
import React, {memo, useMemo, useEffect} from 'react';

const SearcherWrapper = styled.section`
    position: relative;
`;
const SearcherSpinerBox = styled.div`
    left: 50%;
    bottom: 50%;
    position: absolute;
`;

const Searcher = memo(({api, setId, games, setStatus}) => {
    const {loading, setLoading} = useMain();
    const link = useMemo(() => `https://rawg.io/api/games?key=${process.env.REACT_APP_KEY}&search=${localStorage.getItem('slug')}`, [])

    useEffect(() => {
        if (games.length === 0) {
            setLoading(true);
        } else {
            setLoading(false);
        };
    }, [games.length, setLoading]);

    useEffect(() => {
        if (games.length === 0) {
            api.getSearch(link);
        };
    }, [api, link, games]);

    return (
        <SearcherWrapper>
            {loading ? <SearcherSpinerBox><Spinner/></SearcherSpinerBox> : <List setId={setId} games={games} setStatus={setStatus}/>}
        </SearcherWrapper>
    );
});


export default Searcher;