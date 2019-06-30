module.exports = function(name) {
  if (name) {
    switch (name) {
      case 'parcel':
        return 'parcel'
      case 'react':
        return 'react'
      case 'test':
        return 'test-template'
    }
  }
};
