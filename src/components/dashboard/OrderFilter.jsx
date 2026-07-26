// components/OrderFilter.jsx
'use client';

import { Button, ButtonGroup } from '@heroui/react';

export default function OrderFilter({ currentFilter, onFilterChange }) {
  const filters = [
    { key: 'all', label: 'All' },
    { key: 'pending', label: 'Pending' },
    { key: 'delivered', label: 'Delivered' },
    { key: 'canceled', label: 'Canceled' },
  ];

  return (
    <ButtonGroup variant="flat" className="mb-4">
      {filters.map(({ key, label }) => (
        <Button
          key={key}
          color={currentFilter === key ? 'primary' : 'default'}
          onPress={() => onFilterChange(key)}
        >
          {label}
        </Button>
      ))}
    </ButtonGroup>
  );
}