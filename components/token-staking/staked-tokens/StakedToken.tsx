import { DisplayAddress } from '@cardinal/namespaces-components'
import { useWallet } from '@solana/wallet-adapter-react'
import type { UseMutationResult } from '@tanstack/react-query'
import { LoadingSpinner } from 'common/LoadingSpinner'
import { QuickActions } from 'common/QuickActions'
import { getNameFromTokenData } from 'common/tokenDataUtils'
import { defaultSecondaryColor } from 'helpers/mapping'
import { useMintJson } from 'hooks/useMintJson'
import type { StakeEntryTokenData } from 'hooks/useStakedTokenDatas' // Adjust import if TokenDataType is defined elsewhere
import { useEnvironmentCtx } from 'providers/EnvironmentProvider'
import { useStakePoolMetadataCtx } from 'providers/StakePoolMetadataProvider'

import { TokenStatBoostBadge } from '@/components/token-staking/token-stats/UI/TokenStatBoostBadge'
import { TokenStatCooldownBadge } from '@/components/token-staking/token-stats/UI/TokenStatCooldownBadge'
import { TokenStatNextRewardBadge } from '@/components/token-staking/token-stats/UI/TokenStatNextRewardBadge'
import { TokenImage } from '@/components/token-staking/token/TokenImage'
import { TokenImageWrapper } from '@/components/token-staking/token/TokenImageWrapper'
import type { TokenDataType } from '@/components/token-staking/token/TokenWrapper'
import { TokenWrapper } from '@/components/token-staking/token/TokenWrapper'

import { StakedStats } from './StakedStats'

export const StakedToken = ({
  tk,
  selected,
  loadingUnstake,
  loadingClaim,
  select,
  handleUnstake,
}: {
  tk: StakeEntryTokenData
  selected: boolean
  loadingUnstake: boolean
  loadingClaim: boolean
  select: (tokenData: TokenDataType, amount?: string) => void // Adjusted to TokenDataType
  handleUnstake: UseMutationResult<
    [(string | null)[][], number],
    unknown,
    { tokenDatas: StakeEntryTokenData[] },
    unknown
  >
}) => {
  const wallet = useWallet()
  const { connection } = useEnvironmentCtx()
  const { data: stakePoolMetadata } = useStakePoolMetadataCtx()
  const mintJson = useMintJson(tk)

  // Function adjusted for TokenDataType compatibility
  const safeSelect = (tokenData: TokenDataType, amount?: string) => {
    if ('stakeEntry' in tokenData) {
      // If the tokenData has a stakeEntry, it's a StakeEntryTokenData
      select(tokenData, amount)
    } else {
      // Log or handle the case where tokenData is not StakeEntryTokenData, as needed
      console.error('Attempted to select a token without a stakeEntry')
    }
  }

  return (
    <div key={tk?.stakeEntry?.pubkey.toBase58()}>
      <TokenWrapper token={tk} selected={selected} select={safeSelect}>
        {(loadingClaim || loadingUnstake) && (
          <div>
            <div className="absolute top-0 left-0 z-10 flex h-full w-full justify-center rounded-lg bg-black bg-opacity-80 align-middle text-white">
              <div className="mx-auto flex items-center justify-center">
                <span className="mr-2">
                  <LoadingSpinner height="20px" />
                </span>
                {loadingUnstake ? 'Unstaking token...' : 'Claiming rewards...'}
              </div>
            </div>
          </div>
        )}
        {tk.stakeEntry?.parsed?.lastStaker.toString() !==
          wallet.publicKey?.toString() && (
          <div>
            <div className="absolute top-0 left-0 z-10 flex h-full w-full justify-center rounded-xl bg-black bg-opacity-80 align-middle text-white">
              <div className="mx-auto flex flex-col items-center justify-center">
                <div>Owned by</div>
                <DisplayAddress
                  dark
                  connection={connection}
                  address={tk.stakeEntry?.parsed?.lastStaker}
                />
              </div>
            </div>
          </div>
        )}
        <QuickActions
          stakedTokenData={tk}
          selectUnstakedToken={() => {}}
          selectStakedToken={select}
        />
        <TokenImageWrapper>
          <TokenImage token={tk} />
          <div className="absolute top-2 left-2 flex w-1/2 flex-wrap space-y-0.5">
            <TokenStatNextRewardBadge tokenData={tk} />
            <TokenStatCooldownBadge tokenData={tk} />
          </div>
          <TokenStatBoostBadge
            className="absolute left-2 bottom-6"
            tokenData={tk}
          />
        </TokenImageWrapper>

        <div
          className={`flex-col rounded-b-xl p-2 ${stakePoolMetadata?.colors?.fontColor ? `text-[${stakePoolMetadata?.colors?.fontColor}]` : 'text-gray-200'} ${stakePoolMetadata?.colors?.backgroundSecondary ? `bg-[${stakePoolMetadata?.colors?.backgroundSecondary}]` : 'bg-white bg-opacity-10'}`}
          style={{
            background: stakePoolMetadata?.colors?.backgroundSecondary,
          }}
        >
          <div className="truncate px-2 text-xl font-bold">
            {getNameFromTokenData(tk, mintJson?.data)}
          </div>
          <div className="truncate font-semibold">
            {tk.tokenListData?.symbol}
          </div>
          <StakedStats tokenData={tk} />
          <div className="flex p-2">
            <button
              style={{
                background:
                  stakePoolMetadata?.colors?.secondary || defaultSecondaryColor,
                color:
                  stakePoolMetadata?.colors?.fontColorSecondary ||
                  stakePoolMetadata?.colors?.fontColor,
              }}
              className="flex-grow rounded-lg p-2 transition-all hover:scale-[1.03]"
              onClick={(e) => {
                e.stopPropagation()
                !selected && select(tk)
                handleUnstake.mutate({ tokenDatas: [tk] })
              }}
            >
              Unstake
            </button>
          </div>
        </div>
      </TokenWrapper>
    </div>
  )
}
