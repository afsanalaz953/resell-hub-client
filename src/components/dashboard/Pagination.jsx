"use client"

import React from 'react';
import {Pagination} from "@heroui/react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';


const ProductPagination = ({page, total_page}) => {
   
  const router = useRouter();

    const pages = [];
    for (let i = 1; i<= total_page; i++ ) {
        pages.push (i);
    }

   console.log(pages, "pages")
    
    return (
        <div>
<Pagination size="sm">
          <Pagination.Summary>
            {/* CHANGE: Summary খালি ছিল, এখন পেজ নম্বর দেখাচ্ছে */}
           {`Page ${page} of ${total_page}`} 
          </Pagination.Summary>
          <Pagination.Content>
            <Pagination.Item>
              <Pagination.Previous
              isDisabled={page===1}
              // CHANGE: ভেতরের <Link> সরিয়ে onPress দিয়ে router.push করা হয়েছে
              onPress={() => router.push(`/products?page=${page-1}`)}
              >
                <Pagination.PreviousIcon />
                Prev
              </Pagination.Previous>
            </Pagination.Item>
            {pages.map((p) => (
              // CHANGE: <Link> র‍্যাপার সরিয়ে শুধু Pagination.Item ও Link রাখা হয়েছে
              <Pagination.Item key={p}>
                <Pagination.Link 
                  isActive={p === page} 
                  className={`${p === page ? "bg-red-500" : ""}`}
                  // CHANGE: onPress যোগ করে router.push
                  onPress={() => router.push(`/products?page=${p}`)}
                >
                  {p}
                </Pagination.Link>
              </Pagination.Item>
            ))}
            <Pagination.Item>
              <Pagination.Next
              isDisabled={page === total_page}
              // CHANGE: ভেতরের <Link> সরিয়ে onPress
              onPress={() => router.push(`/products?page=${page+1}`)}
              >
                Next
                <Pagination.NextIcon />
              </Pagination.Next>
            </Pagination.Item>
          </Pagination.Content>
        </Pagination>






             {/* <Pagination size="sm">
          <Pagination.Summary>

          </Pagination.Summary>
          <Pagination.Content>
            <Pagination.Item>
              <Pagination.Previous
              isDisabled={page===1}
              >
               <Link className="flex gap-2" href={`/products?page=${page-1}`}>
                <Pagination.PreviousIcon />
                Prev
               </Link>
              </Pagination.Previous>
            </Pagination.Item>
            {pages.map((p) => (
             <Link key={p} href={`/products?page=${p}`}>
              <Pagination.Item >
                <Pagination.Link isActive={p === page} className={`${p === page ? "bg-red-500" : ""}`}>
                  {p}
                </Pagination.Link>
              </Pagination.Item>
             </Link>
            ))}
            <Pagination.Item>
              <Pagination.Next
              isDisabled={page === total_page}
              >
                  <Link className="flex gap-2" href={`/products?page=${page+1}`}>
                Next
                </Link>
                <Pagination.NextIcon />
              </Pagination.Next>
            </Pagination.Item>
          </Pagination.Content>
        </Pagination> */}
        </div>
    );
};

export default ProductPagination;