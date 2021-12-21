import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import Lectures from "./routes/lectures";
import Lecture from "./routes/lecture";
import Results from "./routes/results";
import reportWebVitals from "./reportWebVitals";

render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="results" element={<Results />} />
      <Route path="lectures" element={<Lectures />}>
        <Route
          index
          element={
            <main style={{ padding: "1rem" }}>
              <p>Select a lecture</p>
            </main>
          }
        />
      </Route>
      <Route path="lectures/:lectureId" element={<Lecture />} />
      <Route
        path="*"
        element={
          <main style={{ padding: "1rem" }}>
            <p>There's nothing here!</p>
          </main>
        }
      />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
