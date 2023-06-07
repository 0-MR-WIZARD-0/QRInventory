import styles from "./view.edit.cabinet.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Cabinet } from "types/Cabinet";
import { useAppDispatch } from "redux/store";
import { useAppSelector } from "helpers/redux";
import { MainViewRoutes, RoutesEnum } from "types/Routes";
import { editCabinetThunk, fetchCabinetThunk } from "redux/actions/cabinets.actions";
import { LoadingTransitionComponent } from "components/Basic/Loader";
import ProtectedComponent from "components/Protected/Component";
import { Roles, User } from "types/User";
import EditPageWrapper from "components/Complex/Wrappers/EditPageWrapper";
import DropList from "components/Complex/DropList";
import { Teacher } from "types/Teacher";
import { Item } from "types/Item";
import { cabinetValidation } from "validation";
import { useForm, FormProvider } from "react-hook-form";
import Input from "components/Basic/Input";
import { searchItemThunk } from "redux/actions/items.actions";
import { searchUserThunk } from "redux/actions/users.actions";
import debounce from "lodash.debounce";
import { formatItemsJSX, formatTeachersJSX, PreviewItem, PreviewUser } from "components/Complex/DropList/Categorized/categorized";
import { useObserver } from "helpers/hooks";
import { compareObjects, filterObjects } from "helpers/functions";

const teacherPerPage = 4;
const itemPerPage = 4;

