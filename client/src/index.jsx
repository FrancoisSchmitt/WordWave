import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import "./index.css";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";

import Home from "./pages/home";
import Register from "./pages/register";
import Login from "./pages/login";
import Error404 from "./pages/error";

const root = ReactDOM.createRoot(document.getElementById("root"));
const PageLayout = () => (
	<>
		<Header />
		<Outlet />
		<Footer />
	</>
);
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route element={<PageLayout />}>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
				</Route>
				<Route path="*" element={<Error404 />} />
				<Route path="/404" element={<Error404 />} />
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
