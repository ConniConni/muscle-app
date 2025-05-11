import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  route("/", "routes/home.tsx"),
  route("create", "routes/create.tsx"),
  route("update/:id", "routes/update.tsx"),
] satisfies RouteConfig;
