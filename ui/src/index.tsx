import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";

import "./index.css";
import "antd/dist/antd.css";
import App from "./App";
import Lecture from "./routes/lecture";
import Results from "./routes/results";
import reportWebVitals from "./reportWebVitals";
import AboutUs from "./routes/about_us";
import Contact from "./routes/contact";

render(
  <>
    <Helmet>
      <meta
        name="google-site-verification"
        content="FCSlkOUl1kpidRHQJ59lR5RUeZtJ4AgjqLZ64FpeAjg"
      />
    </Helmet>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="search" element={<Results />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="contact" element={<Contact />} />
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
    </BrowserRouter>
  </>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
