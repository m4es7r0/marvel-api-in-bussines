import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import AppHeader from "../appHeader/AppHeader"
import { MainPage, ComicsPage, Page404 } from "../pages"
import { SingleCharPage } from "../pages/SingleCharPage"

const App = () => {

    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="char/" element={<SingleCharPage />} />
                        <Route path="comics/*" element={<ComicsPage />} />
                        <Route path="*" element={<Page404 />} />
                    </Routes>
                </main>
            </div>
        </Router>
        // <SearchChar/>
    )
}

export default App;