import React from 'react';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbsProps {
  category?: string;
  subCategory?: string;
  itemType?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  category = 'Electronics',
  subCategory = 'Headphones, Earbuds & Accessories',
  itemType = 'Over-Ear Headphones'
}) => {
  return (
    <nav className="flex items-center text-xs text-gray-500 py-2.5 px-4 overflow-x-auto whitespace-nowrap bg-white border-b border-gray-100">
      <span className="hover:text-[#007185] hover:underline cursor-pointer font-medium">{category}</span>
      <ChevronRight className="w-3 h-3 mx-1 text-gray-400 shrink-0" />
      <span className="hover:text-[#007185] hover:underline cursor-pointer">{subCategory}</span>
      <ChevronRight className="w-3 h-3 mx-1 text-gray-400 shrink-0" />
      <span className="hover:text-[#007185] hover:underline cursor-pointer">{itemType}</span>
    </nav>
  );
};
