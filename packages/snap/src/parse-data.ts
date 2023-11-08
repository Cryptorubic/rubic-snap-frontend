import type { JsonFunctionInterface } from 'web3-types/src/eth_abi_types';

import { decodeMethod } from './decode-method';
import { methodMapping } from './method-mapping';
import { abi } from './pancake-abi';

export const parseData: (data: string) => string = (data: string) => {
  const trueData = data.slice(394);
  const signature = trueData.slice(0, 10);
  const method = methodMapping[signature];
  if (!method) {
    throw new Error('No method found');
  }

  const methodAbi = abi.find((abiMethod) => abiMethod.name === method);
  if (!methodAbi) {
    throw new Error('No method found');
  }

  const decodeData = decodeMethod(
    methodAbi as unknown as JsonFunctionInterface,
    trueData,
  );

  return JSON.stringify(decodeData);
};
