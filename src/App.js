import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient";
import "./App.css";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import GuitarModelsPage from "./pages/GuitarModelsPage";
import GuitarDetailsPage from "./pages/GuitarDetailsPage";

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/brand/:brandId" element={<GuitarModelsPage />} />
              <Route path="/brand/:brandId/guitar/:guitarId" element={<GuitarDetailsPage />} />
              <Route path="/guitar/:guitarId" element={<GuitarDetailsPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
