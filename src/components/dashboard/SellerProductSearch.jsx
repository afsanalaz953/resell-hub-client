
"use client";

import { Search } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const SellerProductSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // ✅ ফিক্স ৩: শুধু search প্যারামিটারের মান নেওয়া
  const searchParamValue = searchParams.get('search') || '';
  const [searchTerm, setSearchTerm] = useState(searchParamValue);

  // ✅ ফিক্স ৪: URL বদলালে ইনপুট আপডেট হবে (ব্যাক/ফরওয়ার্ড)
  useEffect(() => {
    setSearchTerm(searchParamValue);
  }, [searchParamValue]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const params = new URLSearchParams(searchParams);
    if (value) params.set('search', value);
    else params.delete('search');

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="w-full m-10 relative flex items-center bg-white border border-slate-200 rounded-2xl shadow-sm focus-within:ring-4 focus-within:ring-blue-600/10 focus-within:border-blue-600 transition-all overflow-hidden">
      <div className="pl-5 text-slate-400">
        <Search className="w-5 h-5" />
      </div>
      <input
        value={searchTerm}
        onChange={handleSearch}
        type="text"
        placeholder="Search for products"
        className="flex-1 h-14 px-4 outline-none bg-transparent text-slate-700 placeholder:text-slate-400"
      />
    </div>
  );
};

export default SellerProductSearch;



// "use client";

// import { Search } from "lucide-react";
// import { useRouter, useSearchParams } from "next/navigation";

// import { useState } from "react";

// const SearchBar = () => {
//   const [search, setSearch] = useState();
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   // console.log(searchParams);

//   const handleSearch = () => {
//     const params = new URLSearchParams(searchParams.toString())
//     // ?filter= ?searchTerm=node
//     if (search) {
//       params.set("searchTerm", search)
//     } else {
//       params.delete("searchTerm")
//     }
//     router.push(`/tutors?${params.toString()}`)


//   }

//   return (
//     <div className="relative flex items-center bg-white border border-slate-200 rounded-2xl shadow-sm focus-within:ring-4 focus-within:ring-blue-600/10 focus-within:border-blue-600 transition-all overflow-hidden">

//       <div className="pl-5 text-slate-400">
//         <Search className="w-5 h-5" />
//       </div>

//       <input
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         type="text"
//         placeholder="Search for tutors (e.g. Next.js, Web Design...)"
//         className="flex-1 h-14 px-4 outline-none bg-transparent text-slate-700 placeholder:text-slate-400"
//       />

//       <button
//         onClick={handleSearch}
//         className="h-10 px-6 mr-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"

//       >
//         Search
//       </button>
//     </div>
//   );
// };

// export default SearchBar;