export default class ApiService {
    constructor(games, status, setPage, setCount, setGames, setStatus, setSingle, setSearcher, setScreenshot) {
        this.games = games;
        this.status = status;
        this.setPage = setPage;
        this.setCount = setCount;
        this.setGames = setGames;
        this.setStatus = setStatus;
        this.setSingle = setSingle;
        this.setSearcher= setSearcher;
        this.setScreenshot = setScreenshot;
    };

    getGame(url) {
        if (this.status) {
            fetch(url).then(response => response.json())
                .then(data => {
                    this.setCount(data.count);
                    this.setPage(prev => prev + 1);
                    this.setGames([...this.games, ...data.results]);
                }).finally(() => this.setStatus(false))
            ;
        };
    };

    getScreenshot(url) {
        fetch(url).then(response => response.json()).then(data => this.setScreenshot(data.results));
    };

    getSingle(url) {
        fetch(url).then(response => response.json()).then(data => this.setSingle(data));
    };

    getSearch(url, navigate) {
        fetch(url).then(response => response.json()).then(data => {
            if (data.results.length === 0) {
                alert('Нет результата');
            } else {
                if (window.location.pathname === '/searcher') {
                    this.setSearcher(data.results);
                } else {
                    navigate('/searcher');
                    this.setSearcher(data.results);
                };
            };
        });
    };
};