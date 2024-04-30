import { RouterProvider, createBrowserRouter } from "react-router-dom";
import GeneratorIndex from "./GeneratorIndex";
import GeneratorResult from "./GeneratorResult";

const router = createBrowserRouter([
  {
    path: "/generator",
    element: <GeneratorIndex />,
  },
  {
    path: "/generator/:name",
    element: <GeneratorResult />,
  },
]);

function Generator() {
  return <RouterProvider router={router} />;
}

export default Generator;
