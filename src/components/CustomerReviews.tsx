import React, { useState } from 'react';
import { 
  Star, 
  ThumbsUp, 
  Check, 
  Edit3, 
  Filter, 
  Search, 
  X,
  User
} from 'lucide-react';
import { ReviewItem } from '../types/amazon';

interface CustomerReviewsProps {
  initialReviews: ReviewItem[];
  averageRating: number;
  totalRatingsCount: number;
}

export const CustomerReviews: React.FC<CustomerReviewsProps> = ({
  initialReviews,
  averageRating,
  totalRatingsCount
}) => {
  const [reviews, setReviews] = useState<ReviewItem[]>(initialReviews);
  const [starFilter, setStarFilter] = useState<number | null>(null);
  const [topicFilter, setTopicFilter] = useState<string>('All');
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
  const [searchReviewText, setSearchReviewText] = useState<string>('');
  const [helpfulMap, setHelpfulMap] = useState<{ [id: string]: boolean }>({});

  // Review modal state
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newAuthor, setNewAuthor] = useState('Alex P.');
  const [writeSubmitted, setWriteSubmitted] = useState(false);

  const topics = [
    'All',
    'Noise cancellation',
    'Sound quality',
    'Battery life',
    'Comfort',
    'Multipoint',
    'Microphone',
    'Travel'
  ];

  const ratingDistribution = [
    { stars: 5, pct: 78 },
    { stars: 4, pct: 12 },
    { stars: 3, pct: 5 },
    { stars: 2, pct: 2 },
    { stars: 1, pct: 3 }
  ];

  const handleHelpfulClick = (id: string) => {
    if (helpfulMap[id]) return;
    setHelpfulMap(prev => ({ ...prev, [id]: true }));
    setReviews(prev => prev.map(r => r.id === id ? { ...r, helpfulCount: r.helpfulCount + 1 } : r));
  };

  const handleWriteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      author: newAuthor.trim() || 'Verified Customer',
      rating: newRating,
      date: `Reviewed in the United States on ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`,
      verifiedPurchase: true,
      title: newTitle.trim(),
      content: newContent.trim(),
      helpfulCount: 0,
      variantInfo: 'Color: Black | Verified Purchase'
    };

    setReviews([newRev, ...reviews]);
    setWriteSubmitted(true);
    setTimeout(() => {
      setWriteSubmitted(false);
      setShowWriteModal(false);
      setNewTitle('');
      setNewContent('');
    }, 1200);
  };

  const filteredReviews = reviews.filter((r) => {
    if (starFilter && r.rating !== starFilter) return false;
    if (verifiedOnly && !r.verifiedPurchase) return false;
    if (searchReviewText.trim()) {
      const matchSearch = r.title.toLowerCase().includes(searchReviewText.toLowerCase()) ||
                          r.content.toLowerCase().includes(searchReviewText.toLowerCase());
      if (!matchSearch) return false;
    }
    if (topicFilter !== 'All') {
      const matchTopic = r.title.toLowerCase().includes(topicFilter.toLowerCase()) ||
                         r.content.toLowerCase().includes(topicFilter.toLowerCase());
      if (!matchTopic) return false;
    }
    return true;
  });

  return (
    <div id="customer-reviews-section" className="py-6">
      <h2 className="text-xl font-bold text-[#0f1111] mb-6">
        Customer Reviews
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Rating breakdown and Write a review */}
        <div className="lg:col-span-4 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="flex text-[#de7921]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#de7921]" />
                ))}
              </div>
              <span className="text-xl font-bold text-[#0f1111]">
                {averageRating} out of 5
              </span>
            </div>
            <p className="text-xs text-gray-500 mb-4">
              {totalRatingsCount.toLocaleString()} global ratings
            </p>

            {/* Distribution Bars */}
            <div className="space-y-2 text-xs">
              {ratingDistribution.map((item) => (
                <div
                  key={item.stars}
                  onClick={() => setStarFilter(starFilter === item.stars ? null : item.stars)}
                  className={`flex items-center gap-2 cursor-pointer group py-0.5 px-1 rounded transition ${
                    starFilter === item.stars ? 'bg-amber-100/60 ring-1 ring-amber-300' : 'hover:bg-gray-50'
                  }`}
                >
                  <span className="w-12 text-[#007185] group-hover:underline font-medium">
                    {item.stars} star
                  </span>
                  <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                    <div
                      className="h-full bg-[#ffa41c] rounded-full transition-all"
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                  <span className="w-8 text-right text-gray-600 group-hover:text-[#007185]">
                    {item.pct}%
                  </span>
                </div>
              ))}
            </div>

            {starFilter && (
              <button
                onClick={() => setStarFilter(null)}
                className="mt-2 text-xs text-[#007185] hover:underline flex items-center gap-1 font-semibold"
              >
                <X className="w-3 h-3" />
                <span>Clear {starFilter}-star filter</span>
              </button>
            )}
          </div>

          {/* Write a review card */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="font-bold text-sm text-[#0f1111] mb-1">
              Review this product
            </h3>
            <p className="text-xs text-gray-600 mb-4">
              Share your thoughts with other customers
            </p>
            <button
              onClick={() => setShowWriteModal(true)}
              className="w-full bg-white hover:bg-gray-50 text-gray-800 text-xs font-semibold py-2 px-4 rounded border border-gray-300 shadow-xs cursor-pointer transition flex items-center justify-center gap-2"
            >
              <Edit3 className="w-4 h-4 text-[#007185]" />
              <span>Write a customer review</span>
            </button>
          </div>
        </div>

        {/* Right Column: Review feed and interactive filters */}
        <div className="lg:col-span-8">
          {/* Read reviews that mention topic tags */}
          <div className="mb-4">
            <div className="text-xs font-bold text-gray-800 mb-2">
              Reviews that mention:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {topics.map(t => (
                <button
                  key={t}
                  onClick={() => setTopicFilter(t)}
                  className={`text-xs px-2.5 py-1 rounded font-medium transition cursor-pointer ${
                    topicFilter === t
                      ? 'bg-[#131921] text-white shadow-xs'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Filter and Search Bar for Reviews */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-gray-50 p-3 rounded border border-gray-200 mb-6 text-xs">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-1.5 cursor-pointer text-gray-700 font-medium">
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                  className="rounded accent-[#e77600]"
                />
                <span>Verified Purchases Only</span>
              </label>

              {starFilter && (
                <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-semibold flex items-center gap-1">
                  <span>Filtered: {starFilter} Star</span>
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setStarFilter(null)} />
                </span>
              )}
            </div>

            <div className="relative w-full sm:w-48">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchReviewText}
                onChange={(e) => setSearchReviewText(e.target.value)}
                placeholder="Search reviews..."
                className="w-full pl-8 pr-2 py-1 text-xs border border-gray-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-[#e77600]"
              />
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-6">
            {filteredReviews.length === 0 ? (
              <div className="p-6 text-center text-xs text-gray-500 bg-white border border-gray-200 rounded">
                No customer reviews match your active filters. Try clearing your filters.
              </div>
            ) : (
              filteredReviews.map((rev) => (
                <div key={rev.id} className="border-b border-gray-200 pb-6 text-xs">
                  {/* Author Row */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-bold text-xs">
                      {rev.author.substring(0, 2).toUpperCase()}
                    </div>
                    <span className="font-semibold text-gray-900 text-sm">{rev.author}</span>
                  </div>

                  {/* Rating Stars and Review Title */}
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex text-[#de7921]">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < rev.rating ? 'fill-[#de7921]' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <h4 className="font-bold text-sm text-[#0f1111]">{rev.title}</h4>
                  </div>

                  {/* Date and Country */}
                  <div className="text-gray-500 text-[11px] mb-1">
                    {rev.date}
                  </div>

                  {/* Verified Purchase Tag */}
                  {rev.variantInfo && (
                    <div className="text-[11px] text-gray-600 mb-2">
                      <span className="text-[#c45500] font-bold">Verified Purchase</span>
                      <span className="mx-1">|</span>
                      <span>{rev.variantInfo.replace('| Verified Purchase', '')}</span>
                    </div>
                  )}

                  {/* Review Body */}
                  <p className="text-gray-800 leading-relaxed mb-3 text-xs sm:text-sm">
                    {rev.content}
                  </p>

                  {/* Helpful Button & Report */}
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="text-gray-500">
                      {rev.helpfulCount > 0 ? `${rev.helpfulCount} people found this helpful` : 'Helpful?'}
                    </span>
                    <button
                      onClick={() => handleHelpfulClick(rev.id)}
                      className={`px-3 py-1 rounded border text-xs font-medium cursor-pointer transition flex items-center gap-1 ${
                        helpfulMap[rev.id]
                          ? 'bg-blue-50 border-blue-300 text-[#007185]'
                          : 'bg-white hover:bg-gray-50 border-gray-300 text-gray-800'
                      }`}
                    >
                      <ThumbsUp className="w-3 h-3" />
                      <span>{helpfulMap[rev.id] ? 'Helpful' : 'Helpful'}</span>
                    </button>
                    <span className="hover:text-[#007185] hover:underline cursor-pointer text-[11px]">
                      Report
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Write a Review Modal */}
      {showWriteModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-lg w-full p-6 shadow-2xl border border-gray-200">
            <h3 className="font-bold text-base text-[#0f1111] mb-2">
              Create Review: Sony WH-1000XM5
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Your overall rating:
            </p>

            {/* Star Selector */}
            <div className="flex items-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setNewRating(star)}
                  className="p-1 cursor-pointer"
                >
                  <Star
                    className={`w-7 h-7 ${
                      star <= newRating ? 'fill-[#de7921] text-[#de7921]' : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
              <span className="text-xs font-bold text-gray-700 ml-2">{newRating} Stars</span>
            </div>

            <form onSubmit={handleWriteSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Your Name</label>
                <input
                  type="text"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  className="w-full text-xs p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#e77600]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Add a headline</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="What's most important to know?"
                  className="w-full text-xs p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#e77600]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Add a written review</label>
                <textarea
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="What did you like or dislike? What did you use this product for?"
                  rows={4}
                  className="w-full text-xs p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#e77600]"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowWriteModal(false)}
                  className="px-4 py-1.5 text-xs text-gray-600 hover:text-black font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#ffd814] hover:bg-[#f7ca00] text-black text-xs font-semibold px-6 py-2 rounded-full shadow-xs border border-[#fcd200] cursor-pointer flex items-center gap-1.5"
                >
                  {writeSubmitted ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-800" />
                      <span>Review Published!</span>
                    </>
                  ) : (
                    <span>Submit Review</span>
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
