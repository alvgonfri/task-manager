import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signUp, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (data) => {
    await signUp(data);
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
        <h1 className="text-xl font-bold">Register</h1>
        {registerErrors.map((error, i) => (
          <div
            className="bg-red-500 text-white text-sm p-2 rounded-lg my-2"
            key={i}
          >
            {error}
          </div>
        ))}

        <form onSubmit={onSubmit}>
          <input
            type="text"
            {...register("username", {
              required: true,
              minLength: 3,
              maxLength: 20,
            })}
            placeholder="Username"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 my-2"
          />
          {errors.username && (
            <span className="text-red-500 text-sm">
              Username is required and must be between 3 and 20 characters
            </span>
          )}

          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="Email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 mt-2 mb-2"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">
              Email is required and must be valid
            </span>
          )}

          <input
            type="password"
            {...register("password", { required: true, minLength: 4 })}
            placeholder="Password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 mt-2 mb-2"
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              Password is required and must be at least 4 characters
            </span>
          )}
          <br />
          <button
            type="submit"
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            Register
          </button>
        </form>
        <p className="flex gap-x-2 justify-center">
          Already have an account?{" "}
          <Link to="/login" className="text-sky-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
