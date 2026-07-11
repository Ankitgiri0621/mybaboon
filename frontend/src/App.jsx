// App.jsx
import { Routes, Route, Link } from "react-router";
import About from "./routes/About";
import Contact from "./routes/Contact";
import Woods from "./routes/Woods/pages";
import Home from "./routes/Home";
import CMS from "./routes/CMS";
import Header from "./components/compound/Header";
import Footer from "./components/compound/Footer";

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/woods" element={<Woods />} />
          <Route path="/cms" element={<CMS />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}


export default App;