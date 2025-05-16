import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSupabaseAuth } from "../supabase";
import { useDispatch } from "react-redux";
import { serviceTokenSlice, userInfoSlice, userLoginSlice } from "../RTK/slice";
import { FcGoogle } from "react-icons/fc"; // Google 아이콘
import kakaoButtonImg from "../assets/kakao_login_large_wide.png";
import axios from "axios";

const KAKAOCLIENT_ID = import.meta.env.VITE_KAKAOCLIENT_ID;
const NAVERCLIENT_ID = import.meta.env.VITE_NAVERCLIENT_ID;
const NAVERCLIENT_SECRET = import.meta.env.VITE_NAVERCLIENT_SECRET;
const NAVERSECRET = import.meta.env.VITE_NAVERSECRET;

const redirectURI = "http://localhost:5173/login";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useSupabaseAuth();
  const dispatch = useDispatch();
  const [serchParams] = useSearchParams();

  const kakaoLogin = () => {
    location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAOCLIENT_ID}&redirect_uri=${redirectURI}&response_type=code`;
  };
  const getKakaoUserInfo = async (authorizationCode) => {
    axios
      .post(
        `https://kauth.kakao.com/oauth/token`,
        {
          grant_type: "authorization_code",
          client_id: KAKAOCLIENT_ID,
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
        const kakaoAccessToken = res.data.access_token;
        console.log(kakaoAccessToken);
        dispatch(serviceTokenSlice.actions.update(kakaoAccessToken));
        return axios.get(`https://kapi.kakao.com/v2/user/me`, {
          headers: {
            Authorization: `Bearer ${kakaoAccessToken}`,
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        });
      })
      .then((response) => {
        const { nickname, profile_image } = response.data.properties;
        dispatch(
          userInfoSlice.actions.update({
            nickname,
            profile_image,
            service: "kakao",
          })
        );
        dispatch(userLoginSlice.actions.isLogin(true));
      });
  };

  const naverLogin = () => {
    location.href = `https://nid.naver.com/oauth2.0/authorize?client_id=${NAVERCLIENT_ID}&response_type=code&redirect_uri=${redirectURI}&state=${NAVERSECRET}`;
  };

  const getNaverUserInfo = (authorizationCode, naverState) => {
    axios
      .post(`http://localhost:3000/naver/login`, {
        authorizationCode,
      })
      .then((res) => {
        const naverAccessToken = res.data;
        dispatch(serviceTokenSlice.actions.update(naverAccessToken));
        return axios
          .post("http://localhost:3000/naver/userinfo", {
            naverAccessToken,
          })
          .then((res) => {
            const { profile_image, name } = res.data;
            dispatch(
              userInfoSlice.actions.update({
                nickname: name,
                profile_image,
                service: "naver",
              })
            );
            dispatch(userLoginSlice.actions.isLogin(true));
          });
      });
  };

  useEffect(() => {
    const authorizationCode = serchParams.get("code");
    const naverState = serchParams.get("state");

    if (authorizationCode) {
      if (naverState) {
        getNaverUserInfo(authorizationCode, naverState);
      } else {
        getKakaoUserInfo(authorizationCode);
      }
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

  const googleLogin = async () => {};

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
            onClick={naverLogin}
            className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg"
          >
            네이버로 로그인
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
