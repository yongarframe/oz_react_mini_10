import { useState } from "react";
import { useSupabaseAuth } from "../supabase";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [userName, setName] = useState("");
  const [password, setPassWord] = useState("");
  const [checkPassWord, setCheckPassWord] = useState("");
  const { signUp } = useSupabaseAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fetchSignUp = await signUp({
        email,
        password,
        userName: userName,
      });
      if (fetchSignUp) {
        navigate("/");
      }
    } catch (error) {
      console.error("회원가입 중 오류 발생", error);
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">회원가입</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              이메일
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              이름
            </label>
            <input
              value={userName}
              onChange={(e) => setName(e.target.value)}
              type="text"
              id="name"
              name="name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              비밀번호
            </label>
            <input
              value={password}
              onChange={(e) => setPassWord(e.target.value)}
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium mb-1"
            >
              비밀번호 확인
            </label>
            <input
              value={checkPassWord}
              onChange={(e) => setCheckPassWord(e.target.value)}
              type="password"
              id="confirm-password"
              name="confirm-password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
}
