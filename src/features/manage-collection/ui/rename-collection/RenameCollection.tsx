import { FC, MouseEvent, useState } from "react";
import "./RenameCollection.scss";
import { collectionApi, ICollection } from "@entities/collection";
import { Input } from "@shared/ui/input";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  collection: ICollection;
}

export const RenameCollection: FC<IProps> = ({ collection }) => {
  const [renameCollection] = collectionApi.useUpdateCollectionMutation();

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(collection.title);

  const handleClick = (event: MouseEvent) => {
    event.stopPropagation();
    setIsEdit(true);
  };

  const handleSave = (value: string) => {
    if (value !== collection.title) {
      renameCollection({ id: collection.id, data: { title: value } });
    }

    setIsEdit(false);
  };

  if (isEdit)
    return (
      <Input
        value={title}
        type="independent"
        bg="light"
        onChange={setTitle}
        onSave={handleSave}
        className="edit-collection__input"
      >
        Название
      </Input>
    );

  return (
    <>
      <h3 className="edit-collection__title">{title}</h3>
      <i
        onClick={handleClick}
        className="edit-collection__trigger fi fi-rr-pencil"
      ></i>
    </>
  );
};
