import { FormEvent, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { List } from "./lists";

type transaction = {
  source: string;
  amount: string;
  date: string;
};

type Inputs = {
  sourceRequired: string;
  amountRequired: string;
  dateRequired: string;
};

const FormContainer = (props: {
  formTitle: string;
  getTotalIncome: (income: number) => void;
  getTotalExpense: (expense: number) => void;
}) => {
  const { formTitle, getTotalIncome, getTotalExpense } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  let [data, setData] = useState([]);

  console.log(formTitle);
  const submitData: SubmitHandler<Inputs> = (inputData) => {
    const inputs = inputData;
    const source = inputs.sourceRequired;
    const amount = inputs.amountRequired;
    const date = inputs.dateRequired;
    console.log(inputData);

    data = [
      ...data,
      {
        source,
        amount,
        date,
      },
    ];
    setData(data);
    formTitle === "Expense"
      ? getTotalExpense(+amount)
      : getTotalIncome(+amount);
  };

  const deleteItem = (id: string) => {
    const deletedAmount = data.splice(+id, 1)[0].amount;
    setData([...data]);
    formTitle === "Expense"
      ? getTotalExpense(-deletedAmount)
      : getTotalIncome(-deletedAmount);
    console.error(data);
  };

  // const setIncomeData = (incomeData, income) => {
  //   incomeData = [...incomeData, income];
  // };

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
          {...register("sourceRequired", { required: true })}
        />
        {errors.sourceRequired && <span>*The source can't be empty</span>}

        <label htmlFor="amount">{formTitle} amount</label>
        <input
          type="number"
          id="amount"
          {...register("amountRequired", { required: true, min: 0 })}
        />
        {errors.amountRequired && (
          <span>
            *The amount can't be negetive <br /> *The amount can't be empty
          </span>
        )}

        <label htmlFor="date">date of {formTitle} </label>
        <input
          type="date"
          id="date"
          {...register("dateRequired", { required: true })}
        />
        {errors.dateRequired && <span>*The date can't be empty</span>}
        <input type="submit" value={"add " + formTitle} />
      </form>

      <List data={data} deleteItem={deleteItem} />
    </section>
  );
};
export { FormContainer };
