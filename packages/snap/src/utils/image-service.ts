import { alreadyOnRubic } from '../images/already-on-rubic';
import { badRate } from '../images/bad-rate';
import { noTrade } from '../images/no-trade';
import { success1 } from '../images/success1';
import { success2 } from '../images/success2';
import { wrongNetwork } from '../images/wrong-network';
import type { SnapStatus } from '../models/snap-status';
import { SNAP_STATUS } from '../models/snap-status';

export const getImageCode: (
  status: SnapStatus,
  tokensProfit: number | null,
  usdProfit: number | null,
) => string = (status, tokensProfit, usdProfit) => {
  if (status === SNAP_STATUS.ALREADY_ON_RUBIC) {
    return alreadyOnRubic;
  }
  if (status === SNAP_STATUS.UNABLE_TO_CALCULATE_ROUTE) {
    return noTrade;
  }
  if (status === SNAP_STATUS.NETWORK_NOT_SUPPORTED) {
    return wrongNetwork;
  }
  if (status === SNAP_STATUS.TRADE_CALCULATED) {
    if (tokensProfit && tokensProfit > 0 && usdProfit) {
      return success1;
    }
    if (tokensProfit && tokensProfit < 0) {
      return badRate;
    }
    return success2;
  }
  return noTrade;
};
