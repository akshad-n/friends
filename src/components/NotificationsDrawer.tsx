import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Bell,
  Check,
  CheckCheck,
  X,
  ExternalLink,
  Music,
  Heart,
  MessageCircle,
  Calendar,
  Sparkles,
} from 'lucide-react';

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (section: string) => void;
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const {
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    unreadCount,
  } = useApp();

  if (!isOpen) return null;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'song':
        return <Music size={14} className="text-rose-deep" />;
      case 'reply':
        return <MessageCircle size={14} className="text-butter-200" />;
      case 'date':
        return <Calendar size={14} className="text-rose-soft" />;
      case 'promise':
        return <Sparkles size={14} className="text-amber-500" />;
      case 'question':
      case 'answer':
        return <Heart size={14} className="text-rose-soft" />;
      default:
        return <Bell size={14} className="text-chocolate" />;
    }
  };

  const handleNotificationClick = (item: { id: string; targetSection: string }) => {
    markNotificationAsRead(item.id);
    onNavigate(item.targetSection);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-end select-none">
      <div className="w-full max-w-md bg-cream-50 h-full shadow-cute-lg border-l-2 border-chocolate flex flex-col justify-between animate-float-slow">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 bg-white border-b-2 border-chocolate/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blush-100 border-2 border-chocolate flex items-center justify-center">
              <Bell size={16} className="text-chocolate" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-chocolate flex items-center gap-2">
                <span>Notifications</span>
                {unreadCount > 0 && (
                  <span className="bg-rose-soft text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                    {unreadCount} new
                  </span>
                )}
              </h3>
              <p className="text-[11px] text-chocolate/60">Real-time alerts for our little world</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={markAllNotificationsAsRead}
                className="text-[11px] font-bold text-rose-deep hover:underline flex items-center gap-1"
                title="Mark all as read"
              >
                <CheckCheck size={14} />
                <span>Mark read</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-full border-2 border-chocolate hover:bg-cream-100 text-chocolate"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.map((item) => (
            <div
              key={item.id}
              onClick={() => handleNotificationClick(item)}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative ${
                item.isRead
                  ? 'bg-white border-chocolate/15 opacity-80 hover:opacity-100 hover:border-chocolate/40'
                  : 'bg-blush-50 border-chocolate shadow-sm'
              }`}
            >
              {!item.isRead && (
                <span className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-rose-soft animate-ping" />
              )}

              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-full bg-white border-2 border-chocolate/20 flex items-center justify-center shrink-0 mt-0.5">
                  {getCategoryIcon(item.category)}
                </div>

                <div className="flex-1 pr-3">
                  <h4 className="font-extrabold text-xs text-chocolate leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs text-chocolate/75 mt-0.5 leading-tight">
                    {item.message}
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-[10px] text-chocolate/50">
                    <span>{new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    <span>•</span>
                    <span className="text-rose-deep font-semibold flex items-center gap-0.5">
                      View section <ExternalLink size={9} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {notifications.length === 0 && (
            <div className="p-8 text-center text-chocolate/60 text-xs">
              No notifications yet. When your partner shares songs, answers questions, or plans dates, they will appear here! 🐱
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t-2 border-chocolate/10 text-center text-[11px] text-chocolate/60">
          🐱 Realtime Sound & In-App Sync Active
        </div>
      </div>
    </div>
  );
};
