import {useState} from 'react';

const useApp = () => {
    const [id, setId] = useState(null);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [games, setGames] = useState([]);
    const [single, setSingle] = useState([]);
    const [status, setStatus] = useState(true);
    const [searcher, setSearcher] = useState([]);
    const [screenshot, setScreenshot] = useState([]);


    return {
        id,
        page,
        games,
        count,
        single,
        status,
        searcher,
        screenshot,

        setId,
        setPage,
        setCount,
        setGames,
        setSingle,
        setStatus,
        setSearcher,
        setScreenshot,
    };
};


export default useApp;