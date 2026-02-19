import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import AuthLayout from "@/components/layout/AuthLayout";
import { router, usePage } from "@inertiajs/react";

const Login = () => {
  const { errors } = usePage().props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    router.post(
      "/login",
      { email, password },
      {
        onFinish: () => setIsLoading(false),
        onError: () => console.log(errors),
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 p-4">
      <div className="w-full max-w-md">
        <Card className="bg-white shadow-2xl border border-blue-200 rounded-2xl">
          <CardHeader className="space-y-2 text-center">
            <div className="mx-auto mb-4 h-14 w-14 rounded-xl bg-blue-200 flex items-center justify-center">
              <Lock className="h-6 w-6 text-blue-700" />
            </div>

            <CardTitle className="text-2xl font-semibold text-slate-800">
              Welcome Back
            </CardTitle>

            <CardDescription className="text-slate-600">
              Enter your email and password to continue
            </CardDescription>

            {errors.errormsg && (
              <div className="text-red-500 text-sm mt-2">
                {errors.errormsg}
              </div>
            )}
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 border-blue-200 focus-visible:ring-blue-500 focus-visible:border-blue-500"
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-700">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 border-blue-200 focus-visible:ring-blue-500 focus-visible:border-blue-500"
                    disabled={isLoading}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition-all duration-200"
              >
                {isLoading ? (
                  "Signing in..."
                ) : (
                  <span className="flex items-center gap-2">
                    <LogIn className="h-4 w-4" />
                    Sign in
                  </span>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

Login.layout = (page: React.ReactNode) => <AuthLayout>{page}</AuthLayout>;

export default Login;
