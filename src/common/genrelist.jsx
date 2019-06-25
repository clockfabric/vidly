import React from "react";

const GenreList = props => {
  const {
    items,
    onItemSelect,
    textProperty,
    valueProperty,
    selectedItem
  } = props;
  return (
    <ul className="list-group m-2">
      {items.map(item => (
        <li
          key={item[valueProperty]}
          style={{ cursor: "pointer" }}
          onClick={() => onItemSelect(item)}
          className={
            item === selectedItem ? "list-group-item active" : "list-group-item"
          }
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

GenreList.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

export default GenreList;
