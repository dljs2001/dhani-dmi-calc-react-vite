<div className="container">
  {/* Add logo section at the top */}
  <div className="logo-container">
    <img src="assets/dmidhnilogo.svg" alt="DMI Finance Logo" className="logo-image" />
  </div>

  <div className="button-container">
    <button onClick={handlePrint} className="print-button">
      <span className="icon">⬇</span> Print
    </button>
    <button onClick={handleNext} className="next-button">
      Next
    </button>
  </div>

  {/* Rest of your existing content */}
  <div className="p-6">
    <div className="flex gap-4">
      {/* Add any content you want in this flex container */}
    </div>
    <img src="https://i.imgur.com/4Rj60nI.png" alt="Loan Details" />
  </div>
</div>

const handlePrint = () => {
  // Force desktop view before printing
  const originalWidth = document.body.style.width;
  document.body.style.width = '1024px';
  
  window.print();
  
  // Restore original width after printing
  setTimeout(() => {
    document.body.style.width = originalWidth;
  }, 100);
}; 