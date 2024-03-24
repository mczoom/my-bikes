import { BikePart } from 'types/BikePart';
import { Route, Routes } from 'react-router-dom';
import BikePartsList from '../BikePartsList/BikePartsList';

interface BikePartsProps {
  items: any;
  parts: BikePart[];
  onOpen: () => void;
  onOpenEdit: () => void;
  onOpenDelete: () => void;
  getEditingPart?: ((part: BikePart) => void) | undefined;
  getCategory?: (cat: string) => void;
}

export default function BikeParts({
  items,
  parts,
  onOpen,
  onOpenEdit,
  onOpenDelete,
  getEditingPart,
  getCategory,
}: BikePartsProps) {
  return (
    <div className="maintenance__parts-list">
      <ul>
        {items.map((item: any) => (
          <li key={item.id}>
            <Routes>
              <Route
                path={item.link}
                element={
                  <BikePartsList
                    cat={item.link}
                    parts={parts}
                    onOpen={onOpen}
                    onOpenEdit={onOpenEdit}
                    onOpenDelete={onOpenDelete}
                    getCategory={getCategory}
                    getEditingPart={getEditingPart}
                  />
                }
              />
            </Routes>
          </li>
        ))}
      </ul>
    </div>
  );
}
