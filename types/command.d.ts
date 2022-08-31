type NOTIFIER_TIME = {
  hour: number
  minute: number
  second: number
}

type COMMAND = {
  needNotifyCount: number
  notifyTimes: NOTIFIER_TIME[]
  repeatNotifyCount: number
}
