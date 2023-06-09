import classNames from "classnames";
import Icon from "components/Basic/Icon";
import { Item } from "types/Item";
import { User } from "types/User";
import styles from "./categorized.module.scss";

export type PreviewElement = { existing: boolean; lastElementRef: React.MutableRefObject<any> | undefined };
export type PreviewUser = User & PreviewElement;
export type PreviewItem = Item & PreviewElement;

const TeacherElement: React.FC<PreviewUser & { editing: boolean; changeOptions: (element: PreviewUser, add: boolean) => void }> = props => {
  return (
    <>
      <li ref={props.lastElementRef} className={classNames(styles.dropdownElement)} key={props.id}>
        <div className={styles.wrapper}>
          <div className={styles.wrapperImg}>
            {props.avatarId ? (
              <img src={`${process.env.REACT_APP_API_HOST}/image/${props.avatarId}`} alt={props.fullName} draggable={false} />
            ) : (
              <Icon icon='image' />
            )}
          </div>
          <div className={styles.content}>
            <h4 className={styles.title}>{props.fullName}</h4>
            <p className={styles.info}>{props.email}</p>
          </div>
        </div>
        {props.editing && (
          <div>
            {!props.existing ? (
              <button onClick={() => props.changeOptions(props, true)}>Добавить</button>
            ) : (
              <>
                <button onClick={() => props.changeOptions(props, false)}>Удалить</button>
              </>
            )}
          </div>
        )}
      </li>
      {props.lastElementRef ? <hr></hr> : <></>}
    </>
  );
};

const ItemElement: React.FC<PreviewItem & { editing: boolean; changeOptions: (element: PreviewItem, add: boolean) => void }> = props => {
  return (
    <>
      <li ref={props.lastElementRef} className={classNames(styles.dropdownElement)} key={props.id}>
        <div className={styles.wrapper}>
          <div className={styles.wrapperImg}>
            {props.imageId ? (
              <img src={`${process.env.REACT_APP_API_HOST}/image/${props.imageId}`} alt={props.name} draggable={false} />
            ) : (
              <Icon icon='image' />
            )}
          </div>
          <div className={styles.content}>
            <h4 className={styles.title}>{props.name}</h4>
            <p className={styles.info}>{props.article}</p>
          </div>
        </div>
        {props.editing && (
          <div>
            {!props.existing ? (
              <button onClick={() => props.changeOptions(props, true)}>Добавить</button>
            ) : (
              <>
                <button onClick={() => props.changeOptions(props, false)}>Удалить</button>
              </>
            )}
          </div>
        )}
      </li>
      {props.lastElementRef ? <hr></hr> : <></>}
    </>
  );
};

export const formatTeachersJSX = (teachers: PreviewUser[], editing: boolean, changeOptions: (element: PreviewUser, add: boolean) => void) => {
  return teachers.map(t => <TeacherElement {...t} key={t.id} editing={editing} changeOptions={changeOptions} />);
};
export const formatItemsJSX = (items: PreviewItem[], editing: boolean, changeOptions: (element: PreviewItem, add: boolean) => void) => {
  return items.map(i => <ItemElement {...i} key={i.id} editing={editing} changeOptions={changeOptions} />);
};
