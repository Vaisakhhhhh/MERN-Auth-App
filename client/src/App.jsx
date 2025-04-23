import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


import Home from "./pages/user/Home"
import About from "./pages/user/About"
import SignIn from "./pages/user/SignIn"
import SignUp from "./pages/user/SignUp"
import Profile from "./pages/user/Profile"
import Header from "./components/Header"
import PrivateRoute from "./components/PrivateRoute"

const App = () => {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/sign-in" element={ <SignIn/> } />;
        <Route path="/sign-up" element={ <SignUp/> } />;
        <Route element={<PrivateRoute />}>
         <Route path="/" element={ <Home/> } />;
         <Route path="/about" element={ <About/> } />;
         <Route path="/profile" element={ <Profile/> } />;
        </Route>
      </Routes>
      <ToastContainer position="bottom-right" autoClose={3000}/>
    </BrowserRouter>
  )
}

export default App
