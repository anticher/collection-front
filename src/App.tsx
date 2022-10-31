import styles from "./App.module.css";
import Header from "./components/header/Header";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/auth/login/Login";
import Registration from "./components/auth/registration/Registration";
import Collections from "./components/collections/Collections";
import Collection from "./components/collection/Collection";
import { useAppDispatch, useAppSelector } from "./app/app-hooks";
import { useEffect } from "react";
import { useCheckAuthQuery } from "./app/auth/auth.api-slice";
import { initialState, setAuthData } from "./app/auth/auth.slice";
import CollectionItemPage from "./components/collection-item-page/Collection-item-page";
import AdminPage from "./components/admin/Admin-page";
import SearchResultsPage from "./components/search/pages/Search-results-page";
import Main from "./components/main/Main";
import TagSearchResultsPage from "./components/search/pages/Tag-search-results-page";
import i18n from "./localization/i18n";

function App() {
  const { theme: appTheme, localization: appLocalization } = useAppSelector(
    (state) => state.settings
  );
  const dispatch = useAppDispatch();

  const {
    data: userState,
    isSuccess,
    isError,
  } = useCheckAuthQuery("", {
    pollingInterval: 10000,
  });

  useEffect(() => {
    const appThemeClass = `app-theme-${appTheme}`;
    document.body.classList.add(appThemeClass);
    return () => {
      document.body.classList.remove(appThemeClass);
    };
  }, [appTheme]);

  useEffect(() => {
    i18n.changeLanguage(appLocalization);
  }, [appLocalization]);

  useEffect(() => {
    if (isError) {
      dispatch(setAuthData(initialState));
    } else if (isSuccess) {
      if (userState) {
        dispatch(setAuthData(userState));
      } else {
        dispatch(setAuthData(initialState));
      }
    }
  }, [dispatch, isError, isSuccess, userState]);

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <Routes>
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-menu" element={<AdminPage />} />
          <Route path="/search/:searchString" element={<SearchResultsPage />} />
          <Route
            path="/search-by-tag/:searchString"
            element={<TagSearchResultsPage />}
          />
          <Route path="/" element={<Main />} />
          <Route
            path="/collections/:username/:id/:id"
            element={<CollectionItemPage />}
          />
          <Route path="/collections/:username/:id" element={<Collection />} />
          <Route path="/collections/:username" element={<Collections />} />
          <Route path="/404" element={<div>not found</div>} />
          <Route path="*" element={<Navigate replace to="/404" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
