import { handleServerFunctions, RootLayout } from "@payloadcms/next/layouts";
import config from "@payload-config";
import "@payloadcms/next/css";
import type { ReactNode } from "react";
import type { ServerFunctionClient } from "payload";
import { importMap } from "./admin/importMap.js";
import "./custom.scss";

const serverFunction: ServerFunctionClient = async (args) => {
  "use server";
  return handleServerFunctions({ ...args, config, importMap });
};

export default function PayloadLayout({ children }: { children: ReactNode }) {
  return (
    <RootLayout
      config={config}
      importMap={importMap}
      serverFunction={serverFunction}
      htmlProps={{ lang: "id" }}
    >
      {children}
    </RootLayout>
  );
}
