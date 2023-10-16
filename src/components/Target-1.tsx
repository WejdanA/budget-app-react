import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

type Inputs = {
  targetRequired: string;
};

const Target = (props: { totalSavings: number }) => {
  const { totalSavings } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  let [target, setTarget] = useState(0);
  const targetSubmitHandle: SubmitHandler<Inputs> = (data) => {
    let newTarget = +data.targetRequired;

    setTarget(newTarget);
  };

  return (
    <section id="target-container">
      <form
        action="submit"
        className="target-form"
        onSubmit={handleSubmit(targetSubmitHandle)}
      >
        <label htmlFor="target">set target</label>
        <input
          type="number"
          id="target"
          {...register("targetRequired", { required: true, min: 0 })}
        />
        {errors.targetRequired && (
          <span>
            *The target can't be negetive <br /> <br /> *The target can't be
            empty
          </span>
        )}
        <input type="submit" value="reset" />
      </form>
      <p id="cuurent-savings">current savings: {totalSavings}EUR</p>
      <p id="current-target">target: {target}EUR</p>
      <label htmlFor="progress">
        progress: {(totalSavings / target || 1) * 100}%
      </label>
      <progress id="progress" max={target} value={totalSavings}></progress>
    </section>
  );
};

export { Target };
