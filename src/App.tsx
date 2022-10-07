import styles from "./App.module.css";
import Header from "./components/header/Header";
import Main from "./components/main/Main";
import { Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import Registration from "./components/registration/Registration";

import { useAppSelector, useAppDispatch } from "./app/hooks";
import { decrement, increment } from "./app/testSlice";
import Collections from "./components/collections/Collections";
import Collection from "./components/collections/collection/Collection";

function App() {
  // The `state` arg is correctly typed as `RootState` already
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.app}>
      <Header />
      <button onClick={() => dispatch(increment())}>click +</button>
      <div>{count}</div>
      <button onClick={() => dispatch(decrement())}>click -</button>
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
