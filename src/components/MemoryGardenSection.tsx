import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MemoryItem, MemoryCategory } from '../types';
import { CatWithCamera, CatsTogetherFlower, PeachSparkle } from './KawaiiCats';
import { RomanticDivider } from './FloralDecorations';
import {
  Plus,
  Calendar,
  Sparkles,
  Heart,
  Music,
  Rose,
  HelpCircle,
  X,
  Filter,
  Trash2,
} from 'lucide-react';

export const MemoryGardenSection: React.FC = () => {
  const { memories, addMemory, deleteMemory, currentRole, myProfile, coupleSpace } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState<MemoryCategory>('custom');
  const [icon, setIcon] = useState('🌸');

  const categories = [
    { id: 'all', label: 'All Moments', icon: '🌸' },
    { id: 'date', label: 'Date Plans', icon: '🌹' },
    { id: 'promise', label: 'Promises', icon: '🌙' },
    { id: 'song', label: 'Music Moments', icon: '🎶' },
    { id: 'milestone', label: 'Milestones', icon: '🌟' },
    { id: 'custom', label: 'Special Notes', icon: '💌' },
  ];

  const iconOptions = ['🌸', '🌹', '🌻', '🌷', '✨', '🌙', '🍕', '🐱', '💌', '📸', '🎧', '💍'];

  const handleCreateMemory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    await addMemory({
      title: title.trim(),
      description: description.trim(),
      date,
      category,
      icon,
    });

    setTitle('');
    setDescription('');
    setIsModalOpen(false);
  };

  const handleDeleteMemory = (id: string, memTitle: string) => {
    if (currentRole !== 'him') return;
    if (window.confirm(`Are you sure you want to remove "${memTitle}" from our memory garden? 🐱`)) {
      deleteMemory(id);
    }
  };

  const filteredMemories = memories
    .filter((m) => (filterCategory === 'all' ? true : m.category === filterCategory))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 select-none">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-2">
          <CatWithCamera size={190} />
        </div>

        <h2 className="text-3xl sm:text-4xl font-black text-chocolate tracking-tight flex items-center justify-center gap-2">
          Our Little Memory Garden <span className="text-rose-soft">🌸</span>
        </h2>
        <p className="text-sm sm:text-base font-medium text-chocolate/80 mt-1 max-w-lg mx-auto">
          “Every little moment with you is a flower blooming in our universe.”
        </p>
      </div>

      {/* Filter and Add Button */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-1.5 flex-wrap justify-center bg-cream-50 p-1.5 rounded-full border-2 border-chocolate/15">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setFilterCategory(c.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1 ${
                filterCategory === c.id
                  ? 'bg-blush-200 text-chocolate border-2 border-chocolate shadow-sm'
                  : 'text-chocolate/70 hover:text-chocolate'
              }`}
            >
              <span>{c.icon}</span>
              <span>{c.label}</span>
            </button>
          ))}
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="cute-btn px-5 py-2.5 bg-butter-100 hover:bg-butter-200 text-chocolate text-xs font-black tracking-wide"
        >
          <Plus size={15} />
          <span>Plant a Memory 🌱</span>
        </button>
      </div>

      {/* Vertical / Desktop Timeline */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-dashed border-rose-soft/50 space-y-8 my-6">
        {filteredMemories.map((m, idx) => (
          <div key={m.id} className="relative group">
            {/* Timeline Flower Node */}
            <div className="absolute -left-[35px] sm:-left-[43px] top-1.5 w-8 h-8 rounded-full bg-cream-100 border-2 border-chocolate flex items-center justify-center text-sm shadow-sm group-hover:scale-110 transition-transform">
              {m.icon || '🌸'}
            </div>

            {/* Memory Card */}
            <div className="cute-card p-6 bg-white transition-all hover:border-chocolate/50">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                <span className="badge-mood bg-cream-100 text-chocolate text-[11px] self-start">
                  {m.category.toUpperCase()}
                </span>
                <div className="flex items-center gap-2.5 text-xs text-chocolate/60 flex-wrap">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    <span>{new Date(m.date).toLocaleDateString(undefined, { dateStyle: 'medium' })}</span>
                  </span>
                  <span>•</span>
                  <span>Saved by <strong>{m.authorName}</strong></span>
                  {currentRole === 'him' && (
                    <button
                      type="button"
                      onClick={() => handleDeleteMemory(m.id, m.title)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border-2 border-chocolate/20 bg-rose-soft/15 hover:bg-rose-soft/30 hover:border-rose-deep text-rose-deep text-[11px] font-bold transition-all shadow-sm active:scale-95 ml-1"
                      title="Delete memory (Only available for you 🌙)"
                    >
                      <Trash2 size={11} />
                      <span>Delete</span>
                    </button>
                  )}
                </div>
              </div>

              <h4 className="text-xl font-black text-chocolate mt-2 mb-2">
                {m.title}
              </h4>

              <p className="font-love-note text-lg sm:text-xl text-chocolate leading-relaxed bg-cream-50/70 p-3.5 rounded-xl border border-chocolate/10">
                {m.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {filteredMemories.length === 0 && (
        <div className="cute-card p-12 text-center bg-white my-8">
          <PeachSparkle size={140} className="mx-auto mb-4" />
          <h4 className="text-lg font-bold text-chocolate">
            Our memory garden is still growing… Let's plant the first flower! 🌱🐱
          </h4>
          <p className="text-xs text-chocolate/70 mt-1 max-w-sm mx-auto">
            Click "Plant a Memory" above or complete a love question to see your story bloom here.
          </p>
        </div>
      )}

      {/* Add Memory Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="cute-card max-w-lg w-full p-6 bg-white relative animate-float">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full border-2 border-chocolate hover:bg-cream-100 text-chocolate"
            >
              <X size={16} />
            </button>

            <h3 className="text-xl font-extrabold text-chocolate mb-1">
              Plant a New Memory 🌱🌸
            </h3>
            <p className="text-xs text-chocolate/70 mb-4">
              Add a moment, date, inside joke, or milestone to our private timeline.
            </p>

            <form onSubmit={handleCreateMemory} className="space-y-4">
              <div>
                <label className="block text-xs font-extrabold text-chocolate mb-1">
                  Memory Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. The evening we danced in the rain..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border-2 border-chocolate bg-cream-50 text-sm focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-extrabold text-chocolate mb-1">
                    Date 📅
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border-2 border-chocolate bg-cream-50 text-sm focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-chocolate mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as MemoryCategory)}
                    className="w-full px-3 py-2 rounded-xl border-2 border-chocolate bg-cream-50 text-sm focus:outline-none"
                  >
                    <option value="custom">Special Note 💌</option>
                    <option value="date">Date Night 🌹</option>
                    <option value="promise">Promise 🌙</option>
                    <option value="milestone">Milestone 🌟</option>
                    <option value="song">Music Moment 🎶</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-chocolate mb-1">
                  Choose a Flower / Mascot Icon
                </label>
                <div className="flex flex-wrap gap-2">
                  {iconOptions.map((ic) => (
                    <button
                      key={ic}
                      type="button"
                      onClick={() => setIcon(ic)}
                      className={`w-9 h-9 rounded-xl border-2 flex items-center justify-center text-lg transition-transform ${
                        icon === ic
                          ? 'border-chocolate bg-blush-200 scale-110 shadow-sm'
                          : 'border-chocolate/20 bg-cream-50 hover:bg-cream-100'
                      }`}
                    >
                      {ic}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-chocolate mb-1">
                  The Story / Love Note *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe this precious moment with words that will make us smile years from now..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border-2 border-chocolate bg-cream-50 text-sm focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-full border-2 border-chocolate text-xs font-bold hover:bg-cream-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="cute-btn px-6 py-2 bg-blush-200 text-chocolate text-xs font-extrabold"
                >
                  Plant in Garden 🌸
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
