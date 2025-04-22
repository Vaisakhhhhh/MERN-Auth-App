import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/user/Home"
import About from "./pages/user/About"
import SignIn from "./pages/user/SignIn"
import SignUp from "./pages/user/SignUp"
import Profile from "./pages/user/Profile"
import Header from "./components/Header"

const App = () => {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={ <Home/> } />;
        <Route path="/about" element={ <About/> } />;
        <Route path="/sign-in" element={ <SignIn/> } />;
        <Route path="/sign-up" element={ <SignUp/> } />;
        <Route path="/profile" element={ <Profile/> } />;
      </Routes>
    </BrowserRouter>
  )
}

export default App
