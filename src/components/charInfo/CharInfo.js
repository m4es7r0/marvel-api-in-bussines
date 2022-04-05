import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { CSSTransition, TransitionGroup } from 'react-transition-group'
import setContent from '../../utils/setContent'

import useMarvelService from '../../services/MarvelService'

import './charInfo.scss'

const CharInfo = (props) => {

    const [char, setChar] = useState(null)

    useEffect(() => { updateChar() }, [props.charId])

    const { getCharacter, clearError, process, setProcess } = useMarvelService()

    const updateChar = () => {
        const { charId } = props
        if (!charId) {
            return
        }
        clearError()
        getCharacter(charId)
            .then(onCharLoaded)
            .then(() => setProcess('confirm'))
    }

    const onCharLoaded = (char) => {
        setChar(char)
    }

    return (
        <div className="char__info">
            <TransitionGroup component={null}>{setContent(process, View, char)}</TransitionGroup>
        </div>
    )
}

const View = ({ data }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = data

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
            <CSSTransition classNames={`wrapp`} timeout={500} in={setContent}>
            <div className="wrapp">
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle} />
                <div>
                    <UseName />
                    <div className="char__descr">
                        {description.slice(0, 103)}
                    </div>
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
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'Comics not found'}
                {
                    comics.map((item, i) => {
                        const id = item.resourceURI.replace(/http:\/\/gateway.marvel.com\/v1\/public\/comics\//, '')
                        if (i >= 9) {
                            // eslint-disable-next-line
                            return
                        } else {
                            return (
                                <li key={i} className="char__comics-item">
                                    <Link to={`/comics/${id}`} >{item.name}</Link>
                                </li>
                            )
                        }
                    })
                }
            </ul>
            </div>
            </CSSTransition>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;