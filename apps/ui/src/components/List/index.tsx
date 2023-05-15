import { Item } from '../Item';
import styles from './styles.module.css';

export interface ListProps {
  items: { _id: string; name: string }[];
  onDelete: (id: string) => void;
  toFormer?: (id: string) => string;
}

export const List = (props: ListProps) => {
  const { items, onDelete, toFormer } = props;

  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <Item
          key={item._id}
          name={item.name}
          onDelete={() => onDelete(item._id)}
          to={toFormer && toFormer(item._id)}
        />
      ))}
    </ul>
  );
};
