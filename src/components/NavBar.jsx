import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useDebounce from "../customHooks/useDebounce";
import { useDispatch, useSelector } from "react-redux";
import { useSupabaseAuth } from "../supabase";
import { userInfoSlice, userLoginSlice } from "../RTK/slice";
import loginIcon from "../assets/loginicon.png";

export default function NavBar() {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const debounceValue = useDebounce(searchInput, 1000);
  const userInfo = useSelector((state) => state.getLocaluserInfo);
  const isLogin = useSelector((state) => state.isUserLogin);
  const { logout } = useSupabaseAuth();
  const dispatch = useDispatch();

  console.log(userInfo);

  useEffect(() => {
    if (debounceValue) {
      navigate(`/search?movie=${debounceValue}`);
    } else {
      navigate("/");
    }
  }, [debounceValue]);

  const handleLogout = async () => {
    console.log("로그아웃");
    const isLogout = await logout();
    console.log(isLogout);
    dispatch(userInfoSlice.actions.update(null));
    dispatch(userLoginSlice.actions.isLogin(false));
  };
  return (
    <>
      <header className="relative">
        <div className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
          <button
            className="text-2xl font-bold cursor-pointer text-blue-600"
            onClick={() => navigate(`/`)}
          >
            🎬 OZ무비
          </button>

          <div className="flex items-center gap-4">
            <input
              value={searchInput}
              onChange={(e) => {
                const nowSearchInput = e.target.value;
                setSearchInput(nowSearchInput);
              }}
              type="text"
              placeholder="영화 검색"
              className="hidden md:block border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {!isLogin && (
              <button
                className="hidden md:block text-sm px-4 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition"
                onClick={() => navigate("/login")}
              >
                로그인
              </button>
            )}
            {isLogin && (
              <div className="relative group">
                <img
                  className="w-[50px] cursor-pointer"
                  src={loginIcon}
                  alt="로그인아이콘썸네일"
                />
                <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                  <button
                    className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                    // onClick={() => navigate("/wishlist")}
                  >
                    관심목록
                  </button>
                  <button
                    className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                    onClick={() => handleLogout()}
                  >
                    로그아웃
                  </button>
                </div>
              </div>
            )}
            {!isLogin && (
              <button
                className="hidden md:block text-sm px-4 py-1 rounded-md border border-blue-500 text-blue-500 hover:bg-blue-100 transition"
                onClick={() => navigate("/signup")}
              >
                회원가입
              </button>
            )}
            <button
              className="block md:hidden text-2xl pb-1 "
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            >
              ☰
            </button>
          </div>
        </div>
        {/* 모바일 메뉴 (768px 이하에서만 보이고, 상태 따라 열림) */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full z-10 md:hidden">
            <div className="shadow-md h-[10px]"></div>
            <div className="bg-white shadow-md flex justify-end px-6 py-4 gap-2 md:hidden">
              <input
                value={searchInput}
                onChange={(e) => {
                  const nowSearchInput = e.target.value;
                  setSearchInput(nowSearchInput);
                }}
                type="text"
                placeholder="영화 검색"
                className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {!isLogin && (
                <>
                  <button
                    className="text-sm px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition"
                    onClick={() => navigate("/login")}
                  >
                    로그인
                  </button>

                  <button
                    className="text-sm px-4 py-2 rounded-md border border-blue-500 text-blue-500 hover:bg-blue-100 transition"
                    onClick={() => navigate("/signup")}
                  >
                    회원가입
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
