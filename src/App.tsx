import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import Catalogue from './components/Catalogue'
import Styles from "./App.module.css"

function App() {
  return (
    <div className={Styles.main}>
      <Navbar />
      <Banner />
      <Catalogue />
    </div>
  );
}

export default App;
