import Frame from './hoc/frame/Frame';
import useApp from './hooks/app-hook';
import Main from './components/main/Main';
import ApiService from './services/apiService';
import Header from './components/header/Header';
import React, {useMemo, useCallback} from 'react';
import Searcher from './components/searcher/Searcher';
import {Route, Routes, Navigate} from 'react-router-dom';
import Description from './components/description/Description';


const App = () => {
  const {
    id, page, count, games, single, status, searcher, screenshot,
    setId, setPage, setCount, setGames, setStatus, setSingle, setSearcher, setScreenshot,
  } = useApp();
  
  const api = useMemo(() => {
    return new ApiService(games, status, setPage, setCount,  setGames, setStatus, setSingle, setSearcher, setScreenshot)
  },[games, status, setPage, setCount, setGames, setStatus, setSingle, setSearcher, setScreenshot]);

  const helpers = useCallback(() => {
    setPage(1);
    setGames([]);
    setStatus(true);
  }, [setPage, setGames, setStatus]);

  return (
    <Frame>
      <Header api={api}/>
      <Routes>
        <Route 
          path={'/'} 
          element={
            <Main 
              api={api}
              page={page}
              setId={setId}
              games={games} 
              count={count}
              helpers={helpers} 
              setStatus={setStatus}
            />
          }
        />
        <Route path={'/game/:slug'} element={<Description id={id} api={api} games={single} screenshot={screenshot}/>}/>
        <Route path={'/searcher'} element={<Searcher api={api} setId={setId} games={searcher} setStatus={setStatus}/>}/>
        <Route path={'*'} element={<Navigate replace to={'/'}/>}/>
      </Routes>
    </Frame>
      
  );
};


export default App;