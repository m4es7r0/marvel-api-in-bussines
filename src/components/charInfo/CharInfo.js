import { Component } from 'react'
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'
import Skeleton from '../skeleton/Skeleton'
import PropTypes from 'prop-types'
import MarvelService from '../../services/MarvelService'

import './charInfo.scss';

class CharInfo extends Component {

    state = {
        char: null,
        loading: false,
        error: false
    }

    marverlService = new MarvelService()

    componentDidMount() {
        this.updateChar()
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar()
        }
    }

    updateChar() {
        const { charId } = this.props
        if (!charId) {
            return null
        }

        this.onCharLoading()
        this.marverlService
            .getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    onCharLoaded = (char) => {
        this.setState({ char, loading: false, error: false })
    }

    onCharLoading = () => {
        this.setState({
            loading: true
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    render() {

        const { char, loading, error } = this.state

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
}

const View = ({ char }) => {

    const NameShort = () => {
        return (
            <p className="char__info-name">{name}</p>
        )
    }
    
    const NameLong = () => {
        return (
            <p className="char__info-name char__info-name__long">{name}</p>
        )
    }
    
    function UseName() {
        if (name.length >= 19 ) return <NameLong/>
        else return <NameShort/>
    }

    const { name, description, thumbnail, homepage, wiki, comics } = char

    let imgStyle = { 'objectFit': '' }
    if (thumbnail.includes('image_not_available') || thumbnail.includes('4c002e0305708')) {
        imgStyle = { 'objectFit': 'unset' }
    }

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle} />
                <div>
                    <UseName/>
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