export const calculateCenter = (
  objects: { x: number; y: number }[],
): number[] => {
  console.log(objects);
  let xSum = 0;
  let ySum = 0;

  for (const item of objects) {
    xSum += item.x;
    ySum += item.y;
  }

  console.log(xSum, ySum);

  return [xSum / objects.length, ySum / objects.length];
};
