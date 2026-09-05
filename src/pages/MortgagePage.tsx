import React, { useState, useEffect } from 'react';
import './MortgagePage.css';

const MortgagePage: React.FC = () => {
  const [propertyPrice, setPropertyPrice] = useState(3000000);
  const [downPayment, setDownPayment] = useState(450000);
  const [interestRate, setInterestRate] = useState(11.0);
  const [loanTermYears, setLoanTermYears] = useState(15);
  
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalOverpayment, setTotalOverpayment] = useState(0);
  const [savings, setSavings] = useState(0);
  
  // Calculate mortgage based on current inputs
  useEffect(() => {
    // Principal
    const P = propertyPrice - downPayment;
    if (P <= 0) {
      setMonthlyPayment(0);
      setTotalOverpayment(0);
      return;
    }
    
    // Monthly interest rate
    const r = (interestRate / 100) / 12;
    // Total number of months
    const n = loanTermYears * 12;
    
    if (r === 0) {
      setMonthlyPayment(P / n);
      setTotalOverpayment(0);
      return;
    }
    
    // Monthly payment formula
    const M = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    
    // Total amount to be paid over the loan term
    const totalPaid = M * n;
    
    // Overpayment is total paid minus principal
    const overpayment = totalPaid - P;
    
    // Calculate savings compared to a base rate (e.g., 15%)
    let calculatedSavings = 0;
    if (interestRate < 15) {
      const baseR = 15 / 100 / 12;
      const baseM = P * (baseR * Math.pow(1 + baseR, n)) / (Math.pow(1 + baseR, n) - 1);
      const baseOverpayment = (baseM * n) - P;
      calculatedSavings = baseOverpayment - overpayment;
    }
    
    setMonthlyPayment(Math.round(M));
    setTotalOverpayment(Math.round(overpayment));
    setSavings(Math.round(calculatedSavings));
    
  }, [propertyPrice, downPayment, interestRate, loanTermYears]);

  // Format currency
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="container mortgage-page">
      <div className="mortgage-header">
        <h1>Ипотечный калькулятор</h1>
        <p>Узнайте свой ежемесячный платеж по ипотеке в режиме онлайн!</p>
        <p className="mortgage-subtitle">
          Наше агентство недвижимости оказывает широкий спектр услуг, связанных с покупкой, продажей, арендой и обменом жилья. Если вас интересуют вопросы, связанные с квартирами, комнатами, участками и дачами, не раздумывая, обращайтесь к нам!
        </p>
      </div>

      <div className="mortgage-calc-wrapper">
        <div className="mortgage-calc-controls">
          {/* Property Price */}
          <div className="calc-group">
            <div className="calc-group-header">
              <label>Стоимость объекта: <span>(от 500 000 до 300 000 000)</span></label>
              <div className="calc-input-wrapper">
                <input 
                  type="number" 
                  value={propertyPrice} 
                  onChange={e => setPropertyPrice(Number(e.target.value))} 
                />
                <span className="unit">₽</span>
              </div>
            </div>
            <input 
              type="range" 
              min="500000" 
              max="30000000" 
              step="50000" 
              value={propertyPrice} 
              onChange={e => setPropertyPrice(Number(e.target.value))} 
            />
          </div>

          {/* Down Payment */}
          <div className="calc-group">
            <div className="calc-group-header">
              <label>Первоначальный взнос: <span>(до {formatCurrency(propertyPrice - 100000)})</span></label>
              <div className="calc-input-wrapper">
                <input 
                  type="number" 
                  value={downPayment} 
                  onChange={e => setDownPayment(Number(e.target.value))} 
                />
                <span className="unit">₽</span>
              </div>
            </div>
            <input 
              type="range" 
              min="0" 
              max={propertyPrice - 100000} 
              step="10000" 
              value={downPayment} 
              onChange={e => setDownPayment(Number(e.target.value))} 
            />
          </div>

          {/* Down Payment % (Optional feature on the screen) */}
          <div className="calc-group">
            <div className="calc-group-header">
              <label></label>
              <div className="calc-input-wrapper">
                <input 
                  type="number" 
                  value={((downPayment / propertyPrice) * 100).toFixed(1)} 
                  onChange={e => setDownPayment(propertyPrice * (Number(e.target.value) / 100))} 
                  step="0.1"
                />
                <span className="unit">%</span>
              </div>
            </div>
            <input 
              type="range" 
              min="0" 
              max="99" 
              step="1" 
              value={(downPayment / propertyPrice) * 100} 
              onChange={e => setDownPayment(propertyPrice * (Number(e.target.value) / 100))} 
            />
          </div>

          {/* Interest Rate */}
          <div className="calc-group">
            <div className="calc-group-header">
              <label>Процентная ставка: <span>(до 30.0%)</span></label>
              <div className="calc-input-wrapper">
                <input 
                  type="number" 
                  step="0.1"
                  value={interestRate} 
                  onChange={e => setInterestRate(Number(e.target.value))} 
                />
                <span className="unit">%</span>
              </div>
            </div>
            <input 
              type="range" 
              min="1.0" 
              max="30.0" 
              step="0.1" 
              value={interestRate} 
              onChange={e => setInterestRate(Number(e.target.value))} 
            />
          </div>

          {/* Loan Term */}
          <div className="calc-group">
            <div className="calc-group-header">
              <label>Срок кредита: <span>(от 1 до 50)</span></label>
              <div className="calc-input-wrapper">
                <input 
                  type="number" 
                  value={loanTermYears} 
                  onChange={e => setLoanTermYears(Number(e.target.value))} 
                />
                <span className="unit">лет</span>
              </div>
            </div>
            <input 
              type="range" 
              min="1" 
              max="50" 
              step="1" 
              value={loanTermYears} 
              onChange={e => setLoanTermYears(Number(e.target.value))} 
            />
          </div>
        </div>

        <div className="mortgage-calc-results">
          <div className="result-item">
            <p>Ежемесячный платеж:</p>
            <h3>{formatCurrency(monthlyPayment)}</h3>
          </div>
          
          <div className="result-item">
            <p>Переплата за весь срок:</p>
            <h4>{formatCurrency(totalOverpayment)}</h4>
          </div>

          <div className="savings-block">
            <p>Экономия:</p>
            <h5>{formatCurrency(savings)}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MortgagePage;
