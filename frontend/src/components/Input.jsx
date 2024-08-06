/* eslint-disable react/prop-types */

import { createContext, useContext, useId } from "react";

const InputContext = createContext();

function getValueByString(obj, path) {
  return path.split(".")?.length > 0
    ? path.split(".").reduce((acc, part) => acc && acc[part], obj)
    : obj[path];
}

export function IWraper({ children, ...rest }) {
  return (
    <InputContext.Provider value={rest}>
      <div className="flex gap-4 flex-col w-full">{children}</div>
    </InputContext.Provider>
  );
}

function Input({ label, name, validation, className, labelClass, ...rest }) {
  const {
    errors,
    register,
    validation: defaultValidation,
  } = useContext(InputContext);
  const id = useId();
  const errorMsg = getValueByString(errors, name)?.message;

  return (
    <label htmlFor={id} className={labelClass}>
      <div className="flex justify-between">
        <span className="font-semibold text-sm">{label}</span>
        {errorMsg && (
          <p className="text-red-500 text-xs font-medium animate-[pulse_1s_ease-in_1_reverse] text-end">
            {errorMsg}
          </p>
        )}
      </div>
      <input
        id={id}
        {...rest}
        className={`p-2 border-primary border outline-none rounded-md w-full ${className}`}
        {...register(name, validation || defaultValidation)}
      />
    </label>
  );
}

export default Input;
