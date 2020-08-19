export async function delay(ms = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export const noop = () => {}
