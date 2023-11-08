import type { OnTransactionHandler } from '@metamask/snaps-types';
import { heading, panel, text } from '@metamask/snaps-ui';

// type ParsedData = {
//   fromAmount: string;
//   fromAddress: string;
//   toAddress: string;
// };

/**
 * Handle an incoming transaction, and return any insights.
 *
 * @param args - The request handler args as object.
 * @param args.transaction - The transaction object.
 * @returns The transaction insights.
 */
export const onTransaction: OnTransactionHandler = async ({ transaction }) => {
  // const { fromAmount, fromAddress, toAddress } = this.parseData();
  // const test = parseData(data.transaction)

  return panel([heading('Rubic suggestion'), text('PRIVET')]);
};
