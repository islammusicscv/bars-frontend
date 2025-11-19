import './App.css'
import Layout from "./components/Layout.tsx";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home.tsx";
import Location from "./pages/Location.tsx";
import Login from "./pages/Login.tsx";

function App() {


  return (
      <>
        <Layout>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/locations" element={<Location/>} />
                <Route path="/login" element={<Login/>} />
            </Routes>
        </Layout>
      </>
  )
  }

          export default App
