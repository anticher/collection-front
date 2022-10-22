import styles from "./App.module.css";
import Header from "./components/header/Header";
import { Route, Routes } from "react-router-dom";
import Login from "./components/auth/login/Login";
import Registration from "./components/auth/registration/Registration";
import Collections from "./components/collections/Collections";
import Collection from "./components/collection/Collection";
import { useAppDispatch, useAppSelector } from "./app/app-hooks";
import { useEffect } from "react";
import { useCheckAuthQuery } from "./app/auth/auth.api-slice";
import { initialState, setAuthData } from "./app/auth/auth.slice";
import CollectionItemPage from "./components/collection-item-page/Collection-item-page";

function App() {
  const appTheme = useAppSelector((state) => state.settings.theme);
  const dispatch = useAppDispatch();

  const {
    data: userState,
    isSuccess,
    isError,
    error,
  } = useCheckAuthQuery('', {
    pollingInterval: 60000,
  });
  
  useEffect(() => {
    const appThemeClass = `app-theme-${appTheme}`;
    document.body.classList.add(appThemeClass);
    return () => {
      document.body.classList.remove(appThemeClass);
    };
  }, [appTheme]);

  useEffect(() => {

  if (isError) {
    console.log('error')
    dispatch(setAuthData(initialState));
  } else if (isSuccess) {
    if (userState) dispatch(setAuthData(userState));
    else dispatch(setAuthData(initialState))
  }
  })

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <Routes>
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<div>main</div>} />
          <Route path="collections/:username/:id/:id" element={<CollectionItemPage />} />
          <Route path="collections/:username/:id" element={<Collection />} />
          <Route path="collections/:username" element={<Collections />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
