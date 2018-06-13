function test(name, options) {
  console.log('name:' + name + '\n')
  console.log('options:' + options.preset + '\n')
}

module.exports = (...args) => {
  test(...args)
}