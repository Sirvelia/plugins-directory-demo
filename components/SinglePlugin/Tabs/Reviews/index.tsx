'use client';

import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ParsedReview {
    title: string;
    rating: number;
    reviewerName: string;
    reviewerUsername: string;
    reviewerAvatar: string;
    reviewerProfileUrl: string;
    date: string;
    content: string;
}

export const SinglePluginTabsReviews = ({ pluginData }: { pluginData: WordPressPlugin }) => {
    const reviews = parseReviews(pluginData.sections?.reviews || '');

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-[24px] font-[600] leading-[1.2] mb-6">Reviews</h2>
                {reviews.length > 0 ? (
                    <div className="space-y-4">
                        {reviews.map((review, index) => (
                            <ReviewCard key={index} review={review} />
                        ))}
                    </div>
                ) : (
                    <p className="text-neutral-500">No reviews available.</p>
                )}
            </div>
        </div>
    );
};

// Helper function to parse HTML reviews
function parseReviews(htmlString: string): ParsedReview[] {
    if (!htmlString) return [];

    const reviews: ParsedReview[] = [];
    
    // Create a temporary DOM element to parse HTML
    if (typeof window === 'undefined') {
        // Server-side: return empty array or use a server-side parser
        return [];
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const reviewElements = doc.querySelectorAll('.review');

    reviewElements.forEach((reviewEl) => {
        try {
            // Extract title
            const title = reviewEl.querySelector('.review-title')?.textContent?.trim() || 'No title';

            // Extract rating
            const ratingAttr = reviewEl.querySelector('.wporg-ratings')?.getAttribute('data-rating');
            const rating = ratingAttr ? parseInt(ratingAttr, 10) : 0;

            // Extract reviewer info
            const reviewerNameEl = reviewEl.querySelector('.reviewer-name');
            const reviewerName = reviewerNameEl?.textContent?.trim() || 'Anonymous';
            
            // Clean up reviewer name (remove username in parentheses if exists)
            const cleanReviewerName = reviewerName.replace(/\s*\(.*?\)\s*$/, '').trim();
            
            // Extract username
            const reviewerProfileUrl = reviewerNameEl?.getAttribute('href') || '';
            const reviewerUsername = reviewerProfileUrl.split('/').filter(Boolean).pop() || '';

            // Extract avatar
            const reviewerAvatar = reviewEl.querySelector('.avatar')?.getAttribute('src') || '';

            // Extract date
            const date = reviewEl.querySelector('.review-date')?.textContent?.trim() || '';

            // Extract content
            const reviewBody = reviewEl.querySelector('.review-body');
            let content = '';
            
            if (reviewBody) {
                // Extract text from paragraphs within WordPress blocks
                const paragraphs = reviewBody.querySelectorAll('p');
                content = Array.from(paragraphs)
                    .map(p => p.textContent?.trim())
                    .filter(Boolean)
                    .join('\n\n');
            }

            reviews.push({
                title,
                rating,
                reviewerName: cleanReviewerName,
                reviewerUsername,
                reviewerAvatar,
                reviewerProfileUrl,
                date,
                content: content || 'No content',
            });
        } catch (error) {
            console.error('Error parsing review:', error);
        }
    });

    return reviews;
}

// Helper function to render star rating
function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    className={`w-4 h-4 ${
                        star <= rating
                            ? 'fill-yellow-500 text-yellow-500'
                            : 'fill-neutral-200 text-neutral-200'
                    }`}
                />
            ))}
        </div>
    );
}

// Review Card Component
function ReviewCard({ review }: { review: ParsedReview }) {
    return (
        <Card className="p-6">
            <div className="space-y-4">
                {/* Header with title and rating */}
                <div className="space-y-2">
                    <div className="flex items-start justify-between gap-4">
                        <h3 className="text-lg font-semibold text-neutral-900 leading-tight">
                            {review.title}
                        </h3>
                        <StarRating rating={review.rating} />
                    </div>
                </div>

                {/* Reviewer info */}
                <div className="flex items-center gap-3">
                    {review.reviewerAvatar && (
                        <img
                            src={review.reviewerAvatar}
                            alt={review.reviewerName}
                            className="w-10 h-10 rounded-full"
                            loading="lazy"
                        />
                    )}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2 flex-wrap">
                            <span className="text-sm text-neutral-500">By</span>
                            {review.reviewerProfileUrl ? (
                                <a
                                    href={review.reviewerProfileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm font-medium text-neutral-900 hover:text-blue-600 transition-colors"
                                >
                                    {review.reviewerName}
                                </a>
                            ) : (
                                <span className="text-sm font-medium text-neutral-900">
                                    {review.reviewerName}
                                </span>
                            )}
                            {review.reviewerUsername && (
                                <span className="text-xs text-neutral-400">
                                    ({review.reviewerUsername})
                                </span>
                            )}
                        </div>
                        {review.date && (
                            <p className="text-xs text-neutral-500 mt-0.5">{review.date}</p>
                        )}
                    </div>
                </div>

                {/* Review content */}
                <div className="pt-2">
                    <p className="text-neutral-700 leading-relaxed whitespace-pre-line">
                        {review.content}
                    </p>
                </div>
            </div>
        </Card>
    );
}