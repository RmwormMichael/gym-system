import { createContext, useContext, useState } from "react";

const PlanContext = createContext();

export const PlanProvider = ({ children }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const selectPlan = (plan) => {
    setSelectedPlan(plan);
  };

  const clearPlan = () => {
    setSelectedPlan(null);
  };

  return (
    <PlanContext.Provider
      value={{
        selectedPlan,
        selectPlan,
        clearPlan,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
};

export const usePlan = () => useContext(PlanContext);
