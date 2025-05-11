import Title from "~/pages/components/title";
import type { Route } from "../+types/root";
import UpdatePage from "~/pages/components/UpdatePage";

export function meta({}: Route.MetaArgs) {
  const titleProps = Title();
  return [titleProps];
}

export default function Update() {
  return <UpdatePage />;
}
