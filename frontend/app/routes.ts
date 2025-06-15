import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
  route("/", "routes/home.tsx"),
  route("login", "routes/LogIn.tsx"),
  route("list", "routes/TrainingRecordList.tsx"),
  route("list/:date", "routes/TrainingRecordListByDate.tsx"),
  route("create", "routes/TrainingRecordCreate.tsx"),
  route("update/:id", "routes/TrainingRecordEdit.tsx"),
  route("exercise-category/", "routes/ExerciseCategoryManager.tsx"),
] satisfies RouteConfig;
