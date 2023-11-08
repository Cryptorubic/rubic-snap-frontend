// eslint-disable-next-line import/no-extraneous-dependencies
import BigNumber from 'bignumber.js';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Web3 } from 'web3';
import type { JsonFunctionInterface } from 'web3-types/src/eth_abi_types';

export const decodeMethod = (abiItem: JsonFunctionInterface, data: string) => {
  const abiCoder = new Web3().eth.abi;

  const { inputs } = abiItem;
  const decoded = abiCoder.decodeParameters(inputs, data.slice(10));

  const decodedData: {
    name: string;
    params: {
      name: string;
      value: unknown;
      type: string;
    }[];
  } = {
    name: abiItem.name,
    params: [],
  };

  for (let i = 0; i < decoded.__length__; i++) {
    const param = decoded[i];
    let parsedParam = param;
    const isUint = inputs[i]?.type.startsWith('uint');
    const isInt = inputs[i]?.type.startsWith('int');
    const isAddress = inputs[i]?.type.startsWith('address');

    if (isUint || isInt) {
      const isArray = Array.isArray(param);

      if (isArray) {
        parsedParam = param.map((val) => new BigNumber(val).toFixed());
      } else {
        parsedParam = new BigNumber(
          param as string | number | BigNumber.Instance,
        ).toFixed();
      }
    }

    // Addresses returned by web3 are randomly cased so we need to standardize and lowercase all
    if (isAddress) {
      const isArray = Array.isArray(param);

      if (isArray) {
        parsedParam = param.map((_) => _.toLowerCase());
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        parsedParam = param.toLowerCase();
      }
    }

    decodedData.params.push({
      name: inputs[i]?.name ?? '',
      value: parsedParam,
      type: inputs[i]?.type ?? '',
    });
  }

  return decodedData;
};
