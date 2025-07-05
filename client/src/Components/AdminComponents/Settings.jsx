import React from "react";

const Settings = () => {
  return (
    <div className="px-6 py-8 pl-56 pr-6 text-white bg-gray-950 min-h-screen">
      <h2 className="text-2xl font-bold mb-8">Settings</h2>

      {/* 1. Profile Settings */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Profile Settings</h3>
        {/* Name, Email, Password change, Profile Pic */}
      </div>

      {/* 2. Notification Preferences */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Notifications</h3>
        {/* Toggle email updates, task reminders, etc */}
      </div>

      {/* 3. App Preferences */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">App Preferences</h3>
        {/* Dark mode toggle, default language, etc */}
      </div>

      {/* 4. Admin Settings (show only if user is admin) */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Admin Settings</h3>
        {/* Company Info, Logo, User Management */}
      </div>
    </div>
  );
};

export default Settings;
