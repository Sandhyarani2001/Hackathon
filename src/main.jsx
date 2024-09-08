import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Admin from './components/page/Admin/Admin.jsx';
import Layout from './components/Layout/Layout.jsx';
import Home from './components/page/Home/Home.jsx';
import ChallengesDetails from './components/Challenges Details/ChallengeDeatails.jsx';
import EditDetails from './components/Edit Details/EditDetails.jsx';
import ListPages from './components/List page/ListPages.jsx';


const router = createBrowserRouter(

  createRoutesFromElements(
    <>
    <Route path='/' element={<Layout />}>
      <Route path='/' element={<Home/>} />
       <Route path='/admin' element={<Admin />} />
       <Route path='/details' element={<ChallengesDetails />} />
       <Route path='/editdetails' element={<EditDetails />} />
       <Route path='/ListPages' element={<ListPages />} />

    </Route>

    </>
    
  )

)
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <RouterProvider router={router}/>
  </StrictMode>,
)
