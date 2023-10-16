import React from "react";
import { MouseEvent } from "react";

type Transaction = {
  source: string;
  amount: string;
  date: string;
  id: string;
};

export const List = (props: {
  data: [Transaction];
  deleteItem: (id: string) => void;
}) => {
  const { data, deleteItem } = props;

  const deleteHandle = (e: MouseEvent<HTMLElement>) => {
    const deletedId = e.target.id;
    deleteItem(deletedId);
  };

  return (
    <ul id="list">
      {data.length ? (
        data.map((tranaction: Transaction, index: number) => (
          <li key={tranaction.id}>
            {tranaction.source}: {tranaction.amount}EUR on {tranaction.date}
            <button
              id={tranaction.id}
              className="delete-btn"
              onClick={deleteHandle}
            >
              delete
            </button>
          </li>
        ))
      ) : (
        <p>no data</p>
      )}
    </ul>
  );
};
