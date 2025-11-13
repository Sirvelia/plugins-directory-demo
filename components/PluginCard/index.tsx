import Link from "next/link"
import { Star, Users, ChartNoAxesColumn, Plus, Check } from "lucide-react"
import { decode } from "html-entities"
import { useCompareStore } from "../../stores/compareStore"

export const PluginCard = ({ plugin }: { plugin: WordPressPlugin }) => {
  const { isComparing, plugins, addPlugin, removePlugin } = useCompareStore()
  const isInComparison = plugins.some(p => p.slug === plugin.slug)
  const canAddToComparison = plugins.length < 4 && !isInComparison

  // Convert rating from 0-100 to 0-5 scale
  const rating = plugin.rating / 20
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5

  const authorName = plugin.author.match(/<[^>]*>(.*?)<\/[^>]*>/)?.[1] || ''

  const handleComparisonClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (isInComparison) {
      removePlugin(plugin)
    } else if (canAddToComparison) {
      addPlugin(plugin)
    }
  }

  // Check if plugin is obsolete (last updated more than 2 years ago)
  const isObsolete = () => {
    const dateMatch = plugin.last_updated.match(/(\d{4}-\d{2}-\d{2})\s+(\d{1,2}):(\d{2})(am|pm)/i)
    if (!dateMatch) return false

    const [, datePart, hourStr, minute, ampm] = dateMatch
    let hour = parseInt(hourStr, 10)

    if (ampm.toLowerCase() === 'pm' && hour !== 12) {
      hour += 12
    } else if (ampm.toLowerCase() === 'am' && hour === 12) {
      hour = 0
    }

    const [year, month, day] = datePart.split('-').map(Number)
    const lastUpdatedDate = new Date(Date.UTC(year, month - 1, day, hour, parseInt(minute, 10)))
    const twoYearsAgo = new Date()
    twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2)

    return lastUpdatedDate < twoYearsAgo
  }

  const CardContent = () => (
    <>
      <div className="relative h-full border border-[#d9d9d9] flex flex-col justify-between p-[20px] rounded-[2px] group-hover:border-[#000] space-y-4">
        <div className="space-y-4">
          <div className="flex gap-4">
            <img className="w-[80px] h-[80px]" src={Object.values(plugin.icons).pop() as string} alt={plugin.name} />

            <div>
              <h3 className="text-[18px] font-[500] text-[#3858e9]">{decode(plugin.name)}</h3>
              <div className="flex items-center gap-1 mt-1">
                {[...Array(5)].map((_, i) => {
                  const isFilled = i < fullStars || (i === fullStars && hasHalfStar)
                  return (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${isFilled ? 'fill-[#e26f56] text-[#e26f56]' : 'text-[#d9d9d9] stroke-[#e26f56]'} `}
                    />
                  )
                })}
                <span className="text-[14px] font-[400] text-[#656a71]">({plugin.num_ratings})</span>
              </div>
            </div>
          </div>

          <div className="text-[14px] font-[400] text-[#656a71]">{decode(plugin.short_description)}</div>
        </div>

        <div>
          <div className="text-[14px] flex items-center gap-2">
            <Users size={16} />
            <span>{authorName}</span>
          </div>
        </div>

        {/* Comparison button */}
        {isComparing && (
          <div className="absolute top-2 right-2">
            <button
              onClick={handleComparisonClick}
              disabled={!canAddToComparison && !isInComparison}
              className={`p-2 rounded-full transition-colors ${
                isInComparison
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : canAddToComparison
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              title={
                isInComparison
                  ? 'Remove from comparison'
                  : canAddToComparison
                  ? 'Add to comparison'
                  : 'Maximum 4 plugins can be compared'
              }
            >
              {isInComparison ? <Check size={16} /> : <Plus size={16} />}
            </button>
          </div>
        )}
      </div>

      {isObsolete() && (
        <div className="absolute bottom-2 right-2 bg-red-400 text-white text-xs font-semibold px-2 py-1 rounded">
          Not updated in last 2 years
        </div>
      )}
    </>
  )

  return isComparing ? (
    <div className="group relative cursor-pointer" onClick={handleComparisonClick}>
      <CardContent />
    </div>
  ) : (
    <Link className="group relative" href={`/${plugin.slug}`}>
      <CardContent />
    </Link>
  )
}