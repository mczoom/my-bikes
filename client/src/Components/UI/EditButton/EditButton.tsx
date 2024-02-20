interface EditButtonProps<Item> {
  openPopup: () => void;
  item: Item;
  getEditingItem: ((item: Item) => void) | undefined;
}

export default function EditButton<Item>({ openPopup, item, getEditingItem }: EditButtonProps<Item>) {
  function handleClick() {
    openPopup();
    if (getEditingItem) {
      getEditingItem(item);
    }
  }

  return <button className="edit-btn" onClick={handleClick}></button>;
}
