import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSupabase, useSupabaseAuth } from "../supabase";
import { useDispatch, useSelector } from "react-redux";
import { userInfoSlice, userLoginSlice } from "../RTK/slice";
import { FcGoogle } from "react-icons/fc"; // Google 아이콘
import kakaoButtonImg from "../assets/kakao_login_large_wide.png";
import axios from "axios";

const VITE_KAKAOCLIENT_ID = import.meta.env.VITE_KAKAOCLIENT_ID;
const redirectURI = "http://localhost:5173/login";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useSupabaseAuth();
  const dispatch = useDispatch();
  const [serchParams] = useSearchParams();
  let kakaoAccessToken = "";

  // const { loginWithGoogle } = useSupabaseAuth();
  // const [error, setError] = useState("");
  const supabase = useSupabase();

  const kakaoLogin = () => {
    location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${VITE_KAKAOCLIENT_ID}&redirect_uri=${redirectURI}&response_type=code`;
  };
  const getToken = async (authorizationCode) => {
    axios
      .post(
        `https://kauth.kakao.com/oauth/token`,
        {
          grant_type: "authorization_code",
          client_id: VITE_KAKAOCLIENT_ID,
          redirect_uri: redirectURI,
          code: authorizationCode,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      )
      .then((res) => {
        kakaoAccessToken = res.data.access_token;
        return axios.get(`https://kapi.kakao.com/v2/user/me`, {
          headers: {
            Authorization: `Bearer ${kakaoAccessToken}`,
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        });
      })
      .then((response) => {
        const { nickname, profile_image } = response.data.properties;
        dispatch(userInfoSlice.actions.update({ nickname, profile_image }));
      });
  };

  useEffect(() => {
    const authorizationCode = serchParams.get("code");
    if (authorizationCode) {
      getToken(authorizationCode);
    }
  }, [serchParams]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const fetchLogin = await login({ email, password });
      if (fetchLogin) {
        dispatch(userLoginSlice.actions.isLogin(!!fetchLogin));
        navigate("/");
      } else {
        dispatch(userLoginSlice.actions.isLogin(false));
      }
    } catch (error) {
      console.error("로그인 중 오류 발생", error);
      dispatch(userLoginSlice.actions.isLogin(false));
    }
  };

  // const handleOAuthLogin = async (provider) => {
  //   const { error } = await supabase.auth.signInWithOAuth({ provider });
  //   if (error) setError(`${provider} 로그인 실패: ${error.message}`);
  // };

  // loginWithGoogle();

  const googleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:5173/oauth-callback",
        // oauth-callback
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });
    dispatch(userLoginSlice.actions.isLogin(data));
    if (data) {
      alert("로그인 되었습니다.");
    }
    if (error) console.log("error :", error);

    // console.log("구글로그인됨");
    // e.preventDefault();
    // loginWithGoogle("http://localhost:5173/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">로그인</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            type="submit"
            className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg"
          >
            로그인
          </button>
        </form>
        <button
          type="button"
          onClick={googleLogin}
          className="w-full flex items-center justify-center gap-2 border border-gray-300 bg-white text-black py-2 rounded-md hover:shadow-md transition mt-3"
        >
          <FcGoogle size={20} />
          <span>구글 계정으로 로그인</span>
        </button>
        <img
          onClick={kakaoLogin}
          src={kakaoButtonImg}
          className="mt-[10px] w-full"
        />
        <p className="mt-4 text-center text-sm text-gray-600">
          처음이신가요?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-600 underline cursor-pointer"
          >
            간편가입
          </span>
        </p>
      </div>
    </div>
  );
}
