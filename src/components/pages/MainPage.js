import { useState } from "react";
import { Helmet } from "react-helmet"

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import SearchChar from "../form/SearchChar";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

// import decoration from '../../resources/img/vision.png';

export const MainPage = () => {
    const [selectedItem, setItem] = useState(null);

    const onItemSelected = (id) => {
        setItem(id);
    }
    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Marvel information portal"
                />
                <title>Marvel information portal</title>
            </Helmet>
            <ErrorBoundary>
                <RandomChar />
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList onItemSelected={onItemSelected} />
                </ErrorBoundary>
                <div className="char__content__iner">
                    <ErrorBoundary>
                        <SearchChar />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharInfo charId={selectedItem} />
                    </ErrorBoundary>
                </div>
            </div>
            {/* <img className="bg-decoration" src={decoration} alt="vision" /> */}
        </>
    )
}