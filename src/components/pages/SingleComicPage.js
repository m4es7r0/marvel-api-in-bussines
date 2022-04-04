import { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom"
import useMarvelService from '../../services/MarvelService'

import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'

import './singleComicPage.scss';

export const SingleComicPage = () => {

    const { id } = useParams()
    const [comic, setComic] = useState(null)

    useEffect(() => { updateComic() }, [id])

    const { loading, error, getComics, clearError } = useMarvelService()

    const updateComic = () => {
        clearError()
        getComics(id).then(onComicLoaded)
    }

    const onComicLoaded = (comic) => {
        setComic(comic)
    }

    const View = ({ comic }) => {
        const { title, description, pageCount, thumbnail, language, price } = comic


        return (
            <>
                <div className="wrap-single">
                    <div className="single-comic">
                        <img src={thumbnail} alt={title} className="single-comic__img" />
                        <div className="single-comic__info">
                            <h2 className="single-comic__name">{title}</h2>
                            <p className="single-comic__descr" style={{ fontWeight: '400' }}>{description}</p>
                            <p className="single-comic__descr"><span style={{ fontWeight: '400' }}>Pages: </span>{pageCount}</p>
                            <p className="single-comic__descr"><span style={{ fontWeight: '400' }}>Labguage: </span>{language}</p>
                            <div className="single-comic__price">{price}</div>
                        </div>
                        <Link to=".." className="single-comic__back">Back to all</Link>
                    </div>
                </div>
            </>
        )
    }

    const errorMassage = error ? <ErrorMessage /> : null
    const spinner = loading ? <Spinner /> : null
    const content = !(loading || error || !comic) ? <View comic={comic} /> : null

    return (
        <>
            {errorMassage}
            {spinner}
            {content}
        </>
    )

}