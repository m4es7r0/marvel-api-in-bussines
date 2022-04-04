import { useState, useEffect, useRef } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import PropTypes from 'prop-types';
import useMarvelService from '../../services/MarvelService';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import './charList.scss';

const CharList = (props) => {

    const [charList, setCharList] = useState([])
    const [newCharLoading, setNewCharLoading] = useState(false)
    const [offset, setOffset] = useState(210)
    const [charEnded, setCharEnded] = useState(false)

    const { loading, error, clearError, getAllCharacters } = useMarvelService();

    useEffect(() => { onRequest(offset, true) }, [])

    const onRequest = (offset, initial) => {
        clearError()
        initial ? setNewCharLoading(false) : setNewCharLoading(true)
        getAllCharacters(offset).then(onCharListLoaded)
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false
        if (newCharList.length < 9) {
            ended = true
        }

        setCharList(charList => [...charList, ...newCharList])
        setNewCharLoading(false)
        setOffset(offset => offset + 9)
        setCharEnded(ended)
    }

    const itemRefs = useRef([])

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item__selected'))
        itemRefs.current[id].classList.add('char__item__selected')
        itemRefs.current[id].focus()
    }
    // === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
    // === "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif"
    function renderItems(arr) {
        const items = arr.map((item, i) => {
            let imgStyle = { 'objectFit': '' };
            if (item.thumbnail.includes('image_not_available') || item.thumbnail.includes('4c002e0305708')) {
                imgStyle = { 'objectFit': 'fill' };
            }

            return (
                <CSSTransition key={item.id} timeout={600} classNames="char__item__anim">
                    <li 
                        className="char__item"
                        tabIndex={0}
                        ref={el => itemRefs.current[i] = el}
                        onClick={() => {
                            props.onItemSelected(item.id);
                            focusOnItem(i);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === ' ' || e.key === "Enter") {
                                props.onItemSelected(item.id);
                                focusOnItem(i);
                            }
                        }}>
                            <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                            <div className="char__name">{item.name}</div>
                    </li>
                </CSSTransition>
            )
        });

        return (
            <ul className="char__grid">
                <TransitionGroup component={null}>
                    {items}
                </TransitionGroup>
            </ul>
        )
    }

    const items = renderItems(charList);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !newCharLoading ? <Spinner /> : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {items}
            <button className="button button__main button__long"
                onClick={() => onRequest(offset)}
                disabled={newCharLoading}
                style={{ display: charEnded ? 'none' : 'block' }}>
                <div className="inner">load more</div>
            </button>
        </div>

    )
}

CharList.propTypes = {
    onItemSelected: PropTypes.func.isRequired
}

export default CharList;