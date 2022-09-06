import nodeNotifier from 'node-notifier'

export default class Notifier {
  private title: string
  private message: string
  private sound: boolean
  private wait: boolean

  constructor (
    { title, message, sound, wait }: {
      title: string
      message: string
      sound: boolean
      wait: boolean
    } = {
      title: '提醒',
      message: '記得打卡喔！',
      sound: false,
      wait: true,
    }
  ) {
    this.title = title
    this.message = message
    this.sound = sound
    this.wait = wait
  }

  public notify () {
    const config = {
      title: this.title,
      message: this.message,
    }

    nodeNotifier.notify(config, (err, response, metadata) => {
      console.log(err, response, metadata, 'wwww')
    })
  }
}