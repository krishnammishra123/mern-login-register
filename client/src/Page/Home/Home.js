import React,{lazy,Suspense} from 'react'
const Headers = lazy(() => import("../Headers/Headers"));

const Home = () => {
  return (
    <div>
      <Suspense fallback={<>Loading...</>}>
        <Headers />
      </Suspense>
      <h1>Welcome to the home Page</h1>
    </div>
  );
}

export default Home;