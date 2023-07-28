import { useForm } from "react-hook-form";
import { registerRequest } from "../../api/auth.js";

function RegisterPage() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    const res = await registerRequest(data);
    console.log(res);
  };

  return (
    <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
      <h1>Register form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register("username", { required: true, min: 3, max: 20 })}
          placeholder="Username"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 my-2"
        />
        <input
          type="email"
          {...register("email", { required: true })}
          placeholder="Email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 mt-2 mb-2"
        />
        <input
          type="password"
          {...register("password", { required: true, min: 4 })}
          placeholder="Password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 mt-2 mb-2"
        />
        <button
          type="submit"
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
