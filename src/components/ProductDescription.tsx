'use client';

import React, { useEffect, useState } from 'react';
import DOMPurify from 'isomorphic-dompurify';

interface ProductDescriptionProps {
  description: string;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({ description }) => {
  // Use state to ensure client-side rendering
  const [sanitizedHtml, setSanitizedHtml] = useState('');
  
  useEffect(() => {
    // Sanitize HTML on the client side only
    setSanitizedHtml(DOMPurify.sanitize(description));
  }, [description]);

  // Initial render will be empty, then filled after client-side hydration
  return <p className='text-gray-500' dangerouslySetInnerHTML={{ __html: sanitizedHtml }}></p>;
};

export default ProductDescription;