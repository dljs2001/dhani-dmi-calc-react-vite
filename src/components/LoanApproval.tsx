import { Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import { Logo } from './Logo';
import { useState } from 'react';

interface LoanApprovalProps {
  name: string;
  startDate: string;
  onPrevious: () => void;
}

export function LoanApproval({ name, startDate, onPrevious }: LoanApprovalProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [serviceCharge, setServiceCharge] = useState('1,380');

  const handleDownloadPNG = async () => {
    const element = document.getElementById('print-area');
    if (!element) return;

    try {
      setIsGenerating(true);
      
      // Save current styles
      const originalStyle = element.style.cssText;
      const originalWidth = element.style.width;
      
      // Set to desktop view for capture
      element.style.width = '1920px';
      element.style.margin = '0';
      element.style.transform = 'none';
      
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: 1920,
        windowHeight: 2714
      });

      // Restore original styles
      element.style.cssText = originalStyle;
      element.style.width = originalWidth;

      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${name || 'Loan_Approval'}.png`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }
      }, 'image/png', 0.9);
    } catch (error) {
      console.error('Error generating PNG:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };

  const currentDate = new Date().toLocaleDateString('en-GB');
  const idNumber = 'IDHADEL09559485';

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-[1920px] w-full mx-auto bg-white shadow-lg rounded-lg" id="print-area">
        <div className="p-6 md:p-24">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 md:mb-16">
            <Logo />
            {!isGenerating && (
              <div className="flex gap-4 mt-4 md:mt-0">
                <button
                  onClick={handleDownloadPNG}
                  className="flex items-center gap-2 px-4 md:px-8 py-2 md:py-4 bg-red-gradient text-white rounded-lg hover:opacity-90 transition-opacity text-base md:text-xl"
                  disabled={isGenerating}
                >
                  <Download size={20} className="md:w-7 md:h-7" />
                  {isGenerating ? 'Generating...' : 'Download PNG'}
                </button>
                <button
                  onClick={onPrevious}
                  className="px-4 md:px-8 py-2 md:py-4 bg-red-gradient text-white rounded-lg hover:opacity-90 transition-opacity text-base md:text-xl"
                >
                  Previous
                </button>
              </div>
            )}
          </div>

          {/* Approval Content */}
          <div className="space-y-6 md:space-y-12 px-4 md:px-24">
            <div className="text-right">
              <p className="text-lg md:text-2xl">{currentDate}</p>
              <p className="text-lg md:text-2xl">{idNumber}</p>
            </div>

            <div className="space-y-4 md:space-y-6">
              <p className="text-xl md:text-3xl">Dear Sir / Madam,</p>
              <p className="font-semibold text-xl md:text-3xl">{name}</p>
            </div>

            <div>
              <p className="font-semibold text-xl md:text-3xl">Certificate of Approved Loan No. {idNumber}</p>
              <p className="mt-4 md:mt-8 text-lg md:text-2xl leading-relaxed">
                We acknowledge the receipt of minimal documentation from your end, and we sincerely
                appreciate your choice of Dhani Finance as your financial partner. With reference to
                your recent loan application, we are pleased to extend to you the following loan
                offer, subject to the specified terms and conditions, with the first Equated Monthly
                Installment (EMI) scheduled for:
              </p>
              <p className="mt-4 md:mt-6 font-semibold text-xl md:text-3xl">{formatDate(startDate)}</p>
            </div>

            <div className="bg-gray-50 p-6 md:p-16 rounded-lg my-8 md:my-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
                <div>
                  <p className="font-semibold text-lg md:text-2xl mb-2 md:mb-4">Approved Loan Amount</p>
                  <p className="text-xl md:text-3xl">₹ 500,000</p>
                </div>
                <div>
                  <p className="font-semibold text-lg md:text-2xl mb-2 md:mb-4">Interest Rate</p>
                  <p className="text-xl md:text-3xl">4.00%</p>
                </div>
                <div>
                  <p className="font-semibold text-lg md:text-2xl mb-2 md:mb-4">Loan Term</p>
                  <p className="text-xl md:text-3xl">60 Months</p>
                </div>
                <div>
                  <p className="font-semibold text-lg md:text-2xl mb-2 md:mb-4">Monthly Payment (EMI)</p>
                  <p className="text-xl md:text-3xl">₹ 9,208</p>
                </div>
                <div>
                  <p className="font-semibold text-lg md:text-2xl mb-2 md:mb-4">Total Interest Payable</p>
                  <p className="text-xl md:text-3xl">₹ 52,496</p>
                </div>
                <div>
                  <p className="font-semibold text-lg md:text-2xl mb-2 md:mb-4">Document Service Charge</p>
                  <p className="text-xl md:text-3xl">
                    ₹{' '}
                    <span
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => setServiceCharge(e.currentTarget.textContent || '1,380')}
                      className="outline-none focus:bg-transparent"
                    >
                      {serviceCharge}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6 md:space-y-8">
              <p className="text-lg md:text-2xl leading-relaxed">
                Please note that this loan offer is contingent upon your acceptance of the
                aforementioned terms and conditions. Should you wish to proceed with this loan,
                kindly respond to this communication at your earliest convenience. We look forward
                to serving your financial needs and fostering a long-lasting partnership with you.
                Should you have any questions or require further clarification, please do not
                hesitate to reach out to our dedicated customer service team.
              </p>

              <p className="text-lg md:text-2xl">
                Thank you once again for choosing Dhani Finance as your trusted financial institution.
              </p>
            </div>

            <div className="flex justify-between items-end mt-10 md:mt-20 mb-10 md:mb-20">
              <img
                src="https://i.imgur.com/approved-stamp.png"
                alt="Approved"
                className="h-24 md:h-40 object-contain"
              />
              <img
                src="https://i.imgur.com/company-seal.png"
                alt="Company Seal"
                className="h-24 md:h-40 object-contain"
              />
              <div className="text-center">
                <img
                  src="https://i.imgur.com/signature.png"
                  alt="Signature"
                  className="h-20 md:h-36 object-contain mx-auto"
                />
                <p className="text-base md:text-xl italic mt-2 md:mt-4">
                  This is a system generated letter and hence does not require any signature.
                </p>
              </div>
            </div>

            <div className="mt-10 md:mt-20">
              <div className="border-b-2 border-gray-300 mb-6 md:mb-12"></div>
              <div className="text-center">
                <p className="font-bold text-xl md:text-3xl mb-4 md:mb-6">Corporate Offices:</p>
                <p className="font-bold text-lg md:text-2xl leading-relaxed">
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
    </div>
  );
}