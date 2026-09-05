import {
  LayoutDashboard,
  BookOpen,
  FlaskConical,
  Microscope,
  Award,
  User,
  Settings,
  HelpCircle,
  Sparkles,
  Flame,
  ArrowRight,
  LogOut,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export type DashboardTabId =
  | 'dashboard'
  | 'learning'
  | 'practice'
  | 'projects'
  | 'certificates'
  | 'profile'
  | 'settings'
  | 'help';

interface SidebarProps {
  activeTab: DashboardTabId;
  onSelectTab: (tabId: DashboardTabId) => void;
  streakDays?: number;
  enrolledCount?: number;
}

export default function DashboardSidebar({
  activeTab,
  onSelectTab,
  streakDays = 4,
  enrolledCount = 2,
}: SidebarProps) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const mainNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null, disabled: false },
    { id: 'learning', label: 'My Learning', icon: BookOpen, badge: `${enrolledCount} Paths`, disabled: false },
    { id: 'practice', label: 'Practice', icon: FlaskConical, badge: 'Soon', disabled: true },
    { id: 'projects', label: 'Projects', icon: Microscope, badge: 'Soon', disabled: true },
    { id: 'certificates', label: 'Certificates', icon: Award, badge: 'Soon', disabled: true },
    { id: 'profile', label: 'My Profile', icon: User, badge: null, disabled: false },
  ] as const;

  const secondaryNavItems = [
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'help', label: 'Help & Support', icon: HelpCircle },
  ] as const;

  return (
    <aside className="w-64 bg-white border-r border-[#EBE4D8] flex flex-col justify-between flex-shrink-0 h-full overflow-y-auto">
      
      {/* Top Part: Navigation */}
      <div className="p-4 space-y-6">
        
        {/* Workspace Brand / Header */}
        <div className="px-3.5 py-3 rounded-2xl bg-[#FAF7F0] border border-[#E2D9C7]">
          <div className="flex items-center space-x-2 text-amber-700 text-xs font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Learner Workspace</span>
          </div>
          <div className="text-[11px] text-stone-600 font-medium mt-0.5">
            African Brain Data Network
          </div>
        </div>

        {/* Main Section */}
        <div className="space-y-1">
          <div className="px-3 text-[10px] font-mono font-bold uppercase tracking-wider text-stone-600 pb-1">
            Workspace Nav
          </div>
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            const isDisabled = Boolean((item as any).disabled);

            if (isDisabled) {
              return (
                <div
                  key={item.id}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-xs sm:text-sm text-stone-600 cursor-not-allowed opacity-60 select-none"
                  title={`${item.label} (Coming Soon in Phase 2)`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-4 h-4 text-stone-600" />
                    <span>{item.label}</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#FAF7F0] text-stone-600 border border-[#E2D9C7]">
                    Soon
                  </span>
                </div>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id as DashboardTabId)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all group ${
                  isActive
                    ? 'bg-amber-700 text-white font-bold shadow-md shadow-amber-900/15'
                    : 'text-stone-700 hover:text-stone-900 hover:bg-[#FAF7F0]'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon
                    className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                      isActive ? 'text-white' : 'text-stone-600 group-hover:text-amber-700'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${
                      isActive
                        ? 'bg-amber-800 text-amber-100'
                        : 'bg-[#FAF7F0] text-stone-700 group-hover:text-stone-900 border border-[#E2D9C7]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Streak / Motivation Widget */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#FAF7F0] to-[#F5ECE0] border border-[#E2D9C7] space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-stone-800 flex items-center space-x-1.5">
              <Flame className="w-4 h-4 text-amber-600 fill-amber-500" />
              <span>Learning Streak</span>
            </span>
            <span className="text-amber-700 font-mono font-black">{streakDays} Days</span>
          </div>
          <div className="h-1.5 w-full bg-[#EBE3D3] rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-amber-600 to-amber-500 rounded-full w-4/5 shadow-sm" />
          </div>
          <p className="text-[11px] text-stone-600 font-medium">
            You're on track for your weekly neuroscience research milestone!
          </p>
        </div>

      </div>

      {/* Bottom Part: Secondary Nav & ABDN Portal Link */}
      <div className="p-4 border-t border-[#EBE4D8] space-y-2">
        {secondaryNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id as DashboardTabId)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                isActive
                  ? 'bg-stone-200 text-stone-900 font-bold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-[#FAF7F0]'
              }`}
            >
              <Icon className="w-4 h-4 text-stone-600" />
              <span>{item.label}</span>
            </button>
          );
        })}

        <Link
          to="/network/learning"
          className="mt-2 w-full px-3 py-2 rounded-xl bg-[#FAF7F0] hover:bg-[#F3EAD9] text-stone-700 hover:text-amber-800 text-xs flex items-center justify-between transition-colors border border-[#E2D9C7] font-medium"
        >
          <span className="text-[11px]">Back to Public Hub</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        <button
          onClick={async () => {
            await logout();
            navigate('/network/learning');
          }}
          className="w-full px-3 py-2 rounded-xl text-stone-600 hover:text-rose-700 hover:bg-rose-50 text-xs flex items-center space-x-3 transition-colors font-medium"
        >
          <LogOut className="w-4 h-4 text-stone-600 group-hover:text-rose-700" />
          <span>Sign Out</span>
        </button>
      </div>

    </aside>
  );
}
