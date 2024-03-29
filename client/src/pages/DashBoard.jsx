import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashboardSidebar from "../components/DashboardSidebar.jsx";
import DashboardProfile from "../components/DashboardProfile.jsx";
import DashboardPosts from "../components/DashboardPosts.jsx";
import DashboardUsers from "../components/DashboardUsers.jsx";
import DashboardComments from "../components/DashboardComments.jsx";
import DashboardComponent from "../components/DashboardComponent.jsx";


export default function DashBoard() {
  const [tab, setTab] = useState('');
  const location = useLocation();
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if(tabFromUrl){
      setTab(tabFromUrl)
    }
  }, [location.search])
    return (
      <div className="min-h-screen flex flex-col md:flex-row">
        <div className="md:w-56">
          {/* Sidebar */}
          <DashboardSidebar />
          {/* profile */}
        </div>
        {tab === 'profile' && <DashboardProfile />}
        {tab === 'posts' && <DashboardPosts />}
        {tab === 'users' && <DashboardUsers />}
        {tab === 'comments' && <DashboardComments />}
        {tab === 'dash' && <DashboardComponent />}
      </div>
    )
  }