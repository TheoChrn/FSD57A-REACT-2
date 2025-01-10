import { LOCAL_API_URL } from "@/lib/utils";
import axios, { AxiosError } from "axios";
import { ActionFunctionArgs, redirect, useFetcher } from "react-router";

export const loginAction =
  () =>
  async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();

    const credentials = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const { email, password } = credentials;

    if (!email || !password)
      return { ok: false, error: "All fields are required" };

    try {
      const res = await axios.post(`${LOCAL_API_URL}/login`, credentials);

      if (res.status >= 200 && res.status < 300) {
        localStorage.setItem("token", res.data.token);
        alert(res.data.message);
        return redirect("/");
      }
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        return { ok: false, error: "Email or password invalid" };
      }
      return { ok: false, error: "Something went wrong. Please try again." };
    }

    return null;
  };

export default function LoginPage() {
  const fetcher = useFetcher();
  return (
    <main>
      <div className=" max-w-screen-lg mx-auto space-y-8 p-8">
        <fetcher.Form method="post" className="space-y-4">
          <div className="flex flex-col items-center gap-2">
            <label className="flex w-full flex-col gap-2">
              Email
              <input
                type="email"
                name="email"
                required
                className="border-black border-2 rounded-lg p-3"
              />
            </label>
            <label className="flex w-full flex-col gap-2">
              Password
              <input
                type="password"
                name="password"
                required
                className="border-black border-2 rounded-lg p-3"
              />
            </label>
          </div>
          <button
            className="inline-flex justify-center gap-2 items-center p-3 rounded border-black border-2 w-52 hover:bg-black/10"
            type="submit"
          >
            Login
          </button>

          <div>{fetcher.data?.error && <p>{fetcher.data.error}</p>}</div>
        </fetcher.Form>
      </div>
    </main>
  );
}
