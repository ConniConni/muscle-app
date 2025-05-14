import { useEffect, useState } from "react";
import type { Route } from "../+types/root";
import Title from "~/utils/Title";
import ManageMstPage from "~/pages/components/ManageMst";

export function meta({}: Route.MetaArgs) {
  return [
    {
      title: Title.title,
      description: Title.description,
      content: Title.content,
    },
  ];
}

export default function Update() {
  return <ManageMstPage />;
}
