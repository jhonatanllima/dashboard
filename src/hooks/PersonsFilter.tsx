import { useRouter } from 'next/router';

import {
  useState,
  ReactNode,
  useEffect,
  useContext,
  createContext,
  SetStateAction,
} from 'react';

import { useTableRender } from './TableRender';

export type PersonTypeProps = '' | 'socios' | 'profissionais' | 'competidores';

type PersonStatusProps = {
  active: boolean;
  pending: boolean;
  expired: boolean;
};

type ProfessionalStatusProps = {
  accredited: boolean;
  pending: boolean;
  expired: boolean;
};

type PersonsFilterProps = {
  children?: ReactNode;
};

type TimeSocietyProps = Date | string | string[] | undefined;

type PersonsFilter = {
  state: string[];
  timeSociety: TimeSocietyProps;
  professionalFunctions: string[];
  checkPersonStatusActive: boolean;
  checkedPersonType?: PersonTypeProps;
  handleResetPersonFilters: () => void;
  checkProfessionalStatusActive: boolean;
  checkedPersonStatus: PersonStatusProps;
  customTimeSocietyStart: TimeSocietyProps;
  customTimeSocietyFinish: TimeSocietyProps;
  checkedProfessionalStatus: ProfessionalStatusProps;
  setState: (props: SetStateAction<string[]>) => void;
  setTimeSociety: (props: SetStateAction<TimeSocietyProps>) => void;
  setProfessionalFunctions: (props: SetStateAction<string[]>) => void;
  setCheckedPersonStatus: (props: SetStateAction<PersonStatusProps>) => void;
  setCustomTimeSocietyStart: (props: SetStateAction<TimeSocietyProps>) => void;
  setCustomTimeSocietyFinish: (props: SetStateAction<TimeSocietyProps>) => void;
  setCheckedPersonType: (
    props: SetStateAction<PersonTypeProps | undefined>
  ) => void;
  setCheckedProfessionalStatus: (
    props: SetStateAction<ProfessionalStatusProps>
  ) => void;
};

const PersonsFilter = createContext({} as PersonsFilter);

