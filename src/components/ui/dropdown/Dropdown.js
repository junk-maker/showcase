import styled from 'styled-components';
import useOpen from '../../../hooks/open-hook';
import React, {memo, useRef, useMemo, useEffect, useCallback} from 'react';

const DropdownWrapper = styled.div`
    width: 100%;
    position: relative;
    border-radius: 3px;
`;
const DropdownBox = styled.div`
    display: flex;
    height: 44.8px;
    cursor: pointer;
    padding: 0 11.2px;
    align-items: center;
    border-radius: 4.8px;
    border: 1px solid #ccc;
    background-color: #fff;
    justify-content: space-between;
`;
const DropdownSelected = styled.span`
    width: 100%;
    outline: none;
    color: #213c4a;
    line-height: 1.5;
    padding: 8px 8px;
    text-align: start;
    font-size: 14.4px;
    box-sizing: border-box;
    background-color: #fff;
    transition: all 200ms ease;
`;
const DropdownIcon = styled.img`
    width: 16px;
    height: 16px;
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    transform: ${({open}) => (open ? 'rotate(90deg)' : 'rotate(-90deg)')};
`;
const DropdownBottom = styled.div`
    top: 100%;
    width: 100%;
    z-index: 1000;
    margin-top: -1px;
    overflow-y: auto;
    max-height: 200px;
    position: absolute;
    box-sizing: border-box;
    border: 1px solid #ccc;
    background-color: #fff;
    -webkit-overflow-scrolling: touch;
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06);
    display: ${({open}) => (open ? 'block' : 'none')};
`;
const DropdownOptions = styled.div`
    display: block;
    cursor: pointer;
    font-size: 14.4px;
    text-align: start;
    padding: 8px 19.2px;
    box-sizing: border-box;
    color: ${({selected}) => (selected ? '#FF5049' : '#7f7c7c')};
    &:hover {
        cursor: pointer;
        background-color: #eee;
        transition: .15s background-color ease-in;
    }
    &:not(:last-child) {
        border-bottom: 1px solid #ccc;
    }
`;

const Dropdown = memo(({helpers, setType,  platform, setPlatform, placeholder}) => {
    const iconRef  = useRef(null);
    const selectedRef  = useRef(null);
    const {open, setOpen} = useOpen();

    const close = useCallback(e => {
        if (e && e.target !== iconRef.current && e && e.target !== selectedRef.current) return setOpen(false);
    },[setOpen]);

    useEffect(() => {
        document.addEventListener('click', close);
        return () => document.removeEventListener('click', close);
    }, [close]);

    const platforms = useMemo(() => {
        return [
            {id: 0, name: 'PC', value: 4}, {id: 1, name: 'Xbox Series S/X', value: 186}, {id: 2, name: 'PlayStation 4', value: 18},
            {id: 3, name: 'PlayStation 3', value: 16}, {id: 4, name: 'Xbox 360', value: 14}, {id: 5, name: 'Xbox One', value: 1}, 
            {id: 6, name: 'PlayStation 5', value: 187}
        ];
    }, []);

    const currentPlatform = useMemo(() => platforms.map(opts => {
        let isItemSelected = platform?.name === opts.name;

        return (
            <DropdownOptions
                key={opts.id}
                onClick={() => {
                    helpers();
                    setOpen(true);
                    setPlatform(opts);
                    setType('platforms');
                }} 
                selected={isItemSelected}
            >
                <span>{opts.name}</span>
            </DropdownOptions>
        );
    }), [helpers, platforms, setOpen, setType, setPlatform, platform?.name]);

    return (
        <DropdownWrapper onClick={() => setOpen(prev => !prev)}>
            <DropdownBox>
                <DropdownSelected ref={selectedRef}>
                    {platform ? platform.name : placeholder}
                </DropdownSelected>
                <DropdownIcon open={open} ref={iconRef} alt={'dropdown-arrow'} src={'./icons/dropdown-arrow.svg'}/>
            </DropdownBox>
            <DropdownBottom open={open}>
                {currentPlatform}
            </DropdownBottom>
        </DropdownWrapper>
    )
});


export default Dropdown;