// src/pages/oauth-callback.tsx

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userInfoSlice, userLoginSlice } from "../RTK/slice";
import { useSupabase } from "../supabase";

export default function OAuthCallbackPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const supabase = useSupabase();

  useEffect(() => {
    const getUserInfo = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (data?.user) {
        dispatch(userInfoSlice.actions.update({ email: data.user.email }));
        localStorage.setItem("userInfo", JSON.stringify(data.user));
        navigate("/"); // 홈으로 리다이렉트
        dispatch(userLoginSlice.actions.isLogin(data));
      } else {
        console.error("소셜 로그인 실패:", error);
        navigate("/login"); // 실패 시 로그인 페이지로
      }
    };

    getUserInfo();
  }, []);

  return <div>로그인 중입니다...</div>;
}
