// Archivo: Tabs.js

import React from 'react';

const Tabs = ({ activeTab, onTabChange, tabs }) => {
  return (
    <nav>
      {tabs.map(tab => (
        <button 
          key={tab.id}
          onClick={() => onTabChange(tab.id)} 
          className={activeTab === tab.id ? 'active' : ''}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
};

export default Tabs;
