import { Link, useParams } from "react-router-dom";

function GeneratorResult() {
  const { name } = useParams<{ name: string }>();

  return (
    <div>
      <h2>Hello {name}!</h2>
      <Link to="/generator">Back</Link>
    </div>
  );
}

export default GeneratorResult;
