import React, { useState } from 'react';
import { Search, ThumbsUp, HelpCircle, MessageSquarePlus, Check } from 'lucide-react';
import { QuestionAnswer } from '../types/amazon';

interface CustomerQAProps {
  initialQuestions: QuestionAnswer[];
}

export const CustomerQA: React.FC<CustomerQAProps> = ({ initialQuestions }) => {
  const [questions, setQuestions] = useState<QuestionAnswer[]>(initialQuestions);
  const [searchQuery, setSearchQuery] = useState('');
  const [votedMap, setVotedMap] = useState<{ [id: string]: boolean }>({});
  const [showAskModal, setShowAskModal] = useState(false);
  const [newQuestionText, setNewQuestionText] = useState('');
  const [askedSuccess, setAskedSuccess] = useState(false);

  const filteredQuestions = questions.filter(q =>
    q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleVote = (id: string) => {
    if (votedMap[id]) return;
    setVotedMap(prev => ({ ...prev, [id]: true }));
    setQuestions(prev => prev.map(q => q.id === id ? { ...q, votes: q.votes + 1 } : q));
  };

  const handleAskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;
    const newQ: QuestionAnswer = {
      id: `qa-${Date.now()}`,
      question: newQuestionText.trim(),
      answer: 'This question was submitted to the community and Sony Product Specialists. Answers typically arrive within 2-4 hours.',
      author: 'Community Support',
      date: 'Just now',
      votes: 1
    };
    setQuestions([newQ, ...questions]);
    setNewQuestionText('');
    setAskedSuccess(true);
    setTimeout(() => {
      setAskedSuccess(false);
      setShowAskModal(false);
    }, 1500);
  };

  return (
    <div id="customer-qa-section" className="py-6 border-b border-gray-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <h2 className="text-xl font-bold text-[#0f1111]">
          Customer questions & answers
        </h2>
        <button
          onClick={() => setShowAskModal(true)}
          className="text-xs bg-white hover:bg-gray-50 border border-gray-300 font-semibold py-1.5 px-3 rounded shadow-xs text-gray-800 flex items-center gap-1.5 w-fit cursor-pointer"
        >
          <MessageSquarePlus className="w-3.5 h-3.5 text-[#007185]" />
          <span>Ask the Community</span>
        </button>
      </div>

      {/* QA Search Bar */}
      <div className="relative mb-6 max-w-xl">
        <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Have a question? Search answers, descriptions, FAQs..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-[#e77600] text-gray-900"
        />
      </div>

      {/* Question List */}
      <div className="space-y-6">
        {filteredQuestions.length === 0 ? (
          <div className="text-xs text-gray-500 py-4">
            No questions matching "{searchQuery}". Try asking a new question above!
          </div>
        ) : (
          filteredQuestions.map((q) => (
            <div key={q.id} className="text-xs flex gap-4 items-start">
              {/* Vote Count Pillar */}
              <div className="flex flex-col items-center shrink-0 w-12 text-center pt-0.5">
                <button
                  onClick={() => handleVote(q.id)}
                  className={`p-1.5 rounded transition cursor-pointer flex flex-col items-center ${
                    votedMap[q.id]
                      ? 'text-[#007185] bg-blue-50 font-bold'
                      : 'text-gray-500 hover:text-black hover:bg-gray-100'
                  }`}
                  title="Vote as helpful question"
                >
                  <ThumbsUp className="w-3.5 h-3.5 mb-0.5" />
                  <span className="text-[11px] font-bold tabular-nums">{q.votes}</span>
                </button>
                <span className="text-[10px] text-gray-400 leading-none mt-0.5">votes</span>
              </div>

              {/* Question & Answer Content */}
              <div className="flex-1 space-y-2">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-gray-700 shrink-0">Question:</span>
                  <p className="font-semibold text-gray-900 leading-snug">{q.question}</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-gray-700 shrink-0">Answer:</span>
                  <div className="text-gray-800 leading-relaxed">
                    <p>{q.answer}</p>
                    <div className="text-[11px] text-gray-500 mt-1">
                      By <span className="text-[#007185] font-medium">{q.author}</span> on {q.date}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Ask Question Modal */}
      {showAskModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-2xl border border-gray-200">
            <h3 className="font-bold text-sm text-[#0f1111] mb-2">
              Ask a question about Sony WH-1000XM5
            </h3>
            <p className="text-xs text-gray-600 mb-4">
              Your question might be answered by sellers, manufacturers, or customers who bought this product.
            </p>

            <form onSubmit={handleAskSubmit}>
              <textarea
                value={newQuestionText}
                onChange={(e) => setNewQuestionText(e.target.value)}
                placeholder="Type your question here (e.g. Does this work with PlayStation 5?)"
                rows={4}
                className="w-full text-xs p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#e77600] mb-4 text-gray-900"
                required
              />

              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAskModal(false)}
                  className="px-4 py-1.5 text-xs text-gray-600 hover:text-black font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#ffd814] hover:bg-[#f7ca00] text-black text-xs font-semibold px-5 py-1.5 rounded-full shadow-xs border border-[#fcd200] cursor-pointer flex items-center gap-1.5"
                >
                  {askedSuccess ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-800" />
                      <span>Submitted!</span>
                    </>
                  ) : (
                    <span>Post Question</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
