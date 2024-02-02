export type ApiRequest = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  chain_id: number;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  native_value: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  contract_address: string;
  calldata: string;
};
