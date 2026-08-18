import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  Search,
  ChevronDown,
  User,
  BookOpen,
  Award,
  Settings,
  LogOut,
  Sparkles,
  CheckCircle2,
  Calendar,
  AlertCircle,
  X,
  ExternalLink,
  Video,
  FileText,
  CheckCheck,
  RefreshCw
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LessonWithVideoAccess, 
  NotificationItem, 
  fetchRecentGitHubActivity, 
  getRelativeTimeString,
  GitHubActivityItem
} from '../../services/elearningService';

interface TopNavProps {
  onSelectTab: (tabId: string) => void;
  onSearch?: (query: string) => void;
  onWatchLesson?: (lesson: LessonWithVideoAccess) => void;
  onSelectModality?: (modalityId: string) => void;
  publishedLessons?: LessonWithVideoAccess[];
}

const READ_NOTIFS_STORAGE_KEY = 'abdn_read_notification_ids';

export default function DashboardTopNav({ 
  onSelectTab, 
  onSearch, 
  onWatchLesson,
  onSelectModality,
  publishedLessons = [] 
}: TopNavProps) {
  const { currentUser, userProfile, logout } = useAuth();
  const navigate = useNavigate();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // GitHub recent commits / material uploads
  const [githubActivities, setGithubActivities] = useState<GitHubActivityItem[]>([]);
  const [loadingGh, setLoadingGh] = useState(false);

  // Read notification IDs stored in localStorage
  const [readIds, setReadIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(READ_NOTIFS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Fetch GitHub commits/material updates on mount
  useEffect(() => {
    let mounted = true;
    setLoadingGh(true);
    fetchRecentGitHubActivity()
      .then((items) => {
        if (mounted) setGithubActivities(items);
      })
      .catch((err) => console.warn('Error fetching GH notifications:', err))
      .finally(() => {
        if (mounted) setLoadingGh(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  // Save read notification IDs to localStorage
  const markAsRead = (id: string) => {
    setReadIds((prev) => {
      if (prev.includes(id)) return prev;
      const updated = [...prev, id];
      try {
        localStorage.setItem(READ_NOTIFS_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn('Could not save read notifications:', e);
      }
      return updated;
    });
  };

  const markAllAsRead = () => {
    const allIds = dynamicNotifications.map((n) => n.id);
    setReadIds(allIds);
    try {
      localStorage.setItem(READ_NOTIFS_STORAGE_KEY, JSON.stringify(allIds));
    } catch (e) {
      console.warn('Could not save read notifications:', e);
    }
  };

  // Combine Firebase published lessons and GitHub document updates
  const dynamicNotifications: NotificationItem[] = useMemo(() => {
    const list: NotificationItem[] = [];

    // 1. Firebase Video / Lecture Sessions
    publishedLessons.forEach((lesson) => {
      const id = `lesson-${lesson.id || lesson.contentId}`;
      list.push({
        id,
        title: `🎥 New Lecture: ${lesson.title}`,
        desc: `${lesson.modality} · ${lesson.weekTitle || 'Week ' + (lesson.weekNumber || 1)} · Instructor: ${lesson.instructor || 'ABDN Specialist'}`,
        time: getRelativeTimeString(lesson.weekEnding || lesson.createdAt),
        unread: !readIds.includes(id),
        type: 'video',
        lesson,
        timestamp: lesson.createdAt ? new Date(lesson.createdAt).getTime() : 0
      });
    });

    // 2. GitHub Live Materials & Slide Deck Uploads
    githubActivities.forEach((gh) => {
      list.push({
        id: gh.id,
        title: `📄 GitHub Materials: ${gh.modality || 'Cohort'}`,
        desc: `${gh.message} (by ${gh.author})`,
        time: getRelativeTimeString(gh.date),
        unread: !readIds.includes(gh.id),
        type: 'material',
        url: gh.url,
        timestamp: new Date(gh.date).getTime()
      });
    });

    // Default welcome notification if no lessons or GH activity yet
    if (list.length === 0) {
      list.push({
        id: 'welcome-notification',
        title: '🌟 Welcome to ABDN Learning Hub',
        desc: 'Enrolled in 2026 Fellowship. Live lectures and GitHub materials will sync automatically.',
        time: 'Just now',
        unread: !readIds.includes('welcome-notification'),
        type: 'announcement',
      });
    }

    // Sort notifications: unread first, then by timestamp/id
    return list.sort((a, b) => {
      if (a.unread !== b.unread) return a.unread ? -1 : 1;
      return (b.timestamp || 0) - (a.timestamp || 0);
    });
  }, [publishedLessons, githubActivities, readIds]);

  const unreadCount = dynamicNotifications.filter((n) => n.unread).length;

  const displayName =
    userProfile?.displayName ||
    currentUser?.displayName ||
    currentUser?.email?.split('@')[0] ||
    'Learner';

  const userInitial = (displayName || 'L').charAt(0).toUpperCase() || 'L';

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const handleNotificationClick = (item: NotificationItem) => {
    markAsRead(item.id);
    setIsNotificationsOpen(false);

    if (item.type === 'video' && item.lesson && onWatchLesson) {
      onWatchLesson(item.lesson);
    } else if (item.type === 'material' && item.url) {
      window.open(item.url, '_blank', 'noopener,noreferrer');
    } else {
      onSelectTab('learning');
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-stone-900 border-b border-stone-800 text-stone-200">
      <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Left: ABDN Brand linking back to Public Website */}
        <div className="flex items-center space-x-3">
          <Link
            to="/network/learning"
            className="flex items-center space-x-2.5 group transition-opacity hover:opacity-90"
            title="Return to ABDN NeuroLearning Hub"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-500 flex items-center justify-center text-white font-black text-base shadow-md shadow-amber-600/30 ring-1 ring-amber-400/40">
              A
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold tracking-tight text-sm text-white flex items-center space-x-1.5">
                <span>ABDN</span>
                <span className="text-amber-400 font-semibold">NeuroLearning</span>
              </span>
              <span className="text-[10px] text-stone-400 font-mono tracking-wider">
                WORKSPACE
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-md hidden md:block">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses, lessons, datasets, assessments..."
              className="w-full pl-10 pr-4 py-2 bg-stone-950/80 border border-stone-800 rounded-xl text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
            />
          </form>
        </div>

        {/* Right: Notifications & Profile Menu */}
        <div className="flex items-center space-x-3">
          
          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => {
                setIsNotificationsOpen(!isNotificationsOpen);
                setIsProfileMenuOpen(false);
              }}
              className="p-2 rounded-xl bg-stone-800/80 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-700/60 relative transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-stone-950 font-bold text-[10px] rounded-full flex items-center justify-center ring-2 ring-stone-900 animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            <AnimatePresence>
              {isNotificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-80 sm:w-96 bg-stone-900 rounded-2xl shadow-2xl border border-stone-700 py-3 z-50 overflow-hidden"
                >
                  <div className="px-4 pb-3 border-b border-stone-800 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-xs text-white uppercase tracking-wider">
                        Live Notifications
                      </span>
                      {unreadCount > 0 ? (
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-semibold">
                          {unreadCount} new
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-stone-800 text-stone-400 text-[10px] font-semibold">
                          All caught up
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllAsRead}
                          className="text-[10px] text-stone-400 hover:text-amber-300 flex items-center space-x-1 transition-colors"
                          title="Mark all as read"
                        >
                          <CheckCheck className="w-3 h-3" />
                          <span>Mark all read</span>
                        </button>
                      )}
                      <button
                        onClick={() => setIsNotificationsOpen(false)}
                        className="text-stone-400 hover:text-stone-200 text-xs p-1 rounded hover:bg-stone-800"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-stone-800/60">
                    {dynamicNotifications.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleNotificationClick(item)}
                        className={`p-3.5 hover:bg-stone-800/60 transition-colors text-xs space-y-1.5 cursor-pointer group ${
                          item.unread ? 'bg-amber-500/5 border-l-2 border-amber-500' : 'opacity-80 hover:opacity-100'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-semibold text-stone-200 group-hover:text-white flex items-center space-x-1.5 leading-snug">
                            {item.unread && (
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                            )}
                            <span>{item.title}</span>
                          </span>
                          <span className="text-[10px] text-stone-500 font-mono flex-shrink-0">{item.time}</span>
                        </div>
                        <p className="text-stone-400 text-[11px] leading-relaxed pl-3 group-hover:text-stone-300">
                          {item.desc}
                        </p>

                        <div className="pl-3 pt-0.5 flex items-center space-x-2 text-[10px] font-mono text-amber-400/90 font-medium">
                          {item.type === 'video' ? (
                            <span className="flex items-center space-x-1">
                              <Video className="w-3 h-3" />
                              <span>Click to play video recording →</span>
                            </span>
                          ) : item.type === 'material' ? (
                            <span className="flex items-center space-x-1">
                              <FileText className="w-3 h-3" />
                              <span>Click to view file on GitHub ↗</span>
                            </span>
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2.5 px-4 border-t border-stone-800 flex items-center justify-between text-xs">
                    <span className="text-[10px] text-stone-500 font-mono">
                      Firebase & GitHub live sync
                    </span>
                    <button
                      onClick={() => {
                        setIsNotificationsOpen(false);
                        onSelectTab('learning');
                      }}
                      className="text-[11px] text-amber-400 hover:text-amber-300 font-semibold"
                    >
                      View All Learning Paths →
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setIsProfileMenuOpen(!isProfileMenuOpen);
                setIsNotificationsOpen(false);
              }}
              className="flex items-center space-x-2.5 p-1.5 pr-3 rounded-xl bg-stone-800/80 hover:bg-stone-800 border border-stone-700/60 text-stone-200 transition-all"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-600 to-amber-800 text-white font-bold text-xs flex items-center justify-center shadow-inner">
                {userInitial}
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-xs font-semibold text-stone-200 leading-tight truncate max-w-[110px]">
                  {displayName}
                </div>
                <div className="text-[10px] text-amber-400/90 font-mono leading-none">
                  {userProfile?.role?.toUpperCase() || 'RESEARCHER'}
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
            </button>

            {/* Profile Dropdown Menu */}
            <AnimatePresence>
              {isProfileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-60 bg-stone-900 rounded-2xl shadow-2xl border border-stone-700 py-2 z-50"
                >
                  <div className="px-4 py-2.5 border-b border-stone-800">
                    <div className="font-bold text-xs text-white truncate">{displayName}</div>
                    <div className="text-[11px] text-stone-400 truncate">
                      {currentUser?.email || 'learner@abdn.org'}
                    </div>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        onSelectTab('profile');
                        setIsProfileMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-xs text-stone-300 hover:text-white hover:bg-stone-800 flex items-center space-x-2.5 transition-colors"
                    >
                      <User className="w-4 h-4 text-amber-400" />
                      <span>My Profile</span>
                    </button>

                    <button
                      onClick={() => {
                        onSelectTab('learning');
                        setIsProfileMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-xs text-stone-300 hover:text-white hover:bg-stone-800 flex items-center space-x-2.5 transition-colors"
                    >
                      <BookOpen className="w-4 h-4 text-amber-400" />
                      <span>My Learning</span>
                    </button>

                    <button
                      onClick={() => {
                        onSelectTab('certificates');
                        setIsProfileMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-xs text-stone-300 hover:text-white hover:bg-stone-800 flex items-center space-x-2.5 transition-colors"
                    >
                      <Award className="w-4 h-4 text-amber-400" />
                      <span>Certificates</span>
                    </button>

                    <button
                      onClick={() => {
                        onSelectTab('settings');
                        setIsProfileMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-xs text-stone-300 hover:text-white hover:bg-stone-800 flex items-center space-x-2.5 transition-colors"
                    >
                      <Settings className="w-4 h-4 text-amber-400" />
                      <span>Settings</span>
                    </button>
                  </div>

                  <div className="pt-1 border-t border-stone-800">
                    <button
                      onClick={async () => {
                        setIsProfileMenuOpen(false);
                        await logout();
                        navigate('/network/learning');
                      }}
                      className="w-full px-4 py-2 text-left text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 flex items-center space-x-2.5 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </header>
  );
}
