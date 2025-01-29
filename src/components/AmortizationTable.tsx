interface AmortizationTableProps {
  schedule: Array<{
    paymentNo: number;
    payment: number;
    principal: number;
    interest: number;
    balance: number;
  }>;
  startDate: string;
}

export function AmortizationTable({ schedule, startDate }: AmortizationTableProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount).replace('₹', '₹ ');  // Add space after ₹
  };

  const getPaymentDate = (paymentNo: number) => {
    const date = new Date(startDate);
    date.setMonth(date.getMonth() + paymentNo - 1);
    return date.toLocaleDateString('en-GB');
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-center bg-red-gradient text-white py-2 rounded">
        Amortization Schedule
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-red-gradient text-white">
              <th className="p-2 text-center">Pmt No.</th>
              <th className="p-2 text-center">Payment Date</th>
              <th className="p-2 text-center">Payment</th>
              <th className="p-2 text-center">Principal</th>
              <th className="p-2 text-center">Interest</th>
              <th className="p-2 text-center">Balance</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((row) => (
              <tr key={row.paymentNo} className="even:bg-gray-50">
                <td className="p-2 text-center">{row.paymentNo}</td>
                <td className="p-2 text-center">{getPaymentDate(row.paymentNo)}</td>
                <td className="p-2 text-center">{formatCurrency(row.payment)}</td>
                <td className="p-2 text-center">{formatCurrency(row.principal)}</td>
                <td className="p-2 text-center">{formatCurrency(row.interest)}</td>
                <td className="p-2 text-center">{formatCurrency(row.balance)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}