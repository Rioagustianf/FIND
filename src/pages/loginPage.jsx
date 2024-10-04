import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authenticateUser } from "../services/api.service";
import Input from "../components/Elements/Input";
import PrimButton from "../components/Elements/Button";
import bg from "../assets/bglogin.jpg";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const sessionId = await authenticateUser(username, password);
      if (sessionId) {
        // Simpan sessionId ke localStorage (atau state management lainnya)
        localStorage.setItem("sessionId", sessionId);
        navigate("/"); // Arahkan ke halaman beranda setelah login sukses
      } else {
        setError("Login gagal. Silakan periksa kembali username dan password.");
      }
    } catch (error) {
      setError("Terjadi kesalahan. Silakan coba lagi nanti.");
    }
  };

  return (
    <>
      <div className="absolute top-0 left-0 w-full h-full">
        <img
          className="w-full h-full object-cover opacity-40"
          src={bg}
          alt=""
        />
      </div>
      <div className="absolute top-0 left-1/2 translate-x-[-50%] flex justify-center items-center min-h-screen">
        <div className="w-full max-w-md bg-black bg-opacity-40 p-8 rounded shadow-lg">
          <h1 className="text-2xl text-white font-bold text-center mb-6">
            Login
          </h1>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-white font-bold mb-2">
                Username
              </label>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username"
              />
            </div>
            <div className="mb-6">
              <label className="block text-white font-bold mb-2">
                Password
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password"
              />
            </div>
            <PrimButton type="submit">Login</PrimButton>
          </form>
          <p className="text-center text-white mt-4">
            Belum punya akun?{" "}
            <a
              href="/register"
              className="text-yellow-300 font-bold hover:underline"
            >
              Daftar di TMDb
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
