import {Link} from 'react-router-dom';
import styled from 'styled-components';
import Slider from '../ui/slider/Slider';
import Spinner from '../ui/spiner/Spiner';
import useMain from '../../hooks/main-hook';
import React, {memo, useMemo, useEffect} from 'react';

const DescriptionWrapper = styled.section`
    height: 100%;
`;
const DescriptionContent = styled.div`
    height: 100%;
    padding: 40px;
`;
const DescriptionBack = styled.div`
    display: flex;
    margin-bottom: 30px;
    align-items: center;
    justify-content: space-between;
`;
const Back = styled.button`
    border: none;
    outline: none;
    color: #213c4a;
    font-size: 16px;
    cursor: pointer;
    font-weight: 400;
    line-height: 16px;
    align-items: center;
    display: inline-flex;
`;
const DescriptionGames = styled.div`
    display: flex;
    margin-top: 50px;
`;
const DescriptionPoster = styled.div`
    flex-shrink: 0;
    margin-right: 50px;
    width: fit-content;
    position: relative;
`;
const DescriptioPosterImg = styled.img`
    width: 300px;
    height: auto;
    overflow: hidden;
    object-fit: cover;
    aspect-ratio: 2/3;
    position: relative;
    border-radius: 5px;
`;
const DescriptionPosterRating = styled.span`
    top: 10px;
    left: 10px;
    z-index: 4;
    color: #fff;
    display: flex;
    font-size: 16px;
    padding: 2px 8px;
    font-weight: 400;
    line-height: 24px;
    text-align: center;
    border-radius: 5px;
    position: absolute;
    align-items: center;
    background-color: #008000;
`;
const DescriptionMain = styled.div`
    width: 100%;
`;
const DescriptionGameTitle = styled.h2`
    color: #213c4a;
    font-size: 18px;
    max-width: 650px;
    font-weight: 400;
    line-height: 48px;
    margin-bottom: 20px;
`;
const DescriptionGameLink = styled.span`
    display: block;
    font-size: 16px;
    font-weight: 300;
    line-height: 28px;
    margin-bottom: 25px;
    color: rgba(0,0,0,.5);
`;
const DescriptionGameSubTitle = styled.h3`
    color: #213c4a;
    font-size: 17px;
    font-weight: 400;
    line-height: 30px;
    margin-bottom: 20px;
`;
const DescriptionGameFull = styled.div`
    margin: 0;
    font-size: 15px;
    line-height: 23px;
    color: rgba(0,0,0,.5);
`;
const DescriptionSlider = styled.div`
    height: 500px;
    margin-top: 50px;
`;
const DescriptionSpinerBox = styled.div`
    left: 50%;
    bottom: 50%;
    position: absolute;
`;

const Description = memo(({id, api, games, screenshot}) => {
    const {loading, setLoading} = useMain();
    const localId = useMemo(() => localStorage.getItem('id') === null ? id : localStorage.getItem('id'), [id]);
    const single = useMemo(() => `https://rawg.io/api/games/${localId}?key=${process.env.REACT_APP_KEY}`, [localId]);
    const screen = useMemo(() => `https://api.rawg.io/api/games/${games.slug}/screenshots?key=${process.env.REACT_APP_KEY}`, [games?.slug]);

    useEffect(() => {
        if (games.length === 0) {
            setLoading(true);
        } else {
            setLoading(false);
        };
    }, [games.length, setLoading]); 

    useEffect(() => {
        Promise.all([api.getSingle(single), api.getScreenshot(screen)]).then(val => val);
    }, [api, screen, single]);
   
    return (
        <DescriptionWrapper>
            <DescriptionContent>
                <DescriptionBack>
                    <Link to={'/'} style={{textDecoration: 'none', outline: 'none'}}>
                        <Back>Назад</Back>
                    </Link>
                </DescriptionBack>
                {loading ? <DescriptionSpinerBox><Spinner/></DescriptionSpinerBox> : <>
                <DescriptionSlider>
                    <Slider slides={screenshot}/>
                </DescriptionSlider>
                <DescriptionGames>
                    <DescriptionPoster>
                        <DescriptioPosterImg src={games.background_image} alt={games.name}/>
                        <DescriptionPosterRating>{games.rating}</DescriptionPosterRating>
                    </DescriptionPoster>
                    <DescriptionMain>
                        <DescriptionGameTitle>{games.name} ({games.released})</DescriptionGameTitle>
                        <DescriptionGameLink>{games.website}</DescriptionGameLink>
                        <DescriptionGameSubTitle>О игре</DescriptionGameSubTitle>
                        <DescriptionGameFull>{games.description_raw}</DescriptionGameFull>
                    </DescriptionMain>
                </DescriptionGames>
                </>}
            </DescriptionContent>
        </DescriptionWrapper>
    );
});


export default Description;