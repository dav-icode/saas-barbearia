"use client";
import { useState } from "react";

function Ola() {
  const [count, setCount] = useState<number>(0);

  return (
    <>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)} className="bg-slate-800 p-2">
        Aumentar 1
      </button>
    </>
  );
}
export default Ola;
