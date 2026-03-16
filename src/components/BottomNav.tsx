import { useLocation, useNavigate } from 'react-router-dom';
import { Calendar, List, Palmtree, Lightbulb, Briefcase, Globe, Code2, Home } from 'lucide-react';

const navItems = [
  { path: '/', icon: Home, label: 'Kryefaqja' },
  { path: '/kalendari', icon: Calendar, label: 'Kalendari' },
  { path: '/festat', icon: List, label: 'Festat' },
  { path: '/fundjava', icon: Palmtree, label: 'Fundjava' },
  { path: '/sugjerime', icon: Lightbulb, label: 'Sugjerime' },
  { path: '/plani', icon: Briefcase, label: 'Plani' },
  { path: '/kosova', icon: Globe, label: 'Kosova' },
  { path: '/api', icon: Code2, label: 'API' },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-background/60 backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-background/40 md:hidden">
      <div className="flex items-center justify-between px-1 py-1.5">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-1 flex-col items-center gap-0.5 rounded-xl px-1 py-1.5 transition-all duration-200
                ${isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
                }
              `}
            >
              <div className={`flex items-center justify-center rounded-lg p-1 transition-all duration-200
                ${isActive ? 'bg-primary/15 shadow-sm' : ''}
              `}>
                <Icon className={`h-4 w-4 transition-transform duration-200 ${isActive ? 'scale-110' : ''}`} />
              </div>
              <span className={`text-[9px] font-medium leading-none ${isActive ? 'font-semibold' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
      {/* Safe area padding for iOS */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
};

export default BottomNav;
