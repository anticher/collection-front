import styles from "./App.module.css";
import Header from "./components/header/Header";
import { Route, Routes } from "react-router-dom";
import Login from "./components/auth/login/Login";
import Registration from "./components/auth/registration/Registration";
import Collections from "./components/collections/Collections";
import Collection from "./components/collections/collection/Collection";

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <Routes>
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<div>main</div>} />
          <Route path="collections/*" element={<Collections />} />
          <Route path="collection/*" element={<Collection />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
