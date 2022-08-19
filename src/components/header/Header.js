import Input from '../ui/input/Input';
import styled from 'styled-components';
import {Link, useNavigate} from 'react-router-dom';
import React, {memo, useMemo, useState, useCallback} from 'react';

const HeaderWrapper = styled.section`
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10000;         
    position: sticky;
    background-color: #213c4a;
`;
const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 0 40px 0 40px;
    justify-content: space-between;
`;
const HeaderHeading = styled.div`
    display: flex;
    padding-top: 22px;
    position: relative;
    align-items: center;
    padding-bottom: 22px;
`;
const HeaderTitle = styled.h1`
    z-index: 1;
    color: #fff;
    width: 119px;
    flex-shrink: 0;
    position: relative;
    display: inline-block;
`;
const Searcher = styled.span`
    width: 500px;
    position: relative;
`;
const SearcherImg = styled.img`
    z-index: 1;
    bottom: 8px;
    position: absolute;
`;
const CloseImg = styled.img`
    z-index: 1;
    right: 12%;
    bottom: 12px;
    cursor: pointer;
    position: absolute;
    display: ${({value}) => (value ? 'block' : 'none')};
`;
const LogIn = styled.h2`
    width: auto;
    color: #fff;
    cursor: pointer;
    font-size: 18px;
    position: relative;
    display: inline-block;
    &::after {
        left: 0;
        height: 1px;
        bottom: 4px;
        width: 100%;
        content: '';
        position: absolute;
        transform: scaleX(0);
        background-color: #fff;
        transform-origin: bottom right;
        transition: transform 0.25s ease-out;
    }
    &:hover::after {
        transform: scaleX(1);
        transform-origin: bottom left;
    }
`;
const HeaderButton = styled.button`
    right: 15%;
    margin: 10px;
    display: block;
    color: #213c4a;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    padding: 5px 20px;
    border-radius: 3px;
    position: relative;
    display: inline-block;
    border: 1px solid #fff;
`;
const Header = memo(({api}) => {
    const navigate = useNavigate();
    const [value, setValue] = useState('');
    const slug = useMemo(() => value.split(' ').join('-').toLowerCase(), [value]);
    const link = useMemo(() => `https://rawg.io/api/games?key=${process.env.REACT_APP_KEY}&search=${slug}`, [slug]);
  
    const submitHandler = useCallback(() => {
        setValue('');
        api.getSearch(link, navigate);
        localStorage.setItem('slug', slug);
    }, [api, link, slug, navigate]);

    return (
        <HeaderWrapper>
            <HeaderContainer>
                <HeaderHeading>
                    <Link to={'/'} style={{textDecoration: 'none'}}>
                        <HeaderTitle>
                            Витрина
                        </HeaderTitle> 
                    </Link>
                </HeaderHeading>
                <Searcher>
                    <SearcherImg src={'/icons/searcher.svg'} alt={'searcher'}/>
                    <Input value={value} onChange={e => setValue(e.target.value)} placeholder={'Поиск...'}/>
                    <CloseImg alt={'close'} value={value} src={'/icons/close.svg'} onClick={() => setValue('')}/>
                </Searcher>
                <HeaderButton onClick={submitHandler}>Искать</HeaderButton>
                <LogIn>Войти</LogIn>
            </HeaderContainer>
        </HeaderWrapper>
    );
});


export default Header;