import { useState, useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.svg';

const RandomChar = () => {

    const [char, setChar] = useState(null);
    const { loading, error, getCharacter, clearError } = useMarvelService();

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
        const id = Math.floor(Math.random() * (1011100 - 1011000)) + 1011000;
        getCharacter(id)
            .then(onCharLoaded);
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !char) ? <CSSTransition in={updateChar} timeout={500} classNames={`anim`}  ><View char={char} /></CSSTransition> : null;

    return (
        <div className="randomchar">
            {errorMessage}
            {spinner}
            <TransitionGroup component={null}>
                {content}
            </TransitionGroup>
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br />
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={updateChar} disabled={!content && !error} className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
            </div>
        </div>
    )
}

const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki } = char;
    let imgStyle = { 'objectFit': '' }
    if (thumbnail.includes('image_not_available') || thumbnail.includes('4c002e0305708')) {
        imgStyle = { 'objectFit': 'unset' }
    }

    const NameShort = () => {
        return (
            <p className="randomchar__name">{name}</p>
        )
    }

    const NameLong = () => {
        return (
            <p className="randomchar__name randomchar__name__long">{name}</p>
        )
    }

    const UseName = () => {
        if (name.length >= 22) return <NameLong />
        else return <NameShort />
    }

    return (
            <div className="randomchar__block">
                <img src={thumbnail} alt="Random character" className="randomchar__img" style={imgStyle} />
                <div className="randomchar__info">
                    <UseName />
                    <p className="randomchar__descr">
                        {description}
                    </p>
                    <div className="randomchar__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
    )
}

export default RandomChar;

