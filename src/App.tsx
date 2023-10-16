import { useState } from "react";

import "./App.css";

import { FormContainer } from "./components/form";
import { Target } from "./components/target";
import { Transfer } from "./components/balance";

function App() {
  let [totalSavings, setTotalSavings] = useState(0);
  let [totalIncome, setTotalIncome] = useState(0);
  let [totalExpense, setTotalExpense] = useState(0);

  let getTransfered = (transfered: number) => {
    setTotalSavings((totalSavings += +transfered));
  };

  let updateTotalIncome = (income: number) => {
    setTotalIncome((totalIncome += income));
  };

  let updateTotalExpense = (expense: number) => {
    setTotalExpense((totalExpense += expense));
  };

  return (
    <div className="App">
      <header className="App-header"></header>
      <main>
        <FormContainer
          formTitle={"Income"}
          updateTotalIncome={updateTotalIncome}
          updateTotalExpense={updateTotalExpense}
        />
        <FormContainer
          formTitle={"Expense"}
          updateTotalIncome={updateTotalIncome}
          updateTotalExpense={updateTotalExpense}
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
