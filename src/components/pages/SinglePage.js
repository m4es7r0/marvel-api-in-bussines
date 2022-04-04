import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import AppBanner from "../appBanner/AppBanner";

import { CSSTransition, TransitionGroup } from 'react-transition-group';

const SinglePage = ({ Component, dataType }) => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const { loading, error, getCharacter, clearError } = useMarvelService();

    useEffect(() => {
        updateData()
    }, [id])

    const updateData = () => {
        clearError();
        getCharacter(id).then(onDataLoaded)
        // switch (dataType) {
        //     case 'char':
        //         getCharacterByName(id).then(onDataLoaded);
        // }
    }

    const onDataLoaded = (data) => {
        setData(data);
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !data) ? <CSSTransition classNames={'anim'} timeout={500}><Component data={data} /></CSSTransition> : null;

    return (
        <>
            <AppBanner />
            {errorMessage}
            {spinner}
            <TransitionGroup component={null}>
                {content}
            </TransitionGroup>
        </>
    )
}

export default SinglePage;