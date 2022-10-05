import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/registration" element={<div>registration</div>} />
        <Route path="/login" element={<div>login</div>} />
        <Route
          path="*"
          element={
            <>
              <Header />
              <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/test" element={<div>test</div>} />
              </Routes>
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
