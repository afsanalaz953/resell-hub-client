import React from 'react';

const AdminOrderManagePage = async() => {
    const res = await fetch( `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/allorders`,
        { cache: 'no-store' }
      );
const adminorders = await res.json();
        console.log('✅ Fetched adminmanageor:', adminorders);



    return (
        <div>
            Orders manage by admin
        </div>
    );
};

export default AdminOrderManagePage;