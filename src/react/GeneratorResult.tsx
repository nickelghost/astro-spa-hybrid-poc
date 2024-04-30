import { useParams } from "react-router-dom";

function GeneratorResult() {
  const { name } = useParams<{ name: string }>();

  return <h2>Hello {name}!</h2>;
}

export default GeneratorResult;
