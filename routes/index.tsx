import type { Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import Layout from "../components/Layout.tsx";
import { UserData } from "../islands/AppStateProvider.tsx";


export default function Home({ data }: PageProps<UserData>) {
  return (
    <div>
      <Layout data={data}>
        <div>
          You currently {data.isAllowed ? "are" : "are not"} logged in.
        </div>
      </Layout>
    </div>
  );
}

export const handler: Handlers<UserData> = {
  GET(req, ctx) {
    const cookies = getCookies(req.headers);

    return ctx.render!({ isAllowed: cookies.auth === "bar" });
  },
};