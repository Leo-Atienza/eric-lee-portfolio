export const springs = {
  snappy: { type: "spring" as const, stiffness: 400, damping: 30 },
  standard: { type: "spring" as const, stiffness: 200, damping: 25 },
  bouncy: { type: "spring" as const, stiffness: 300, damping: 15 },
  gentle: { type: "spring" as const, stiffness: 100, damping: 20 },
};
