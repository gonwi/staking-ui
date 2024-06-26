import { useWallet } from '@solana/wallet-adapter-react'
import type { UseMutationResult } from '@tanstack/react-query'
import { useHandleClaimRewards } from 'handlers/useHandleClaimRewards'
import type { StakeEntryTokenData } from 'hooks/useStakedTokenDatas' // Adjust if necessary
import { useStakedTokenDatas } from 'hooks/useStakedTokenDatas'
import { useStakePoolMetadataCtx } from 'providers/StakePoolMetadataProvider'
import { useState } from 'react'

import { PAGE_SIZE } from '@/components/token-staking/constants'
import { StakedToken } from '@/components/token-staking/staked-tokens/StakedToken'
import { TokenListEmptyState } from '@/components/token-staking/token-list/TokenListEmptyState'
import { TokenListLoader } from '@/components/token-staking/token-list/TokenListLoader'
import { TokenListWrapper } from '@/components/token-staking/token-list/TokenListWrapper'

import type { TokenDataType } from '../token/TokenWrapper'

export type StakedTokenListProps = {
  stakedSelected: StakeEntryTokenData[]
  setStakedSelected: (stakedSelected: StakeEntryTokenData[]) => void
  handleUnstake: UseMutationResult<
    [(string | null)[][], number],
    unknown,
    { tokenDatas: StakeEntryTokenData[] },
    unknown
  >
}

export const StakedTokenList = ({
  stakedSelected,
  setStakedSelected,
  handleUnstake,
}: StakedTokenListProps) => {
  const [pageNum, setPageNum] = useState<[number, number]>([1, PAGE_SIZE])
  const stakedTokenDatas = useStakedTokenDatas()
  const handleClaimRewards = useHandleClaimRewards()

  const wallet = useWallet()
  const { data: stakePoolMetadata } = useStakePoolMetadataCtx()

  const isStakedTokenSelected = (tk: StakeEntryTokenData) =>
    stakedSelected.some(
      (stk) =>
        stk.stakeEntry?.parsed?.stakeMint.toString() ===
        tk.stakeEntry?.parsed?.stakeMint.toString(),
    )

  const selectStakedToken = (tk: StakeEntryTokenData) => {
    if (handleUnstake.isLoading) return
    if (
      tk.stakeEntry?.parsed?.lastStaker.toString() !==
      wallet.publicKey?.toString()
    ) {
      return
    }
    if (isStakedTokenSelected(tk)) {
      setStakedSelected(
        stakedSelected.filter(
          (data) =>
            data.stakeEntry?.pubkey.toString() !==
            tk.stakeEntry?.pubkey.toString(),
        ),
      )
    } else {
      setStakedSelected([...stakedSelected, tk])
    }
  }

  function isStakeEntryTokenData(
    tokenData: TokenDataType,
  ): tokenData is StakeEntryTokenData {
    return (tokenData as StakeEntryTokenData).stakeEntry !== undefined
  }

  return (
    <TokenListWrapper setPageNum={setPageNum}>
      {!stakedTokenDatas.isFetched ? (
        <TokenListLoader />
      ) : stakedTokenDatas.data?.length === 0 ? (
        <TokenListEmptyState
          fontColor={stakePoolMetadata?.colors?.fontColor}
          message="No tokens currently staked."
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          {!stakePoolMetadata?.notFound &&
            stakedTokenDatas.data &&
            stakedTokenDatas.data.slice(0, PAGE_SIZE * pageNum[0]).map((tk) => (
              <StakedToken
                handleUnstake={handleUnstake}
                key={tk?.stakeEntry?.pubkey.toBase58()}
                tk={tk}
                select={(tokenData) => {
                  // Removed amount? parameter
                  if (isStakeEntryTokenData(tokenData)) {
                    selectStakedToken(tokenData)
                  } else {
                    console.error(
                      'Attempted to select a token without a stakeEntry',
                    )
                  }
                }}
                selected={isStakedTokenSelected(tk)}
                loadingClaim={
                  handleClaimRewards.isLoading && isStakedTokenSelected(tk)
                }
                loadingUnstake={
                  handleUnstake.isLoading && isStakedTokenSelected(tk)
                }
              />
            ))}
        </div>
      )}
    </TokenListWrapper>
  )
}
