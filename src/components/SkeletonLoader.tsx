import React from 'react';

interface SkeletonLoaderProps {
  className?: string;
  width?: string;
  height?: string;
  rounded?: boolean;
  lines?: number;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  className = '',
  width = 'w-full',
  height = 'h-4',
  rounded = false,
  lines = 1
}) => {
  const baseClasses = `bg-gray-200 animate-pulse ${width} ${height} ${rounded ? 'rounded-full' : 'rounded'} ${className}`;

  if (lines === 1) {
    return <div className={baseClasses} />;
  }

  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={`${baseClasses} ${index === lines - 1 ? 'w-3/4' : ''}`}
        />
      ))}
    </div>
  );
};

// Pre-built skeleton components for common use cases
export const ProductCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-lg shadow-md p-4 space-y-4">
    <SkeletonLoader height="h-48" rounded />
    <div className="space-y-2">
      <SkeletonLoader height="h-6" width="w-3/4" />
      <SkeletonLoader height="h-4" width="w-1/2" />
      <SkeletonLoader height="h-5" width="w-1/4" />
    </div>
  </div>
);

export const BlogCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <SkeletonLoader height="h-48" className="rounded-none" />
    <div className="p-4 space-y-3">
      <SkeletonLoader height="h-6" width="w-full" />
      <SkeletonLoader lines={3} height="h-4" />
      <div className="flex items-center space-x-2">
        <SkeletonLoader width="w-8" height="h-8" rounded />
        <SkeletonLoader width="w-24" height="h-4" />
      </div>
    </div>
  </div>
);

export const CategoryCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-lg shadow-md p-6 text-center space-y-4">
    <SkeletonLoader width="w-16" height="h-16" rounded className="mx-auto" />
    <SkeletonLoader height="h-6" width="w-3/4" className="mx-auto" />
    <SkeletonLoader height="h-4" width="w-full" />
  </div>
);

export const TableRowSkeleton: React.FC<{ columns: number }> = ({ columns }) => (
  <tr>
    {Array.from({ length: columns }).map((_, index) => (
      <td key={index} className="px-6 py-4">
        <SkeletonLoader height="h-4" />
      </td>
    ))}
  </tr>
);

export default SkeletonLoader;