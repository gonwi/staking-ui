/* eslint-disable react/prop-types */
// Import statements remain unchanged, they're already perfect for a guessing game.
import { GlyphActivity } from 'assets/GlyphActivity'
import { GlyphPerformance } from 'assets/GlyphPerformance'
import { GlyphQuestion } from 'assets/GlyphQuestion'
import { useStakePoolMetadataCtx } from 'providers/StakePoolMetadataProvider'
import { AiFillStar } from 'react-icons/ai'
import { MdAccessTimeFilled, MdSell } from 'react-icons/md'
// eslint-disable-next-line react/prop-types
export const Info = ({
  header,
  description,
  icon,
  content,
  className = '',
  colorized,
  ...rest
}) => {
  const { data: config } = useStakePoolMetadataCtx()

  // Determine icon rendering logic based on the icon prop
  const renderIcon = () => {
    switch (icon) {
      case 'time':
        return <MdAccessTimeFilled color={config?.colors?.fontColor} />
      case 'featured':
        return <AiFillStar color={config?.colors?.fontColor} />
      case 'available':
        return (
          <MdSell
            className="h-[68px] w-[68px] rounded-full border-[2px] border-medium-4 p-3"
            color={config?.colors?.fontColor}
          />
        )
      case 'info':
        return <GlyphQuestion color={config?.colors?.fontColor} />
      case 'activity':
        return (
          <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full border-[2px] border-medium-4 p-3">
            <div className="scale-[2]">
              <GlyphActivity color={config?.colors?.fontColor} />
            </div>
          </div>
        )
      case 'performance':
        return <GlyphPerformance color={config?.colors?.fontColor} />
      default:
        return null
    }
  }

  return (
    <div
      {...rest} // Spread any other props to the top-level div.
      className={`relative z-0 flex flex-col items-center overflow-hidden rounded-xl bg-white bg-opacity-5 px-8 py-4 text-center text-xl md:flex-row md:text-left ${className || ''} ${colorized ? 'some-color-class' : ''}`}
      style={{
        color: config?.colors?.fontColor,
        background: config?.colors?.backgroundSecondary,
        border: config?.colors?.accent
          ? `2px solid ${config?.colors?.accent}`
          : '',
      }}
    >
      <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
        <div>{renderIcon()}</div>
        <div className="flex flex-col">
          <div>{header}</div>
          <div className="text-sm opacity-75">{description}</div>
        </div>
      </div>
      {content}
    </div>
  )
}
