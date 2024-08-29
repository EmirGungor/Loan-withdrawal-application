document.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => {
    document.getElementById("loading-screen").style.display = "none";
    const container = document.querySelector(".container");
    container.style.removeProperty("display");
    container.classList.add("show"); // Aşağı kayma efektini tetikle
  }, 300);
});

// Input event listener ekleyelim
const loanAmountInput = document.getElementById("loanAmount");
loanAmountInput.addEventListener("input", function () {
  const loanAmount = parseFloat(loanAmountInput.value);

  if (loanAmount < 0) {
    // Eğer miktar sıfırdan küçükse geçersiz yazdır
    document.getElementById("loanAmount").value = "Geçersiz Değer"
  } else {
    // Miktar sıfır veya pozitifse geçerli hesaplamayı yap
    calculateLoan();
  }
});

function getInterestRate(installments) {
  switch (installments) {
    case 3:
      return 0.1412;
    case 6:
      return 0.2095;
    case 9:
      return 0.2904;
    case 12:
      return 0.3826;
    default:
      return 0.15;
  }
}

function calculateLoan() {
    const loanAmount = parseFloat(document.getElementById("loanAmount").value);
    const installments = parseInt(document.getElementById("installments").value);
    const interestRate = getInterestRate(installments);
  
    if (!isNaN(loanAmount) && !isNaN(installments) && loanAmount > 0) {
      const totalLoanAmount = loanAmount * (1 + interestRate);
      const commissionAmount = totalLoanAmount - loanAmount;
      const monthlyInstallment = totalLoanAmount / installments;
  
      // Geçersiz miktar mesajını kaldır ve gerçek değerleri göster
      document.getElementById("totalAmount").textContent =
        totalLoanAmount.toFixed(2);
      document.getElementById("commissionAmount").textContent =
        commissionAmount.toFixed(2);
      document.getElementById("monthlyInstallment").textContent =
        monthlyInstallment.toFixed(2);
    } else {
      document.getElementById("totalAmount").textContent = "0";
      document.getElementById("commissionAmount").textContent = "0";
      document.getElementById("monthlyInstallment").textContent = "0";
    }
  }
  
