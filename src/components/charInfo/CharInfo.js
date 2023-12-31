import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import useMarvelService from '../../services/MarvelService';
import ErrorMassage from '../errorMassage/ErrorMassage';
import Spiner from '../Spiner/Spiner';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';

const CharInfo = (props) => {

    const [char, setChar] = useState(null);

    const {loading, error, getCharacter, clearError}  =  useMarvelService();

    useEffect(() => {
            updateChar();
    }, [props.charId])

    const updateChar = () => {
        clearError();
        const {charId} = props;
        if (!charId) {
            return;
        }


    const onCharLoaded = (char) => {
        setChar(char);
    }


       getCharacter(charId)
        .then(onCharLoaded)
    }

    const skeleton = char || loading || error ? null : <Skeleton/>
    const errorMassage = error ? <ErrorMassage/> : null;
    const spiner = loading ? <Spiner/> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null;
    return (
        <div className="char__info">
            {skeleton}
            {errorMassage}
            {spiner}
            {content}
        </div>
    )
}

const View = ({char}) => {
    const {name, thumbnail, description, homepage, wiki, comics} = char;
    let imgStyle = {objectFit: 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {objectFit: 'contain'};
    }
    return( 
        <>
        <div className="char__basics">
                    <img style={imgStyle} src={thumbnail} alt={name}/>
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
                    {description}
                </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    {comics.length > 0 ? null : 'This character dont have any comics'}
                    {comics.map((item, i) => {
                        if (i > 9) return;
                        return <li key={i} className="char__comics-item">
                        {item.name}
                    </li>
                    })}
                </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;