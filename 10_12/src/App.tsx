import {BrowserRouter,Routes,Route} from 'react-router'
import Dashboard from './components/dashboard'
import Settings from  './components/settings'
import Contacts from  './components/contacts'
import Home from './components/home'
import './App.css'

function App() {
  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="settings" element={<Settings />} />
                <Route path="contacts" element={<Contacts />} />
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
