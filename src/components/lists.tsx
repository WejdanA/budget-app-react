import React from "react";
import { MouseEvent } from "react";
import { useState } from "react";
type transaction = {
  source: string;
  amount: string;
  date: string;
};

export const List = (props: {
  data: [transaction];
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
        data.map((tranaction: transaction, index: number) => (
          <li key={index}>
            {tranaction.source}: {tranaction.amount}EUR on {tranaction.date}
            <button
              id={index + ""}
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
