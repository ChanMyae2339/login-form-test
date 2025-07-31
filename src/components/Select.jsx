import React, { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

const SelectTest = ({
  label,
  isRequired,
  onChange,
  errorMessage,
  options,
  isSearchable,
  isMulti,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [availableOpt, setAvailableOpt] = useState([...options]);
  const [selected, setSelected] = useState(isMulti ? [] : null);
  const [searchValue, setSearchValue] = useState("");
  const divRef = useRef();

  useEffect(() => {
    if (!isSearchable) return;
    if (!searchValue.trim()) {
      const availableOptions = [...options].filter(
        (opt) => !selected?.some((sel) => sel.value === opt.value)
      );
      setAvailableOpt(availableOptions);
    } else {
      const updated = availableOpt?.find(
        (opt) => opt.label.toLowerCase() === searchValue.toLowerCase()
      );
      if (updated) {
        const availableOptions = availableOpt.filter(
          (opt) => updated.value === opt.value
        );
        setAvailableOpt([...availableOptions]);
      }
    }
  }, [searchValue, isSearchable]);

  useEffect(() => {
    const handleOutside = (event) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
    };
  }, []);

  const chooseMenu = (menu) => {
    if (isMulti) {
      const exists = selected?.find((item) => item.value === menu.value);
      const updated = exists
        ? selected.filter((item) => item.value !== menu.value)
        : [...selected, menu];
      onChange(updated?.map((item) => item.value));
      setSelected(updated);

      const availableOptions = availableOpt.filter(
        (opt) => !updated.some((sel) => sel.value === opt.value)
      );
      setAvailableOpt(availableOptions);
    } else {
      const exists = selected?.value === menu.value;
      const updated = exists ? null : menu;
      onChange(updated ? updated.value : "");
      setSelected(updated);
      let newAvailable = availableOpt;
      if (!exists && selected) {
        newAvailable = [...availableOpt, selected];
      }
      if (updated) {
        newAvailable = newAvailable.filter(
          (opt) => opt.value !== updated.value
        );
      }
      setAvailableOpt(newAvailable);
    }
  };


  const clearAll = () => {
    onChange([]);
    setSelected([]);
    setAvailableOpt([...options]);
  };

  return (
    <div className="flex flex-col items-start w-full " ref={divRef}>
      <p className="text-sm mb-2">
        <span
          className={
            errorMessage ? "text-red-600" : "text-indigo-700 font-semibold"
          }
        >
          {label}
        </span>
        <span
          className={`ml-2 ${isRequired ? "text-red-600" : "text-gray-400"}`}
        >
          {isRequired ? "*" : "optional"}
        </span>
      </p>
      <div className="relative w-full ">
        <div
          className={`border rounded-xl px-3 py-2 bg-white/90 hover:bg-blue-50 focus-within:bg-white transition cursor-pointer shadow-sm ${
            isSearchable ? "" : "h-[40px]"
          } ${errorMessage ? "border-red-600" : "border-blue-200"}`}
          onClick={() => setShowMenu(true)}
        >
          {isMulti ? (
            <>
             
               {selected?.length > 0 &&
                                <div className='flex flex-wrap gap-2 mb-2'>
                                    {selected?.map((val, i) =>
                                        <div key={i} className='flex items-center gap-2 py-1 px-2 bg-indigo-500 rounded-lg text-white shadow'>
                                            <span>{val?.label}</span>
                                            <span className="cursor-pointer font-bold" onClick={() => clearItem(val)}>×</span>
                                        </div>
                                    )}
                                </div>
                            }
                            {isSearchable &&
                                <input
                                    className="bg-transparent outline-none ml-2 text-gray-700"
                                    value={searchValue}
                                    onChange={(e) => setSearchValue(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            const updated = availableOpt.slice(1)?.find(
                                                (opt) => opt.label.toLowerCase() === searchValue.toLowerCase()
                                            );
                                            if (updated) {
                                                setSelected([...selected, updated]);
                                                const availableOptions = availableOpt.filter(
                                                    opt => (updated.value !== opt.value)
                                                );
                     setAvailableOpt(availableOptions)
                                                onChange([...selected, updated]?.map(item => item.value))
                                                setSearchValue('')
                                            }
                                        }
                                    }}
                                    placeholder="Type to search..."
                                />
                            }
                            {selected &&
                                <div className="absolute right-12 top-1/2 -translate-y-1/2 flex items-center gap-4 text-gray-400 cursor-pointer" onClick={clearAll}>
                                    <span className="text-xs font-semibold">Clear</span>
                                </div>
                            }
            </>
          ) : (
            <>
              {selected && (
                <div
                  className="  gap-2 cursor-pointer  "
                  onClick={clearAll}
                >
                  <span className="text-xs font-semibold text-red-800 mr-3">Clear</span>
                  <span className="bg-blue-200  rounded-lg text-indigo-700">
                    {selected?.label}
                  </span>
                </div>
              )}
            </>
          )}
          <div className="flex justify-end  absolute top-0 right-3 h-full items-center">
            <ChevronDown className="text-gray-400 transition-all" />
          </div>
        </div>
        {showMenu && (
          <div className="absolute left-0 right-0 mt-2 bg-white border border-blue-100 rounded-xl shadow-lg z-20">
            {availableOpt?.map((opt, i) => (
              <button
                key={i}
                disabled={opt.label?.toLowerCase() === "select"}
                onClick={() => chooseMenu(opt)}
                className="block w-full text-left px-4 py-2 hover:bg-blue-50 transition bg-white rounded-lg"
              >
                {opt?.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectTest;
