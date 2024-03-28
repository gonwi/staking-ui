import { tryPublicKey } from '@cardinal/common'
import { PublicKey } from '@solana/web3.js'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useStakePoolMetadataCtx } from 'providers/StakePoolMetadataProvider'

export const useStakePoolId = () => {
  const stakePoolMetadata = useStakePoolMetadataCtx();
  const { query: { stakePoolId } } = useRouter();

  return useQuery({
    queryKey: [
      'useStakePoolId',
      stakePoolId?.toString(),
      stakePoolMetadata.data?.stakePoolAddress.toString(),
    ],
    queryFn: async () => {
      if (stakePoolMetadata.data) {
        return new PublicKey(stakePoolMetadata.data.stakePoolAddress);
      } 
      return tryPublicKey(stakePoolId) ?? null;
    } 
  });
};
