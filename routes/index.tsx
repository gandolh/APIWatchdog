import { Handlers, PageProps } from "$fresh/server.ts";
import Layout from "../components/Layout.tsx";
import { getCookies } from "$std/http/cookie.ts";
import PubDashboardComp from "../islands/PubDashboardComp.tsx";
import { UserData } from "../islands/AppStateProvider.tsx";

const PublicDashboard = ({ data }: PageProps<UserData>) => {
    return (
        <Layout data={data}>
            <>
                <PubDashboardComp />
            </>
        </Layout>
    );  
};

export const handler: Handlers<UserData> = {
    GET(req, ctx) {
      const cookies = getCookies(req.headers);
  
      return ctx.render!({ isAllowed: cookies.auth === "bar" });
    },
  };

export default PublicDashboard