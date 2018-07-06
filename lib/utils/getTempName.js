
module.exports = function (name) {
  if (name) {
    switch (name) {
      case 'parcel':
        return 'parcel'
        break

      case 'test':
        return 'test-template'
        break
    }
  }
}