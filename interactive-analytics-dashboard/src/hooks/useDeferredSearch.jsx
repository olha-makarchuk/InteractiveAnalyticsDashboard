import { useDeferredValue, useMemo } from "react";

export default function useDeferredSearch(data, searchTerm, key) {
  const deferredSearchTerm = useDeferredValue(searchTerm);
  const isPending = searchTerm !== deferredSearchTerm;

  const filteredData = useMemo(() => {
    if (!deferredSearchTerm) return [];

    const term = deferredSearchTerm.toLowerCase();

    return data
      .filter((item) =>
        item[key].toLowerCase().includes(term)
      )
      .slice(0, 10);
  }, [data, deferredSearchTerm, key]);

  const highlightMatch = (text) => {
    if (!deferredSearchTerm) return text;

    const regex = new RegExp(`(${deferredSearchTerm})`, "gi");

    return text.split(regex).map((part, i) =>
      regex.test(part) ? <mark key={i}>{part}</mark> : part
    );
  };

  return {
    filteredData,
    isPending,
    highlightMatch,
  };
}
