import { Search } from 'lucide-react';
import React, { useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from 'use-debounce';

export default function TableSearchInput({
  placeholder
}: {
  placeholder?: string;
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const country = searchParams.get('search') || '';
  const [searchTerm, setSearchTerm] = useState(country);
  // debounce the search input
  const [debouncedValue] = useDebounce(searchTerm, 1000);
  const handleSettingSearchParams = useCallback(
    (newSearchValue: string) => {
      // Update the URL with the new search value
      if (
        newSearchValue === '' ||
        newSearchValue === undefined ||
        !newSearchValue
      ) {
        searchParams.delete('search');
        setSearchParams(searchParams);
        return;
      }
      setSearchParams({
        ...Object.fromEntries(searchParams),
        page: '1', // Spread the existing search params
        search: newSearchValue // Update the search value
      });
    },
    [searchParams, setSearchParams]
  );

  React.useEffect(() => {
    handleSettingSearchParams(debouncedValue);
  }, [debouncedValue, handleSettingSearchParams]);
  return (
    <label
      className="flex w-[384px] items-center gap-[1rem] rounded-md border-[1px] border-gray-200 bg-white px-[1rem] dark:border-dark-var3 dark:bg-dark-var2 md:max-w-sm"
      htmlFor=""
    >
      <Search className="h-[40px] text-[#64748B]" />
      <input
        placeholder={placeholder || 'Search country...'}
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        className="h-full w-full border-none outline-none dark:bg-dark-var2 dark:text-white"
      />
    </label>
  );
}
