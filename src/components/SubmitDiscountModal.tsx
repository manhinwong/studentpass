'use client';

import { useState, FormEvent } from 'react';
import { CATEGORIES } from '@/types/discount';

interface SubmitDiscountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Replace with your Formspree form ID (get one free at formspree.io)
const FORMSPREE_ID = 'YOUR_FORMSPREE_ID';

export default function SubmitDiscountModal({ isOpen, onClose }: SubmitDiscountModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        setIsSuccess(true);
        form.reset();
      } else {
        throw new Error('Failed to submit');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl transform transition-all">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="p-6 sm:p-8">
            {isSuccess ? (
              /* Success State */
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Thanks for submitting!</h3>
                <p className="text-gray-600 mb-6">We&apos;ll review your discount and add it to the directory if it meets our criteria.</p>
                <button
                  onClick={handleClose}
                  className="bg-gray-900 hover:bg-gray-800 text-white font-medium py-2.5 px-6 rounded-xl transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              /* Form State */
              <>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Submit a Discount</h2>
                  <p className="text-gray-600 mt-1">Know a student discount we&apos;re missing? Let us know!</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Company/Service Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Company/Service Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="e.g., Spotify, Amtrak, Adobe"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                      Category *
                    </label>
                    <select
                      id="category"
                      name="category"
                      required
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors bg-white"
                    >
                      <option value="">Select a category</option>
                      {CATEGORIES.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Discount Amount */}
                  <div>
                    <label htmlFor="discountAmount" className="block text-sm font-medium text-gray-700 mb-1">
                      Discount Amount *
                    </label>
                    <input
                      type="text"
                      id="discountAmount"
                      name="discountAmount"
                      required
                      placeholder="e.g., 50% off, Free, $4.99/month"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    />
                  </div>

                  {/* Website URL */}
                  <div>
                    <label htmlFor="websiteUrl" className="block text-sm font-medium text-gray-700 mb-1">
                      Website URL *
                    </label>
                    <input
                      type="url"
                      id="websiteUrl"
                      name="websiteUrl"
                      required
                      placeholder="https://example.com/student-discount"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={3}
                      placeholder="Brief description of the discount and what's included..."
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-none"
                    />
                  </div>

                  {/* How to Redeem */}
                  <div>
                    <label htmlFor="howToRedeem" className="block text-sm font-medium text-gray-700 mb-1">
                      How to Redeem
                    </label>
                    <textarea
                      id="howToRedeem"
                      name="howToRedeem"
                      rows={2}
                      placeholder="e.g., Verify with .edu email, Show student ID..."
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-none"
                    />
                  </div>

                  {/* Your Email (optional) */}
                  <div>
                    <label htmlFor="submitterEmail" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Email (optional)
                    </label>
                    <input
                      type="email"
                      id="submitterEmail"
                      name="submitterEmail"
                      placeholder="In case we have questions"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    />
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl">
                      {error}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      'Submit Discount'
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
