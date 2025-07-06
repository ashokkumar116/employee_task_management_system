import React from "react";
import ProfileSettings from "./Settings/ProfileSettings";
import { Settings as SettingsIcon } from "lucide-react";
import ThemeToggle from "./Settings/ThemeToggle";

const Settings = () => {
  return (
    <div className="min-h-screen w-full bg-gray-950 text-white pl-56 pr-6 py-6">
      <div className="bg-gray-800 rounded-xl p-5 shadow-md min-h-[320px]">
        <h2 className="text-2xl font-semibold mb-4 border-b border-gray-600 pb-2 flex items-center gap-2">
          <SettingsIcon className="text-blue-400" size={22} />
          Settings
        </h2>

        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="w-full">
            <h1 className="mb-5 text-xl font-bold">Profile Settings</h1>
            <ProfileSettings />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
