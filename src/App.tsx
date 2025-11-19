import './App.css'
import Hello from "./components/Hello.tsx";
import Card from "./components/Card.tsx";
import Layout from "./components/Layout.tsx";

function App() {


  return (
      <>
        <Layout>
            <Hello/>
            <div className="album py-5 bg-body-tertiary">
                <div className="container">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        <Card/>
                        <Card/>
                        <Card/>
                    </div>
                </div>
              </div>
        </Layout>
      </>
  )
  }

          export default App