const CabinetComponent: React.FC<Cabinet> = ({ cabinetNumber, id, items, teachers }) => {
  const navigate = useNavigate();
  const methods = useForm<{ cabinetNumber: string }>({ defaultValues: { cabinetNumber } });
  const institution = useAppSelector(state => state.institution);
  const dispatch = useAppDispatch();
  const { userData } = useAppSelector(state => state.user);
  useEffect(() => {
    if (userData && userData.role === Roles.teacher && !teachers.some(t => t.id === userData.id)) return navigate(RoutesEnum.main);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  // здесь уже добавленные, сюда добавлять новых учителей/предметы для изменения в БД
  const [dropDownState, setDropDownState] = useState<{ user: Teacher[]; item: Item[] }>({ user: teachers, item: items });
  const changeUsers = (user: PreviewUser, add: boolean) =>
    setDropDownState(dds => ({ ...dds, user: add ? [...dds.user, user] : dds.user.filter(ddu => ddu.id !== user.id) }));
  const changeItem = (item: PreviewItem, add: boolean) =>
    setDropDownState(dds => ({ ...dds, item: add ? [...dds.item, item] : dds.item.filter(ddi => ddi.id !== item.id) }));
  // здесь данные поиска
  type SearchDropDown = {
    user: { data: Teacher[]; page: number; searchVal: string };
    item: { data: Item[]; page: number; searchVal: string };
  };
  const [searchDropDownState, setSearchDropDownState] = useState<SearchDropDown>({
    user: { data: [], page: 0, searchVal: "" },
    item: { data: [], page: 0, searchVal: "" }
  });

  const onLastTeacherView = async (entires: IntersectionObserverEntry[]) => {
    if (searchDropDownState.user.page === -1) return;
    else {
      try {
        if (entires[0].isIntersecting) {
          if (!institution.id) throw new Error("Учреждение не выбрано, (id empty) developer-related issue");
          let res = await dispatch(
            searchUserThunk({
              searchVal: searchDropDownState.user.searchVal,
              institution: institution.id,
              skip: searchDropDownState.user.page * teacherPerPage,
              take: teacherPerPage
            })
          );

          if ((res.payload as User[]).length === 0) {
            throw new Error("Учителя закончились");
          }

          setSearchDropDownState(sdds => ({
            ...sdds,
            user: { ...sdds.user, data: [...sdds.user.data, ...(res.payload as User[])], page: sdds.user.page + 1 }
          }));
        }
      } catch (error) {
        setSearchDropDownState(sdds => ({ ...sdds, user: { ...sdds.user, page: -1 } }));
      }
    }
  };
  const onLastItemView = async (entires: IntersectionObserverEntry[]) => {
    if (searchDropDownState.item.page === -1) return;
    else {
      try {
        if (entires[0].isIntersecting) {
          if (!institution.id) throw new Error("Учреждение не выбрано, (id empty) developer-related issue");
          let res = await dispatch(
            searchUserThunk({
              searchVal: searchDropDownState.item.searchVal,
              institution: institution.id,
              skip: searchDropDownState.item.page * itemPerPage,
              take: itemPerPage
            })
          );

          if ((res.payload as User[]).length === 0) {
            throw new Error("Предметы закончились");
          }

          setSearchDropDownState(sdds => ({
            ...sdds,
            item: { ...sdds.item, data: [...sdds.item.data, ...(res.payload as Item[])], page: sdds.item.page + 1 }
          }));
        }
      } catch (error) {
        setSearchDropDownState(sdds => ({ ...sdds, item: { ...sdds.item, page: -1 } }));
      }
    }
  };

  const teacherDropdownRef = useRef<HTMLDivElement>(null);
  const [lastTeacherRef] = useObserver(onLastTeacherView);

  const itemDropdownRef = useRef<HTMLDivElement>(null);
  const [lastItemRef] = useObserver(onLastItemView);

  const onSearch = debounce(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!institution.id) return console.log("Учреждение не выбрано, (id empty) developer-related issue");
      const searchVal = e.target.value;
      const category = e.target.name;

      if (
        (searchDropDownState.item.searchVal === searchVal && searchDropDownState.item.page === -1) ||
        (searchDropDownState.user.searchVal === searchVal && searchDropDownState.user.page === -1)
      )
        return;

      setSearchDropDownState(sdds => ({ ...sdds, [category]: { ...sdds[category as keyof SearchDropDown], searchVal } }));

      let res =
        category === "user"
          ? await dispatch(searchUserThunk({ searchVal, institution: institution.id, skip: 0, take: teacherPerPage }))
          : await dispatch(searchItemThunk({ article: searchVal, institution: institution.id, skip: 0, take: itemPerPage }));
      setSearchDropDownState(sdds => ({ ...sdds, [category]: { ...sdds[category as keyof SearchDropDown], data: res.payload, page: 1 } }));
    },
    1000,
    { leading: true, trailing: false }
  );

  const onSubmit = methods.handleSubmit(async data => {
    await dispatch(
      editCabinetThunk({
        id,
        cabinetNumber: data.cabinetNumber,
        items: dropDownState.item.map(i => i.id),
        teachers: dropDownState.user.map(u => u.id)
      })
    );
    return navigate(`/${MainViewRoutes.cabinets}`);
  });

  return (
    <EditPageWrapper
      onSubmit={onSubmit}
      component={
        <div className={styles.wrapper}>
          <h3>Редактирование кабинета</h3>
          <div>
            <div>
              <FormProvider {...methods}>
                <Input {...cabinetValidation} name='cabinetNumber' />
              </FormProvider>
            </div>
            <div>
              <ProtectedComponent
                component={
                  <DropList
                    name={
                      <span>
                        Учителя <b>({dropDownState.user.length})</b>
                      </span>
                    }
                    inputName='user'
                    onChange={onSearch}
                    observerRef={teacherDropdownRef}
                    options={formatTeachersJSX(
                      filterObjects<PreviewUser>([
                        ...(searchDropDownState.user ?? []).data.map((sddsu, i, arr) => {
                          return { ...sddsu, existing: false } as PreviewUser;
                        }),
                        ...(dropDownState.user ?? []).map(ddsu => ({ ...ddsu, existing: true } as PreviewUser))
                      ])
                        .sort(compareObjects)
                        .map((el, i, arr) => {
                          if (!el.existing) {
                            if ((arr[i + 1] === undefined && arr.length === i + 1) || arr[i + 1].existing === true) {
                              return { ...el, lastElementRef: lastTeacherRef };
                            } else return { ...el, lastElementRef: undefined };
                          } else {
                            return { ...el, lastElementRef: undefined };
                          }
                        }),
                      true,
                      changeUsers
                    )}
                    enableEdit={true}
                  />
                }
              />
              <DropList
                name={
                  <span>
                    Предметы <b>({dropDownState.item.length})</b>
                  </span>
                }
                inputName='item'
                onChange={onSearch}
                observerRef={itemDropdownRef}
                options={formatItemsJSX(
                  filterObjects<PreviewItem>([
                    ...(searchDropDownState.item ?? []).data.map((sddsi, i, arr) => ({ ...sddsi, existing: false } as PreviewItem)),
                    ...(dropDownState.item ?? []).map(ddsi => ({ ...ddsi, existing: true } as PreviewItem))
                  ])
                    .sort(compareObjects)
                    .map((el, i, arr) => {
                      if (!el.existing) {
                        if ((arr[i + 1] === undefined && arr.length === i + 1) || arr[i + 1].existing === true) {
                          return { ...el, lastElementRef: lastItemRef };
                        } else return { ...el, lastElementRef: undefined };
                      } else {
                        return { ...el, lastElementRef: undefined };
                      }
                    }),
                  true,
                  changeItem
                )}
                enableEdit={true}
              />
            </div>
          </div>
        </div>
      }
    />
  );
};

const EditCabinet: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { data } = useAppSelector(state => state.viewCabinets);
  const [pageCabinetData, setPageCabinetData] = useState<Cabinet | null | undefined>();
  useEffect(() => {
    (async () => {
      try {
        if (!id) return navigate(`/${MainViewRoutes.cabinets}`);
        let existing = data?.find(e => e.id === id);
        if (existing) return setPageCabinetData(existing);
        else {
          let res = await dispatch(fetchCabinetThunk({ id }));

          if (res.meta.requestStatus === "rejected") {
            return navigate(`/${MainViewRoutes.cabinets}`);
          }

          return setPageCabinetData(res.payload);
        }
      } catch (error) {
        return setPageCabinetData(null);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (pageCabinetData === undefined) return <LoadingTransitionComponent />;
  if (pageCabinetData === null) return <b>Произошла ошибка при загрузке кабинета или он не найден.</b>;
  return <CabinetComponent {...pageCabinetData} />;
};

export default EditCabinet;
