import React from "react";
import Prompt from "./components/Prompt/Prompt";
import Range from "./components/Range/Range";
import styles from "./RangeField.module.scss";
import classNames from "classnames";

function RangeField({
  title,
  min = 0,
  max,
  value,
  updateValue = () => null,
  promptText,
  promptBackground = false,
  disabled
}) {
  const [inputValue, setInputValue] = React.useState(value);

  React.useEffect(() => {
    updateValue(Number(inputValue));
  }, [inputValue]);

  React.useEffect(() => {
    setInputValue(value);
  }, [value]);

  function clearString(string) {
    return string.replace(/\D/g, "").replace(/ /g, "");
  }

  function addSpaces(number) {
    const result = String(number)
      .split("")
      .reverse()
      .join("")
      .replace(/\d\d\d/g, "$& ")
      .split("")
      .reverse()
      .join("");

    return result[0] === " " ? result.slice(1) : result;
  }

  function setMinMaxInputValue(event) {
    const value = clearString(event.target.value);

    if (value < min) {
      setInputValue(min);
    }
  }

  function updateInputValue(event) {
    const value = clearString(event.target.value);

    if (value > max) {
      setInputValue(max);
    } else {
      setInputValue(value);
    }
  }

  return (
    <div disabled={disabled} className={styles.rangeField}>
      <label>
        <span className={styles.title} disabled={disabled}>{title}</span>
        <input
          className={styles.numberInput}
          value={addSpaces(inputValue && Math.round(inputValue))}
          onChange={updateInputValue}
          onBlur={setMinMaxInputValue}
          disabled={disabled}
        />
        {promptText && (
          <Prompt
            className={classNames(
              promptBackground && styles.promptBackground,
              styles.promptAlign
            )}
            text={promptText}
          />
        )}
        <Range
          min={min}
          max={max}
          value={inputValue}
          onChange={updateInputValue}
          disabled={disabled}
        />
      </label>
    </div>
  );
}

export default RangeField;
