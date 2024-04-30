import { useState } from "react";
import { Link } from "react-router-dom";

function GeneratorIndex() {
  const [name, setName] = useState("");

  return (
    <div>
      <label>
        Name
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Link to={`/generator/${name}`}>Generate</Link>
      </label>
    </div>
  );
}

export default GeneratorIndex;
