import {BrowserRouter,Routes,Route} from 'react-router'
import CategoryList from './components/categoryList/categoryList.tsx'
import Posts from './components/posts/posts.tsx'
import Home from './components/home/home.tsx'
import './App.scss'

function App() {
  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />} />
                <Route path="categoryList" element={<CategoryList />} />
                <Route path="posts" element={<Posts />} />
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
