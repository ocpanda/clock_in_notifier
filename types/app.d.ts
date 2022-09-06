type NOTIFIER_TIME = {
  hour: number
  minute: number
  second: number
}

type NOTIFY_TYPE = {
  notifyTime: string
  repeatNotifyCount: number
}

type NOTIFY_POOL = Record<string, NOTIFY_TYPE>

type COMMAND = {
  needNotifyCount: number
  notifyTimes: NOTIFIER_TIME[]
  repeatNotifyCount: NOTIFY_TYPE['repeatNotifyCount']
}
