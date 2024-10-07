import Link from "next/link";
import "../globals.css";
import Login from "./login";

function NavLink(props: { text: string; }) {
  return <Link className=" text-lg w-full p-3 block" href={props.text}>
    {props.text}
  </Link>;
}
export default function SideNav() {
  return <div className=" w-1/6 h-full p-9 bg-slate-600 fixed">
    <Login />
    <NavLink text="NavLink1" />
  </div>;
}