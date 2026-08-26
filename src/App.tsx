import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeletarCategoria from "./components/categorias/deletarcategorias/DeletarCategoria";
import FormCategoria from "./components/categorias/formcategoria/FormCategoria";
import ListarCategorias from "./components/categorias/listarcategorias/ListarCategorias";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import { AuthContext } from "./contexts/AuthContext";
import Cadastro from "./pages/cadastro/Cadastro";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
	const { usuario } = useContext(AuthContext)

	return (
		<div className="flex min-h-screen flex-col bg-nexus">
			<ToastContainer position="top-right" autoClose={3000} />
			{usuario.token !== '' && <Navbar />}
			<div className="flex flex-1 flex-col">
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/cadastro" element={<Cadastro />} />
					<Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
					<Route path="/categorias" element={<ProtectedRoute><ListarCategorias /></ProtectedRoute>} />
					<Route path="/cadastrarcategoria" element={<ProtectedRoute><FormCategoria /></ProtectedRoute>} />
					<Route path="/editarcategoria/:id" element={<ProtectedRoute><FormCategoria /></ProtectedRoute>} />
					<Route path="/deletarcategoria/:id" element={<ProtectedRoute><DeletarCategoria /></ProtectedRoute>} />
				</Routes>
			</div>
			{usuario.token !== '' && <Footer />}
		</div>
	)
}

export default App