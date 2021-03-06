import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { BsSearch } from 'react-icons/bs';

import { checkedPersonTypeToCallApiOfStates } from '~/utils/checkedPersonTypeToCallApiOfStates';
import { api } from '~/services/api/config';

import { PersonTypeProps, usePersonsFilter } from '~/hooks/PersonsFilter';

import { Input, MultiplesStates, ProfessionalsFunctions } from '~/components';

import * as S from './styles';

type StatesProps = {
  uf: string;
  name: string;
};

type FunctionsOfJobProps = {
  id: number;
  name: string;
};

export function PersonsFilter() {
  const router = useRouter();

  const [listStates, setListStates] = useState<StatesProps[]>([]);
  const [functionsOfJob, setFunctionsOfJob] = useState<FunctionsOfJobProps[]>(
    []
  );

  const {
    state,
    setState,
    timeSociety,
    setTimeSociety,
    checkedPersonType,
    checkedPersonStatus,
    setCheckedPersonType,
    professionalFunctions,
    setCheckedPersonStatus,
    customTimeSocietyStart,
    checkPersonStatusActive,
    customTimeSocietyFinish,
    setProfessionalFunctions,
    setCustomTimeSocietyStart,
    checkedProfessionalStatus,
    setCustomTimeSocietyFinish,
    setCheckedProfessionalStatus,
    checkProfessionalStatusActive,
  } = usePersonsFilter();

  useEffect(() => {
    if (checkedPersonType) {
      try {
        api
          .get(
            `/states?partnerTypeId=${checkedPersonTypeToCallApiOfStates(
              String(checkedPersonType)
            )}`
          )
          .then((response) => {
            setListStates(response.data.states);
          });
      } catch (error) {
        throw new Error('Erro ao listar os Estados');
      }
    }

    if (checkedProfessionalStatus) {
      try {
        api.get('/functions').then((response) => {
          setFunctionsOfJob(response.data.functions);
        });
      } catch (error) {
        throw new Error('Erro ao listar as funções de trabalho.');
      }
    }
  }, [checkedPersonType, checkedProfessionalStatus]);

  useEffect(() => {
    if (timeSociety === undefined) {
      setTimeSociety('custom');
    }
  }, [setTimeSociety, timeSociety]);

  async function handleSetPersonType(value: PersonTypeProps) {
    await router.push({
      query: { filterType: router.query.filterType, typePerson: value },
    });

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

    setState([]);
    setTimeSociety('');
    setProfessionalFunctions([]);
    setCustomTimeSocietyStart('');
    setCustomTimeSocietyFinish('');

    setCheckedPersonType(value);
  }

  async function handleSetStatusActive(value: boolean) {
    await router.push({
      query: {
        ...router.query,
        isactive: value,
      },
    });

    setCheckedPersonStatus({
      ...checkedPersonStatus,
      active: value,
    });
  }

  async function handleSetStatusPending(value: boolean) {
    await router.push({
      query: {
        ...router.query,
        isPending: value,
      },
    });

    setCheckedPersonStatus({
      ...checkedPersonStatus,
      pending: value,
    });
  }

  async function handleSetStatusExpired(value: boolean) {
    await router.push({
      query: {
        ...router.query,
        isExpired: value,
      },
    });

    setCheckedPersonStatus({
      ...checkedPersonStatus,
      expired: value,
    });
  }

  async function handleSetProfessionalAccredited(value: boolean) {
    await router.push({
      query: {
        ...router.query,
        isAccredited: value,
      },
    });

    setCheckedProfessionalStatus({
      ...checkedProfessionalStatus,
      accredited: value,
    });
  }

  async function handleSetProfessionalPending(value: boolean) {
    await router.push({
      query: {
        ...router.query,
        isPending: value,
      },
    });

    setCheckedProfessionalStatus({
      ...checkedProfessionalStatus,
      pending: value,
    });
  }

  async function handleSetProfessionalExpired(value: boolean) {
    await router.push({
      query: {
        ...router.query,
        isExpired: value,
      },
    });

    setCheckedProfessionalStatus({
      ...checkedProfessionalStatus,
      expired: value,
    });
  }

  async function handleSetTimeSociety(value: string | string[] | undefined) {
    await router.push({
      query: {
        ...router.query,
        societyStart: '',
        societyFinish: '',
        timeSociety: value,
      },
    });

    setCustomTimeSocietyStart('');
    setCustomTimeSocietyFinish('');

    setTimeSociety(value);
  }

  function handleSetState(value: string) {
    if (!state.includes(value) && value !== '') {
      setState([...state, value]);
    }

    router.push({
      query: {
        ...router.query,
        UF: [...state, value].join('-'),
      },
    });
  }

  function handleSetProfessionalsFunctions(value: string) {
    if (!professionalFunctions.includes(value) && value !== '') {
      setProfessionalFunctions([...professionalFunctions, value]);
    }

    router.push({
      query: {
        ...router.query,
        professions: [...professionalFunctions, value].join('-'),
      },
    });
  }

  async function handleSetCustomTimeSocietyStart(
    value: Date | string | string[] | undefined
  ) {
    await router.push({
      query: {
        ...router.query,
        societyStart: String(value),
      },
    });

    setCustomTimeSocietyStart(value);
  }

  async function handleSetCustomTimeSocietyFinish(
    value: Date | string | string[] | undefined
  ) {
    await router.push({
      query: {
        ...router.query,
        societyFinish: String(value),
      },
    });

    setCustomTimeSocietyFinish(value);
  }

  return (
    <S.Container>
      <S.Wrapper as="form">
        <S.ContentDivider>
          <h3>Tipo</h3>
          <S.RadioGroup
            defaultValue=""
            value={String(checkedPersonType)}
            onChange={(value) =>
              handleSetPersonType(
                value as '' | 'socios' | 'profissionais' | 'competidores'
              )
            }
          >
            <S.Stack spacing={2} direction="column">
              <S.Radio value="socios" colorScheme="green">
                Sócios
              </S.Radio>
              <S.Radio value="profissionais" colorScheme="green">
                Profissionais
              </S.Radio>
              <S.Radio value="competidores" colorScheme="green">
                Competidores
              </S.Radio>
            </S.Stack>
          </S.RadioGroup>
        </S.ContentDivider>

        {checkedPersonType === 'socios' && (
          <>
            <S.ContentDivider>
              <h3>Status</h3>
              <S.Stack spacing={2} direction="column" as="form">
                <S.Checkbox
                  size="md"
                  colorScheme="green"
                  defaultChecked={!!checkedPersonStatus.active}
                  onChange={(e) => handleSetStatusActive(e.target.checked)}
                >
                  Ativo
                </S.Checkbox>

                <S.Checkbox
                  size="md"
                  colorScheme="green"
                  defaultChecked={!!checkedPersonStatus.pending}
                  onChange={(e) => handleSetStatusPending(e.target.checked)}
                >
                  Pendente
                </S.Checkbox>

                <S.Checkbox
                  size="md"
                  colorScheme="green"
                  defaultChecked={!!checkedPersonStatus.expired}
                  onChange={(e) => handleSetStatusExpired(e.target.checked)}
                >
                  Expirado
                </S.Checkbox>
              </S.Stack>
            </S.ContentDivider>

            {checkPersonStatusActive && (
              <>
                <S.ContentDivider>
                  <h3>Tempo de Sociedade</h3>
                  <S.Select
                    size="sm"
                    bg="white"
                    defaultValue=""
                    maxWidth="15rem"
                    value={String(timeSociety)}
                    onChange={(e) => handleSetTimeSociety(e.target.value)}
                  >
                    <option value="timeSelect">Todo período</option>
                    <option value="week">últimos 7 dias</option>
                    <option value="month">últimos 30 dias</option>
                    <option value="quarter">últimos 90 dias</option>
                    <option value="1year">+ de 1 ano</option>
                    <option value="2year">+ de 2 anos</option>
                    <option value="custom">Personalizado</option>
                  </S.Select>

                  <h5>Personalizado</h5>
                  <S.Stack
                    spacing={2}
                    direction={['column', 'column', 'row', 'row']}
                  >
                    <Input
                      title="inicio"
                      type="date"
                      name="inicio"
                      icon={BsSearch}
                      disabled={timeSociety !== 'custom'}
                      value={String(customTimeSocietyStart)}
                      onChange={(e) =>
                        handleSetCustomTimeSocietyStart(e.target.value)
                      }
                    />

                    <Input
                      title="fim"
                      type="date"
                      name="fim"
                      icon={BsSearch}
                      disabled={timeSociety !== 'custom'}
                      value={String(customTimeSocietyFinish)}
                      onChange={(e) =>
                        handleSetCustomTimeSocietyFinish(e.target.value)
                      }
                    />
                  </S.Stack>
                </S.ContentDivider>

                <S.ContentDivider>
                  <h3>Localidades</h3>
                  {state && (
                    <MultiplesStates selectedStates={state as string[]} />
                  )}

                  {listStates && (
                    <S.Select
                      size="sm"
                      bg="white"
                      maxWidth="15rem"
                      placeholder="Selecione um ou mais"
                      onChange={(e) => handleSetState(e.target.value)}
                    >
                      {listStates.map((listState, index) => (
                        <option
                          key={index}
                          value={listState.uf}
                          disabled={state.includes(listState.uf)}
                        >
                          {listState.name} - {listState.uf}
                        </option>
                      ))}
                    </S.Select>
                  )}
                </S.ContentDivider>
              </>
            )}
          </>
        )}

        {checkedPersonType === 'profissionais' && (
          <>
            <S.ContentDivider>
              <h3>Status</h3>
              <S.Stack spacing={2} direction="column">
                <S.Checkbox
                  size="md"
                  colorScheme="green"
                  defaultChecked={!!checkedProfessionalStatus.accredited}
                  onChange={(e) =>
                    handleSetProfessionalAccredited(e.target.checked)
                  }
                >
                  Credenciado
                </S.Checkbox>

                <S.Checkbox
                  size="md"
                  colorScheme="green"
                  defaultChecked={!!checkedProfessionalStatus.pending}
                  onChange={(e) =>
                    handleSetProfessionalPending(e.target.checked)
                  }
                >
                  Pendente
                </S.Checkbox>

                <S.Checkbox
                  size="md"
                  colorScheme="green"
                  defaultChecked={!!checkedProfessionalStatus.expired}
                  onChange={(e) =>
                    handleSetProfessionalExpired(e.target.checked)
                  }
                >
                  Expirado
                </S.Checkbox>
              </S.Stack>
            </S.ContentDivider>

            {checkProfessionalStatusActive && (
              <>
                <S.ContentDivider>
                  <h3>Funções</h3>
                  {professionalFunctions && (
                    <ProfessionalsFunctions
                      selectedProfession={professionalFunctions as string[]}
                    />
                  )}

                  <S.Select
                    size="sm"
                    bg="white"
                    maxWidth="15rem"
                    placeholder="Selecione uma ou mais"
                    onChange={(e) =>
                      handleSetProfessionalsFunctions(e.target.value)
                    }
                  >
                    {functionsOfJob.map((job) => (
                      <option
                        key={job.id}
                        value={job.name}
                        disabled={professionalFunctions.includes(job.name)}
                      >
                        {job.name}
                      </option>
                    ))}
                  </S.Select>
                </S.ContentDivider>

                <S.ContentDivider>
                  <h3>Localidades</h3>
                  {state && (
                    <MultiplesStates selectedStates={state as string[]} />
                  )}

                  {listStates && (
                    <S.Select
                      size="sm"
                      bg="white"
                      maxWidth="15rem"
                      placeholder="Selecione um ou mais"
                      onChange={(e) => handleSetState(e.target.value)}
                    >
                      {listStates.map((listState, index) => (
                        <option
                          key={index}
                          value={listState.uf}
                          disabled={state.includes(listState.uf)}
                        >
                          {listState.name} - {listState.uf}
                        </option>
                      ))}
                    </S.Select>
                  )}
                </S.ContentDivider>
              </>
            )}
          </>
        )}

        {checkedPersonType === 'competidores' && (
          <S.ContentDivider>
            <h3>Ainda não há nada por aqui {':('}</h3>
          </S.ContentDivider>
        )}
      </S.Wrapper>
    </S.Container>
  );
}
