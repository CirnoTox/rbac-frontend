import Login from "./components/login";
import Main from "./components/mainContent";
import SideNav from "./components/sideNav";
import "./globals.css";
export default function Home() {
  return (
    <div className=" h-full w-full">
      <SideNav/>
      <Main/>
      
    </div>
  );
}
