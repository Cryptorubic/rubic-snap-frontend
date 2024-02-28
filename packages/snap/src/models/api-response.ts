import type { SnapStatus } from './snap-status';

export type ApiResponse = {
  status: SnapStatus;
  header: string;
  description: string[];
  profitInTokens: number | null;
  profitInUSD: number | null;
  amountOut: number | null;
  query: string | null;
};