const PersonsFilterProvider = ({ children }: PersonsFilterProps) => {
  const router = useRouter();
  const { setSearchedTable } = useTableRender();

  const [state, setState] = useState<string[]>([]);
  const [timeSociety, setTimeSociety] = useState<TimeSocietyProps>('');
  const [checkedPersonType, setCheckedPersonType] = useState<PersonTypeProps>();

  const [professionalFunctions, setProfessionalFunctions] = useState<string[]>(
    []
  );

  const [customTimeSocietyStart, setCustomTimeSocietyStart] =
    useState<TimeSocietyProps>('');
  const [customTimeSocietyFinish, setCustomTimeSocietyFinish] =
    useState<TimeSocietyProps>('');

  const [checkedPersonStatus, setCheckedPersonStatus] =
    useState<PersonStatusProps>({
      active: false,
      pending: false,
      expired: false,
    });

  const checkPersonStatusActive = Object.values(checkedPersonStatus).some(
    (status) => !!status
  );

  const [checkedProfessionalStatus, setCheckedProfessionalStatus] =
    useState<ProfessionalStatusProps>({
      accredited: false,
      pending: false,
      expired: false,
    });

  const checkProfessionalStatusActive = Object.values(
    checkedProfessionalStatus
  ).some((status) => !!status);

  async function handleResetPersonFilters() {
    await router.push({
      query: {
        filterType: router.query.filterType,
      },
    });

    setState([]);
    setTimeSociety('');
    setSearchedTable([]);
    setCheckedPersonType('');
    setProfessionalFunctions([]);
    setCustomTimeSocietyStart('');
    setCustomTimeSocietyFinish('');

    setCheckedPersonStatus({
      active: false,
      pending: false,
      expired: false,
    });

    setCheckedProfessionalStatus({
      accredited: false,
      pending: false,
      expired: false,
    });
  }

  useEffect(() => {
    if (router.query.filterType === 'pessoas') {
      if (router.query.typePerson === 'socios') {
        setCheckedPersonType(router.query.typePerson);

        // Manipule query Status
        if (
          router.query.isactive === 'true' &&
          checkedPersonStatus.active === false
        ) {
          setCheckedPersonStatus({
            ...checkedPersonStatus,
            active: true,
          });
        }

        if (
          router.query.isPending === 'true' &&
          checkedPersonStatus.pending === false
        ) {
          setCheckedPersonStatus({
            ...checkedPersonStatus,
            pending: true,
          });
        }

        if (
          router.query.isExpired === 'true' &&
          checkedPersonStatus.expired === false
        ) {
          setCheckedPersonStatus({
            ...checkedPersonStatus,
            expired: true,
          });
        }

        if (
          router.query.isactive === 'true' &&
          router.query.isPending === 'true' &&
          checkedPersonStatus.active === false &&
          checkedPersonStatus.pending === false
        ) {
          setCheckedPersonStatus({
            ...checkedPersonStatus,
            active: true,
            pending: true,
          });
        }

        if (
          router.query.isactive === 'true' &&
          router.query.isExpired === 'true' &&
          checkedPersonStatus.active === false &&
          checkedPersonStatus.expired === false
        ) {
          setCheckedPersonStatus({
            ...checkedPersonStatus,
            active: true,
            expired: true,
          });
        }

        if (
          router.query.isPending === 'true' &&
          router.query.isExpired === 'true' &&
          checkedPersonStatus.pending === false &&
          checkedPersonStatus.expired === false
        ) {
          setCheckedPersonStatus({
            ...checkedPersonStatus,
            pending: true,
            expired: true,
          });
        }

        if (
          router.query.isactive === 'true' &&
          router.query.isPending === 'true' &&
          router.query.isExpired === 'true' &&
          checkedPersonStatus.active === false &&
          checkedPersonStatus.pending === false &&
          checkedPersonStatus.expired === false
        ) {
          setCheckedPersonStatus({
            ...checkedPersonStatus,
            active: true,
            pending: true,
            expired: true,
          });
        }

        // Manipule query Time Society
        if (router.query.timeSociety !== '' && timeSociety === '') {
          setTimeSociety(router.query.timeSociety);
        }

        // Manipule custom time Society
        if (router.query.societyStart !== '' && customTimeSocietyStart === '') {
          setCustomTimeSocietyStart(router.query.societyStart);
        }

        if (
          router.query.societyFinish !== '' &&
          customTimeSocietyFinish === ''
        ) {
          setCustomTimeSocietyFinish(router.query.societyFinish);
        }

        // Manipule query States
        if (!!router.query.UF && !state.length) {
          const formattedUFToArray = (router.query.UF as string).split('-');

          setState(formattedUFToArray);
        }
      }

      if (router.query.typePerson === 'profissionais') {
        setCheckedPersonType(router.query.typePerson);

        // Manipule query Status
        if (
          router.query.isAccredited === 'true' &&
          checkedProfessionalStatus.accredited === false
        ) {
          setCheckedProfessionalStatus({
            ...checkedProfessionalStatus,
            accredited: true,
          });
        }

        if (
          router.query.isPending === 'true' &&
          checkedProfessionalStatus.pending === false
        ) {
          setCheckedProfessionalStatus({
            ...checkedProfessionalStatus,
            pending: true,
          });
        }

        if (
          router.query.isExpired === 'true' &&
          checkedProfessionalStatus.expired === false
        ) {
          setCheckedProfessionalStatus({
            ...checkedProfessionalStatus,
            expired: true,
          });
        }

        if (
          router.query.isPending === 'true' &&
          router.query.isAccredited === 'true' &&
          checkedProfessionalStatus.accredited === false &&
          checkedProfessionalStatus.pending === false
        ) {
          setCheckedProfessionalStatus({
            ...checkedProfessionalStatus,
            accredited: true,
            pending: true,
          });
        }

        if (
          router.query.isExpired === 'true' &&
          router.query.isAccredited === 'true' &&
          checkedProfessionalStatus.accredited === false &&
          checkedProfessionalStatus.expired === false
        ) {
          setCheckedProfessionalStatus({
            ...checkedProfessionalStatus,
            accredited: true,
            expired: true,
          });
        }

        if (
          router.query.isExpired === 'true' &&
          router.query.isPending === 'true' &&
          checkedProfessionalStatus.pending === false &&
          checkedProfessionalStatus.expired === false
        ) {
          setCheckedProfessionalStatus({
            ...checkedProfessionalStatus,
            pending: true,
            expired: true,
          });
        }

        if (
          router.query.isPending === 'true' &&
          router.query.isAccredited === 'true' &&
          router.query.isExpired === 'true' &&
          checkedProfessionalStatus.accredited === false &&
          checkedProfessionalStatus.pending === false &&
          checkedProfessionalStatus.expired === false
        ) {
          setCheckedProfessionalStatus({
            ...checkedProfessionalStatus,
            accredited: true,
            pending: true,
            expired: true,
          });
        }

        // Manipule query Professions
        if (!!router.query.professions && !professionalFunctions.length) {
          const formattedProfessionalsToArray = (
            router.query.professions as string
          ).split('-');

          setProfessionalFunctions(formattedProfessionalsToArray);
        }

        // Manipule query States
        if (!!router.query.UF && !state.length) {
          const formattedUFToArray = (router.query.UF as string).split('-');

          setState(formattedUFToArray);
        }
      }
    }
  }, [
    state,
    timeSociety,
    router.query.UF,
    checkedPersonStatus,
    router.query.isactive,
    router.query.isExpired,
    router.query.isPending,
    router.query.typePerson,
    router.query.filterType,
    router.query.timeSociety,
    router.query.professions,
    router.query.isAccredited,
    checkedProfessionalStatus,
    professionalFunctions.length,
    router.query.societyStart,
    router.query.societyFinish,
    customTimeSocietyStart,
    customTimeSocietyFinish,
  ]);

  return (
    <PersonsFilter.Provider
      value={{
        state,
        setState,
        timeSociety,
        setTimeSociety,
        checkedPersonType,
        checkedPersonStatus,
        setCheckedPersonType,
        professionalFunctions,
        customTimeSocietyStart,
        setCheckedPersonStatus,
        customTimeSocietyFinish,
        checkPersonStatusActive,
        setProfessionalFunctions,
        handleResetPersonFilters,
        setCustomTimeSocietyStart,
        checkedProfessionalStatus,
        setCustomTimeSocietyFinish,
        setCheckedProfessionalStatus,
        checkProfessionalStatusActive,
      }}
    >
      {children}
    </PersonsFilter.Provider>
  );
};

function usePersonsFilter() {
  const context = useContext(PersonsFilter);

  if (!context) {
    throw new Error(
      'Persons Filter must exist to use filter persons on reports page'
    );
  }

  return context;
}

export { PersonsFilterProvider, usePersonsFilter };
