"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Spinner } from '@heroui/react';
import { motion } from 'framer-motion';

const CategorySidebar = ({ selectedCategory }) => {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/categories`);
        if (!res.ok) throw new Error('Failed to fetch categories');
        const data = await res.json();
        // ডেটা ফরম্যাট ঠিক করা
        let catNames = data;
        if (Array.isArray(data) && data.length > 0 && typeof data[0] === 'object') {
          catNames = data.map(item => item.name || item.category || item);
        }
        setCategories(catNames);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // ক্যাটাগরি ক্লিক করলে URL আপডেট
  const handleCategoryClick = (cat) => {
    const params = new URLSearchParams(window.location.search);
    if (cat) {
      params.set('category', cat);
    } else {
      params.delete('category');
    }
    params.set('page', '1'); // নতুন ক্যাটাগরিতে পেজ ১
    router.push(`?${params.toString()}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="sticky top-4 space-y-2">
      {/* "All" বাটন */}
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          color={!selectedCategory ? 'primary' : 'default'}
          variant={!selectedCategory ? 'solid' : 'bordered'}
          onPress={() => handleCategoryClick('')}
          className="w-full justify-start capitalize"
        >
        {selectedCategory ? 'Clear Filter' : 'All Products'}
        </Button>
      </motion.div>

      {/* বাকি ক্যাটাগরি */}
      {categories.map((cat) => (
        <motion.div
          key={cat}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            color={selectedCategory === cat ? 'primary' : 'default'}
            variant={selectedCategory === cat ? 'solid' : 'bordered'}
            onPress={() => handleCategoryClick(cat)}
            className="w-full justify-start capitalize"
          >
            {cat}
          </Button>
        </motion.div>
      ))}
    </div>
  );
};

export default CategorySidebar;