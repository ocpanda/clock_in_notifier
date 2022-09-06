import dayjs from 'dayjs'

const notifyPoolKeyGenerator = (
  { notifyTime }: {
    notifyTime: NOTIFIER_TIME
  } = {
    notifyTime: { hour: 0, minute: 0, second: 0 }
  }) => {
  return dayjs()
    .hour(notifyTime.hour)
    .minute(notifyTime.minute)
    .second(notifyTime.second)
    .format('HH:mm:ss')
}

const notifyPoolValueGenerator = (
  { repeatNotifyCount, notifyTime }: {
    repeatNotifyCount: number
    notifyTime: string
  } = {
    repeatNotifyCount: 0,
    notifyTime: '00:00:00',
  }
) => {
  const processRepeatNotifyCount = repeatNotifyCount + 1

  return {
    repeatNotifyCount: processRepeatNotifyCount,
    notifyTime,
  }
}

const notifyTimesConverter = function (userCommand: COMMAND) {
  const { notifyTimes } = userCommand
  
  return notifyTimes.reduce((prev, notifyTime) => ({
    ...prev,
    [notifyPoolKeyGenerator({ notifyTime })]: notifyPoolValueGenerator({ notifyTime: notifyPoolKeyGenerator({ notifyTime }), ...userCommand }),
  }), {})
}

export default function (userCommand: COMMAND) {
  let notifyPool: NOTIFY_POOL = {}
  
  notifyPool = notifyTimesConverter(userCommand)

  return {
    notifyPool,
  }
}
