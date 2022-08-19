import {useState} from 'react';


const useMain = () => {
    const [type, setType] = useState('main');
    const [rating, setRating] = useState(null);
    const [release, setRelease] = useState(null);
    const [loading, setLoading] = useState(false);
    const [platform, setPlatform] = useState(null);
    
    
    return {
        type,
        rating,
        release,
        loading,
        platform,

        setType,
        setRating,
        setRelease,
        setLoading,
        setPlatform,
    };
};


export default useMain;