import {Routes,Route} from 'react-router'
import CategoryList from './components/categoryList/categoryList.tsx'
import PostList from './components/postList/postList.tsx'
import Home from './components/home/home.tsx'
import NavBar from "./components/navBar/navBar.tsx";
import PostDetails from "./components/postDetails/postDetails.tsx";

function App() {
  return (
    <>
        <NavBar />
        <Routes>
            <Route index element={<Home />} />
            <Route path="categoryList" element={<CategoryList />} />
            <Route path="postList" element={<PostList />} />
            <Route path="postList/post/:id" element={<PostDetails/>} />
        </Routes>
    </>
  )
}

export default App
