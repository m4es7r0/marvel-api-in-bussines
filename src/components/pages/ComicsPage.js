import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Helmet from "react-helmet"
import { SingleComicPage } from "./SingleComicPage"
import ComicsList from "../comicsList/ComicsList"
import AppBanner from '../appBanner/AppBanner'

export const ComicsPage = () => {
    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Page with list of our comics"
                />
                <title>Marvel | Comics</title>
            </Helmet>
            <AppBanner />
            <Routes>
                <Route path=':id' element={<SingleComicPage />} />
                <Route path='/' element={<ComicsList />} />
            </Routes>
        </>
    )

}