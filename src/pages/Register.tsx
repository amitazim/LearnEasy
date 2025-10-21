import { AuthContext, type AuthContextType } from "@/providers/AuthProviders";
import { useContext } from "react";
import { useNavigate, useLocation } from "react-router";
import Swal from "sweetalert2";
import a1 from "../assets/Animation - 1735202464545.json";
import Lottie from "lottie-react";
import type { UserCredential } from "firebase/auth";

const Register: React.FC = () => {
  const context = useContext(AuthContext);
  
  // Type guard for context
  if (!context) {
    throw new Error('Register must be used within AuthProvider');
  }
  
  const { googleLogin, setUser }: AuthContextType = context;
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoogleLogin = (): void => {
    googleLogin()
      .then((res: UserCredential) => {
        console.log(res.user);
        
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Signed in successfully",
          showConfirmButton: false,
          timer: 1500,
        });

        setUser(res.user);
        navigate(location?.state ? location.state as string : "/");
      })
      .catch((err: Error) => {
        Swal.fire({
          position: "top-end",
          icon: "error", // Changed from "success" to "error"
          title: `${err.message}`,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-800 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
      </div>

      <div className="relative w-full max-w-6xl mx-auto">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20">
          <div className="flex flex-col lg:flex-row">
            {/* Left side - Animation */}
            <div className="lg:w-1/2 bg-gradient-to-br from-emerald-600 to-teal-700 p-8 lg:p-12 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-white/5"></div>
              <div className="relative z-10 text-center">
                <div className="w-80 h-80 mx-auto mb-6">
                  <Lottie
                    animationData={a1}
                    className="w-full h-full"
                    loop={true}
                  />
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  Join Our Community!
                </h2>
                <p className="text-emerald-100 text-lg">
                  Create your account and start your learning journey
                </p>
              </div>
              {/* Decorative elements */}
              <div className="absolute top-10 right-10 w-20 h-20 border border-white/20 rounded-full"></div>
              <div className="absolute bottom-10 left-10 w-16 h-16 border border-white/20 rounded-full"></div>
              <div className="absolute top-1/2 left-10 w-12 h-12 border border-white/20 rounded-full"></div>
            </div>

            {/* Right side - Form */}
            <div className="lg:w-1/2 p-8 lg:p-12">
              <div className="max-w-md mx-auto">
                <div className="text-center mb-8">
                  <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                    Create Account
                  </h1>
                  <p className="text-gray-300">
                    Fill in your details to get started
                  </p>
                </div>

                <div className="mt-8">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/20"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-transparent text-gray-300 font-medium">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleGoogleLogin}
                    type="button"
                    className="mt-6 w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-transparent backdrop-blur-sm flex items-center justify-center space-x-3"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    <span>Sign Up with Google</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;