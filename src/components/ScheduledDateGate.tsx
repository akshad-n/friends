import React, { useState, useEffect } from 'react';
import { DatePlan } from '../types';
import { CatsTogetherFlower, CatsJumping, CatsSleeping } from './KawaiiCats';
import {
  Calendar,
  Clock,
  MapPin,
  Utensils,
  Lock,
  Unlock,
  Sparkles,
  Heart,
  CheckCircle2,
  ExternalLink,
  Download,
} from 'lucide-react';

interface ScheduledDateGateProps {
  datePlan: DatePlan;
  onResetDate?: () => void;
  canReset?: boolean;
}

export const ScheduledDateGate: React.FC<ScheduledDateGateProps> = ({
  datePlan,
  onResetDate,
  canReset = false,
}) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isPast: boolean;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: false });

  const [checklist, setChecklist] = useState<Record<string, boolean>>({
    flowers: true,
    outfit: true,
    hug: true,
    music: false,
    camera: false,
  });

  const toggleCheck = (key: string) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  useEffect(() => {
    const calculateTime = () => {
      try {
        // Construct target date
        let timeString = datePlan.preferredTime || '19:00';
        let targetDateStr = `${datePlan.preferredDate}T${timeString.length === 5 ? timeString : '19:00'}:00`;
        let target = new Date(targetDateStr).getTime();
        if (isNaN(target)) {
          target = new Date(datePlan.preferredDate).getTime() + 19 * 3600 * 1000;
        }

        const now = new Date().getTime();
        const diff = target - now;

        if (diff <= 0) {
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        } else {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);
          setTimeLeft({ days, hours, minutes, seconds, isPast: false });
        }
      } catch {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: false });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [datePlan]);

  // Google calendar link generator
  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent(`🌹 Romantic Date with My Sweet Golu`);
    const details = encodeURIComponent(
      `Our Little Universe Date! Venue: ${datePlan.place}. Food: ${datePlan.food}. Note: ${datePlan.note || ''}`
    );
    const location = encodeURIComponent(datePlan.place);
    const dateFormatted = datePlan.preferredDate.replace(/-/g, '');
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dateFormatted}T190000Z/${dateFormatted}T220000Z`;
  };

  return (
    <div className="cute-card p-6 sm:p-8 bg-gradient-to-b from-white via-cream-50 to-blush-50 relative overflow-hidden border-2 border-chocolate shadow-cute-lg select-none">
      {/* Top Banner with Gate Status */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-6 border-b-2 border-chocolate/10">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-10 h-10 rounded-full border-2 border-chocolate flex items-center justify-center text-lg ${
              timeLeft.isPast ? 'bg-mint-200 text-chocolate animate-bounce' : 'bg-butter-100 text-chocolate'
            }`}
          >
            {timeLeft.isPast ? <Unlock size={18} /> : <Lock size={18} />}
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blush-100 border border-chocolate text-[10px] font-black text-chocolate uppercase tracking-wider">
              <span>🌹</span>
              <span>The Date Gate</span>
              <span>•</span>
              <span>{timeLeft.isPast ? 'GATE IS OPEN! 🎉' : 'LOCKED UNTIL DATE 🔒'}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-chocolate mt-0.5">
              Our Scheduled Date 🌹🚪✨
            </h3>
          </div>
        </div>

        {canReset && onResetDate && (
          <button
            onClick={onResetDate}
            className="cute-btn px-3 py-1 bg-white hover:bg-rose-soft/20 text-chocolate text-xs font-bold border-chocolate"
            title="Reset date schedule"
          >
            <span>Reset Schedule 🔄</span>
          </button>
        )}
      </div>

      {/* Main Countdown Clocks */}
      <div className="my-6 text-center">
        {!timeLeft.isPast ? (
          <div>
            <div className="flex justify-center mb-2">
              <CatsTogetherFlower size={130} />
            </div>
            <p className="text-xs font-extrabold text-chocolate/75 mb-3">
              Counting down every second until our scheduled date with Golu:
            </p>

            <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
              <div className="cute-card-soft px-4 py-3 bg-white text-center min-w-[70px] border-2 border-chocolate">
                <span className="text-2xl sm:text-3xl font-black text-chocolate block">
                  {timeLeft.days}
                </span>
                <span className="text-[10px] font-bold text-chocolate/60 uppercase">Days</span>
              </div>

              <span className="text-xl font-black text-chocolate/40">:</span>

              <div className="cute-card-soft px-4 py-3 bg-white text-center min-w-[70px] border-2 border-chocolate">
                <span className="text-2xl sm:text-3xl font-black text-chocolate block">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[10px] font-bold text-chocolate/60 uppercase">Hours</span>
              </div>

              <span className="text-xl font-black text-chocolate/40">:</span>

              <div className="cute-card-soft px-4 py-3 bg-white text-center min-w-[70px] border-2 border-chocolate">
                <span className="text-2xl sm:text-3xl font-black text-chocolate block">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-[10px] font-bold text-chocolate/60 uppercase">Mins</span>
              </div>

              <span className="text-xl font-black text-chocolate/40">:</span>

              <div className="cute-card-soft px-4 py-3 bg-white text-center min-w-[70px] border-2 border-chocolate">
                <span className="text-2xl sm:text-3xl font-black text-rose-deep block animate-pulse">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-[10px] font-bold text-chocolate/60 uppercase">Secs</span>
              </div>
            </div>

            <p className="text-xs text-chocolate/70 mt-3 flex items-center justify-center gap-1 font-semibold">
              <Lock size={12} className="text-amber-600" />
              <span>The Gate unlocks when the countdown reaches zero! ⏳</span>
            </p>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-mint-100 border-2 border-chocolate animate-float-slow">
            <span className="text-3xl">🎉🚪💖</span>
            <h4 className="text-xl font-black text-chocolate mt-1">
              THE DATE GATE IS OFFICIALLY OPEN!
            </h4>
            <p className="text-xs text-chocolate/80 mt-1 font-bold">
              It's time for our magical date! Go put on that nice shirt and make Golu smile all evening! 🌷✨
            </p>
          </div>
        )}
      </div>

      {/* Date Passport / Golden Ticket Details */}
      <div className="cute-card-soft p-5 bg-white border-2 border-chocolate/20 my-6">
        <div className="flex items-center justify-between mb-3 border-b border-chocolate/10 pb-2">
          <span className="text-xs font-black text-chocolate flex items-center gap-1.5">
            <span>🎫</span>
            <span>Official Date Passport</span>
          </span>
          <span className="text-[11px] font-bold text-rose-deep bg-blush-100 px-2.5 py-0.5 rounded-full border border-chocolate/10">
            Confirmed with YES 💗
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="flex items-start gap-2 bg-cream-50 p-2.5 rounded-xl border border-chocolate/10">
            <MapPin size={16} className="text-rose-deep shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] text-chocolate/60 font-bold block">DESTINATION</span>
              <strong className="text-chocolate text-sm">{datePlan.place}</strong>
            </div>
          </div>

          <div className="flex items-start gap-2 bg-cream-50 p-2.5 rounded-xl border border-chocolate/10">
            <Utensils size={16} className="text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] text-chocolate/60 font-bold block">FOOD TO FEAST</span>
              <strong className="text-chocolate text-sm">{datePlan.food}</strong>
            </div>
          </div>

          <div className="flex items-start gap-2 bg-cream-50 p-2.5 rounded-xl border border-chocolate/10">
            <Calendar size={16} className="text-blue-600 shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] text-chocolate/60 font-bold block">DATE</span>
              <strong className="text-chocolate">
                {(() => {
                  try {
                    const parts = datePlan.preferredDate.split('-');
                    if (parts.length === 3) {
                      const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
                      return d.toLocaleDateString(undefined, { dateStyle: 'full' });
                    }
                    return datePlan.preferredDate;
                  } catch {
                    return datePlan.preferredDate;
                  }
                })()}
              </strong>
            </div>
          </div>

          <div className="flex items-start gap-2 bg-cream-50 p-2.5 rounded-xl border border-chocolate/10">
            <Clock size={16} className="text-purple-600 shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] text-chocolate/60 font-bold block">TIME</span>
              <strong className="text-chocolate">{datePlan.preferredTime || '7:00 PM'}</strong>
            </div>
          </div>
        </div>

        {datePlan.note && (
          <div className="mt-3 p-3 rounded-xl bg-blush-50 border border-chocolate/10 text-xs">
            <span className="text-[10px] text-chocolate/60 font-bold block">PERSONAL LOVE NOTE FROM GOLU 💌</span>
            <p className="font-love-note text-base text-rose-deep mt-0.5">
              “{datePlan.note}”
            </p>
          </div>
        )}

        {/* Add to Google Calendar Button */}
        <div className="mt-4 pt-3 border-t border-chocolate/10 flex justify-end">
          <a
            href={getGoogleCalendarUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="cute-btn px-4 py-1.5 bg-cream-100 hover:bg-cream-200 text-chocolate text-xs font-bold"
          >
            <span>Add to Google Calendar</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </div>

      {/* Date Preparation Checklist */}
      <div className="p-4 rounded-2xl bg-cream-50 border-2 border-chocolate/15">
        <h4 className="text-xs font-black text-chocolate uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <span>🌸</span>
          <span>Date Night Preparation Checklist</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {[
            { id: 'flowers', text: 'Bring her blooming fresh flowers 🌷' },
            { id: 'outfit', text: 'Wear the shirt she loves 👔' },
            { id: 'hug', text: 'Give her the warmest, tightest hug 🤗' },
            { id: 'music', text: 'Queue up our special playlist in the car 🎧' },
            { id: 'camera', text: 'Take silly cute pictures together 📸' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => toggleCheck(item.id)}
              className={`p-2 rounded-xl border text-left font-semibold flex items-center gap-2 transition-all ${
                checklist[item.id]
                  ? 'bg-mint-100 border-mint-200 text-chocolate'
                  : 'bg-white border-chocolate/15 text-chocolate/60 hover:bg-cream-100'
              }`}
            >
              <CheckCircle2
                size={14}
                className={checklist[item.id] ? 'text-emerald-600' : 'text-chocolate/30'}
              />
              <span className={checklist[item.id] ? 'line-through opacity-80' : ''}>
                {item.text}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
