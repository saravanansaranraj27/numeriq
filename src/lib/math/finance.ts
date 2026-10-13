function requireFinite(values: number[], message: string) {
  if (values.some((value) => !Number.isFinite(value))) throw new Error(message);
}

export function emi(principal: number, annualRate: number, months: number): number {
  requireFinite([principal, annualRate, months], "Enter finite loan values");
  if (principal <= 0 || months <= 0 || annualRate < 0) throw new Error("Enter valid loan values");
  const monthlyRate = annualRate / 1200;
  if (monthlyRate === 0) return principal / months;
  const growth = (1 + monthlyRate) ** months;
  const result = (principal * monthlyRate * growth) / (growth - 1);
  if (!Number.isFinite(result)) throw new Error("Loan values are outside the supported range");
  return result;
}

export function compoundInterest(
  principal: number,
  annualRate: number,
  years: number,
  frequency: number,
): number {
  requireFinite([principal, annualRate, years, frequency], "Enter finite investment values");
  if (principal < 0 || annualRate < 0 || years < 0 || frequency <= 0)
    throw new Error("Enter valid investment values");
  const result = principal * (1 + annualRate / 100 / frequency) ** (frequency * years);
  if (!Number.isFinite(result))
    throw new Error("Investment values are outside the supported range");
  return result;
}

export function investmentFutureValue(
  principal: number,
  monthlyContribution: number,
  annualRate: number,
  years: number,
): number {
  requireFinite(
    [principal, monthlyContribution, annualRate, years],
    "Enter finite investment values",
  );
  if (principal < 0 || monthlyContribution < 0 || annualRate < 0 || years < 0)
    throw new Error("Enter valid investment values");
  const months = Math.round(years * 12);
  const monthlyRate = annualRate / 1200;
  const growth = (1 + monthlyRate) ** months;
  const contributionValue =
    monthlyRate === 0
      ? monthlyContribution * months
      : (monthlyContribution * (growth - 1)) / monthlyRate;
  const result = principal * growth + contributionValue;
  if (!Number.isFinite(result))
    throw new Error("Investment values are outside the supported range");
  return result;
}

export function loanTotals(principal: number, annualRate: number, months: number) {
  const monthlyPayment = emi(principal, annualRate, months);
  const totalPayment = monthlyPayment * months;
  const totalInterest = totalPayment - principal;
  requireFinite([totalPayment, totalInterest], "Loan values are outside the supported range");
  return { monthlyPayment, totalPayment, totalInterest };
}
