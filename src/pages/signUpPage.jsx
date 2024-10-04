import bg from "../assets/bglogin.jpg";

const SignupPage = () => {
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
        <div className="w-full max-w-md bg-black bg-opacity-40 p-8 rounded shadow-md text-center">
          <h1 className="text-2xl text-white font-bold mb-6">Signup</h1>
          <p className="mb-4 text-white">
            Untuk membuat akun, silakan kunjungi halaman signup TMDb.
          </p>
          <a
            href="https://www.themoviedb.org/signup"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
          >
            Daftar di TMDb
          </a>
          <p className="mt-4 text-white">
            Sudah punya akun?{" "}
            <a href="/login" className="text-yellow-300 hover:underline">
              Login di sini
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
