import { Link } from "react-router-dom"

interface HeaderProps {
  userType?: "student" | "teacher" | "admin" | null
  userName?: string
}

export default function Header({ userType, userName }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm dark:bg-gray-800 dark:border-b dark:border-gray-700 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
          퀴즈 생성기
        </Link>

        <div className="flex items-center space-x-4">
          {userType && (
            <>
              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
              >
                대시보드
              </Link>
              <div className="relative">
                <button className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400">
                  <span>
                    {userName || (userType === "student" ? "학생" : userType === "teacher" ? "선생님" : "관리자")}
                  </span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <Link
                to="/"
                className="text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
              >
                로그아웃
              </Link>
            </>
          )}

          {!userType && (
            <>
              <Link
                to="/login"
                className="text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
              >
                로그인
              </Link>
              <Link to="/quiz/create" className="btn-primary">
                회원가입
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}