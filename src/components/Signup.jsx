export default function Signup() {
  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">회원가입</h2>
        <form>
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium mb-1">
              이메일
            </label>
            <input
              type="email"
              id="email"
              name="email"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label for="name" class="block text-sm font-medium mb-1">
              이름
            </label>
            <input
              type="text"
              id="name"
              name="name"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label for="password" class="block text-sm font-medium mb-1">
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              name="password"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label
              for="confirm-password"
              class="block text-sm font-medium mb-1"
            >
              비밀번호 확인
            </label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
