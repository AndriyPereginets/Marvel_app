import { Component } from 'react/cjs/react.production.min';
import MarvelService from '../../services/MarvelService';
import Spiner from '../Spiner/Spiner';

import './charList.scss';

class CharList extends Component {
    state = {
        randomCharacters: [],
        loading: true, 
        error: false,
    }

    marvelService = new MarvelService();

      onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    onCharLoaded = () => {
        this.setState({
            loading: false
        }) 
    }

    componentDidMount= () => {
        this.updateCharsList();
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    generateRandomId = () => {
        const min = 1011000;
        const max = 1011400;
        return Math.floor(Math.random() * (max - min + 1) + min);
      };

      getFullList = () => {
        const numberOfCharacters = 9;
        const charactersPromises = [];
    
        for (let i = 0; i < numberOfCharacters; i++) {
          const id = this.generateRandomId();
          const charPromise = this.marvelService.getCharacter(id);
          charactersPromises.push(charPromise);
        }
    
        return Promise.all(charactersPromises);
      };


    updateCharsList = () => {
        this.setState({
        loading: true, 
        error: false})
        this.getFullList()
            .then((char) => {
                this.setState({
                randomCharacters: char,
                loading: false
                });
            })
            .then(this.onCharLoaded)
            .catch(this.onError);
        }

    
    render() {
        const  {randomCharacters, loading} = this.state;
        const spiner = loading ? <Spiner/> : null;



        const charactersList = randomCharacters.map((char) => {
            let imgStyle = {objectFit: 'cover'};
            if (char.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
            imgStyle = {objectFit: 'contain'};
            }; 

            if (loading) {
                return <li style={{backgroundColor: 'white', display: 'flex', alignItems: 'center'}} key={char.id} className="char__item">
                {spiner}
            </li>
            } else {
                return  <li   className="char__item" 
                            key={char.id}
                            onClick={() => this.props.onCharSelected(char.id)}>
                            <img style={imgStyle} src={char.thumbnail} alt={char.name}/>
                            <div className="char__name">{char.name}</div>
                        </li>
            }

           
        })
        return (
            <div className="char__list">
                <ul className="char__grid">
                    {charactersList}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner" onClick={this.updateCharsList}>load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;