import { useState, useEffect, useRef } from "react";

interface AdnMatrixInputProps {
  initialMatrix?: string[][];
  onChange: (adn: string[]) => void;
  rows: number;
  cols: number;
  className?: string;
}

const ALLOWED = /^[ACGT]?$/i;

const AdnInput = ({
  initialMatrix,
  onChange,
  rows,
  cols,
  className,
}: AdnMatrixInputProps) => {
  const [matrix, setMatrix] = useState<string[][]>(
    () =>
      initialMatrix ?? Array.from({ length: rows }, () => Array(cols).fill(""))
  );

  const inputRefs = useRef<(HTMLInputElement | null)[][]>(
    Array.from({ length: rows }, () => Array(cols).fill(null))
  );

  useEffect(() => {
    if (initialMatrix) {
      const normalized = Array.from({ length: rows }, (_, i) =>
        Array.from({ length: cols }, (_, j) => initialMatrix[i]?.[j] ?? "")
      );
      setMatrix(normalized);
    } else {
      setMatrix(Array.from({ length: rows }, () => Array(cols).fill("")));
    }
    inputRefs.current = Array.from({ length: rows }, (__, i) =>
      Array.from({ length: cols }, (__, j) => inputRefs.current[i]?.[j] ?? null)
    );
  }, [initialMatrix, rows, cols]);

  const commitMatrix = (next: string[][]) => {
    setMatrix(next);
    const adnArray = next.map((r) => r.join(""));
    onChange(adnArray);
  };

  const focusNext = (rowIndex: number, colIndex: number) => {
    if (colIndex < cols - 1) {
      inputRefs.current[rowIndex][colIndex + 1]?.focus();
    } else if (rowIndex < rows - 1) {
      inputRefs.current[rowIndex + 1][0]?.focus();
    }
  };

  const focusPrev = (rowIndex: number, colIndex: number) => {
    if (colIndex > 0) {
      inputRefs.current[rowIndex][colIndex - 1]?.focus();
    } else if (rowIndex > 0) {
      inputRefs.current[rowIndex - 1][cols - 1]?.focus();
    }
  };

  const handleCellChange = (
    rowIndex: number,
    colIndex: number,
    raw: string
  ) => {
    const val = raw.toUpperCase().slice(0, 1);
    if (!ALLOWED.test(val)) return;

    const next = matrix.map((r) => [...r]);
    next[rowIndex][colIndex] = val;
    commitMatrix(next);

    if (val) focusNext(rowIndex, colIndex);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent,
    rowIndex: number,
    colIndex: number
  ) => {
    if (e.key === "Backspace" && !matrix[rowIndex][colIndex]) {
      e.preventDefault();
      focusPrev(rowIndex, colIndex);
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      focusNext(rowIndex, colIndex);
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      focusPrev(rowIndex, colIndex);
    }
    if (e.key === "ArrowDown" && rowIndex < rows - 1) {
      e.preventDefault();
      inputRefs.current[rowIndex + 1][colIndex]?.focus();
    }
    if (e.key === "ArrowUp" && rowIndex > 0) {
      e.preventDefault();
      inputRefs.current[rowIndex - 1][colIndex]?.focus();
    }
  };

  const handlePaste = async (
    e: React.ClipboardEvent<HTMLInputElement>,
    rowIndex: number,
    colIndex: number
  ) => {
    const text = (e.clipboardData.getData("text") || "")
      .toUpperCase()
      .replace(/[^ACGT]/g, "");
    if (!text) return;
    e.preventDefault();

    const next = matrix.map((r) => [...r]);
    let r = rowIndex,
      c = colIndex;

    for (const ch of text) {
      next[r][c] = ch;
      if (c < cols - 1) c++;
      else if (r < rows - 1) {
        r++;
        c = 0;
      } else break;
    }

    commitMatrix(next);
    inputRefs.current[r][c]?.focus();
  };

  return (
    <div className={`inline-block border-2 border-gray-500 ${className ?? ""}`}>
      {matrix.map((row, i) => (
        <div key={i} className={`flex ${i > 0 ? "-mt-px" : ""}`}>
          {row.map((cell, j) => (
            <input
              key={`${i}-${j}`}
              ref={(el) => {
                if (!inputRefs.current[i]) inputRefs.current[i] = [];
                inputRefs.current[i][j] = el;
              }}
              type="text"
              inputMode="text"
              autoComplete="off"
              maxLength={1}
              value={cell}
              onChange={(e) => handleCellChange(i, j, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, i, j)}
              onPaste={(e) => handlePaste(e, i, j)}
              className={`w-12 h-12 sm:w-14 sm:h-14 text-center text-lg font-bold uppercase
                          border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500
                          ${j > 0 ? "-ml-px" : ""}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default AdnInput;
