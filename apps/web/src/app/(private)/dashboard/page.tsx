import { AuthProvider } from "./providers/AuthProvider";

const Dashboard = () => {
  return (
    <AuthProvider>
      <div className="grid place-items-center">dashboard</div>{" "}
    </AuthProvider>
  );
};

export default Dashboard;
