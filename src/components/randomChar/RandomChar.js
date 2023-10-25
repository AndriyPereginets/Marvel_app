import { useState, useEffect } from "react";
import ErrorMassage from '../errorMassage/ErrorMassage';
import './randomChar.scss';
import useMarvelService from '../../services/MarvelService';
import mjolnir from '../../resources/img/mjolnir.png';
import Spiner from '../Spiner/Spiner';


const RandomChar = () => {

    const [char, setChar] = useState({});


    const {loading, error, getCharacter, clearError, setError} =  useMarvelService();

    useEffect(() => {
        updateChar();
        const timerId = setInterval(updateChar, 60000);
        return () => {
            clearInterval(timerId)
        }
    }, [])


    const onCharLoaded = (char) => {
        setChar(char);
    }


    const updateChar = () => {
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011100);
        getCharacter(id)
        .then(onCharLoaded)
       /*  .catch((e) => {
            setError(e.message);
        }) */
    }



    const errorMassage =   error ? <ErrorMassage/> : null;
    const spiner = loading ? <Spiner/> : null;
    const content = !(loading || error) ? <View char={char}/> : null;

    return (
        <div className="randomchar">
            {errorMassage}
            {spiner}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={updateChar} className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

const View = ({char}) => {

    const {name, thumbnail, description, homepage, wiki} = char;

    let imgStyle = {objectFit: 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {objectFit: 'contain'};
    }

    return (
        <div className="randomchar__block">
            <img style={imgStyle} src={thumbnail} alt="Random character" className="randomchar__img"/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr"> {description}</p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main"><div className="inner">homepage</div></a>
                    <a href={wiki} className="button button__secondary"><div className="inner">Wiki</div></a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;