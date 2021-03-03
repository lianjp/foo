var funcSet = new Set()

window.funcSet = funcSet

function logSetSize() {
  console.log(`funcSetSize: ${funcSet.size}`)
}

function collect(func) {
  if (!funcSet.has(func)) {
    funcSet.add(func)
  }
}

function runFunc() {
  for (let func of funcSet) {
    func()
  }
  logSetSize()
}

function decollect(func) {
  funcSet.delete(func)
  logSetSize()
}

if (window.addEventListener) {
  window.addEventListener('beforeunload', runFunc)
  window.addEventListener('unload', runFunc)
} else {
  if (window.onbeforeunload) {
    window.onbeforeunload(runFunc)
  }
  if (window.onunload) {
    window.onunload(runFunc)
  }
}

export default { collect, decollect }
