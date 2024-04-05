import { Handlers, PageProps } from "$fresh/server.ts";
import Layout from "../components/Layout.tsx";
import { getCookies } from "$std/http/cookie.ts";
import { Data } from "./index.tsx";

const DevDashboard = ({ data }: PageProps<Data>) => {
    return (
        <Layout data={data}>
            <div>
                <h1>Dev Dashboard</h1>
            </div>
        </Layout>
    );
}

export const handler: Handlers<Data> = {
    GET(req, ctx) {
        const cookies = getCookies(req.headers);

        return ctx.render!({ isAllowed: cookies.auth === "bar" });
    },
};

export default DevDashboard;

