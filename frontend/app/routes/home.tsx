import { Top } from "~/pages/Top";
import Title from "~/pages/components/title";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  const titleProps = Title();
  return [titleProps];
}

export default function Home() {
  return <Top />;
}
