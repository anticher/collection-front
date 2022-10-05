import styles from "./styles.module.css";
import Header from "./Header/Header";
import Main from "./Main/Main";
import { Route, Routes } from "react-router-dom";
import Login from "./Login/Login";
import Registration from "./Registration/Registration";

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <Routes>
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Main />} />
          <Route path="/test" element={<div>test</div>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
