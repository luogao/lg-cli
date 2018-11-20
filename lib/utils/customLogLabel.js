const chalk = require("chalk");
const logSymbols = require("log-symbols");

exports.successLabel = () => {
  const label = chalk.grey.bold(`
  =====================================================================
|                                                                       |
|                             HERE IS RESULT                            |
|                                                                       |
  =====================================================================`);
  return label;
};

exports.failLabel = message => {
  const label = chalk.red.bold(`
  =====================================================================
|                                                                       |
|                             BAD REQUEST                               |
|                                                                       |
  =====================================================================
${message}`);
  return label;
};

exports.gapLine = () => {
  const label = chalk.grey.bold(
    "=====================================================================\n\n"
  );
  return label;
};

exports.emptyLabel = () => {
  const label = chalk.yellow.bold(`
  =====================================================================
|                                                                       |
|                             EMPTY RESULT                              |
|                                                                       |
  =====================================================================`);
  return label;
};

exports.successInitLog = (projectType, root) => {
  let label = chalk.magenta("创建成功:)");
  switch (projectType) {
    case "parcel":
      label = ` ${logSymbols.success} ${chalk.magenta(
        "创建成功:)"
      )} \n cd ${root} \n npm install \n npm start`;
      return label;

    case "react":
      label = ` ${logSymbols.success} ${chalk.magenta(
        "创建成功:)"
      )} \n cd ${root} \n npm install \n npm start`;
      return label;

    default:
      return label;
  }
};
