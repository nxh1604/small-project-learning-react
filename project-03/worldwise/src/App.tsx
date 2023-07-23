import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import Cities from "./components/Cities/Cities";
import Countries from "./components/Countries/Countries";
import City from "./components/City/City";
import Form from "./components/Form/Form";
import { CitiesProvider } from "../contexts/CitiesContext";

const App = (): JSX.Element => {
  return (
    <CitiesProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path='pricing' element={<Pricing />} />
          <Route path='product' element={<Product />} />
          <Route path='login' element={<Login />} />
          <Route path='app' element={<AppLayout />}>
            <Route index element={<Navigate to={"cities"} replace />} />
            <Route path='cities' element={<Cities />} />
            <Route path='cities/:id' element={<City />} />
            <Route path='countries' element={<Countries />} />
            <Route path='form' element={<Form />} />
          </Route>
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </CitiesProvider>
  );
};

export default App;
