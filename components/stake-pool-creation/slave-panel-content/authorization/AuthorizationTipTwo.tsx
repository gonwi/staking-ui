import { InformationCircleIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

import { BodyCopy } from '@/components/UI/typography/BodyCopy'

export const AuthorizationTipTwo = () => {
  return (
    <>
      <div className="pr-16 xl:pr-80">
        <Image
          src="/images/stake-pool-creation/authorization/tip-two.png"
          height={600}
          width={600}
          layout="fixed"
          objectFit="contain"
          alt="Tip two"
        />
      </div>
      <BodyCopy className="flex items-center justify-center text-center">
        <InformationCircleIcon className="mr-2 inline-block h-6 w-6" />
        Allow for staking any tokens with specified by you creator address(es).
      </BodyCopy>
    </>
  )
}
