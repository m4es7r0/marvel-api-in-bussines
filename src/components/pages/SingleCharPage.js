import { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom"
import useMarvelService from '../../services/MarvelService'

import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'

import './singleCharPage.scss';

export const SingleCharPage = () => {

    // const { id } = useParams()
    const [char, setChar] = useState(null)

    useEffect(() => { updateChar() }, [])

    const { loading, error, getCharacter, clearError } = useMarvelService()

    const updateChar = () => {
        clearError()
        const id = 1009224
        // Math.floor(Math.random() * (1011400 - 1011000)) + 1011000;
        getCharacter(id).then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setChar(char)
    }

    const View = ({ char }) => {
        const { id, name, description, thumbnail} = char

        return (
            <>
                <div className="single-char">
                    <img src={thumbnail} alt={name} className="single-char__img" />
                    <div className="single-char__info">
                        <h2 className="single-char__name">{name}</h2>
                        <p className="single-char__descr">{description}</p>
                    </div>
                    <Link  to=".." className="single-comic__back">Back to all</Link>
                </div>
            </>
        )
    }

    const errorMassage = error ? <ErrorMessage /> : null
    const spinner = loading ? <Spinner /> : null
    const content = !(loading || error || !char) ? <View char={char} /> : null

    return (
        <>
            {errorMassage}
            {spinner}
            {content}
        </>
    )

}