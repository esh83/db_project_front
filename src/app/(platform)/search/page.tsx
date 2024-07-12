import SearchForm from "./components/SearchForm";
import SearchResult from "./components/SearchResult";

export default function SearchPage({ searchParams }: any) {
  if (!Object.entries(searchParams).length) return <SearchForm />;
  else return <SearchResult searchParams={searchParams} />;
}
