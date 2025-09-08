// YENİ: Taksit -> POS Komisyon % haritası
const COMMISSION_TABLE = {
  1: 6.00,   // Tek Çekim
  2: 11.85,
  3: 13.72,
  4: 15.59,
  5: 17.45,
  6: 19.32,
  7: 21.19,
  8: 23.06,
  9: 24.93,
  10: 26.80,
  11: 28.67,
  12: 30.54,
};

// Komisyon yüzdesini (0.XX) döndür
function getCommissionRate(installments) {
  const pct = COMMISSION_TABLE[installments];
  return typeof pct === "number" ? pct / 100 : 0;
}

// TR para formatı
function fmt(n) {
  return Number(n).toLocaleString("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

// Negatif/NaN korumalı input okuma (virgülü de kabul eder)
function readAmount(inputEl) {
  const raw = inputEl.value.replace(",", ".").trim();
  const value = parseFloat(raw);
  if (isNaN(value) || value <= 0) return null;
  return value;
}

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const loading = document.getElementById("loading-screen");
    if (loading) loading.style.display = "none";
    const container = document.querySelector(".container");
    if (container) {
      container.style.removeProperty("display");
      container.classList.add("show");
    }
  }, 300);

  const loanAmountInput = document.getElementById("loanAmount");
  const installmentsSelect = document.getElementById("installments");

  loanAmountInput.addEventListener("input", calculateLoan);
  installmentsSelect.addEventListener("change", calculateLoan);

  calculateLoan(); // ilk yüklemede
});

function calculateLoan() {
  const loanAmountInput = document.getElementById("loanAmount");
  const installments = parseInt(document.getElementById("installments").value, 10);
  const loanAmount = readAmount(loanAmountInput);

  const commissionRatePctEl = document.getElementById("commissionRatePct");
  const totalAmountEl = document.getElementById("totalAmount");
  const commissionAmountEl = document.getElementById("commissionAmount");
  const monthlyInstallmentEl = document.getElementById("monthlyInstallment");

  const rate = getCommissionRate(installments); // ör: %6 => 0.06
  // Komisyon oranını ekrana yaz
  if (commissionRatePctEl) commissionRatePctEl.textContent = (rate * 100).toFixed(2);

  if (!loanAmount || isNaN(installments)) {
    totalAmountEl.textContent = "0";
    commissionAmountEl.textContent = "0";
    monthlyInstallmentEl.textContent = "0";
    return;
  }

  const totalLoanAmount = loanAmount * (1 + rate);
  const commissionAmount = totalLoanAmount - loanAmount;
  const monthlyInstallment = totalLoanAmount / installments; // tek çekimde 1'e bölünür

  totalAmountEl.textContent = fmt(totalLoanAmount);
  commissionAmountEl.textContent = fmt(commissionAmount);
  monthlyInstallmentEl.textContent = fmt(monthlyInstallment);
}
