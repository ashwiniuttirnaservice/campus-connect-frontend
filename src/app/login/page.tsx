import LoginForm from "./LoginForm";

export const metadata = {
  title: "Student Login",
  description: "Login page for students",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-2">
      <div className="w-full max-w-full">
        <LoginForm />
      </div>
    </div>
  );
}
