import { Routes, Route, Link } from "react-router";
import { AuthProvider } from "./context/AuthContext";
import About from "./routes/About";
import Contact from "./routes/Contact";
import Woods from "./routes/Woods/pages";
import Home from "./routes/Home";
import CMS from "./routes/cms";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import Header from "./components/compound/Header";
import Footer from "./components/compound/Footer";

function App() {
  return (
    <AuthProvider>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/woods" element={<Woods />} />
          <Route path="/cms" element={<CMS />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>
      <Footer />
    </AuthProvider>
  );
}


export default App;