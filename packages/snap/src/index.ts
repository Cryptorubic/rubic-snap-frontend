import type { OnTransactionHandler } from '@metamask/snaps-types';
import {
  copyable,
  divider,
  heading,
  image,
  panel,
  text,
} from '@metamask/snaps-ui';

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
      // eslint-disable-next-line @typescript-eslint/naming-convention
      chain_id: networkId,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      native_value: String(Number.parseInt(value as string, 16)),
      // eslint-disable-next-line @typescript-eslint/naming-convention
      contract_address: String(to),
      calldata: String(data),
    };
    const { status, header, description, query, profitInTokens, profitInUSD } =
      await fetchApiResponse(requestParams);

    const hideLink = status === SNAP_STATUS.ALREADY_ON_RUBIC;
    const svgText = getImageCode(status, profitInTokens, profitInUSD);
    // console.log('[SNAP] ', svgText);
    console.log(
      '[SNAP] ',
      status,
      header,
      description,
      query,
      profitInTokens,
      profitInUSD,
      hideLink,
    );

    const headerNode = heading(header);
    const textNode = text(description);
    const imageNode = image(svgText);
    const dividerNode = divider();

    const displayNodes: unknown[] = [
      headerNode,
      textNode,
      imageNode,
      dividerNode,
    ];
    if (!hideLink) {
      const linkText = `https://app.rubic.exchange/${query ?? ''}`;
      console.log('[SNAP]', linkText);
      displayNodes.push(
        text('Try it out on Rubic.exchange'),
        copyable(linkText),
      );
    }

    return { content: panel(displayNodes as any[]) };
  } catch {
    return { content: panel() };
  }
};
