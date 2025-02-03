'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Home, List, DollarSign, BarChart2, Settings, Bell } from 'lucide-react';

const menuItems = [
  { name: 'Overview', icon: Home, path: '/' },
  { name: 'Transactions', icon: List, path: '/transactions' },
  { name: 'Settlement', icon: DollarSign, path: '/settlements' },
  { name: 'Analytics', icon: BarChart2, path: '/analytics' },
  { name: 'Settings', icon: Settings, path: '/settings' },
  { name: 'Notifications', icon: Bell, path: '/notifications' },
];

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="w-64 p-4 border-r border-gray-800 bg-gray-950">
      <h1 className="text-xl font-bold mb-8 text-white">ARP Pay</h1>

      <nav className="space-y-2">
        {menuItems.map(({ name, icon: Icon, path }) => (
          <div
            key={name}
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${
              pathname === path ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800'
            }`}
            onClick={() => router.push(path)}
          >
            <Icon className="w-5 h-5" />
            <span>{name}</span>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;