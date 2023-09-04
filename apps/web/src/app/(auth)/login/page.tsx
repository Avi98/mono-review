import { Input } from "../../../components/input/BaseInput";

const Login = () => {
  return (
    <div className="grid h-screen w-screen place-items-center">
      <div className="relative flex-col justify-center overflow-hidden border-gray-400 p-10 sm:rounded-2xl sm:shadow-lg">
        <Input placeholder="email" />
        <Input placeholder="password" />
      </div>
    </div>
  );
};

export default Login;
