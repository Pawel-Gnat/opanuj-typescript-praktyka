export type RewardRadar<T extends string> = T extends `${string}[${infer Reward}]${infer Rest}`
  ? Reward extends `${infer Num}$`
    ? Num extends '0'
      ? RewardRadar<Rest>
      : `${Num}$`
    : RewardRadar<Rest>
  : null;
