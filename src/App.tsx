import styles from "./App.module.css";
import Header from "./components/header/Header";
import { Route, Routes } from "react-router-dom";
import Login from "./components/auth/login/Login";
import Registration from "./components/auth/registration/Registration";
import Collections from "./components/collections/Collections";
import Collection from "./components/collections/collection/Collection";
import { useAppSelector } from "./app/hooks"

function App() {
  const appTheme = useAppSelector((state) => state.settings.theme);
  return (
    <div className={`${styles.app} app-theme-${appTheme}`}>
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
