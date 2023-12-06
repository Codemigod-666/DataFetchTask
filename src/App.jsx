import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Product from './component/Product'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="App">
        <h1 className="mt-3">React Datatable Component</h1>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Product />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
