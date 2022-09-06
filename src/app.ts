import Command from './util/command'
import Pool from './util/pool'
import Processor from './util/processor'

(async () => {
  const userCommand = await Command() as COMMAND | undefined

  if (userCommand === undefined) return

  const pool = Pool(userCommand)
  
  Processor(pool)
})()
