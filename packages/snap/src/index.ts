import type { OnTransactionHandler } from '@metamask/snaps-types';
import { copyable, image, panel, text } from '@metamask/snaps-ui';

import { instruction } from './consts/instruction';
import type { ApiRequest } from './models/api-request';
import type { MmNode } from './models/mm-node';
import { SNAP_STATUS } from './models/snap-status';
import { fetchApiResponse } from './utils/api-service';
import { getImageCode } from './utils/image-service';

export const onTransaction: OnTransactionHandler = async ({
  transaction,
  chainId,
}) => {
  try {
    const { data, value, to } = transaction;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const networkId = parseInt(chainId.split(':')[1]!, 16);

    const requestParams: ApiRequest = {
      chain_id: networkId,
      native_value: String(Number.parseInt(value as string, 16)),
      contract_address: String(to),
      calldata: String(data),
    };
    const { status, description, query, profitInTokens, profitInUSD } =
      await fetchApiResponse(requestParams);

    const textNodes =
      description?.map((string) => text({ value: string, markdown: true })) ??
      [];
    const imageNode = image(getImageCode(status, profitInTokens, profitInUSD));
    const displayNodes: MmNode[] = [...textNodes, imageNode];

    if (status !== SNAP_STATUS.ALREADY_ON_RUBIC) {
      const linkText = `https://app.rubic.exchange/${query ?? ''}`;
      displayNodes.push(
        text('Try it out on Rubic.exchange'),
        text(''),
        copyable(linkText),
      );
      if (query) {
        const instructionNodes = instruction.map((step) => text(step));
        displayNodes.push(...instructionNodes);
      }
    }

    return { content: panel(displayNodes as any[]) };
  } catch {
    return {
      content: panel([
        image(getImageCode(SNAP_STATUS.NO_TRADE, null, null)),
        text('Try it out on Rubic.exchange'),
        text(''),
        copyable('https://app.rubic.exchange'),
      ]),
    };
  }
};
