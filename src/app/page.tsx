'use client';

import { useState } from 'react';
import { discounts } from '@/data/discounts';
import { Category } from '@/types/discount';
import DiscountCard from '@/components/DiscountCard';
import FilterButtons from '@/components/FilterButtons';
import SubmitDiscountModal from '@/components/SubmitDiscountModal';

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<Category | 'All'>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredDiscounts = discounts.filter((discount) => {
    if (activeFilter === 'All') return discount.status === 'Active';
    return discount.category === activeFilter && discount.status === 'Active';
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <img src="/logos/studentpass-logo.svg" alt="StudentPass logo" className="w-8 h-8 object-contain translate-y-0.5" />
              <h1 className="text-xl font-bold text-gray-900">StudentPass</h1>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Submit a Discount
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Student Discounts,{' '}
            <span className="text-emerald-600">Simplified</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            The best student discounts for food, travel, entertainment, and more.
            All in one place, all verified.
          </p>

          {/* Filter Buttons */}
          <FilterButtons
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Results Count */}
        <div className="mb-8">
          <p className="text-sm text-gray-500">
            Showing{' '}
            <span className="font-semibold text-gray-900">
              {filteredDiscounts.length}
            </span>{' '}
            {filteredDiscounts.length === 1 ? 'discount' : 'discounts'}
            {activeFilter !== 'All' && (
              <span>
                {' '}
                in <span className="font-semibold">{activeFilter}</span>
              </span>
            )}
          </p>
        </div>

        {/* Discount Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDiscounts.map((discount) => (
            <DiscountCard key={discount.id} discount={discount} />
          ))}
        </div>

        {/* Empty State */}
        {filteredDiscounts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No discounts found
            </h3>
            <p className="text-gray-600">
              Try selecting a different category or check back later.
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              © 2024 StudentPass. All discounts verified.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
                About
              </a>
              <a
                href="#"
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
                Contact
              </a>
              <a
                href="#"
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
                Privacy
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Submit Discount Modal */}
      <SubmitDiscountModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
