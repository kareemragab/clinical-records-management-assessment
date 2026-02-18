import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

export default function AppShell({ activePage, onNavigate, onNewRecord, pageTitle, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar
        activePage={activePage}
        onNavigate={onNavigate}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="lg:pl-64">
        <Header
          onMenuToggle={() => setSidebarOpen(true)}
          onNewRecord={onNewRecord}
          pageTitle={pageTitle}
        />
        <main className="p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
