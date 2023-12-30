import logo from './logo.svg';
import styles from './App.module.css';
import DrumDisplay from './components/DrumDisplay/drumdisplay';


function App() {
  return (
    <div className={styles["App"]}>
     
        <img src={logo} className={styles["App-logo"]} alt="logo" />
       
       <DrumDisplay />

       <span className={styles["copyright"]}>&copy;2024 Sulaiman Adejumo &middot; Nottingham</span>

        
   
    </div>
  );
}

export default App;
