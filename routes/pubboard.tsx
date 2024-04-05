import { Handlers, PageProps } from "$fresh/server.ts";
import Layout from "../components/Layout.tsx";
import { Data } from "./index.tsx";
import { getCookies } from "$std/http/cookie.ts";
import PubDashboardComp from "../islands/PubDashboardComp.tsx";

const PublicDashboard = ({ data }: PageProps<Data>) => {
    return (
        <Layout data={data}>
            <>
                <PubDashboardComp />
            </>
        </Layout>
    );  
};

export const handler: Handlers<Data> = {
    GET(req, ctx) {
      const cookies = getCookies(req.headers);
  
      return ctx.render!({ isAllowed: cookies.auth === "bar" });
    },
  };

export default PublicDashboard