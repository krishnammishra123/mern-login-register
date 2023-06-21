import { Suspense, lazy } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
const Model = lazy(() => import("./Model/Model"));
 
function App() {

  return (
    <div className="App">
     <Suspense fallback={<div>Loading......</div>} ><Model /></Suspense>
    </div>
  );
}

export default App;
