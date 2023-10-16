import { useEffect, useState, useMemo } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  amountRequired: string;
};

const Transfer = (props: {
  getTransfered: (transfered: number) => void;
  totalIncome: number;
  totalExpense: number;
  totalSavings: number;
}) => {
  const { getTransfered, totalIncome, totalExpense, totalSavings } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const balance = useMemo(() => {
    return totalIncome - totalExpense - totalSavings;
  }, [totalIncome, totalExpense, totalSavings]);

  const transferedSubmitHandle: SubmitHandler<Inputs> = (data) => {
    const transferedAmount = +data.amountRequired;
    getTransfered(transferedAmount);
  };

  return (
    <section id="transfer-container">
      <p id="balance">Current Balance: {balance} </p>
      <form
        action="submit"
        className="transfer-form"
        onSubmit={handleSubmit(transferedSubmitHandle)}
      >
        <label htmlFor="target">transfer to saving acount</label>
        <input
          type="number"
          id="transfer"
          {...register("amountRequired", {
            required: true,
            max: balance,
            min: 0,
          })}
        />
        {errors.amountRequired && (
          <span>
            *The amount can't be negetive <br /> *The amount can't exceed the
            current balance <br /> *The amount can't be empty
          </span>
        )}
        <input type="submit" value="transfer" />
      </form>
    </section>
  );
};

export { Transfer };
