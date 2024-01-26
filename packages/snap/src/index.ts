import type { OnTransactionHandler } from '@metamask/snaps-types';
import { copyable, divider, heading, panel, text } from '@metamask/snaps-ui';

import { fetchApiResponse } from './api-service';
import type { ApiRequest } from './models/api-request';

export const onTransaction: OnTransactionHandler = async ({
  transaction,
  chainId,
}) => {
  const panelContent: unknown[] = [
    heading('We found more profitable route for you!'),
  ];
  try {
    const { data, value, to } = transaction;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const networkId = parseInt(chainId.split(':')[1]!, 16);

    const requestParams: ApiRequest = {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      chain_id: networkId,
      value: value as string,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      contract_address: to as string,
      calldata: data as string,
    };
    const { percent, link } = await fetchApiResponse(requestParams);

    if (percent) {
      panelContent.push(
        text(`You can get up to ${percent} more tokens using our swap tool`),
      );
    }
    panelContent.push(
      divider(),
      text('Try it out on Rubic.exchange'),
      copyable(link),
    );
  } catch {
    panelContent.push(
      divider(),
      text('Try it out on Rubic.exchange'),
      copyable('https://app.rubic.exchange/?fromChain=ETH&toChain=ETH'),
    );
  }
  return { content: panel(panelContent as any[]) };
};
