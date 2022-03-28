import { useState, useEffect } from 'react'

import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'
import Skeleton from '../skeleton/Skeleton'
import PropTypes from 'prop-types'

import useMarvelService from '../../services/MarvelService'

import './charInfo.scss';

const CharInfo = (props) => {

    const [char, setChar] = useState(null)

    useEffect(() => { updateChar() }, [props.charId])

    const {loading, error, getCharacter, clearError} = useMarvelService()

    const updateChar = () => {
        const { charId } = props
        if (!charId) {
            return
        }
        clearError()
        getCharacter(charId).then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setChar(char)
    }

    const skeleton = char || loading || error ? null : <Skeleton />
    const errorMassage = error ? <ErrorMessage /> : null
    const spinner = loading ? <Spinner /> : null
    const content = !(loading || error || !char) ? <View char={char} /> : null

    return (
        <div className="char__info">
            {skeleton}
            {errorMassage}
            {spinner}
            {content}
        </div>
    )
}

const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = char

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
        if (name.length >= 19) return <NameLong />
        else return <NameShort />
    }

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle} />
                <div>
                    <UseName />
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
                {comics.length > 0 ? null : 'Comics not found'}
                {
                    comics.map((item, i) => {
                        if (i >= 9) {
                            // eslint-disable-next-line
                            return
                        } else {
                            return (
                                <li key={i} className="char__comics-item">
                                    {item.name}
                                </li>
                            )
                        }
                    })
                }
            </ul>
        </>
    )
}



CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;