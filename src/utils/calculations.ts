import type { LoanValues } from '../types';

export function calculateLoan(values: LoanValues) {
  const { loanAmount, interestRate, loanYears } = values;
  const monthlyRate = interestRate / 100 / 12;
  const numPayments = loanYears * 12;
  const monthlyPayment = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numPayments));
  const totalCost = monthlyPayment * numPayments;
  const totalInterest = totalCost - loanAmount;

  let balance = loanAmount;
  const schedule = [];

  for (let i = 1; i <= numPayments; i++) {
    const interest = balance * monthlyRate;
    const principal = monthlyPayment - interest;
    balance -= principal;

    schedule.push({
      paymentNo: i,
      payment: monthlyPayment,
      principal,
      interest,
      balance: Math.max(balance, 0)
    });
  }

  return {
    monthlyPayment,
    numPayments,
    totalInterest,
    totalCost,
    schedule
  };
}