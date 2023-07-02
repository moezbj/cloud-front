import Sidebar from "../components/Sidebar/Sidebar";
import NavBar from "../components/Navbars/AdminNavbar";

export default function Page({ children }) {
  return (
    <div className="flex flex-row w-full h-screen bg-[#ccc]">
      <Sidebar />
      <div className="flex flex-col flex-auto">
        <NavBar />

        <main className="overflow-auto bg-gray-100 flex-auto flex flex-col w-full pb-[10px] pr-[10px]">
          {children}
        </main>
      </div>
    </div>
  );
}
