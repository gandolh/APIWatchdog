import { PageProps } from "$fresh/server.ts";

export default function DashboardEndpoints(props: PageProps) {
  const { dashboardId } = props.params;
  return (
    <main>
      <p>Greetings to you, {dashboardId}!</p>
    </main>
  );
}
