import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
  // ログインページは保護しない（ルートレベルに配置）
  route("login", "routes/Login.tsx"),

  // ここから下がログイン必須のルート
  route(
    "/", // 親ルートのパス
    "auth/PrivateRoutes.tsx", // 親ルートが描画するコンポーネント
    [
      // 以下は子ルート（PrivateRoutesの<Outlet>に描画される）
      route("", "routes/home.tsx"), // pathが""で、親の"/"と結合して "/" になる
      route("list", "routes/TrainingRecordList.tsx"),
      route("list/:date", "routes/TrainingRecordListByDate.tsx"),
      route("create", "routes/TrainingRecordCreate.tsx"),
      route("update/:id", "routes/TrainingRecordEdit.tsx"),
      route("exercise-category", "routes/ExerciseCategoryManager.tsx"),
    ]
  ),
] satisfies RouteConfig;
