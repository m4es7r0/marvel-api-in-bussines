import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import AppHeader from "../appHeader/AppHeader"
import { MainPage, ComicsPage, Page404 } from "../pages"
import SinglePage from "../pages/SinglePage"
import SingleCharPage from '../pages/SingleCharPage'
import TestComponent from '../testComponent/TestComponent'

const App = () => {

    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="characters/:id" element={<SinglePage Component={SingleCharPage} dataType='char' />} />
                        <Route path="comics/*" element={<ComicsPage />} />
                        <Route path='test/' element={<TestComponent/>} />
                        <Route path="*" element={<Page404 />} />
                    </Routes>
                </main>
            </div>
        </Router>
    )
}

export default App;