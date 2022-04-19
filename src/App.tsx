import './App.css'
import { RecoilRoot } from 'recoil';
import {Suspense} from 'react';
import { Loading } from './components/Loading/Loading';
import { HomeContainer } from './components/Home/HomeContainer';



function App() {
  return (
    <RecoilRoot>
      <Suspense fallback={<Loading />}>
        <HomeContainer />
      </Suspense>   
    </RecoilRoot>
  )
}

export default App
