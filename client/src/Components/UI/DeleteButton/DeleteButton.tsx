interface DeleteButtonProps<Item> {
  openPopup: () => void;
  item: Item;
  getEditingItem: ((item: Item) => void) | undefined;
}

export default function DeleteButton<Item>({ openPopup, item, getEditingItem }: DeleteButtonProps<Item>) {
  function handleClick() {
    openPopup();
    if (getEditingItem) {
      getEditingItem(item);
    }
  }

  return <button className="delete-btn" onClick={handleClick}></button>;
}
