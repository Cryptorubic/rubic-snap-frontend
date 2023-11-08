import type { MetaMaskInpageProvider } from '@metamask/providers';

import { defaultSnapOrigin } from '../config';
import type { GetSnapsResponse, Snap } from '../types';

/**
 * Get the installed snaps in MetaMask.
 *
 * @param provider - The MetaMask inpage provider.
 * @returns The snaps installed in MetaMask.
 */
export const getSnaps = async (
  provider?: MetaMaskInpageProvider,
): Promise<GetSnapsResponse> =>
  (await (provider ?? window.ethereum).request({
    method: 'wallet_getSnaps',
  })) as unknown as GetSnapsResponse;
/**
 * Connect a snap to MetaMask.
 *
 * @param snapId - The ID of the snap.
 * @param params - The params to pass with the snap to connect.
 */
export const connectSnap = async (
  snapId: string = defaultSnapOrigin,
  params: Record<'version' | string, unknown> = {},
) => {
  await window.ethereum.request({
    method: 'wallet_requestSnaps',
    params: {
      [snapId]: params,
    },
  });
};

/**
 * Get the snap from MetaMask.
 *
 * @param version - The version of the snap to install (optional).
 * @returns The snap object returned by the extension.
 */
export const getSnap = async (version?: string): Promise<Snap | undefined> => {
  try {
    const snaps = await getSnaps();

    return Object.values(snaps).find(
      (snap) =>
        snap.id === defaultSnapOrigin && (!version || snap.version === version),
    );
  } catch (error) {
    console.log('Failed to obtain installed snap', error);
    return undefined;
  }
};

/**
 * Invoke the "hello" method from the example snap.
 */

export const sendHello = async () => {
  await window.ethereum
    .request({
      method: 'eth_requestAccounts',
    })
    .then(async () => {
      return window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: '0xDC590D4C82f0eef40f162872B98515c374c3195c',
            data: '0x7ff36ab50000000000000000000000000000000000000000000000000000000083b04a3b0000000000000000000000000000000000000000000000000000000000000080000000000000000000000000dc590d4c82f0eef40f162872b98515c374c3195c000000000000000000000000000000000000000000000000000000006544e27f0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000b4fbf271143f4fbf7b91a5ded31805e42b2208d600000000000000000000000007865c6e87b9f70255377e024ace6630c1eaa37f',
            to: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
          },
        ],
      });
    });
};

export const isLocalSnap = (snapId: string) => snapId.startsWith('local:');
