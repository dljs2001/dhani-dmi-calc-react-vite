import { Download } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import { Logo } from './Logo';

interface LoanApprovalProps {
  name: string;
  startDate: string;
  onPrevious: () => void;
}

export function LoanApproval({ name, startDate, onPrevious }: LoanApprovalProps) {
  const handleDownloadPDF = async () => {
    const element = document.getElementById('print-area');
    if (!element) return;

    const pdfOptions = {
      margin: [10, 10, 10, 10],
      filename: `${name || 'Loan_Approval'}.pdf`,
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 4 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    await html2pdf().set(pdfOptions).from(element).save();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };

  const currentDate = new Date().toLocaleDateString('en-GB');
  const idNumber = 'IDHADEL09559485';

  return (
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
                onClick={onPrevious}
                className="px-4 py-2 bg-red-gradient text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Previous
              </button>
            </div>
          </div>

          {/* Approval Content */}
          <div className="space-y-6">
            <div className="text-right space-y-1">
              <p>{currentDate}</p>
              <p>{idNumber}</p>
            </div>

            <div className="space-y-4">
              <p>Dear Sir / Madam,</p>
              <p className="font-semibold">{name}</p>
            </div>

            <div>
              <p className="font-semibold">Certificate of Approved Loan No. {idNumber}</p>
              <p className="mt-2">
                We acknowledge the receipt of minimal documentation from your end, and we sincerely
                appreciate your choice of Dhani Finance as your financial partner. With reference to
                your recent loan application, we are pleased to extend to you the following loan
                offer, subject to the specified terms and conditions, with the first Equated Monthly
                Installment (EMI) scheduled for:
              </p>
              <p className="mt-2 font-semibold">{formatDate(startDate)}</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold">Approved Loan Amount</p>
                  <p>₹ 500,000</p>
                </div>
                <div>
                  <p className="font-semibold">Interest Rate</p>
                  <p>4.00%</p>
                </div>
                <div>
                  <p className="font-semibold">Loan Term</p>
                  <p>60 Months</p>
                </div>
                <div>
                  <p className="font-semibold">Monthly Payment (EMI)</p>
                  <p>₹ 9,208</p>
                </div>
                <div>
                  <p className="font-semibold">Total Interest Payable</p>
                  <p>₹ 52,496</p>
                </div>
                <div>
                  <p className="font-semibold">Document Service Charge</p>
                  <p>₹ 1,380</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <p>
                Please note that this loan offer is contingent upon your acceptance of the
                aforementioned terms and conditions. Should you wish to proceed with this loan,
                kindly respond to this communication at your earliest convenience. We look forward
                to serving your financial needs and fostering a long-lasting partnership with you.
                Should you have any questions or require further clarification, please do not
                hesitate to reach out to our dedicated customer service team.
              </p>

              <p>
                Thank you once again for
                <br />
                choosing Dhani Finance as your
                <br />
                trusted financial institution.
              </p>
            </div>

            <div className="flex justify-between items-end mt-8">
              <img
                src="https://i.imgur.com/approved-stamp.png"
                alt="Approved"
                className="h-24 object-contain"
              />
              <img
                src="https://i.imgur.com/company-seal.png"
                alt="Company Seal"
                className="h-24 object-contain"
              />
              <div className="text-center">
                <img
                  src="https://i.imgur.com/signature.png"
                  alt="Signature"
                  className="h-16 object-contain mx-auto"
                />
                <p className="text-sm italic mt-2">
                  This is a system generated
                  <br />
                  letter and hence does not
                  <br />
                  require any signature.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t text-sm text-gray-600">
              <p className="font-semibold">Corporate Offices:</p>
              <p>
                One International Centre (Formerly IFC), Senapati Bapat Marg, Elphinstone Road,
                Mumbai – 400 013
                <br />
                5th Floor, Plot no. 108, IT Park, Udyog Vihar, Phase-1, Gurugram, Haryana-122016
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}