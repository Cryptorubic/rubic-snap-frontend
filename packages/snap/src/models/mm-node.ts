import type { NodeType } from '@metamask/snaps-ui/dist/types/nodes';

export type MmNode = {
  value: string;
  type: NodeType;
  markdown?: boolean | undefined;
};
