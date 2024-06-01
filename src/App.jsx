import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import { Home } from './components/Home'
import { Layout } from './components/Layout'
import { User } from './components/User'
import { Exam } from './components/Exam'


function App() {
const router = createBrowserRouter([
  {
    element:<Layout/>,
    children:[
      {path:'/', element:<Home/>},
      {path:'/User/:id', element:<User/>},
      {path:'/Exam', element:<Exam/>},
    ],
  },
])

  return (
   <RouterProvider router={router} />
  )
}

export default App
