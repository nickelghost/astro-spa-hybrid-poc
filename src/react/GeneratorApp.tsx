import { BrowserRouter, Route, Routes } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import GeneratorIndex from "./GeneratorIndex";
import GeneratorResult from "./GeneratorResult";

function GeneratorApp({ path }: { path: string }) {
  const Router = globalThis.window ? BrowserRouter : StaticRouter;
  return (
    <Router location={path}>
      <Routes>
        <Route path="/generator" element={<GeneratorIndex />} />
        <Route path="/generator/:name" element={<GeneratorResult />} />
      </Routes>
    </Router>
  );
}

export default GeneratorApp;
