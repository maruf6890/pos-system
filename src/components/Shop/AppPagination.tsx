"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface AppPaginationProps {
  totalPages: number;
  noOfSiblings?: number;
}

export default function AppPagination({
  totalPages,
  noOfSiblings = 1,
}: AppPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const dot = "...";
  const pages: (string | number)[] = [];

  const leftSibling = Math.max(1, currentPage - noOfSiblings);
  const rightSibling = Math.min(totalPages, currentPage + noOfSiblings);
  const showLeftDots = leftSibling > 2;
  const showRightDots = rightSibling < totalPages - 1;

  if (leftSibling > 1) {
    pages.push(1);
  }

  if (showLeftDots) {
    pages.push(dot);
  } else if (leftSibling > 1) {
    for (let i = 2; i < leftSibling; i++) {
      pages.push(i);
    }
  }

  for (let i = leftSibling; i <= rightSibling; i++) {
    if (i !== 1 || pages.length === 0) {
      pages.push(i);
    }
  }

  if (showRightDots) {
    pages.push(dot);
  } else if (rightSibling < totalPages) {
    for (let i = rightSibling + 1; i < totalPages; i++) {
      pages.push(i);
    }
  }

  // Always include last page if it's not in the right siblings
  if (rightSibling < totalPages) {
    pages.push(totalPages);
  }

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous Button */}
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                goToPage(currentPage - 1);
              }}
            />
          </PaginationItem>
        )}

        {/* Pages */}
        {pages.map((page, idx) => {
          if (page === dot) {
            return (
              <PaginationItem key={`dot-${idx}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={page}>
              <PaginationLink
                className={
                  page === currentPage ? "bg-[#e51e5a] text-white" : ""
                }
                href="#"
                isActive={page === currentPage}
                onClick={(e) => {
                  e.preventDefault();
                  goToPage(Number(page));
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {/* Next Button */}
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                goToPage(currentPage + 1);
              }}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
