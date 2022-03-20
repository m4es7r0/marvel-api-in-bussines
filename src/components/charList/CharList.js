import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import PropTypes from 'prop-types';
import MarvelService from '../../services/MarvelService';

import './charList.scss';

class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        newCharLoading: false,
        error: false,
        offset: 0,
        charEnded: false 
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest()
    }

    onRequest(offset) {
        this.onCharListLoading()
        this.marvelService.getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError)

    }

    onCharListLoading = () => {
        this.setState({
            newCharLoading: true
        })
    }

    onCharListLoaded = (newCharList) => {
        let ended = false
        if (newCharList.length < 9) {
            ended = true
        }
        
        this.setState(({offset, charList}) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            newCharLoading: false,
            offset: offset + 9,
            charEnded: ended
        }))
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    itemRefs = []

    setRef = (ref) => {
        this.itemRefs.push(ref)
    }

    focusOnItem = (id) => {
        this.itemRefs.forEach(item => item.classList.remove('char__item__selected'))
        this.itemRefs[id].classList.add('char__item__selected')
        this.itemRefs[id].focus()
    }
    // === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
    // === "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif"
    renderItems(arr) {
        const items = arr.map((item, i) => {
            let imgStyle = { 'objectFit': '' };
            if (item.thumbnail.includes('image_not_available')  || item.thumbnail.includes('4c002e0305708')) {
                imgStyle = { 'objectFit': 'fill' };
            }

            return (
                <li
                    className="char__item"
                    tabIndex={0}
                    ref={this.setRef}
                    key={item.id}
                    onClick={() => {
                        this.props.onCharSelected(item.id)
                        this.focusOnItem(i)
                    }}
                    onKeyDown={(e) => {
                        if (e.key === '' || e.key === 'Enter') {
                            this.props.onCharSelected(item.id)
                            this.focusOnItem(i)
                        }
                    }}>
                    <img src={item.thumbnail} alt={item.name} style={imgStyle} />
                    <div className="char__name">{item.name}</div>
                </li>
            )
        });

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    render() {

        const { charList, loading, error, offset, newCharLoading, charEnded } = this.state;

        const items = this.renderItems(charList);

        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? items : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button className="button button__main button__long" 
                        onClick={() => this.onRequest(offset)}
                        disabled={newCharLoading}
                        style={{display: charEnded ? 'none' : 'block' }}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;