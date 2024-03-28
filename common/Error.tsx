import { FooterSlim } from 'common/FooterSlim'
import { HeaderSlim } from 'common/HeaderSlim'
import Link from 'next/link'
import { BsFillQuestionSquareFill } from 'react-icons/bs'

export default function Error() {
  return (
    <div className="flex min-h-screen flex-col">
      <HeaderSlim />
      <div className="flex grow flex-col items-center justify-center gap-20">
        <div className="text-4xl">Page not found!</div>
        <div className="text-[200px]">
          <BsFillQuestionSquareFill />
        </div>
        <div className="text-lg">
          Click{' '}
          <Link className="text-blue-500" href="/">
            here
          </Link>{' '}
          to return back to safety
        </div>
      </div>
      <FooterSlim />
    </div>
  )
}
