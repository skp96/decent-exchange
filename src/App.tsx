import './App.css'
import { SearchBar } from './components/Search/SearchBar'
import { Coin } from './components/interfaces';

const coins: Coin[] = [
            { id: "bitcoin", symbol: "btc", name: "Bitcoin" },
            { id: "ethereum", symbol: "ethereum", name: "Ethereum" },
            { id: "solana", symbol: "sol", name: "Solana" }
        ];

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <p>Hello World!</p>
        <SearchBar coins={coins}/>
      </header>
    </div>
  )
}

export default App
