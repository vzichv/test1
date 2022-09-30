import React from "react";
import Header1 from "./../Header1/Header1";
import StyledButton from "./../StyledButton/StyledButton";
import RangeField from "../RangeField/RangeField";
import CalculationResult from "../CalculationResult/CalculationResult";
import styles from "./CarLeasingApplication.module.scss";

function CarLeasingApplication({}) {
  const [carCost, setCarCost] = React.useState(1000000);
  const [initialFee, setInitialFee] = React.useState(100000);
  const [initialFeeInPercentages, setInitialFeeInPercentages] =
    React.useState(10);
  const [leasingTerm, setLeasingTerm] = React.useState(1);
  const [amountOfLeasingAgreement, setAmountOfLeasingAgreement] =
    React.useState(0);
  const [monthlyPayment, setMonthlyPayment] = React.useState(0);
  const [applicationIsLeft, setApplicationIsLeft] = React.useState(true);

  // Calculate initialFeeInPercentages
  React.useEffect(() => {
    setInitialFeeInPercentages(
      carCost ? Math.round((initialFee / carCost) * 100) : 0
    );
  }, [initialFee]);

  // Calculate monthlyPayment
  React.useEffect(() => {
    setMonthlyPayment(
      leasingTerm > 0 ? Math.round(
        (carCost - initialFee) *
          ((0.035 * Math.pow(1 + 0.035, leasingTerm)) /
            (Math.pow(1 + 0.035, leasingTerm) - 1))
      ) : 0
    );
  }, [carCost, initialFee, leasingTerm]);

  // Calculate amountOfLeasingAgreement
  React.useEffect(() => {
    setAmountOfLeasingAgreement(
      Math.round(initialFee + leasingTerm * monthlyPayment)
    );
  }, [initialFee, leasingTerm, monthlyPayment]);

  // Calculate initialFee when has been changed carCost
  React.useEffect(() => {
    if (carCost >= 1000000) {
      setInitialFee(
        Math.round(((initialFeeInPercentages || 10) / 100) * carCost)
      );
    } else {
      setInitialFee(
        initialFeeInPercentages
          ? Math.round((initialFeeInPercentages / 100) * carCost)
          : 0
      );
    }
  }, [carCost]);

  function sendApplication(event) {
    event.preventDefault();

    setApplicationIsLeft(false);

    fetch("https://eoj3r7f3r4ef6v4.m.pipedream.net", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        carCost: carCost,
        initialFee: initialFee,
        initialFeeInPercentages: initialFeeInPercentages,
        leasingTerm: leasingTerm,
        amountOfLeasingAgreement: amountOfLeasingAgreement,
        monthlyPayment: monthlyPayment
      })
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.log(error))
      .finally(() => setApplicationIsLeft(true));
  }

  return (
    <form className={styles.form} onSubmit={sendApplication}>
      <Header1
        className={styles.header}
        text="Рассчитайте стоимость автомобиля в лизинг"
      />

      <div className={styles.alignFields}>
        <RangeField
          title="Стоимость автомобиля"
          min={1000000}
          max={6000000}
          value={carCost}
          updateValue={setCarCost}
          promptText="₽"
        />

        <RangeField
          title="Первоначальный взнос"
          min={Math.floor(carCost * 0.1)}
          max={Math.floor(carCost * 0.6)}
          value={initialFee}
          updateValue={setInitialFee}
          promptText={`${initialFeeInPercentages}%`}
          promptBackground
        />

        <RangeField
          title="Срок лизинга"
          min={1}
          max={60}
          value={1}
          updateValue={setLeasingTerm}
          promptText="мес."
        />
      </div>

      <div className={styles.footerAlign}>
        <div className={styles.alignCalculations}>
          <CalculationResult
            title="Сумма договора лизинга"
            result={amountOfLeasingAgreement}
          />
          <CalculationResult
            title="Ежемесячный платеж от"
            result={monthlyPayment}
          />
        </div>

        <StyledButton className={styles.submitFormButton} isLoading={!applicationIsLeft} value="Оставить заявку" />
      </div>
    </form>
  );
}

export default CarLeasingApplication;
