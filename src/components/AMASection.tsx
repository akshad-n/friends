import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Question, QuestionCategory } from '../types';
import { PeachSparkle, CatHug, PeachKnead } from './KawaiiCats';
import { RomanticDivider } from './FloralDecorations';
import {
  Send,
  Mail,
  Heart,
  MessageCircle,
  Clock,
  CheckCircle,
  Eye,
  Filter,
  Sparkles,
  Edit2,
  Lock,
} from 'lucide-react';

export const AMASection: React.FC = () => {
  const {
    currentRole,
    questions,
    submitQuestion,
    answerQuestion,
    markAnswerRead,
    myProfile,
    coupleSpace,
  } = useApp();

  const [questionText, setQuestionText] = useState('');
  const [category, setCategory] = useState<QuestionCategory>('About Us');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'all' | 'awaiting' | 'answered'>('all');
  const [submittingEnvelope, setSubmittingEnvelope] = useState(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);

  // Answering dashboard state
  const [answeringQuestionId, setAnsweringQuestionId] = useState<string | null>(null);
  const [replyInput, setReplyInput] = useState('');

  const categories: QuestionCategory[] = [
    'About Us',
    'Our Future',
    'Memories',
    'Feelings',
    'Fun Questions',
    'Random Thoughts',
    'Anything on Your Mind',
  ];

  const handleSubmitQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) return;

    setSubmittingEnvelope(true);
    await submitQuestion(questionText.trim(), category, isAnonymous);

    setTimeout(() => {
      setSubmittingEnvelope(false);
      setShowSuccessBanner(true);
      setQuestionText('');
      setTimeout(() => setShowSuccessBanner(false), 5000);
    }, 900);
  };

  const handleOpenAnswerModal = (q: Question) => {
    setAnsweringQuestionId(q.id);
    setReplyInput(q.reply?.replyText || '');
  };

  const handleSaveAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!answeringQuestionId || !replyInput.trim()) return;

    await answerQuestion(answeringQuestionId, replyInput.trim());
    setAnsweringQuestionId(null);
    setReplyInput('');
  };

  const filteredQuestions = questions
    .filter((q) => {
      if (filterStatus === 'awaiting') return q.status === 'awaiting';
      if (filterStatus === 'answered') return q.status === 'answered';
      return true;
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 select-none">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-2">
          <CatHug size={210} />
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blush-100 border-2 border-chocolate text-chocolate text-xs font-black shadow-sm mb-3">
          <span>🐱💗</span>
          <span>Ask Me Anything Golu</span>
          <Sparkles size={13} className="text-rose-soft" />
        </div>

        <h2 className="text-3xl sm:text-4xl font-black text-chocolate tracking-tight flex items-center justify-center gap-2">
          Ask Me Anything Golu <span className="text-rose-soft">💌🌸</span>
        </h2>
        <p className="text-sm sm:text-base font-medium text-chocolate/80 mt-1 max-w-lg mx-auto">
          “Ask me anything, my sweet Golu. I want us to always feel comfortable talking to each other.”
        </p>
      </div>

      {/* Role Banner / Context */}
      <div className="mb-6 flex items-center justify-between bg-white/80 p-3 rounded-2xl border-2 border-chocolate/15 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-base">{currentRole === 'her' ? '🌸' : '🌙'}</span>
          <span>
            You are browsing as <strong>{myProfile.name}</strong> ({currentRole === 'her' ? 'Asking questions' : 'Answering dashboard'})
          </span>
        </div>
        <div className="text-[11px] text-chocolate/60">
          Private to {coupleSpace.herName} & {coupleSpace.himName}
        </div>
      </div>

      {/* SECTION A: QUESTION SUBMISSION FORM */}
      <section className="cute-card p-6 sm:p-8 mb-10 bg-white relative">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-blush-100 border-2 border-chocolate flex items-center justify-center text-lg">
            💌
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-chocolate">
              {currentRole === 'her' ? 'Ask Me Anything Golu 💌' : 'Ask Golu Anything 🌸'}
            </h3>
            <p className="text-xs text-chocolate/70">
              {currentRole === 'her'
                ? 'Ask him anything, Golu! Honest, loving answers straight from his heart.'
                : 'Ask your sweet Golu anything on your mind!'}
            </p>
          </div>
        </div>

        {showSuccessBanner && (
          <div className="mb-5 p-4 rounded-2xl bg-mint-100 border-2 border-mint-200 text-chocolate text-xs sm:text-sm font-bold flex items-center gap-2 animate-bounce">
            <Sparkles size={16} className="text-emerald-600" />
            <span>Your little message has reached him, Golu! 💗 Notification sent.</span>
          </div>
        )}

        <form onSubmit={handleSubmitQuestion} className="space-y-4">
          <div>
            <label className="block text-xs font-extrabold text-chocolate mb-1.5">
              Select Category
            </label>
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold border-2 transition-all ${
                    category === cat
                      ? 'bg-blush-200 border-chocolate text-chocolate shadow-sm'
                      : 'bg-cream-50 border-chocolate/20 text-chocolate/70 hover:bg-cream-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-extrabold text-chocolate">
                Your Question *
              </label>
              <span className="text-[11px] text-chocolate/60 font-semibold">
                Tap an idea to auto-fill 👇
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-2.5">
              {[
                'What made you fall in love with me? 🌸',
                'What is your favorite memory of us, Golu? 🌷',
                'What little thing makes your heart flutter? 🥹',
                'Where should our next secret adventure be? ✈️',
              ].map((starter) => (
                <button
                  key={starter}
                  type="button"
                  onClick={() => setQuestionText(starter)}
                  className="text-[11px] px-2.5 py-1 rounded-full bg-cream-50 hover:bg-blush-100 border border-chocolate/20 text-chocolate font-semibold transition-all text-left"
                >
                  {starter}
                </button>
              ))}
            </div>

            <textarea
              rows={3}
              required
              placeholder="Ask anything... about us, memories, future dreams, silly thoughts... 💌"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              className="w-full p-3.5 rounded-2xl border-2 border-chocolate bg-cream-50 text-sm focus:outline-none focus:ring-2 focus:ring-rose-soft"
            />
          </div>

          <div className="flex items-center justify-between pt-1 flex-wrap gap-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-chocolate/80">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="w-4 h-4 rounded text-rose-soft accent-rose-soft cursor-pointer"
              />
              <span>Send as "Your Shy Secret Cat 🐱"</span>
            </label>

            <button
              type="submit"
              disabled={submittingEnvelope || !questionText.trim()}
              className="cute-btn px-6 py-2.5 bg-blush-200 text-chocolate text-xs sm:text-sm font-black disabled:opacity-50"
            >
              {submittingEnvelope ? (
                <span className="flex items-center gap-1.5">
                  <span className="animate-spin">💌</span>
                  <span>Sending...</span>
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  <span>{currentRole === 'her' ? 'Send Question to Him 💌' : 'Send Question to Golu 💌'}</span>
                </span>
              )}
            </button>
          </div>
        </form>
      </section>

      {/* SECTION B: QUESTIONS & ANSWERS DASHBOARD */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-2">
          <div>
            <h3 className="text-xl font-extrabold text-chocolate flex items-center gap-2">
              <span>Our Private Question Vault</span>
              <span className="text-xs bg-cream-200 px-2 py-0.5 rounded-full border border-chocolate">
                {questions.length} total
              </span>
            </h3>
            <p className="text-xs text-chocolate/70">
              {currentRole === 'him'
                ? "Here are her questions. Click any unanswered question to write your heartfelt answer!"
                : "Questions you've asked him and his honest answers."}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 bg-cream-50 p-1 rounded-full border-2 border-chocolate/15">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                filterStatus === 'all'
                  ? 'bg-blush-200 text-chocolate border border-chocolate shadow-sm'
                  : 'text-chocolate/70 hover:text-chocolate'
              }`}
            >
              All ({questions.length})
            </button>
            <button
              onClick={() => setFilterStatus('awaiting')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                filterStatus === 'awaiting'
                  ? 'bg-butter-100 text-chocolate border border-chocolate shadow-sm'
                  : 'text-chocolate/70 hover:text-chocolate'
              }`}
            >
              Awaiting ({questions.filter((q) => q.status === 'awaiting').length})
            </button>
            <button
              onClick={() => setFilterStatus('answered')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                filterStatus === 'answered'
                  ? 'bg-mint-100 text-chocolate border border-chocolate shadow-sm'
                  : 'text-chocolate/70 hover:text-chocolate'
              }`}
            >
              Answered ({questions.filter((q) => q.status === 'answered').length})
            </button>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {filteredQuestions.map((q) => {
            const isAnswered = q.status === 'answered' && q.reply;
            return (
              <div
                key={q.id}
                className="cute-card p-5 sm:p-6 bg-white relative transition-all hover:border-chocolate/40"
              >
                {/* Question Top Header */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="badge-mood bg-cream-200 text-chocolate text-[11px]">
                      {q.category}
                    </span>
                    <span className="text-[11px] text-chocolate/60">
                      Asked by <strong>{q.askerName}</strong> •{' '}
                      {new Date(q.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Status Badge */}
                  {isAnswered ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-mint-100 border border-mint-200 text-[11px] font-bold text-chocolate">
                      <CheckCircle size={11} className="text-emerald-600" />
                      <span>Answered</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-butter-100 border border-butter-200 text-[11px] font-bold text-chocolate animate-pulse">
                      <Clock size={11} className="text-amber-600" />
                      <span>Awaiting answer</span>
                    </span>
                  )}
                </div>

                {/* The Question Text */}
                <p className="text-base sm:text-lg font-extrabold text-chocolate leading-snug my-2">
                  “{q.questionText}”
                </p>

                {/* The Reply Box (if answered) */}
                {isAnswered && (
                  <div className="mt-4 pt-4 border-t-2 border-dashed border-chocolate/15 bg-blush-50/50 p-4 rounded-2xl">
                    <div className="flex items-center justify-between text-xs text-chocolate/70 mb-2">
                      <span className="font-extrabold text-chocolate flex items-center gap-1.5">
                        <span>🌙</span>
                        <span>{q.reply?.replierName}'s Answer:</span>
                      </span>
                      <span className="text-[10px]">
                        {new Date(q.reply!.answeredAt).toLocaleDateString()}
                      </span>
                    </div>

                    <p className="font-love-note text-lg sm:text-xl text-chocolate leading-relaxed">
                      {q.reply?.replyText}
                    </p>

                    <div className="mt-3 flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-1 text-chocolate/60">
                        <Eye size={12} className={q.reply?.isRead ? 'text-rose-deep' : ''} />
                        <span>{q.reply?.isRead ? 'Seen by her 🌸' : 'Waiting for her to read'}</span>
                      </div>

                      {/* Edit Answer Button for Him */}
                      {currentRole === 'him' && (
                        <button
                          onClick={() => handleOpenAnswerModal(q)}
                          className="text-chocolate/80 hover:text-rose-deep font-bold flex items-center gap-1"
                        >
                          <Edit2 size={12} />
                          <span>Edit Answer</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* If Not Answered, Action Button for Him */}
                {!isAnswered && (
                  <div className="mt-4 pt-3 border-t border-chocolate/10 flex justify-end">
                    {currentRole === 'him' ? (
                      <button
                        onClick={() => handleOpenAnswerModal(q)}
                        className="cute-btn px-4 py-2 bg-rose-soft text-white text-xs font-bold hover:bg-rose-deep"
                      >
                        <MessageCircle size={13} />
                        <span>Write Your Answer 💌</span>
                      </button>
                    ) : (
                      <span className="text-xs text-chocolate/60 italic">
                        He will receive a notification to answer this soon! 🐱
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {filteredQuestions.length === 0 && (
            <div className="cute-card p-12 text-center bg-white">
              <PeachKnead size={140} className="mx-auto mb-3" />
              <p className="text-base font-bold text-chocolate">No questions found!</p>
              <p className="text-xs text-chocolate/70 mt-1">
                Use the box above to ask the first question of your hearts. 💌
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Answer Modal for Him */}
      {answeringQuestionId && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="cute-card max-w-lg w-full p-6 bg-white relative animate-float">
            <h3 className="text-xl font-black text-chocolate mb-1">
              Your Honest Answer 💌
            </h3>
            <p className="text-xs text-chocolate/70 mb-4">
              Write from the heart. She will receive a sweet notification when you submit.
            </p>

            <form onSubmit={handleSaveAnswer} className="space-y-4">
              <textarea
                rows={5}
                required
                placeholder="Write your honest, loving answer here..."
                value={replyInput}
                onChange={(e) => setReplyInput(e.target.value)}
                className="w-full p-3.5 rounded-2xl border-2 border-chocolate bg-cream-50 text-sm focus:outline-none focus:ring-2 focus:ring-rose-soft"
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setAnsweringQuestionId(null)}
                  className="px-4 py-2 rounded-full border-2 border-chocolate text-xs font-bold hover:bg-cream-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="cute-btn px-6 py-2 bg-blush-200 text-chocolate text-xs font-extrabold"
                >
                  Submit Answer 💌
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
