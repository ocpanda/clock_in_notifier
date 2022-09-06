import { observe, computed } from './helper'
import { NotifyProcessTime, Time } from './time'
import Notifier from './notifier'

const time = new Time()

class NotifyProcessor {
  private notifyTime: NOTIFY_TYPE['notifyTime']
  private repeatNotifyCount: NOTIFY_TYPE['repeatNotifyCount']
  private processTime: NotifyProcessTime
  private notifier: Notifier

  constructor (
    { notifyTime, repeatNotifyCount }:
    NOTIFY_TYPE = {
      notifyTime: '00:00:00',
      repeatNotifyCount: 0,
    }) {
      this.notifyTime = notifyTime
      this.repeatNotifyCount = repeatNotifyCount
      this.processTime = new NotifyProcessTime({ notifyTime: this.notifyTime, time })
      this.notifier = new Notifier()

      setInterval(() => {
        this.run()
      }, 1000)
    }

  public async run () {
    if (this.canRunProcess()) {
      this.notifier.notify()

      this.countNotifyRepeat()
      this.processTime.timer.reset()
    } else {
      this.processTime.timer.tick()
    }
  }

  private countNotifyRepeat () {
    this.repeatNotifyCount--

    if (this.repeatNotifyCount < 0) this.repeatNotifyCount = 0
  }

  private canRunProcess () {
    if (
      this.processTime.notGreaterThenProcessTime() &&
      this.repeatNotifyCount > 0 &&
      this.processTime.timer.get() === 0
    ) return true
    else return false
  }
}

type PROCESS_INSTANCE = typeof NotifyProcessor

export default function ({ notifyPool }: { notifyPool: NOTIFY_POOL }) {
  const notifyList: NOTIFY_TYPE[] = observe([])
  
  const setNotifyProcessor = () => {
    for (let value of Object.values(notifyPool)) {
      notifyList.push(value)
    }
  }

  const notifyProcessorList = computed(() => {
    const list = JSON.parse(JSON.stringify(notifyList))

    return list.reduce((prev: PROCESS_INSTANCE[], curr: NOTIFY_TYPE) => ([
      ...prev,
      new NotifyProcessor(curr),
    ]), [])
  })

  setNotifyProcessor()
  notifyProcessorList.value
}
