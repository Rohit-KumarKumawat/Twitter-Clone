import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { socket } from "./Components/Socket";
// import SocketRegister from "./Components/SocketRegister";

function App() {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Client connected", socket.id);
    });
  }, []);
  return (
    <div>
      {/* <SocketRegister /> */}
      <Outlet />
    </div>
  );
}

export default App;
