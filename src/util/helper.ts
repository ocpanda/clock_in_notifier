export const observe = (obj: any) => {
  return new Proxy(obj, {
    set (target, property, value) {
      target[property] = value

      return true
    },
  })
}

class ReactiveEffect {
  fn: Function

  constructor (getter: Function) {
    this.fn = getter
  }

  run () {
    const result = this.fn()

    return result
  }
}

class ComputedRefImplement {
  effect: ReactiveEffect

  constructor (getter: Function) {
    this.effect = new ReactiveEffect(getter)
  }

  get value() {
    const _value = this.effect.run()

    return _value
  }
}

export const computed = (getter: Function) => {
  return new ComputedRefImplement(getter)
}

export const sleep = async (ms: number = 1000) => {
  return new Promise(resolve => setTimeout(() => resolve(''), ms))
}
