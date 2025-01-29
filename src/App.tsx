import { Routes, Route, useNavigate } from 'react-router-dom';
import { Download } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import { LoanForm } from './components/LoanForm';
import { LoanSummary } from './components/LoanSummary';
import { AmortizationTable } from './components/AmortizationTable';
import { Logo } from './components/Logo';
import { LoanApproval } from './components/LoanApproval';
import { calculateLoan } from './utils/calculations';
import type { LoanValues } from './types';
import { useState, useEffect } from 'react';

function App() {
  const navigate = useNavigate();
  const [loanValues, setLoanValues] = useState<LoanValues>({
    name: '',
    loanAmount: 100000,
    interestRate: 4,
    loanYears: 1,
    startDate: '2025-01-15'
  });

  const [loanSummary, setLoanSummary] = useState({
    monthlyPayment: 0,
    numPayments: 0,
    totalInterest: 0,
    totalCost: 0,
    schedule: []
  });

  useEffect(() => {
    const result = calculateLoan(loanValues);
    setLoanSummary(result);
  }, [loanValues]);

  const handleDownloadPDF = async () => {
    const element = document.getElementById('print-area');
    if (!element) return;

    const pdfOptions = {
      margin: [10, 10, 10, 10],
      filename: `${loanValues.name || 'Loan_Calculator'}.pdf`,
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 4 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    await html2pdf().set(pdfOptions).from(element).save();
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="min-h-screen bg-gray-100 p-4 md:p-8">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg" id="print-area">
              <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                  <Logo />
                  <div className="flex gap-4">
                    <button
                      onClick={handleDownloadPDF}
                      className="flex items-center gap-2 px-4 py-2 bg-red-gradient text-white rounded-lg hover:opacity-90 transition-opacity"
                    >
                      <Download size={20} />
                      Print
                    </button>
                    <button
                      onClick={() => navigate('/approval')}
                      className="px-4 py-2 bg-red-gradient text-white rounded-lg hover:opacity-90 transition-opacity"
                    >
                      Next
                    </button>
                  </div>
                </div>

                {/* Main Content */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <LoanForm values={loanValues} onChange={setLoanValues} />
                  <LoanSummary summary={loanSummary} />
                </div>

                {/* Amortization Table */}
                <AmortizationTable schedule={loanSummary.schedule} startDate={loanValues.startDate} />
              </div>
            </div>
          </div>
        }
      />
      <Route
        path="/approval"
        element={
          <LoanApproval
            name={loanValues.name}
            startDate={loanValues.startDate}
            onPrevious={() => navigate('/')}
          />
        }
      />
    </Routes>
  );
}

export default App