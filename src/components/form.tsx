import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { List } from "./Lists";

import { v4 as uuidv4 } from "uuid";

type Inputs = {
  source: string;
  amount: string;
  date: string;
};

const FormContainer = (props: {
  formTitle: string;
  updateTotalIncome: (income: number) => void;
  updateTotalExpense: (expense: number) => void;
}) => {
  const { formTitle, updateTotalIncome, updateTotalExpense } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  let [data, setData] = useState([]);
  const submitData: SubmitHandler<Inputs> = (inputData) => {
    const amount = inputData.amount;
    const newData = { ...inputData, id: uuidv4() };
    data = [...data, newData];
    setData(data);

    formTitle === "Expense"
      ? updateTotalExpense(+amount)
      : updateTotalIncome(+amount);
  };

  const deleteItem = (id: string) => {
    const deletedItem = data.find((transaction) => transaction.id == id);
    if (deletedItem) {
      const filterredData = data.filter((transaction) => transaction.id != id);
      const deletedAmount = deletedItem.amount;
      setData([...filterredData]);
      formTitle === "Expense"
        ? updateTotalExpense(-deletedAmount)
        : updateTotalIncome(-deletedAmount);
    }
  };

  return (
    <section id={formTitle + "-container"} className="form-container">
      <form
        action="submit"
        className={formTitle + "-form"}
        onSubmit={handleSubmit(submitData)}
      >
        <label htmlFor="source">{formTitle} source</label>
        <input
          type="text"
          id="source"
          {...register("source", { required: true })}
        />
        {errors.source && <span>*The source can't be empty</span>}

        <label htmlFor="amount">{formTitle} amount</label>
        <input
          type="number"
          id="amount"
          {...register("amount", { required: true, min: 0 })}
        />
        {errors.amount && (
          <span>
            *The amount can't be negetive <br /> *The amount can't be empty
          </span>
        )}

        <label htmlFor="date">date of {formTitle} </label>
        <input
          type="date"
          id="date"
          {...register("date", { required: true })}
        />
        {errors.date && <span>*The date can't be empty</span>}
        <input type="submit" value={"add " + formTitle} />
      </form>

      <List data={data} deleteItem={deleteItem} />
    </section>
  );
};
export { FormContainer };
