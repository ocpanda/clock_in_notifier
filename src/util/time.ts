import dayjs from 'dayjs'

const TIMER = 3
class Timer {
  private timer: number

  constructor () {
    this.timer = TIMER
  }

  public get () {
    return this.timer
  }

  public tick () {
    this.timer--

    if (this.timer <= 0) this.timer = 0
  }

  public reset () {
    this.timer = TIMER
  }
}

const TIME_DEFAULT_FORMAT = 'YYYY-MM-DD HH:mm:ss'
export class Time {
  private now: dayjs.Dayjs

  constructor () {
    this.now = dayjs()
  }

  public getNow () {
    this.tick()
    return this.now
  }

  public getFromFormat (
    { time, format }: {
      time: dayjs.Dayjs | string; format: string
    } = {
      time: this.now,
      format: TIME_DEFAULT_FORMAT,
    }) {
      return this.timeInstance(time).format(format)
  }

  public greaterThen (
    a: dayjs.Dayjs | string,
    b: dayjs.Dayjs | string,
  ) {
    const aTime = this.timeInstance(a)
    const bTime = this.timeInstance(b)

    if (aTime.diff(bTime) > 0) return true
    else return false
  }

  public tick () {
    this.now = dayjs()
  }

  private timeInstance (instance: dayjs.Dayjs | string) {
    if (dayjs.isDayjs(instance)) return instance
    else return dayjs(instance)
  }
}

export class NotifyProcessTime {
  private notifyTime: NOTIFY_TYPE['notifyTime']
  private convertedProcessTime: dayjs.Dayjs
  public timer: Timer
  private time: Time

  constructor (
    { notifyTime, time }: {
      notifyTime: NOTIFY_TYPE['notifyTime']
      time: Time
    } = {
      notifyTime: '00:00:00',
      time: new Time(),
    }) {
    this.timer = new Timer()
    this.time = time

    this.notifyTime = notifyTime
    this.convertedProcessTime = dayjs(`${dayjs().format('YYYY-MM-DD')} ${this.notifyTime}`)
  }

  public notGreaterThenProcessTime () {
    if (this.time.greaterThen(this.time.getNow(), this.convertedProcessTime)) return true
    else return false
  }
}
