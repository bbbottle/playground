// source: https://bl.ocks.org/TheMcMurder/b01820b17f3b8dc0ae035c5cbedfcdba
// rxjs hack
const originalResolve = System.resolve

System.register('rxjs-operators.js', [], _export => {
  System.import('rxjs').then(rxjs => {
    _export(rxjs.operators)
  })
  return {}
})

System.resolve = function (name) {
  if (name === 'rxjs/operators') {
    return 'rxjs-operators.js'
  } else {
    return originalResolve.apply(this, arguments)
  }
}
