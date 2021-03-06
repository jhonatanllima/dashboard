import { useRouter } from 'next/router';

import {
  useState,
  ReactNode,
  useEffect,
  useContext,
  createContext,
  SetStateAction,
} from 'react';

type TypeFilterProps = {
  children: ReactNode;
};

type TypeFilter = {
  filterType: string | string[] | undefined;
  setFilterType: (props: SetStateAction<string | string[] | undefined>) => void;
};

const FiltersType = createContext({} as TypeFilter);

const FilterTypeProvider = ({ children }: TypeFilterProps) => {
  const router = useRouter();
  const [filterType, setFilterType] = useState<string | string[] | undefined>(
    ''
  );

  useEffect(() => {
    if (router.query.filterType !== '') {
      setFilterType(router.query.filterType);
    }
  }, [router.query.filterType]);

  return (
    <FiltersType.Provider value={{ setFilterType, filterType }}>
      {children}
    </FiltersType.Provider>
  );
};

function useFilterType() {
  const context = useContext(FiltersType);

  if (!context) {
    throw new Error('Filter Type must exist to use Reports Page');
  }

  return context;
}

export { FilterTypeProvider, useFilterType };
