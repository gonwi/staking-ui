import classNames from 'classnames'
import type { AllowedTokenData } from 'hooks/useAllowedTokenDatas'
import type { StakeEntryTokenData } from 'hooks/useStakedTokenDatas'
import { useStakePoolMetadataCtx } from 'providers/StakePoolMetadataProvider'
import React from 'react'

// Here, we define TokenDataType as a union type to accept both AllowedTokenData and StakeEntryTokenData.
export type TokenDataType = AllowedTokenData | StakeEntryTokenData

interface TokenWrapperProps {
  select: (tokenData: TokenDataType, amount?: string) => void
  selected: boolean
  children: React.ReactNode
  token: TokenDataType // Accepts both types.
}

export const TokenWrapper: React.FC<TokenWrapperProps> = ({
  token,
  children,
  selected,
  select,
}) => {
  const { data: stakePoolMetadata } = useStakePoolMetadataCtx()

  // Here we adjust the onClick handler to check the type of tokenData before calling select.
  // This ensures that select is called with the correct type.
  const handleClick = () => {
    // This check ensures we are dealing with StakeEntryTokenData.
    if ('stakeEntry' in token) {
      select(token as StakeEntryTokenData)
    } else {
      // Assuming the other case is AllowedTokenData, handle it accordingly.
      select(token as AllowedTokenData)
    }
  }

  return (
    <div
      className={classNames(
        'relative flex cursor-pointer flex-col rounded-2xl border-4',
        {
          'border-orange-500 shadow-lg':
            selected && !stakePoolMetadata?.colors?.secondary,
          'border-gray-700': !selected,
        },
      )}
      onClick={handleClick} // Use handleClick to discern the type before calling select.
      style={{
        borderColor: selected ? stakePoolMetadata?.colors?.secondary : '',
        boxShadow: selected
          ? `0px 0px 20px ${stakePoolMetadata?.colors?.secondary || '#FFFFFF'}`
          : '',
      }}
    >
      {children}
    </div>
  )
}
