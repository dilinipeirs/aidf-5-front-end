import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import HomePage from "./pages/home.page.jsx";
import SignInPage from "./pages/sign-in.page.jsx";
import SignUpPage from "./pages/sign-up.page.jsx";
import NotFoundPage from "./pages/not-found.page.jsx";
import RootLayout from "./components/layouts/root-layout.page.jsx";
import HotelsPage from "./pages/hotels.page.jsx";
import HotelDetailsPage from "./pages/hotel-details.page.jsx";

import { BrowserRouter, Routes, Route } from "react-router";

import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/hotels" element={<HotelsPage />} />
          <Route path="/hotels/:_id" element={<HotelDetailsPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
