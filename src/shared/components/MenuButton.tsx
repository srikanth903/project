import React from 'react';

export type MenuButtonProps = {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  page: 'home' | 'diagnosis' | 'profile' | 'reports';
  currentPage: string;
  onSelect: (page: 'home' | 'diagnosis' | 'profile' | 'reports') => void;
};

export const MenuButton: React.FC<MenuButtonProps> = ({ icon: Icon, label, page, currentPage, onSelect }) => {
  const isActive = currentPage === page;
  return (
    <button
      onClick={() => onSelect(page)}
      className={
        'w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ' +
        (isActive ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : 'text-gray-700 hover:bg-gray-100')
      }
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </button>
  );
};
