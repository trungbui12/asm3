import React from "react";
import FishList from "./components/FishList";
import AccessoryList from "./components/AccessoryList";

function App() {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>🐠 Aquarium Shop Management 🪸</h1>
      <FishList />
      <AccessoryList />
    </div>
  );
}

export default App;
