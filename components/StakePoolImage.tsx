import { ButtonSmall } from 'common/ButtonSmall'
import Image from 'next/image'
import { useStakePoolMetadataCtx } from 'providers/StakePoolMetadataProvider'

export const StakePoolImage = ({ onClick }: { onClick?: () => void }) => {
  const { data: config } = useStakePoolMetadataCtx()
  return config?.imageUrl ? (
    <div className="relative flex w-1/4 grow items-center justify-center rounded-xl">
      <Image
        className={`max-h-[200px] w-auto rounded-xl ${
          config?.logoPadding && 'p-8'
        }`}
        src={config?.imageUrl}
        alt={config?.displayName}
        width={600}
        height={600}
      />
    </div>
  ) : (
    <div className="flex min-h-[200px] w-full items-center justify-center rounded-xl bg-white bg-opacity-5 md:w-1/4 md:grow">
      <ButtonSmall onClick={onClick}>Add image</ButtonSmall>
    </div>
  )
}
