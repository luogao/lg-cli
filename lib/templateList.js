const { AVAILABLE_TEMPLATE } = require('./constants/index.js')

function templateList() {
  console.log('Here are available templates: ')
  AVAILABLE_TEMPLATE.forEach((temp,index) => console.log(index + 1 + '. ' + temp))
}

module.exports = () => {
  templateList()
}