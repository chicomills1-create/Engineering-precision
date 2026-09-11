import { renderToStaticMarkup } from "react-dom/server";
import App from "./App";

export function renderRoute(path: string): string {
  return renderToStaticMarkup(<App ssrPath={path} />);
}