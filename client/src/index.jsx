import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes, Outlet, Redirect } from "react-router-dom";
import "./index.css";

import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";

import Header from "./components/layout/header";
import Footer from "./components/layout/footer";

import Home from "./pages/home";
import Register from "./pages/register";
import Login from "./pages/login";
import Error404 from "./pages/error";
import Index from "./pages/index";

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
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<BrowserRouter>
					<Routes>
						<Route element={<PageLayout />}>
							<Route path="/" element={<Index />} />
							<Route path="/login" element={<Login />} />
							<Route path="/register" element={<Register />} />
							<Route path="/home" element={<Home />} />
						</Route>
						<Route path="*" element={<Error404 />} />
						<Route path="/404" element={<Error404 />} />
					</Routes>
				</BrowserRouter>
			</PersistGate>
		</Provider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
