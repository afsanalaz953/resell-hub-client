import React from 'react';

const StockUpdated = async () => {
   await fetch(`/api/products/${id}`, { method: 'PATCH' });
    return (
        <div>
            
        </div>
    );
};

export default StockUpdated;