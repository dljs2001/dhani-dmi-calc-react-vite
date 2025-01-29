import type { LoanValues } from '../types';

interface LoanFormProps {
  values: LoanValues;
  onChange: (values: LoanValues) => void;
}

export function LoanForm({ values, onChange }: LoanFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Special handling for different input types
    const newValue = name === 'name' 
      ? value 
      : name === 'startDate' 
        ? value // Keep the ISO format for the input value
        : Number(value);

    onChange({
      ...values,
      [name]: newValue
    });
  };

  // Format the date for display (if needed)
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB'); // This will format as DD/MM/YYYY
  };

  return (
    <div className="bg-red-gradient text-white p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-center">Loan Values</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={values.name}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded text-black"
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label htmlFor="loanAmount" className="block mb-1">Loan Amount (₹):</label>
          <input
            type="number"
            id="loanAmount"
            name="loanAmount"
            value={values.loanAmount}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded text-black"
          />
        </div>
        <div>
          <label htmlFor="interestRate" className="block mb-1">Annual Interest Rate (%):</label>
          <input
            type="number"
            id="interestRate"
            name="interestRate"
            value={values.interestRate}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded text-black"
          />
        </div>
        <div>
          <label htmlFor="loanYears" className="block mb-1">Loan Period (Years):</label>
          <input
            type="number"
            id="loanYears"
            name="loanYears"
            value={values.loanYears}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded text-black"
          />
        </div>
        <div>
          <label htmlFor="startDate" className="block mb-1">Start Date:</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={values.startDate}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded text-black"
          />
          <p className="text-sm mt-1 opacity-80">
            Selected: {formatDate(values.startDate)}
          </p>
        </div>
      </div>
    </div>
  );
}