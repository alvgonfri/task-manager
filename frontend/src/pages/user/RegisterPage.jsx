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
    <div className="flex justify-center mt-5">
      <div className="bg-slate-200 border border-slate-300 p-6 lg:w-1/3 rounded-lg shadow">
        <h1 className="text-xl font-bold mb-4">Register</h1>
        {registerErrors.map((error, i) => (
          <div
            className="bg-red-500 text-slate-50 text-sm p-2 rounded-lg my-2"
            key={i}
          >
            {error}
          </div>
        ))}

        <form onSubmit={onSubmit}>
          <label className="text-sm text-slate-500">&nbsp;Username</label>
          {errors.username && (
            <>
              <br></br>
              <p className="text-red-500 text-sm mb-1">
                &nbsp;Username is required and must be between 3 and 20
                characters
              </p>
            </>
          )}
          <input
            type="text"
            {...register("username", {
              required: true,
              minLength: 3,
              maxLength: 20,
            })}
            className="bg-slate-50 border border-slate-300 text-sm rounded-lg block w-full p-2.5 mb-3"
          />

          <label className="text-sm text-slate-500">&nbsp;Email</label>
          {errors.email && (
            <>
              <br></br>
              <p className="text-red-500 text-sm mb-1">
                &nbsp;Email is required and must be valid
              </p>
            </>
          )}
          <input
            type="email"
            {...register("email", { required: true })}
            className="bg-slate-50 border border-slate-300 text-sm rounded-lg block w-full p-2.5 mb-3"
          />

          <label className="text-sm text-slate-500">&nbsp;Password</label>
          {errors.password && (
            <>
              <br></br>
              <p className="text-red-500 text-sm mb-1">
                &nbsp;Password is required and must be at least 4 characters
              </p>
            </>
          )}
          <input
            type="password"
            {...register("password", { required: true, minLength: 4 })}
            className="bg-slate-50 border border-slate-300 text-sm rounded-lg block w-full p-2.5 mb-3"
          />

          <div className="flex justify-center mb-3">
            <button
              type="submit"
              className="bg-slate-700 hover:bg-slate-800 text-slate-50 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Register
            </button>
          </div>
        </form>
        <p className="flex gap-x-2 justify-between">
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
