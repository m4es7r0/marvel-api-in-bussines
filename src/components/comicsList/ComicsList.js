import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import { TransitionGroup, CSSTransition } from 'react-transition-group';

import './comicsList.scss';
// import uw from '../../resources/img/UW.png';
// import xMen from '../../resources/img/x-men.png';

const ComicsList = (props) => {

    const [comicsList, setComicsList] = useState([])
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [offset, setOffset] = useState(200)
    const [comicsEnded, setComicsEnded] = useState(false)

    const { loading, error, clearError, getAllComics } = useMarvelService();

    useEffect(() => { onRequest(offset, true) }, [])

    const onRequest = (offset, initial) => {
        clearError()
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        getAllComics(offset).then(onComicsListLoaded)
    }

    const onComicsListLoaded = (newItemList) => {
        let ended = false
        if (newItemList.length < 8) {
            ended = true
        }
        setComicsList(comicsList => [...comicsList, ...newItemList])
        setNewItemLoading(false)
        setOffset(offset => offset + 8)
        setComicsEnded(ended)

    }

    const itemRefs = useRef([])

    function renderItems(arr) {
        const items = arr.map((item, i) => {
            let imgStyle = { 'objectFit': '' };
            if (item.thumbnail.includes('image_not_available') || item.thumbnail.includes('4c002e0305708')) {
                imgStyle = { 'objectFit': 'fill' };
            }

            return (
                <CSSTransition key={item.id} timeout={600} classNames="comics__item__anim">
                    <li className="comics__item"
                        tabIndex={0}
                        ref={(el) => itemRefs.current[i] = el}
                        onKeyDown={(e) => {
                            if (e.key === '' || e.key === 'Enter') {
                                props.onItemSelected(item.id)
                            }
                        }}>
                        <Link to={`${item.id}`}>
                            <img src={item.thumbnail} alt={item.title} style={imgStyle} className="comics__item-img" />
                            <div className="comics__item-name">{item.title}</div>
                            <div className="comics__item-price">{item.price}</div>
                        </Link>
                    </li>
                </CSSTransition>
            )
        })

        return (
            <ul className="comics__grid">
                <TransitionGroup component={null}>
                    {items}
                </TransitionGroup>
            </ul>
        )
    }

    const items = renderItems(comicsList)

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !newItemLoading ? <Spinner /> : null;

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}
            <button className="button button__main button__long"
                onClick={() => onRequest(offset)}
                disabled={newItemLoading}
                style={{ display: comicsEnded ? 'none' : 'block' }}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}
export default ComicsList