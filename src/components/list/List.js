import {Link} from 'react-router-dom';
import styled from 'styled-components';
import React, {memo, useMemo} from 'react';

const ListContainer = styled.div`
    width: 900px;
    margin 0 auto;
    display: flex;
    padding-top: 50px;
    flex-direction: column;
    align-items: flex-start;
`;
const Cells = styled.div`
    width: 100%;
    row-gap: 20px;
    display: grid;
    column-gap: 10px;
    grid-row-gap: 10px;
    margin-bottom: 50px;
    grid-template-columns: repeat(2, 1fr);
`;

const Cell = styled.div`
    display: grid;
    grid-template: minmax(260px, 1fr) / minmax(280px, 1fr);
    grid-template-areas: "stack";
    max-height: 33vw;
    `;
const CellImg = styled.img`
    grid-area: stack;
    object-fit: cover;
    place-self: stretch;
    border-radius-top: 10px;
`;
const CellFigcaption = styled.figcaption`
    color: #fff;
    padding: 25px;
    cursor: pointer;
    align-self: end;
    font-weight: 300;
    grid-area: stack;
    text-align: start;
    justify-self: stretch;
    backdrop-filter: blur(6px);
    background-color: #16323b80;
    border-radius: 0 0 10px 10px;
    transition: background-color ease 0.3s;
    &:hover {
        background-color: #16323b;
    }
`;
const Rating = styled.span`
    color: #fff;
    width: 50px;
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
const CellReleased = styled.span`
    left: 6%;
    bottom: 10%;
    position: absolute;
`;

const List = memo(({setId, games, setStatus}) => {
    const game = useMemo(() => games.map(val => {
        return (
            <Cell key={val.id}>
                <CellImg src={val.background_image} alt={val.id}/>
                <Rating>{val.rating}</Rating>
                <Link to={`/game/${val.slug}`} style={{textDecoration: 'none'}}>
                   <CellFigcaption 
                    onClick={() => {
                        setId(val.id);
                        setStatus(true);
                        localStorage.setItem('id', val.id)
                    }}
                    >
                        {val.name}
                        <CellReleased>{val.released}</CellReleased>
                    </CellFigcaption> 
                </Link>
            </Cell>
        );
    }), [games, setId, setStatus]);

    return (
        <ListContainer>
            <Cells>
                {game}
            </Cells>
        </ListContainer>
    );
});


export default List;