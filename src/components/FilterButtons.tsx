'use client';

import { Category, CATEGORIES } from '@/types/discount';

interface FilterButtonsProps {
  activeFilter: Category | 'All';
  onFilterChange: (filter: Category | 'All') => void;
}

export default function FilterButtons({
  activeFilter,
  onFilterChange,
}: FilterButtonsProps) {
  const filters: (Category | 'All')[] = ['All', ...CATEGORIES];

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            activeFilter === filter
              ? 'bg-gray-900 text-white shadow-md'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
