import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from  'react-router-dom';
import './App.scss';
import Home from "./Components/Home/Home";
import ImagePage from "./Components/Image";
import ImageGallery from "./Components/Image/Gallery";
import NotFound from "./Components/Common/NotFound";
import LayoutWrapper from "./Components/Common/Layout";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <LayoutWrapper>
              <Home />
            </LayoutWrapper>
          }
        />
        <Route
          path="/image/:imageId"
          element={
            <LayoutWrapper>
              <ImagePage />
            </LayoutWrapper>
          }
        />
        <Route
          path="/image-gallery"
          element={
            <LayoutWrapper>
              <ImageGallery />
            </LayoutWrapper>
          }
        />
        <Route
          path="/404"
          element={<NotFound />}
        />
        <Route
          path="*"
          element={<Navigate to="/404" replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;
