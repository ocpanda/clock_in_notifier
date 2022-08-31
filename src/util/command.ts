import inquirer from 'inquirer'

interface SETTLE_COMMAND {
  isLegal: Boolean
  command: COMMAND
  needNotifyCountSetting: () => Promise<SETTLE_COMMAND>
  notifyTimesSetting: () => Promise<SETTLE_COMMAND>
  repeatNotifyCountSetting: () => Promise<SETTLE_COMMAND>
}

const commandAnswerSuccess = function (this: SETTLE_COMMAND, answers: COMMAND): typeof this {
  for (const key of Object.keys(answers) as (keyof typeof answers)[]) {
    this.command[key] = answers[key] as number & NOTIFIER_TIME[]
  }
  this.isLegal = true
  return this
}

const commandAnswerFailed = function (this: SETTLE_COMMAND, reason: any): typeof this {
  console.error(reason)
  this.isLegal = false
  return this
}

export default async function () {
  const command: COMMAND = {
    needNotifyCount: 0,
    notifyTimes: [],
    repeatNotifyCount: 0,
  }

  const SettleCommand: SETTLE_COMMAND = {
    isLegal: true,
    command,
    needNotifyCountSetting: function () {
      return inquirer.prompt([
        {
          type: 'number',
          name: 'needNotifyCount',
          message: '你需要提醒幾次呢？',
          default: 1,
        },
      ]).then(answers => commandAnswerSuccess.call(this, answers))
        .catch(reason => commandAnswerFailed.call(this, reason))
    },
    notifyTimesSetting: function () {
      const notifyTimesSettingRequest = async function* (this: SETTLE_COMMAND) {
        let count = 0

        while (count < this.command.needNotifyCount) {
          const DISPLAY_COUNT = count + 1

          console.log(`第${DISPLAY_COUNT}次提醒時間設定：`)
          const res = await inquirer.prompt([
            {
              type: 'number',
              name: 'hour',
              message: `第${DISPLAY_COUNT}次提醒時間，要在幾點呢？ (0~23)`,
              validate(input) {
                if (input >= 0 && input <= 23) return true
                return '請輸入0~23'
              },
            },
            {
              type: 'number',
              name: 'minute',
              message: `第${DISPLAY_COUNT}次提醒時間，要在幾分呢？ (0~59)`,
              validate(input) {
                if (input >= 0 && input <= 59) return true
                return '請輸入0~59'
              },
            },
            {
              type: 'number',
              name: 'second',
              message: `第${DISPLAY_COUNT}次提醒時間，要在幾秒呢？ (0~59)`,
              validate(input) {
                if (input >= 0 && input <= 59) return true
                return '請輸入0~59'
              },
            },
          ]).then((answers: { hour: number; minute: number; second: number }) => answers)
            .catch(reason => commandAnswerFailed.call(this, reason))

          count++
          yield res
        }
      }

      return new Promise(async resolve => {
        for await (const answer of notifyTimesSettingRequest.call(this)) {
          this.command.notifyTimes.push(answer as NOTIFIER_TIME)
        }

        resolve(this.command)
      }).then(answers => commandAnswerSuccess.call(this, answers as COMMAND))
        .catch(reason => commandAnswerFailed.call(this, reason))
    },
    repeatNotifyCountSetting: function () {
      return inquirer.prompt([
        {
          type: 'number',
          name: 'repeatNotifyCount',
          message: '每次提醒要重複提醒幾次？',
          default: 0,
        }
      ]).then(answers => commandAnswerSuccess.call(this, answers))
        .catch(reason => commandAnswerFailed.call(this, reason))
    },
  }

  const settledCommand = await SettleCommand.needNotifyCountSetting()
    .then(self => self.notifyTimesSetting())
    .then(self => self.repeatNotifyCountSetting())

  if (settledCommand.isLegal) return settledCommand.command
  else return undefined
}
