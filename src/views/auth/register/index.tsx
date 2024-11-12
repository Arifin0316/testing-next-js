import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useRef } from "react"; // Tambahkan useRef

function RegisterViews() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { push } = useRouter();
  const formRef = useRef<HTMLFormElement>(null); // Tambahkan ref untuk form

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    const form = event.currentTarget as HTMLFormElement;

    const formData = {
      email: (form.email as HTMLInputElement).value.trim(),
      name: (form.name as unknown as HTMLInputElement).value.trim(),
      password: (form.password as HTMLInputElement).value,
    };

    if (!formData.email || !formData.name || !formData.password) {
      setError("Harap lengkapi semua field.");
      setIsLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Format email tidak valid.");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password harus minimal 6 karakter.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.status === true) {
        formRef.current?.reset(); // Gunakan formRef untuk reset
        push("/auth/login");
      } else {
        setError(data.message || "Registrasi gagal, coba lagi.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("Terjadi masalah jaringan. Coba lagi nanti.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 border border-gray-200 rounded-lg shadow-lg bg-white">
      <h1 className="text-3xl font-bold mb-4 text-center">Register</h1>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nama Lengkap
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          {isLoading ? "Memproses..." : "Daftar"}
        </button>
      </form>

      <p className="mt-6 text-center">
        Sudah punya akun?{" "}
        <Link href="/auth/login" className="text-red-500 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}

export default RegisterViews;
