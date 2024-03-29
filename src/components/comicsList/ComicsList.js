import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './comicsList.scss';
import Spiner from '../Spiner/Spiner';
import ErrorMassage from '../errorMassage/ErrorMassage';
import useMarvelService from '../../services/MarvelService';

const setContent = (proces, Component, newItemLoading) => {
    switch (proces) {
        case 'waiting':
            return <Spiner/>;
            break; 
        case 'loading':
            return newItemLoading ? <Component/> : <Spiner/>;
            break;
        case 'confirmed': 
            return <Component/>;
            break;
        case 'error':
            return <ErrorMassage/>;
            break;
        default:
            throw new Error('Unexpected srate proces')
    }
}

const ComicsList = () => {

    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [comicsEnded, setComicsEnded] = useState(false);

    const {loading, error, proces, getAllComics, setProces} = useMarvelService();

    useEffect( () => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset)
            .then(onComiscsLoaded)
            .then(() => setProces('confirmed'))
    }

    const onComiscsLoaded = (newComicsList) => {
        let ended = false;
        if (newComicsList.length < 8) {
            ended = true;
        }
        
        setComicsList([...comicsList, ...newComicsList]);
        setNewItemLoading(false);
        setOffset(offset + 8);
        setComicsEnded(ended);
    
    }


    function renderItems(arr) {
        const items = arr.map( (item, i) => {

            return (
                <li className="comics__item" key={i}>
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>
            )
        })
        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    return (
        <div className="comics__list">
            {setContent(proces, () => renderItems(comicsList), newItemLoading)}
            <button 
                disabled={newItemLoading} 
                style={{'display' : comicsEnded ? 'none' : 'block'}}
                className="button button__main button__long"
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;