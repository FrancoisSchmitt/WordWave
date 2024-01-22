import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './index.css'
// import Header from "./components/layout/header";
import Footer from "./components/layout/footer";

import Home from "./pages/home";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<React.StrictMode>
    <BrowserRouter>
			<Routes>
			{/* <Route element={<Header />} /> */}
				<Route path="/" element={<Home />} />
			</Routes>
			<Footer />
		</BrowserRouter>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
