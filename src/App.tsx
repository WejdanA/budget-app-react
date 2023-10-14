import React from "react";
import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { FormContainer } from "./components/form";
import { Target } from "./components/target";
import { Transfer } from "./components/balance";

function App() {
  let [totalSavings, setTotalSavings] = useState(0);
  let [transferedAmount, setTranfered] = useState(0);
  let getTransfered = (transfered: number) => {
    setTranfered(transfered);
    setTotalSavings((totalSavings += +transfered));
  };

  let [totalIncome, setTotalIncome] = useState(0);
  let getTotalIncome = (income: number) => {
    setTotalIncome((totalIncome += income));
  };

  let [totalExpense, setTotalExpense] = useState(0);
  let getTotalExpense = (expense: number) => {
    setTotalExpense((totalExpense += expense));
  };

  return (
    <div className="App">
      <header className="App-header"></header>
      <main>
        <FormContainer
          formTitle={"Income"}
          getTotalIncome={getTotalIncome}
          getTotalExpense={getTotalExpense}
        />
        <FormContainer
          formTitle={"Expense"}
          getTotalIncome={getTotalIncome}
          getTotalExpense={getTotalExpense}
        />

        <Target totalSavings={totalSavings} />

        <Transfer
          getTransfered={getTransfered}
          totalIncome={totalIncome}
          totalExpense={totalExpense}
          totalSavings={totalSavings}
        />
      </main>
    </div>
  );
}

export default App;
