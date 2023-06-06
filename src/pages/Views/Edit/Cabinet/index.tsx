import styles from "./view.edit.cabinet.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Cabinet } from "types/Cabinet";
import { useAppDispatch } from "redux/store";
import { useAppSelector } from "helpers/redux";
import { MainViewRoutes } from "types/Routes";
import { editCabinetThunk, fetchCabinetThunk } from "redux/actions/cabinets.actions";
import { LoadingTransitionComponent } from "components/Basic/Loader";
import ProtectedComponent from "components/Protected/Component";
import { Roles } from "types/User";
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

const CabinetComponent: React.FC<Cabinet> = ({ cabinetNumber, id, items, teachers }) => {
  const navigate = useNavigate();
  const methods = useForm<{ cabinetNumber: string }>({ defaultValues: { cabinetNumber } });
  const institution = useAppSelector(state => state.institution);
  const dispatch = useAppDispatch();

  // здесь уже добавленные, сюда добавлять новых учителей/предметы для изменения в БД
  const [dropDownState, setDropDownState] = useState<{ user: Teacher[]; item: Item[] }>({ user: teachers, item: items });
  const onChangeDownState = () => setDropDownState(dds => ({ ...dds }));

  // здесь данные поиска
  const [searchDropDownState, setSearchDropDownState] = useState<{ user: Teacher[]; item: Item[] }>({ user: [], item: [] });

  const onSearch = debounce(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!institution.id) return console.log("Учреждение не выбрано, (id empty) developer-related issue");
      const searchVal = e.target.value;
      const category = e.target.name;

      let res =
        category === "user"
          ? await dispatch(searchUserThunk({ searchVal, institution: institution.id, skip: 0, take: 10 }))
          : await dispatch(searchItemThunk({ article: searchVal, institution: institution.id, skip: 0, take: 10 }));
      setSearchDropDownState(sdds => ({ ...sdds, [category]: res.payload }));
    },
    1000,
    { leading: true, trailing: false }
  );

  const formatItems = (items: Item[]) => {
    return items.map(i => ({ key: i.id, name: i.name, value: i.article }));
  };
  const formatTeachers = (teachers: Teacher[]) => {
    return teachers.map(i => ({ key: i.id, name: i.fullName, value: i.email }));
  };

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
              {/* рендер для админа */}
              <ProtectedComponent
                component={
                  <DropList
                    name={
                      <span>
                        Учителя <b>({teachers.length})</b>
                      </span>
                    }
                    inputName='user'
                    onChange={onSearch}
                    options={formatTeachers([...searchDropDownState.user, ...dropDownState.user])}
                    enableSearch={true}
                  />
                }
                roles={[Roles.admin]}
              />
              {/* рендер для учителя */}
              <ProtectedComponent
                component={
                  <DropList
                    name={
                      <span>
                        Учителя <b>({teachers.length})</b>
                      </span>
                    }
                    inputName='user'
                    onChange={onSearch}
                    options={formatTeachers([...searchDropDownState.user, ...dropDownState.user])}
                  />
                }
                roles={[Roles.teacher]}
              />
              <DropList
                name={
                  <span>
                    Предметы <b>({items.length})</b>
                  </span>
                }
                inputName='item'
                onChange={onSearch}
                options={formatItems([...searchDropDownState.item, ...dropDownState.item])}
                enableSearch={true}
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
