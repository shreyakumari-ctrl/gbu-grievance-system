
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff, FiLock } from "react-icons/fi";
import Card from "../components/common/Card";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { useAuth } from "../context/AuthContext";
import { ROUTES } from "../routes/routePaths";

function AdminLoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setLoginError("");
    const success = login(formData.email.trim(), formData.password);

    if (success) {
      navigate(ROUTES.ADMIN_DASHBOARD);
    } else {
      setLoginError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-indigo-50 via-white to-sky-50">
      <Card className="max-w-md w-full">
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center">
            <FiLock className="text-2xl text-indigo-600" aria-hidden="true" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-slate-800 text-center mb-1">
          Admin Login
        </h1>
        <p className="text-slate-500 text-center mb-6">
          Sign in to manage grievances
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="admin@gbu.ac.in"
            error={errors.email}
            required
          />

          <div className="relative">
            <Input
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              error={errors.password}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-slate-400 hover:text-indigo-600 transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          {loginError && (
            <p className="text-sm text-red-500 text-center">{loginError}</p>
          )}

          <Button type="submit" variant="primary" className="mt-2">
            Login
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default AdminLoginPage;