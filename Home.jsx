import React, { useState } from "react";
import Navbar from "./Navbar";
import MenuLateral from "./MenuLateral";
import "./Home.css";

export default function Home() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <div className="container-home">
      <Navbar onOpenMenu={() => setMenuAberto(true)} />

      <MenuLateral
        isOpen={menuAberto}
        onCloseMenu={() => setMenuAberto(false)}
      />

      <main></main>
    </div>
  );
}
