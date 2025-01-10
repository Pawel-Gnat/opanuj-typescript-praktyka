export function swapBox<T>(a: T, b: T): [T, T] {
  return [b, a];
}

const [n1, n2] = swapBox(10, 20);
const [s1, s2] = swapBox('hello', 'world');
const [x, y] = swapBox(false, true);
