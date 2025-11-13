import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatRelativeTime(dateString: string): string {
  // Parse WordPress date format: "2024-12-03 9:03pm GMT"
  let date: Date;
  
  // Check if it's in WordPress format (YYYY-MM-DD H:MMam/pm GMT)
  const wpFormatMatch = dateString.match(/(\d{4})-(\d{2})-(\d{2})\s+(\d{1,2}):(\d{2})(am|pm)\s+GMT/i)
  
  if (wpFormatMatch) {
    const [, year, month, day, hourStr, minute, ampm] = wpFormatMatch
    let hour = parseInt(hourStr, 10)
    
    // Convert to 24-hour format
    if (ampm.toLowerCase() === 'pm' && hour !== 12) {
      hour += 12
    } else if (ampm.toLowerCase() === 'am' && hour === 12) {
      hour = 0
    }
    
    // Create date in UTC (GMT)
    date = new Date(Date.UTC(
      parseInt(year, 10),
      parseInt(month, 10) - 1, // Months are 0-indexed
      parseInt(day, 10),
      hour,
      parseInt(minute, 10)
    ))
  } else {
    date = new Date(dateString)
  }
  
  // Fallback if parsing failed
  if (isNaN(date.getTime())) {
    return dateString
  }
  
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  
  const diffSeconds = Math.floor(diffMs / 1000)
  const diffMinutes = Math.floor(diffSeconds / 60)
  const diffHours = Math.floor(diffMinutes / 60)
  const diffDays = Math.floor(diffHours / 24)
  const diffMonths = Math.floor(diffDays / 30)
  const diffYears = Math.floor(diffDays / 365)
  
  if (diffYears > 0) {
    return `${diffYears} ${diffYears === 1 ? 'year' : 'years'} ago`
  } else if (diffMonths > 0) {
    return `${diffMonths} ${diffMonths === 1 ? 'month' : 'months'} ago`
  } else if (diffDays > 0) {
    return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`
  } else if (diffHours > 0) {
    return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`
  } else if (diffMinutes > 0) {
    return `${diffMinutes} ${diffMinutes === 1 ? 'minute' : 'minutes'} ago`
  } else {
    return 'just now'
  }
}

export function formatActiveInstallations(count: number): string {
  if (count >= 1000000) {
    const millions = Math.floor(count / 1000000)
    return `${millions}M+`
  } else if (count >= 1000) {
    const thousands = Math.floor(count / 1000)
    return `${thousands}K+`
  } else if (count >= 10) {
    const tens = Math.floor(count / 10) * 10
    return `${tens}+`
  } else if (count > 0) {
    return `${count}+`
  } else {
    return 'Fewer than 10'
  }
}
