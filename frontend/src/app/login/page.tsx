import { createApiClient, isUnprocessableEntityError } from "@/api/apiClient";
import { ErrorMessage } from "@/components/errorMessage";
import { saveSessionData } from "@/features/auth/session";
import Link from "next/link";
import { redirect } from "next/navigation";
import { SignInForm } from "./form";

const signInAction = async (formData: FormData) => {
  "use server";

  const client = createApiClient({
    path: "/users/login",
    httpMethod: "post",
    params: {
      body: {
        user: {
          email: formData.get("email")?.toString() ?? "email",
          password: formData.get("password")?.toString() ?? "password",
        },
      },
    },
  });

  try {
    const { user } = await client.sendRequest();
    saveSessionData({ authUser: user });
    redirect("/");
  } catch (err) {
    if (isUnprocessableEntityError(err)) {
      return err;
    }
    throw err;
  }
};

const SignInPage = () => (
  <div className="auth-page">
    <div className="container page">
      <div className="row">
        <div className="col-md-6 offset-md-3 col-xs-12">
          <h1 className="text-xs-center">Sign in</h1>
          <p className="text-xs-center">
            <Link href="/register">Need an account?</Link>
          </p>
          <SignInForm />
        </div>
      </div>
    </div>
  </div>
);

export default SignInPage;
