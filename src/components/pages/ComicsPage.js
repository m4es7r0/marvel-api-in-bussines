import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { SingleComicPage } from "./SingleComicPage"
import ComicsList from "../comicsList/ComicsList"
import AppBanner from '../appBanner/AppBanner'

export const ComicsPage = () => {
    return (
        <>
            <AppBanner />
            <Routes>
                <Route path=':id' element={<SingleComicPage />} />
                <Route path='/' element={<ComicsList />} />
            </Routes>
        </>
    )

}