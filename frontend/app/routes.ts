import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  route("/", "routes/home.tsx"),
  route("create", "routes/TrainingRecordCreate.tsx"),
  route("update/:id", "routes/TrainingRecordEdit.tsx"),
  route("exercise-category/", "routes/ExerciseCategoryManager.tsx"),
] satisfies RouteConfig;
