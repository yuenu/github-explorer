export function timeSince(date: number | string) {
  const parseDate = typeof date === 'string' ? Date.parse(date) : date
  const seconds = Math.floor((Date.now() - parseDate) / 1000)

  let interval = seconds / 31536000

  if (interval > 1) {
    return (
      'on ' + new Date(parseDate).toDateString().split(' ').slice(1).join(' ')
    )
  }

  interval = seconds / 2592000
  if (interval > 1) {
    return (
      'on ' + new Date(parseDate).toDateString().split(' ').slice(1).join(' ')
    )
  }

  interval = seconds / 86400
  if (interval > 1) {
    return Math.floor(interval) + ' days ago'
  }

  interval = seconds / 3600
  if (interval > 1) {
    return Math.floor(interval) + ' hours ago'
  }

  interval = seconds / 60
  if (interval > 1) {
    return Math.floor(interval) + ' minutes ago'
  }

  return Math.floor(seconds) + ' seconds ago'
}
