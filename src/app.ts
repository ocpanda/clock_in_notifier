import Command from './util/command'
import Pool from './util/pool'

(async () => {
  const userCommand = await Command() as COMMAND | undefined

  // while (true) {
    // if (userCommand === undefined) break
    if (userCommand === undefined) return
  
    const pool = Pool(userCommand)
  // }
})()
