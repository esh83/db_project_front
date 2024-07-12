"use client";
import { useSearchParams } from "next/navigation";
import SearchForm from "./components/SearchForm";
import SearchResult from "./components/SearchResult";

export default function SearchPage() {
  const searchParams = useSearchParams();
  if (!searchParams.size) return <SearchForm />;
  else return <SearchResult searchParams={searchParams} />;
}
