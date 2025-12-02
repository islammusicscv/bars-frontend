import './App.css'
import Layout from "./components/Layout.tsx";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home.tsx";
import Location from "./pages/Location.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import {AuthProvider} from "./context/AuthContext.tsx";
import LocationAdd from "./pages/LocationAdd.tsx";

function App() {


  return (
      <>
        <AuthProvider>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/locations/:id" element={<Location/>} />
                    <Route path="/add-location" element={<LocationAdd/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/register" element={<Register/>} />
                </Routes>
            </Layout>
        </AuthProvider>
      </>
  )
  }
export default App
