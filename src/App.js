import { Container } from "react-bootstrap";
import Header from "./components/views/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import SingleTableWrapper from "./components/pages/SingleTableWrapper";
import NotFound from "./components/pages/NotFound";
import Footer from "./components/views/Footer";


function App() {
  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/table/:id" element={<SingleTableWrapper />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Container>
  );
}

export default App;
