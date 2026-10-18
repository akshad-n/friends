import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import {
  CatsTogetherFlower,
  CatsJumping,
  CatsUnderStars,
  CatHug,
  ShyRunningCat,
  CatWithCamera,
  PeachSparkle,
} from './KawaiiCats';
import { RomanticDivider, CuteButterfly } from './FloralDecorations';
import {
  Heart,
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  Utensils,
  Send,
  Check,
  ArrowDown,
  ArrowRight,
  ChevronDown,
  RotateCcw,
} from 'lucide-react';
import { ScheduledDateGate } from './ScheduledDateGate';

export const LoveQuestions: React.FC = () => {
  const {
    currentRole,
    dateResponse,
    submitDatePlan,
    lifeResponse,
    saveLifePromise,
    memoriesResponse,
    submitMemoryIdeas,
    resetQuestion,
  } = useApp();

  // Helper for smooth scrolling to questions
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Trigger celebration confetti
  const triggerCelebrationConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#F6C9D2', '#ECA4B2', '#FFE8A3', '#DCEFE3', '#FFFFFF'],
    });
  };

  // ==========================================
  // 1. DATE QUESTION STATE
  // ==========================================
  const [dateAnsweredYes, setDateAnsweredYes] = useState(Boolean(dateResponse));
  const [dateNoPos, setDateNoPos] = useState({ x: 0, y: 0 });
  const [dateNoMessage, setDateNoMessage] = useState('');
  const [datePlanForm, setDatePlanForm] = useState({
    preferredDate: '',
    preferredTime: '',
    place: '',
    food: '',
    note: '',
  });
  const [datePlanSaved, setDatePlanSaved] = useState(Boolean(dateResponse?.datePlan));

  const runawayDateQuotes = [
    'Ehehe, catch me if you can! 🙈',
    'Wrong button, madam! 😂🌷',
    'Your date partner is trying very hard here!',
    'Wait, at least look at the flowers! 🥹',
  ];

  const handleDateNoDodge = () => {
    const randomX = (Math.random() - 0.5) * 220;
    const randomY = (Math.random() - 0.5) * 120;
    setDateNoPos({ x: randomX, y: randomY });
    const quote = runawayDateQuotes[Math.floor(Math.random() * runawayDateQuotes.length)];
    setDateNoMessage(quote);
  };

  const handleDateYes = () => {
    setDateAnsweredYes(true);
    triggerCelebrationConfetti();
  };

  const handleDateFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!datePlanForm.place || !datePlanForm.food) {
      alert('Please share where we should go and what you want to eat! 🌷');
      return;
    }
    await submitDatePlan({
      preferredDate: datePlanForm.preferredDate || new Date().toISOString().split('T')[0],
      preferredTime: datePlanForm.preferredTime || '7:00 PM',
      place: datePlanForm.place,
      food: datePlanForm.food,
      note: datePlanForm.note,
      submittedAt: new Date().toISOString(),
    });
    setDatePlanSaved(true);
    triggerCelebrationConfetti();
  };

  // ==========================================
  // 2. PRECIOUS LIFE QUESTION STATE
  // ==========================================
  const [lifeAnsweredYes, setLifeAnsweredYes] = useState(Boolean(lifeResponse));
  const [lifeNoPos, setLifeNoPos] = useState({ x: 0, y: 0 });
  const [lifeNoMessage, setLifeNoMessage] = useState('');
  const [lifePromiseSaved, setLifePromiseSaved] = useState(Boolean(lifeResponse?.promiseSaved));

  const runawayLifeQuotes = [
    'Wait, my little heart isn\'t finished! 🥹',
    'Look at the stars first! 🌙',
    'I\'m just a shy little cat! 🙈',
  ];

  const handleLifeNoDodge = () => {
    const randomX = (Math.random() - 0.5) * 220;
    const randomY = (Math.random() - 0.5) * 120;
    setLifeNoPos({ x: randomX, y: randomY });
    const quote = runawayLifeQuotes[Math.floor(Math.random() * runawayLifeQuotes.length)];
    setLifeNoMessage(quote);
  };

  const handleLifeYes = () => {
    setLifeAnsweredYes(true);
    triggerCelebrationConfetti();
  };

  const handleSavePromise = async () => {
    await saveLifePromise();
    setLifePromiseSaved(true);
    triggerCelebrationConfetti();
  };

  // ==========================================
  // 3. MEMORIES QUESTION STATE
  // ==========================================
  const [memoriesAnsweredYes, setMemoriesAnsweredYes] = useState(Boolean(memoriesResponse));
  const [memoriesNoPos, setMemoriesNoPos] = useState({ x: 0, y: 0 });
  const [memoriesNoMessage, setMemoriesNoMessage] = useState('');
  const [customQuestionInput, setCustomQuestionInput] = useState(
    memoriesResponse?.memoryIdeas?.[0] || ''
  );
  const [memoriesSaved, setMemoriesSaved] = useState(Boolean(memoriesResponse));

  const runawayMemoriesQuotes = [
    'Memory loading… but the button is running away! 😂',
    'Come on, one tiny adventure? 🌻',
    'Catch this little flower cat! 🐱',
  ];

  const handleMemoriesNoDodge = () => {
    const randomX = (Math.random() - 0.5) * 220;
    const randomY = (Math.random() - 0.5) * 120;
    setMemoriesNoPos({ x: randomX, y: randomY });
    const quote = runawayMemoriesQuotes[Math.floor(Math.random() * runawayMemoriesQuotes.length)];
    setMemoriesNoMessage(quote);
  };

  const handleMemoriesYes = () => {
    setMemoriesAnsweredYes(true);
    triggerCelebrationConfetti();
  };

  const handleSaveCustomQuestion = async () => {
    if (!customQuestionInput.trim()) {
      alert('Please write your custom question or wish! 🌷');
      return;
    }
    await submitMemoryIdeas([customQuestionInput.trim()]);
    setMemoriesSaved(true);
    triggerCelebrationConfetti();
  };

  // Sync state if context changes (e.g. from Him reset actions)
  useEffect(() => {
    if (dateResponse) {
      setDateAnsweredYes(true);
      setDatePlanSaved(Boolean(dateResponse.datePlan));
      if (dateResponse.datePlan) {
        setDatePlanForm({
          preferredDate: dateResponse.datePlan.preferredDate,
          preferredTime: dateResponse.datePlan.preferredTime,
          place: dateResponse.datePlan.place,
          food: dateResponse.datePlan.food,
          note: dateResponse.datePlan.note || '',
        });
      }
    } else {
      setDateAnsweredYes(false);
      setDatePlanSaved(false);
    }
  }, [dateResponse]);

  useEffect(() => {
    if (lifeResponse) {
      setLifeAnsweredYes(true);
      setLifePromiseSaved(Boolean(lifeResponse.promiseSaved));
    } else {
      setLifeAnsweredYes(false);
      setLifePromiseSaved(false);
    }
  }, [lifeResponse]);

  useEffect(() => {
    if (memoriesResponse) {
      setMemoriesAnsweredYes(true);
      setMemoriesSaved(true);
      if (memoriesResponse.memoryIdeas?.[0]) {
        setCustomQuestionInput(memoriesResponse.memoryIdeas[0]);
      }
    } else {
      setMemoriesAnsweredYes(false);
      setMemoriesSaved(false);
      setCustomQuestionInput('');
    }
  }, [memoriesResponse]);

  // Active date plan resolved from context or current form
  const activeDatePlan =
    dateResponse?.datePlan ||
    (datePlanSaved
      ? {
          preferredDate: datePlanForm.preferredDate || new Date().toISOString().split('T')[0],
          preferredTime: datePlanForm.preferredTime || '19:00',
          place: datePlanForm.place || 'Our Favorite Romantic Spot 🌹',
          food: datePlanForm.food || 'Delicious Food & Desserts 🍰',
          note: datePlanForm.note || 'Can\'t wait to see you!',
          submittedAt: new Date().toISOString(),
        }
      : null);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 select-none space-y-16">
      {/* Header & Quick Flow Indicator */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blush-100 border-2 border-chocolate text-chocolate text-xs font-black shadow-sm mb-3">
          <Sparkles size={14} className="text-rose-soft" />
          <span>Our Love Journey • 3 Special Questions</span>
          <Sparkles size={14} className="text-rose-soft" />
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-chocolate tracking-tight">
          Three Little Questions for You <span className="inline-block animate-wiggle">💗</span>
        </h2>
        <p className="text-sm sm:text-base text-chocolate/75 font-medium mt-1">
          Answer each romantic question one after another as our story unfolds.
        </p>

        {/* Quick Jump Journey Pills */}
        <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
          <button
            onClick={() => scrollTo('question-date')}
            className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-white border-2 border-chocolate/20 hover:border-chocolate hover:bg-blush-50 text-chocolate flex items-center gap-1.5 shadow-sm transition-all"
          >
            <span>1. Date Night 🌹</span>
            {datePlanSaved && <span className="text-[10px] bg-mint-200 text-chocolate rounded-full px-1.5 font-black">✓</span>}
          </button>

          <span className="text-chocolate/40 text-xs">➔</span>

          <button
            onClick={() => scrollTo('question-life')}
            className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-white border-2 border-chocolate/20 hover:border-chocolate hover:bg-lavender-soft text-chocolate flex items-center gap-1.5 shadow-sm transition-all"
          >
            <span>2. Precious Life 🌙</span>
            {lifePromiseSaved && <span className="text-[10px] bg-mint-200 text-chocolate rounded-full px-1.5 font-black">✓</span>}
          </button>

          <span className="text-chocolate/40 text-xs">➔</span>

          <button
            onClick={() => scrollTo('question-memories')}
            className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-white border-2 border-chocolate/20 hover:border-chocolate hover:bg-butter-100 text-chocolate flex items-center gap-1.5 shadow-sm transition-all"
          >
            <span>3. More Memories 🌻</span>
            {memoriesSaved && <span className="text-[10px] bg-mint-200 text-chocolate rounded-full px-1.5 font-black">✓</span>}
          </button>

          <span className="text-chocolate/40 text-xs">➔</span>

          <button
            onClick={() => scrollTo('her-date-timer')}
            className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-white border-2 border-chocolate/20 hover:border-chocolate hover:bg-rose-soft/20 text-chocolate flex items-center gap-1.5 shadow-sm transition-all"
          >
            <span>4. Date Timer ⏳</span>
            {Boolean(dateResponse?.datePlan || datePlanSaved) && (
              <span className="text-[10px] bg-rose-soft text-white rounded-full px-1.5 font-black animate-pulse">Live</span>
            )}
          </button>
        </div>

        {/* Reset Question Options for Him Section */}
        {currentRole === 'him' && (
          <div className="mt-5 p-3.5 bg-amber-50/95 rounded-2xl border-2 border-chocolate flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shadow-cute max-w-2xl mx-auto">
            <div className="flex items-center gap-2 font-black text-chocolate text-left">
              <span className="text-base">🌙</span>
              <div>
                <span className="block font-black text-chocolate">Him Section • Reset Question Controls:</span>
                <span className="text-[10px] text-chocolate/70 font-semibold">Reset any question so Golu can experience it again fresh</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 flex-wrap justify-center">
              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Reset Question 1 (Date Night & Date Gate) so Golu can be asked again? 🌹')) {
                    resetQuestion('date');
                    setDateAnsweredYes(false);
                    setDatePlanSaved(false);
                  }
                }}
                className="px-2.5 py-1 rounded-full bg-white hover:bg-cream-100 border border-chocolate text-chocolate font-bold flex items-center gap-1 shadow-sm active:scale-95"
              >
                <RotateCcw size={11} />
                <span>Reset Q1 (Date & Gate)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Reset Question 2 (Precious Life & Thank You Note) so Golu can be asked again? 🌙')) {
                    resetQuestion('life');
                    setLifeAnsweredYes(false);
                    setLifePromiseSaved(false);
                  }
                }}
                className="px-2.5 py-1 rounded-full bg-white hover:bg-cream-100 border border-chocolate text-chocolate font-bold flex items-center gap-1 shadow-sm active:scale-95"
              >
                <RotateCcw size={11} />
                <span>Reset Q2 (Life & Note)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Reset Question 3 (Custom Question) so Golu can answer again? 🌻')) {
                    resetQuestion('memories');
                    setMemoriesAnsweredYes(false);
                    setMemoriesSaved(false);
                  }
                }}
                className="px-2.5 py-1 rounded-full bg-white hover:bg-cream-100 border border-chocolate text-chocolate font-bold flex items-center gap-1 shadow-sm active:scale-95"
              >
                <RotateCcw size={11} />
                <span>Reset Q3 (Custom)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Reset ALL 3 questions so Golu can experience everything fresh from the beginning? 🐱💗')) {
                    resetQuestion('all');
                    setDateAnsweredYes(false);
                    setDatePlanSaved(false);
                    setLifeAnsweredYes(false);
                    setLifePromiseSaved(false);
                    setMemoriesAnsweredYes(false);
                    setMemoriesSaved(false);
                  }
                }}
                className="px-2.5 py-1 rounded-full bg-rose-soft/20 hover:bg-rose-soft/30 border border-rose-deep text-rose-deep font-black flex items-center gap-1 shadow-sm active:scale-95"
              >
                <RotateCcw size={11} />
                <span>Reset All 🔄</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* QUESTION 1: WOULD YOU LIKE TO GO ON A DATE WITH ME? 🌹 */}
      {/* ========================================================================= */}
      <section id="question-date" className="scroll-mt-24">
        <div className="cute-card p-6 sm:p-10 relative overflow-hidden bg-gradient-to-b from-white via-blush-50 to-white">
          <div className="text-center mb-6">
            <span className="badge-mood bg-blush-100 text-chocolate mb-3">
              Question 1 of 3 • Rose Garden 🌹
            </span>

            {dateAnsweredYes ? (
              <CatsJumping size={220} className="mx-auto" />
            ) : (
              <CatsTogetherFlower size={220} className="mx-auto" />
            )}

            <h3 className="text-2xl sm:text-4xl font-black text-chocolate tracking-tight mt-4">
              Would you like to go on a date with me? 🌹
            </h3>
            <p className="text-xs sm:text-sm text-chocolate/70 mt-1">
              Just two little cats, good food, and unforgettable memories.
            </p>
          </div>

          {!dateAnsweredYes ? (
            /* Question Buttons with Runaway No */
            <div className="relative py-8 flex flex-col items-center justify-center min-h-[160px]">
              {dateNoMessage && (
                <div className="mb-4 px-3 py-1.5 rounded-full bg-butter-100 border-2 border-chocolate text-xs font-bold text-chocolate animate-bounce">
                  {dateNoMessage}
                </div>
              )}

              <div className="flex items-center gap-6 relative">
                {/* YES Button */}
                <button
                  onClick={handleDateYes}
                  className="cute-btn px-8 py-3.5 bg-rose-soft text-white hover:bg-rose-deep text-lg font-black tracking-wide shadow-cute-lg active:scale-95"
                >
                  YES! 💗
                </button>

                {/* Runaway NO Button */}
                <div
                  style={{
                    transform: `translate(${dateNoPos.x}px, ${dateNoPos.y}px)`,
                    transition: 'transform 0.15s ease-out',
                  }}
                  className="relative inline-block"
                >
                  <button
                    onMouseEnter={handleDateNoDodge}
                    onTouchStart={handleDateNoDodge}
                    onClick={handleDateNoDodge}
                    className="cute-btn px-6 py-2.5 bg-white text-chocolate/75 hover:bg-cream-100 text-sm font-bold border-2 border-chocolate"
                  >
                    No 🙈
                  </button>
                  {dateNoMessage && (
                    <div className="absolute -top-10 -right-8 pointer-events-none">
                      <ShyRunningCat size={65} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Celebration & Date Planner Form */
            <div className="mt-4 pt-6 border-t-2 border-chocolate/10 text-center animate-float-slow">
              <div className="bg-blush-100/70 p-4 rounded-2xl border-2 border-chocolate/20 max-w-lg mx-auto mb-6">
                <p className="font-love-note text-2xl sm:text-3xl text-chocolate font-bold">
                  “Chal na jau mg date var ❤️😂🌷 It's a date, then! Now tell me, cutie… where should we go? 🌷”
                </p>
              </div>

              {!datePlanSaved ? (
                <div className="max-w-lg mx-auto space-y-4">
                  {/* Quick Schedule Suggestions */}
                  <div className="p-3.5 bg-butter-50 rounded-2xl border-2 border-chocolate/15 text-left">
                    <span className="text-xs font-black text-chocolate block mb-1.5 flex items-center gap-1.5">
                      <span>✨</span>
                      <span>Quick Schedule Presets (1-Click Fill):</span>
                    </span>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          const nextSat = new Date();
                          nextSat.setDate(nextSat.getDate() + ((6 - nextSat.getDay() + 7) % 7 || 7));
                          setDatePlanForm({
                            preferredDate: nextSat.toISOString().split('T')[0],
                            preferredTime: '19:30',
                            place: 'Cozy Rooftop Cafe & Sunset View 🌅',
                            food: 'Pasta, Garlic Bread & Strawberry Dessert 🍝🍓',
                            note: 'Please bring your warmest smile and wear that nice shirt! 🌷',
                          });
                        }}
                        className="px-2.5 py-1 rounded-xl bg-white hover:bg-cream-100 border border-chocolate text-[11px] font-bold text-chocolate shadow-xs active:scale-95"
                      >
                        🌹 Saturday Rooftop Sunset
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          const tomorrow = new Date();
                          tomorrow.setDate(tomorrow.getDate() + 1);
                          setDatePlanForm({
                            preferredDate: tomorrow.toISOString().split('T')[0],
                            preferredTime: '18:00',
                            place: 'Romantic Flower Garden & Walkway 🌺',
                            food: 'Ice Cream, Momos & Chat 🍦🥟',
                            note: 'Lots of hugs and taking silly cute photos together! 📸',
                          });
                        }}
                        className="px-2.5 py-1 rounded-xl bg-white hover:bg-cream-100 border border-chocolate text-[11px] font-bold text-chocolate shadow-xs active:scale-95"
                      >
                        🌷 Tomorrow Flower Walk
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          const thisSun = new Date();
                          thisSun.setDate(thisSun.getDate() + ((7 - thisSun.getDay() + 7) % 7 || 7));
                          setDatePlanForm({
                            preferredDate: thisSun.toISOString().split('T')[0],
                            preferredTime: '12:30',
                            place: 'Cozy Brunch Spot & Bakery 🥞',
                            food: 'Pancakes, Cappuccino & Pastries ☕🍰',
                            note: 'Late lazy morning with you! 🐱✨',
                          });
                        }}
                        className="px-2.5 py-1 rounded-xl bg-white hover:bg-cream-100 border border-chocolate text-[11px] font-bold text-chocolate shadow-xs active:scale-95"
                      >
                        🥞 Sunday Cozy Brunch
                      </button>
                    </div>
                  </div>

                  <form
                    onSubmit={handleDateFormSubmit}
                    className="cute-card-soft p-6 text-left space-y-4 bg-white"
                  >
                    <h4 className="text-lg font-extrabold text-chocolate text-center mb-2">
                      Plan Our Little Date 💌
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-extrabold text-chocolate mb-1">
                          Preferred Date 📅
                        </label>
                        <input
                          type="date"
                          required
                          value={datePlanForm.preferredDate}
                          onChange={(e) =>
                            setDatePlanForm({ ...datePlanForm, preferredDate: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-xl border-2 border-chocolate bg-cream-50 text-sm focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-extrabold text-chocolate mb-1">
                          Preferred Time ⏰
                        </label>
                        <input
                          type="time"
                          value={datePlanForm.preferredTime}
                          onChange={(e) =>
                            setDatePlanForm({ ...datePlanForm, preferredTime: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-xl border-2 border-chocolate bg-cream-50 text-sm focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-chocolate mb-1">
                        Place She Wants to Visit 📍 *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Cozy rooftop cafe, cute flower garden, seaside..."
                        value={datePlanForm.place}
                        onChange={(e) =>
                          setDatePlanForm({ ...datePlanForm, place: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-xl border-2 border-chocolate bg-cream-50 text-sm focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-chocolate mb-1">
                        Food She Wants to Eat 🍜 *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Pasta, momos, sushi, chocolate dessert, ice cream..."
                        value={datePlanForm.food}
                        onChange={(e) =>
                          setDatePlanForm({ ...datePlanForm, food: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-xl border-2 border-chocolate bg-cream-50 text-sm focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-chocolate mb-1">
                        Optional Note for Him 💌
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Wear that shirt I like, or bring flowers... 🌷"
                        value={datePlanForm.note}
                        onChange={(e) =>
                          setDatePlanForm({ ...datePlanForm, note: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-xl border-2 border-chocolate bg-cream-50 text-sm focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="cute-btn w-full py-3 bg-blush-200 hover:bg-blush-300 text-chocolate font-black text-sm tracking-wide mt-2 shadow-cute flex items-center justify-center gap-2"
                    >
                      <span>Lock In Date Schedule & Open Date Gate 🌹🚪✨</span>
                    </button>
                  </form>
                </div>
              ) : (
                <div className="space-y-6 max-w-xl mx-auto">
                  <ScheduledDateGate
                    datePlan={
                      dateResponse?.datePlan || {
                        preferredDate: datePlanForm.preferredDate || new Date().toISOString().split('T')[0],
                        preferredTime: datePlanForm.preferredTime || '19:00',
                        place: datePlanForm.place,
                        food: datePlanForm.food,
                        note: datePlanForm.note,
                        submittedAt: new Date().toISOString(),
                      }
                    }
                    onResetDate={() => {
                      resetQuestion('date');
                      setDateAnsweredYes(false);
                      setDatePlanSaved(false);
                    }}
                    canReset={currentRole === 'him'}
                  />

                  {currentRole === 'him' && (
                    <div className="pt-2 text-center">
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm('Reset Question 1 (Date Night & Date Gate)? 🌹')) {
                            resetQuestion('date');
                            setDateAnsweredYes(false);
                            setDatePlanSaved(false);
                          }
                        }}
                        className="px-3.5 py-1.5 rounded-full bg-white hover:bg-cream-100 text-chocolate text-xs font-bold border-2 border-chocolate inline-flex items-center gap-1.5 shadow-sm active:scale-95"
                      >
                        <RotateCcw size={12} />
                        <span>Him Control: Reset Date Question & Schedule 🌹</span>
                      </button>
                    </div>
                  )}

                  <div className="pt-2 text-center">
                    <button
                      onClick={() => scrollTo('question-life')}
                      className="cute-btn px-6 py-2.5 bg-lavender-soft hover:bg-lavender-300 text-chocolate text-xs font-black shadow-sm"
                    >
                      <span>Continue to Question 2: A Precious Life 🌙</span>
                      <ArrowDown size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Romantic Pathway Bridge */}
      <div className="flex flex-col items-center justify-center gap-2 select-none opacity-80">
        <RomanticDivider text="Next in Our Universe" />
        <button
          onClick={() => scrollTo('question-life')}
          className="text-xs font-bold text-rose-deep hover:underline flex items-center gap-1"
        >
          <span>Scroll down to Question 2</span>
          <ChevronDown size={14} className="animate-bounce" />
        </button>
      </div>

      {/* ========================================================================= */}
      {/* QUESTION 2: A PRECIOUS LIFE TOGETHER 💗🌙 */}
      {/* ========================================================================= */}
      <section id="question-life" className="scroll-mt-24">
        <div
          className={`cute-card p-6 sm:p-10 relative overflow-hidden transition-all duration-700 ${
            lifeAnsweredYes ? 'night-sky-bg text-cream-100 border-[#C1B2EB]' : 'bg-white'
          }`}
        >
          <div className="text-center mb-6">
            <span
              className={`badge-mood mb-3 ${
                lifeAnsweredYes
                  ? 'bg-lavender-soft/30 text-butter-100 border-butter-100/50'
                  : 'bg-lavender-soft text-chocolate'
              }`}
            >
              Question 2 of 3 • Nighttime Stars 🌙
            </span>

            {lifeAnsweredYes ? (
              <CatHug size={220} className="mx-auto" />
            ) : (
              <CatsUnderStars size={220} className="mx-auto" />
            )}

            <h3
              className={`text-2xl sm:text-3xl font-black tracking-tight mt-4 ${
                lifeAnsweredYes ? 'text-white' : 'text-chocolate'
              }`}
            >
              “I know life is short, but would you like to share your precious life with me? 💗”
            </h3>
            <p
              className={`text-xs sm:text-sm mt-1 ${
                lifeAnsweredYes ? 'text-cream-200/80' : 'text-chocolate/70'
              }`}
            >
              Beneath the glowing moon and thousands of shining stars.
            </p>
          </div>

          {!lifeAnsweredYes ? (
            /* Buttons */
            <div className="relative py-8 flex flex-col items-center justify-center min-h-[160px]">
              {lifeNoMessage && (
                <div className="mb-4 px-3 py-1.5 rounded-full bg-butter-100 border-2 border-chocolate text-xs font-bold text-chocolate animate-bounce">
                  {lifeNoMessage}
                </div>
              )}

              <div className="flex items-center gap-6 relative">
                <button
                  onClick={handleLifeYes}
                  className="cute-btn px-8 py-3.5 bg-rose-soft text-white hover:bg-rose-deep text-lg font-black tracking-wide shadow-cute-lg active:scale-95"
                >
                  Yes, I would 💖
                </button>

                <div
                  style={{
                    transform: `translate(${lifeNoPos.x}px, ${lifeNoPos.y}px)`,
                    transition: 'transform 0.15s ease-out',
                  }}
                  className="relative inline-block"
                >
                  <button
                    onMouseEnter={handleLifeNoDodge}
                    onTouchStart={handleLifeNoDodge}
                    onClick={handleLifeNoDodge}
                    className="cute-btn px-6 py-2.5 bg-white text-chocolate/75 hover:bg-cream-100 text-sm font-bold border-2 border-chocolate"
                  >
                    No 🙈
                  </button>
                  {lifeNoMessage && (
                    <div className="absolute -top-10 -right-8 pointer-events-none">
                      <ShyRunningCat size={65} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Exact Romantic Message from Specification */
            <div className="mt-4 pt-6 border-t-2 border-white/20 text-center max-w-xl mx-auto animate-float-slow">
              <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#FFFDF9] via-[#FFF8F0] to-[#FFF0E6] border-2 border-chocolate shadow-cute-lg text-center relative">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blush-100 border border-chocolate text-chocolate text-xs font-black shadow-xs mb-3">
                  <span>📜</span>
                  <span>Our Lifetime Promise Letter</span>
                  <Sparkles size={12} className="text-rose-deep" />
                </div>

                <p className="font-love-note text-2xl sm:text-3xl leading-relaxed text-[#2B160E] font-bold">
                  “Golu, I know life won't always be perfect.
                  <br /><br />
                  But I want to keep choosing you, supporting you, listening to you, and growing with you.
                  <br /><br />
                  I want to celebrate your happiest moments, stand beside you through difficult days, and create little memories that we will smile about years from now.
                  <br /><br />
                  I may not know everything about the future, but I want to keep showing up for you with love, honesty, and respect.
                  <br /><br />
                  I'm always here to love you and support you. 💗🌷”
                </p>
              </div>

              {/* Special Thank You Note for Saying YES to Question 2 */}
              <div className="mt-6 p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#FFFDF9] via-[#FFF3EC] to-[#FFEBE4] border-2 border-chocolate shadow-cute-lg text-center relative overflow-hidden">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-butter-100 border border-chocolate text-chocolate text-xs font-black shadow-xs mb-3">
                  <span>💌</span>
                  <span>A Special Thank You Note From Him</span>
                  <Sparkles size={12} className="text-rose-deep" />
                </div>

                <h4 className="text-2xl sm:text-3xl font-black text-[#2B160E] mb-2 tracking-tight">
                  Thank You for Saying YES, My Sweet Golu! 🥹💗
                </h4>

                <div className="my-3 flex justify-center">
                  <PeachSparkle size={110} />
                </div>

                <p className="font-love-note text-2xl sm:text-3xl text-[#1E0F08] font-bold leading-relaxed max-w-lg mx-auto">
                  “Out of 8 billion souls in this big universe, you saying YES to sharing your precious life with me is the most heartwarming gift I could ever hope for. Thank you for choosing me, for your hugs that heal everything, your soft laughs, and for filling my days with warmth and colors. I promise to cherish your heart, stand by you through every season, and love you more and more with every sunrise. 🌷🌙”
                </p>

                <div className="mt-4 pt-3 border-t-2 border-chocolate/15 flex items-center justify-center gap-2 text-sm text-[#2B160E] font-black">
                  <span>Forever grateful & forever yours,</span>
                  <span className="text-rose-deep font-black">Her Loving Goma 🌙</span>
                </div>
              </div>

              <div className="mt-6 flex flex-col items-center justify-center gap-3">
                {!lifePromiseSaved ? (
                  <button
                    onClick={handleSavePromise}
                    className="cute-btn px-8 py-3.5 bg-butter-100 text-chocolate font-black text-sm tracking-wide shadow-cute-lg hover:bg-butter-200"
                  >
                    <Sparkles size={16} />
                    <span>Save This Little Promise ✨</span>
                  </button>
                ) : (
                  <div className="space-y-3">
                    <div className="px-6 py-3 rounded-full bg-white/20 border-2 border-white/40 text-cream-100 text-xs font-bold flex items-center gap-2">
                      <Check size={16} className="text-butter-100" />
                      <span>Promise Sealed & Preserved in Our Memory Garden ✨</span>
                    </div>

                    <button
                      onClick={() => scrollTo('question-memories')}
                      className="cute-btn px-6 py-2.5 bg-butter-100 hover:bg-butter-200 text-chocolate text-xs font-black shadow-sm"
                    >
                      <span>Continue to Question 3: More Memories 🌻</span>
                      <ArrowDown size={14} />
                    </button>
                  </div>
                )}

                {currentRole === 'him' && (
                  <div className="mt-2 text-center">
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm('Reset Question 2 (Precious Life & Thank You Note)? 🌙')) {
                          resetQuestion('life');
                          setLifeAnsweredYes(false);
                          setLifePromiseSaved(false);
                        }
                      }}
                      className="px-3.5 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-bold border border-white/40 inline-flex items-center gap-1.5 shadow-sm active:scale-95"
                    >
                      <RotateCcw size={12} />
                      <span>Him Control: Reset Life Question & Note 🌙</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Romantic Pathway Bridge */}
      <div className="flex flex-col items-center justify-center gap-2 select-none opacity-80">
        <RomanticDivider text="One More Surprise" />
        <button
          onClick={() => scrollTo('question-memories')}
          className="text-xs font-bold text-rose-deep hover:underline flex items-center gap-1"
        >
          <span>Scroll down to Question 3</span>
          <ChevronDown size={14} className="animate-bounce" />
        </button>
      </div>

      {/* ========================================================================= */}
      {/* QUESTION 3: SHALL WE MAKE MORE MEMORIES? 🌻 */}
      {/* ========================================================================= */}
      <section id="question-memories" className="scroll-mt-24">
        <div className="cute-card p-6 sm:p-10 relative overflow-hidden bg-gradient-to-b from-white via-butter-50 to-white">
          <div className="text-center mb-6">
            <span className="badge-mood bg-butter-100 text-chocolate mb-3">
              Question 3 of 3 • Sunflower Garden 🌻
            </span>

            {memoriesAnsweredYes ? (
              <CatWithCamera size={190} className="mx-auto" />
            ) : (
              <CatsTogetherFlower size={210} className="mx-auto" />
            )}

            <h3 className="text-2xl sm:text-4xl font-black text-chocolate tracking-tight mt-4">
              Would you like to make more beautiful memories with me? 🌻
            </h3>
            <p className="text-xs sm:text-sm text-chocolate/70 mt-1">
              A thousand sweet adventures waiting just for us.
            </p>
          </div>

          {!memoriesAnsweredYes ? (
            /* Buttons */
            <div className="relative py-8 flex flex-col items-center justify-center min-h-[160px]">
              {memoriesNoMessage && (
                <div className="mb-4 px-3 py-1.5 rounded-full bg-butter-100 border-2 border-chocolate text-xs font-bold text-chocolate animate-bounce">
                  {memoriesNoMessage}
                </div>
              )}

              <div className="flex items-center gap-6 relative">
                <button
                  onClick={handleMemoriesYes}
                  className="cute-btn px-8 py-3.5 bg-butter-200 text-chocolate hover:bg-butter-100 text-lg font-black tracking-wide shadow-cute-lg active:scale-95"
                >
                  YES, CHALOOO! 💗
                </button>

                <div
                  style={{
                    transform: `translate(${memoriesNoPos.x}px, ${memoriesNoPos.y}px)`,
                    transition: 'transform 0.15s ease-out',
                  }}
                  className="relative inline-block"
                >
                  <button
                    onMouseEnter={handleMemoriesNoDodge}
                    onTouchStart={handleMemoriesNoDodge}
                    onClick={handleMemoriesNoDodge}
                    className="cute-btn px-6 py-2.5 bg-white text-chocolate/75 hover:bg-cream-100 text-sm font-bold border-2 border-chocolate"
                  >
                    No 🙈
                  </button>
                  {memoriesNoMessage && (
                    <div className="absolute -top-10 -right-8 pointer-events-none">
                      <ShyRunningCat size={65} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Celebration & ONLY Custom Question Section */
            <div className="mt-4 pt-6 border-t-2 border-chocolate/10 text-center animate-float-slow">
              <div className="bg-butter-100/80 p-5 rounded-2xl border-2 border-chocolate max-w-lg mx-auto mb-6 shadow-sm">
                <p className="font-love-note text-3xl sm:text-4xl font-bold text-rose-deep">
                  “Chal na jau mg date var ❤️😂🌷”
                </p>
                <p className="text-sm font-bold text-chocolate/80 mt-1">
                  “Let's go collect little moments that become our favorite memories.”
                </p>
              </div>

              {/* ONLY CUSTOM QUESTION SECTION */}
              <div className="cute-card-soft p-6 sm:p-8 max-w-lg mx-auto text-left space-y-4 bg-white border-2 border-chocolate/20 shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">🐱💌</span>
                  <div>
                    <h4 className="text-base font-extrabold text-chocolate">
                      Your Custom Question for Him 💌
                    </h4>
                    <p className="text-xs text-chocolate/70">
                      Ask anything you want for our date or share your special wish!
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-chocolate mb-1.5">
                    Your Custom Question / Date Wish *
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="e.g. Can we go for sunset ice cream and listen to our songs together? 🍦🌅"
                    value={customQuestionInput}
                    onChange={(e) => setCustomQuestionInput(e.target.value)}
                    className="w-full p-3.5 rounded-2xl border-2 border-chocolate bg-cream-50 text-sm focus:outline-none focus:ring-2 focus:ring-rose-soft"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleSaveCustomQuestion}
                  disabled={!customQuestionInput.trim()}
                  className="cute-btn w-full py-3 bg-rose-soft text-white font-black text-sm tracking-wide shadow-cute-lg hover:bg-rose-deep disabled:opacity-50"
                >
                  <span>Send Custom Question to Him 💌</span>
                </button>

                {memoriesSaved && (
                  <div className="p-3 rounded-xl bg-mint-100 border-2 border-mint-200 text-center text-xs font-bold text-chocolate animate-bounce">
                    ✨ “Chal na jau mg date var!” Your custom question has been saved and sent to him! 🐱💗
                  </div>
                )}

                {currentRole === 'him' && (
                  <div className="pt-2 text-center">
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm('Reset Question 3 (Custom Question) so Golu can answer again? 🌻')) {
                          resetQuestion('memories');
                          setMemoriesAnsweredYes(false);
                          setMemoriesSaved(false);
                        }
                      }}
                      className="px-3.5 py-1.5 rounded-full bg-white hover:bg-cream-100 text-chocolate text-xs font-bold border-2 border-chocolate inline-flex items-center gap-1.5 shadow-sm active:scale-95"
                    >
                      <RotateCcw size={12} />
                      <span>Him Control: Reset Custom Question 🌻</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Romantic Pathway Bridge to Grand Finale Date Timer */}
      <div className="flex flex-col items-center justify-center gap-2 select-none opacity-80 pt-4">
        <RomanticDivider text="Our Grand Finale" />
        <button
          onClick={() => scrollTo('her-date-timer')}
          className="text-xs font-bold text-rose-deep hover:underline flex items-center gap-1"
        >
          <span>Scroll down to Our Date Timer</span>
          <ChevronDown size={14} className="animate-bounce" />
        </button>
      </div>

      {/* ========================================================================= */}
      {/* GRAND FINALE: DATE COUNTDOWN TIMER AT THE VERY END OF HER SECTION 🌹⏳✨ */}
      {/* ========================================================================= */}
      <section id="her-date-timer" className="scroll-mt-24 pt-4">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blush-100 border-2 border-chocolate text-chocolate text-xs font-black shadow-sm mb-3">
            <Sparkles size={14} className="text-rose-soft" />
            <span>Grand Finale • Date Countdown Timer</span>
            <Sparkles size={14} className="text-rose-soft" />
          </div>

          <h3 className="text-2xl sm:text-4xl font-black text-chocolate tracking-tight">
            Counting Down Every Second to Our Date 🌹⏳✨
          </h3>
          <p className="text-xs sm:text-sm text-chocolate/75 font-medium mt-1">
            {currentRole === 'her' ? 'For My Sweet Golu 🌸 — Every single second brings us closer together!' : 'Two little cats counting down every heartbeat until our date! 🐱💗'}
          </p>
        </div>

        {activeDatePlan ? (
          <div className="space-y-6">
            <ScheduledDateGate
              datePlan={activeDatePlan}
              onResetDate={() => {
                resetQuestion('date');
                setDateAnsweredYes(false);
                setDatePlanSaved(false);
              }}
              canReset={currentRole === 'him'}
            />
          </div>
        ) : (
          <div className="cute-card p-8 bg-gradient-to-b from-white via-cream-50 to-blush-50 text-center border-2 border-chocolate shadow-cute-lg max-w-xl mx-auto">
            <div className="flex justify-center mb-4">
              <CatsTogetherFlower size={140} />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-butter-100 border border-chocolate text-chocolate text-xs font-black shadow-xs mb-3">
              <span>⏳</span>
              <span>Date Countdown Waiting to Unlock</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-black text-chocolate mb-2">
              Say YES to Question 1 to Start Our Date Timer! 🌹
            </h4>
            <p className="font-love-note text-2xl text-[#2B160E] font-bold max-w-md mx-auto mb-6">
              “Once you choose our date schedule in Question 1 above, your live countdown clock and official Date Passport will activate right here! 🌷✨”
            </p>
            <button
              onClick={() => scrollTo('question-date')}
              className="cute-btn px-6 py-3 bg-rose-soft hover:bg-rose-deep text-white font-black text-xs shadow-cute-lg active:scale-95"
            >
              <span>Go to Question 1 & Plan Our Date 🌹</span>
              <ArrowRight size={14} />
            </button>
          </div>
        )}
      </section>
    </div>
  );
};
