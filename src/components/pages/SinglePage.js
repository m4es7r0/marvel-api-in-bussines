import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';
import AppBanner from "../appBanner/AppBanner";

import setContent from "../../utils/setContent";

import { CSSTransition, TransitionGroup } from 'react-transition-group';

const SinglePage = ({ Component }) => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const { loading, error, getCharacter, clearError, process, setProcess } = useMarvelService();

    useEffect(() => {
        updateData()
    }, [id])

    const updateData = () => {
        clearError();
        getCharacter(id).then(onDataLoaded).then(() => setProcess('confirm'));
    }

    const onDataLoaded = (data) => {
        setData(data);
    }

    const content = <Component data={data} />

    return (
        <>
            <AppBanner />
            {setContent(process, () => content, data)}
        </>
    )
}

export default SinglePage;