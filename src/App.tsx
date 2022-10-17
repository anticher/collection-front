import styles from "./App.module.css";
import Header from "./components/header/Header";
import { Route, Routes } from "react-router-dom";
import Login from "./components/auth/login/Login";
import Registration from "./components/auth/registration/Registration";
import Collections from "./components/collections/Collections";
import Collection from "./components/collection/Collection";
import { useAppSelector } from "./app/app-hooks";
import { useEffect } from "react";

function App() {
  const appTheme = useAppSelector((state) => state.settings.theme);

  useEffect(() => {
    const appThemeClass = `app-theme-${appTheme}`;
    document.body.classList.add(appThemeClass);
    return () => {
      document.body.classList.remove(appThemeClass);
    };
  });
  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <Routes>
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<div>main</div>} />
          <Route path="collections/:username/:id" element={<Collection />} />
          <Route path="collections/*" element={<Collections />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
