import { useCallback, useEffect, useRef, useState } from "react";
import "./modalDropDownSearch.scss";

interface Props<T> {
  results?: T[];
  renderItem(item: T): JSX.Element;
  onChange?: React.ChangeEventHandler;
  onSelect?: (item: T) => void;
  value?: string;
  showStudentName: boolean;
}

const ModalDropDownSearch = <T extends object>({
  results = [],
  renderItem,
  value,
  onChange,
  onSelect,
  showStudentName,
}: Props<T>): JSX.Element => {
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const resultContainer = useRef<HTMLDivElement>(null);
  const [showResults, setShowResults] = useState(false);
  const [defaultValue, setDefaultValue] = useState("");

  const handleSelection = (selectedIndex: number) => {
    const selectedItem = results[selectedIndex];
    if (!selectedItem) return resetSearchComplete();
    onSelect && onSelect(selectedItem);
    resetSearchComplete();
  };

  const resetSearchComplete = useCallback(() => {
    setFocusedIndex(-1);
    setShowResults(false);
  }, []);

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    const { key } = e;
    let nextIndexCount = 0;

    // move down
    if (key === "ArrowDown")
      nextIndexCount = (focusedIndex + 1) % results.length;

    // move up
    if (key === "ArrowUp")
      nextIndexCount = (focusedIndex + results.length - 1) % results.length;

    // hide search results
    if (key === "Escape") {
      resetSearchComplete();
    }

    // select the current item
    if (key === "Enter") {
      e.preventDefault();
      handleSelection(focusedIndex);
    }

    setFocusedIndex(nextIndexCount);
  };

  type changeHandler = React.ChangeEventHandler<HTMLInputElement>;
  const handleChange: changeHandler = (e) => {
    setDefaultValue(e.target.value);
    onChange && onChange(e);
  };

  useEffect(() => {
    if (!resultContainer.current) return;

    resultContainer.current.scrollIntoView({
      block: "center",
    });
  }, [focusedIndex]);

  useEffect(() => {
    if (results.length > 0 && !showResults) setShowResults(true);

    if (results.length <= 0) setShowResults(false);
  }, [results]);

  useEffect(() => {
    if (value) setDefaultValue(value);
  }, [value]);

  return (
    <div
      className="DropDownContainer"
      tabIndex={1}
      onBlur={resetSearchComplete}
      onKeyDown={handleKeyDown}
    >
      <input
        value={defaultValue !== "undefined undefined" ? defaultValue : ""}
        onChange={handleChange}
        className={
          showStudentName ? "DropDownBoxDropDownBoxDisabled" : "DropDownBox"
        }
        placeholder="Nombre del estudiante"
      />

      {/* Search Results Container */}
      {showResults && (
        <div className="showResults">
          {results.map((item, index) => {
            return (
              <div
                key={index}
                onMouseDown={() => handleSelection(index)}
                ref={index === focusedIndex ? resultContainer : null}
                className="cursorPointer"
              >
                {renderItem(item)}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ModalDropDownSearch;
