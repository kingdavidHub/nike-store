export function getHeight(index: number, tall: number, short: number) {
  const position = index % 4;
  return position === 0 || position === 3 ? tall : short;
}
