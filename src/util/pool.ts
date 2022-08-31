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
  { repeatNotifyCount }: {
    repeatNotifyCount: number
  } = {
    repeatNotifyCount: 0
  }
) => {
  return {
    repeatNotifyCount,
  }
}

const notifyTimesConverter = function (userCommand: COMMAND) {
  const { notifyTimes } = userCommand
  
  return notifyTimes.reduce((prev, notifyTime) => ({
    ...prev,
    [notifyPoolKeyGenerator({ notifyTime })]: notifyPoolValueGenerator(userCommand),
  }), {})
}

export default function (userCommand: COMMAND) {
  let notifyPool: Record<string, NOTIFY_TYPE> = {}
  
  notifyPool = notifyTimesConverter(userCommand)

  return {
    notifyPool,
  }
}
