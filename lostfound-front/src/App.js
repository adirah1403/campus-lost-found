import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from './Components/LoginComponent/LoginPage';
import RegisterUser from './Components/LoginComponent/RegisterUser';
import AdminMenu from "./Components/LoginComponent/AdminMenu";
import StudentMenu from "./Components/LoginComponent/StudentMenu";
import SmartSearch from "./Components/ItemComponent/SmartSearch";

import LostItemEntry from "./Components/ItemComponent/LostItemEntry";
import LostItemsReport from "./Components/ItemComponent/LostItemsReport";
import FoundItemEntry from "./Components/ItemComponent/FoundItemEntry";
import FoundItemsReport from "./Components/ItemComponent/FoundItemsReport";
import StudentList from "./Components/LoginComponent/StudentList";
import MyProfile from "./Components/LoginComponent/MyProfile";
import ChatMessage from "./Components/MessageComponent/ChatMessage";

import MatchItemList from "./Components/ItemComponent/MatchItemList";
import AnalysisDashboard from "./Components/ItemComponent/AnalysisDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterUser />} />

        <Route path="/adminmenu" element={<AdminMenu />} />
        <Route path="/studentmenu" element={<StudentMenu />} />
        <Route path="/profile" element={<MyProfile />} />

        <Route path="/lost-entry" element={<LostItemEntry />} />
        <Route path="/lost-report" element={<LostItemsReport />} />
        <Route path="/found-entry" element={<FoundItemEntry />} />
        <Route path="/found-report" element={<FoundItemsReport />} />

        <Route path="/match-list" element={<MatchItemList />} />
        <Route path="/analysis-dashboard" element={<AnalysisDashboard />} />

        <Route path="/smart-search/:lostItemId" element={<SmartSearch />} />
        <Route path="/chat-msg" element={<ChatMessage />} />
        <Route path="/student-list" element={<StudentList />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
