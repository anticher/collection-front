import styles from "./styles.module.css";
import Header from "./Header/Header";
import Main from "./Main/Main";
import { Route, Routes } from "react-router-dom";
import Login from "./Login/Login";
import Registration from "./Registration/Registration";

import { useAppSelector, useAppDispatch } from '../app/hooks'
import { decrement, increment } from '../app/testSlice'

function App() {
  // The `state` arg is correctly typed as `RootState` already
  const count = useAppSelector(state => state.counter.value)
  const dispatch = useAppDispatch()

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
          <Route path="*" element={<Main />} />
          <Route path="/test" element={<div>test</div>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
