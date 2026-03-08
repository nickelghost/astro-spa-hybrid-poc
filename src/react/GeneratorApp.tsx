import { BrowserRouter, Route, Routes } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import GeneratorIndex from "./GeneratorIndex";
import GeneratorResult from "./GeneratorResult";

function GeneratorApp({ path }: { path: string }) {
  const Router = globalThis.window ? BrowserRouter : StaticRouter;
  return (
    <Router basename="/generator" location={path}>
      <Routes>
        <Route path="/" element={<GeneratorIndex />} />
        <Route path="/:name" element={<GeneratorResult />} />
      </Routes>
    </Router>
  );
}

export default GeneratorApp;
