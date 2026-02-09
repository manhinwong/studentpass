'use client';

import { useState } from 'react';
import { Discount } from '@/types/discount';

interface DiscountCardProps {
  discount: Discount;
}

const categoryColors: Record<string, string> = {
  'Food Delivery': 'bg-orange-100 text-orange-700',
  'Entertainment': 'bg-purple-100 text-purple-700',
  'Cultural': 'bg-pink-100 text-pink-700',
  'Transportation': 'bg-green-100 text-green-700',
  'Shopping': 'bg-yellow-100 text-yellow-700',
  'Wellness': 'bg-teal-100 text-teal-700',
  'Software': 'bg-indigo-100 text-indigo-700',
  'News/Media': 'bg-slate-100 text-slate-700',
};

const categoryIcons: Record<string, string> = {
  'Food Delivery': '🍕',
  'Entertainment': '🎬',
  'Cultural': '🎨',
  'Transportation': '🚗',
  'Shopping': '🛍️',
  'Wellness': '🧘',
  'Software': '💻',
  'News/Media': '📰',
};

export default function DiscountCard({ discount }: DiscountCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="group relative bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-lg hover:border-gray-200 transition-all duration-300 flex flex-col">
      {/* Value Badge */}
      <div className="absolute -top-3 -right-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-md">
        {discount.discountAmount}
      </div>

      {/* Logo/Icon Area */}
      <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform overflow-hidden p-2">
        {discount.logo && !imgError ? (
          <img
            src={discount.logo}
            alt={`${discount.name} logo`}
            className="w-full h-full object-contain"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="text-3xl">{categoryIcons[discount.category] || '🎁'}</span>
        )}
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {discount.name}
      </h3>

      {/* Category Tag */}
      <span
        className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full mb-3 ${
          categoryColors[discount.category] || 'bg-gray-100 text-gray-700'
        }`}
      >
        {discount.category}
      </span>

      {/* Description */}
      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2 flex-grow">
        {discount.description}
      </p>

      {/* Verification Badge */}
      {discount.verificationRequired === 'Yes' && (
        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-4">
          <svg
            className="w-4 h-4 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          <span>Student verification required</span>
        </div>
      )}

      {/* CTA Button */}
      <a
        href={discount.websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full text-center bg-gray-900 hover:bg-gray-800 text-white font-medium py-2.5 px-4 rounded-xl transition-colors mt-auto"
      >
        Get Discount
      </a>
    </div>
  );
}
