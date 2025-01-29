interface LoanSummaryProps {
  summary: {
    monthlyPayment: number;
    numPayments: number;
    totalInterest: number;
    totalCost: number;
  };
}

export function LoanSummary({ summary }: LoanSummaryProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="bg-white p-6 rounded-lg border-[16px] border-custom-red-light text-center">
      <h2 className="text-xl font-bold mb-6 text-custom-red-light">Loan Summary</h2>
      <div className="space-y-4 text-2xl">
        <p>
          <strong className="text-custom-red-light">Monthly Payment:</strong>
          <br />
          {formatCurrency(summary.monthlyPayment)}
        </p>
        <p>
          <strong className="text-custom-red-light">Number of Payments:</strong>
          <br />
          {summary.numPayments}
        </p>
        <p>
          <strong className="text-custom-red-light">Total Interest:</strong>
          <br />
          {formatCurrency(summary.totalInterest)}
        </p>
        <p>
          <strong className="text-custom-red-light">Total Cost of Loan:</strong>
          <br />
          {formatCurrency(summary.totalCost)}
        </p>
        <p>
          <strong className="text-custom-red-light">Date:</strong>
          <br />
          {new Date().toLocaleDateString('en-GB')}
        </p>
      </div>
    </div>
  );
}