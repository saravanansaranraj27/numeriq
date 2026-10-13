export type Matrix = number[][];

function validate(matrix: Matrix) {
  if (!matrix.length || !matrix[0]?.length) throw new Error("Matrix cannot be empty");
  const columns = matrix[0].length;
  if (matrix.some((row) => row.some((value) => !Number.isFinite(value))))
    throw new Error("Matrix cells must be finite numbers");
  if (matrix.some((row) => row.length !== columns))
    throw new Error("All rows must have equal length");
}

export function addMatrices(a: Matrix, b: Matrix): Matrix {
  validate(a);
  validate(b);
  if (a.length !== b.length || a[0].length !== b[0].length)
    throw new Error("Matrix dimensions must match");
  return a.map((row, i) => row.map((value, j) => value + b[i][j]));
}

export function multiplyMatrices(a: Matrix, b: Matrix): Matrix {
  validate(a);
  validate(b);
  if (a[0].length !== b.length) throw new Error("Invalid matrix dimensions for multiplication");
  return a.map((row) =>
    b[0].map((_, j) => b.reduce((sum, current, i) => sum + row[i] * current[j], 0)),
  );
}

export function determinant(matrix: Matrix): number {
  validate(matrix);
  if (matrix.length !== matrix[0].length) throw new Error("Determinant requires a square matrix");
  if (matrix.length === 1) return matrix[0][0];
  if (matrix.length === 2) return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
  return matrix[0].reduce((total, value, column) => {
    const minor = matrix.slice(1).map((row) => row.filter((_, index) => index !== column));
    return total + value * ((column % 2 === 0 ? 1 : -1) * determinant(minor));
  }, 0);
}

export function matrixToText(matrix: Matrix): string {
  return matrix
    .map((row) => row.map((value) => Number(value.toPrecision(10))).join("   "))
    .join("\n");
}

export function subtractMatrices(a: Matrix, b: Matrix): Matrix {
  validate(a);
  validate(b);
  if (a.length !== b.length || a[0].length !== b[0].length)
    throw new Error("Matrix dimensions must match");
  return a.map((row, i) => row.map((value, j) => value - b[i][j]));
}

export function transposeMatrix(matrix: Matrix): Matrix {
  validate(matrix);
  return matrix[0].map((_, column) => matrix.map((row) => row[column]));
}

export function inverseMatrix(matrix: Matrix): Matrix {
  validate(matrix);
  if (matrix.length !== matrix[0].length) throw new Error("Inverse requires a square matrix");
  const size = matrix.length;
  const augmented = matrix.map((row, index) => [
    ...row,
    ...row.map((_, column) => Number(index === column)),
  ]);
  for (let column = 0; column < size; column += 1) {
    let pivot = column;
    for (let row = column + 1; row < size; row += 1) {
      if (Math.abs(augmented[row][column]) > Math.abs(augmented[pivot][column])) pivot = row;
    }
    if (Math.abs(augmented[pivot][column]) < 1e-12)
      throw new Error("Matrix is singular and has no inverse");
    [augmented[column], augmented[pivot]] = [augmented[pivot], augmented[column]];
    const divisor = augmented[column][column];
    augmented[column] = augmented[column].map((value) => value / divisor);
    for (let row = 0; row < size; row += 1) {
      if (row === column) continue;
      const factor = augmented[row][column];
      augmented[row] = augmented[row].map(
        (value, index) => value - factor * augmented[column][index],
      );
    }
  }
  return augmented.map((row) =>
    row.slice(size).map((value) => (Math.abs(value) < 1e-12 ? 0 : value)),
  );
}
