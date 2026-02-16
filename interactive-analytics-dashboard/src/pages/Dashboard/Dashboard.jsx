import { useState, useTransition } from "react";
import Overview from "./Overview";
import Sales from "./Sales";
import Users from "./Users";
import Analytics from "./Analytics";
import Header from "../../components/layout/Header";
import Sidebar from "../../components/layout/Sidebar";
import MainContent from "../../components/layout/MainContent";
import "../../styles/Dashboard.css";

const sections = ["overview", "sales", "users", "analytics"];

function Dashboard() {
  const [activeSection, setActiveSection] = useState(sections[0]);
  const [isPending, startTransition] = useTransition();

  const handleSectionChange = (section) => {
    startTransition(() => {
      setActiveSection(section);
    });
  };

  return (
    <div className="dashboard">
      <Header />

      {isPending && (
        <div className="global-loader">Завантаження розділу...</div>
      )}

      <div className="dashboard-body">
        <Sidebar
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
        />

        <MainContent>
          {activeSection === "overview" && <Overview />}
          {activeSection === "sales" && <Sales />}
          {activeSection === "users" && <Users />}
          {activeSection === "analytics" && <Analytics />}
        </MainContent>
      </div>
    </div>
  );
}

export default Dashboard;
