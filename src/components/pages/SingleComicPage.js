import { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom"
import Helmet from 'react-helmet'
import useMarvelService from '../../services/MarvelService'
import setContent from '../../utils/setContent'

import './singleComicPage.scss';

export const SingleComicPage = () => {

    const { id } = useParams()
    const [comic, setComic] = useState(null)

    useEffect(() => { updateComic() }, [id])

    const { loading, getComics, clearError, process, setProcess } = useMarvelService()

    const updateComic = () => {
        clearError()
        getComics(id).then(onComicLoaded).then(() => setProcess('confirm'))
    }

    const onComicLoaded = (comic) => {
        setComic(comic)
    }

    const View = ({ data }) => {
        const { title, description, pageCount, thumbnail, language, price } = data


        return (
            <>
                <div className="single-comic">
                    <Helmet>
                        <meta
                            name="description"
                            content={`${title} comics book`}
                        />
                        <title>{`Comic: ${title}`}</title>
                    </Helmet>
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
            </>
        )
    }

    return (
        <>
            {setContent(process, View, comic)}
        </>
    )

}