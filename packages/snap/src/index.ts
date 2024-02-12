import type { OnTransactionHandler } from '@metamask/snaps-types';
import { copyable, divider, image, panel, text } from '@metamask/snaps-ui';

import type { ApiRequest } from './models/api-request';
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

    const hideLink = status === SNAP_STATUS.ALREADY_ON_RUBIC;
    const svgText = getImageCode(status, profitInTokens, profitInUSD);

    const textNodes = description?.map((string) => text(string)) || [];
    const imageNode = image(svgText);
    const dividerNode = divider();

    const displayNodes: unknown[] = [...textNodes, imageNode, dividerNode];
    if (!hideLink) {
      const linkText = `https://app.rubic.exchange/${query ?? ''}`;
      displayNodes.push(
        text('Try it out on Rubic.exchange'),
        text(''),
        copyable(linkText),
      );
    }

    return { content: panel(displayNodes as any[]) };
  } catch {
    return { content: panel() };
  }
};
