const chalk = require('chalk');


print = (message, color) => {
    let command = '';
    switch (color) {

        case 'red':
            command = chalk.red(message);
            break;
        case 'yellow':
            command = chalk.yellow(message);
            break;
        case 'blue':
            command = chalk.blue(message);
            break;
        case 'green':
            command = chalk.green(message);
            break;
        case 'pink':
            command = chalk.magenta(message);
            break;
        case 'cyan':
            command = chalk.cyan(message);
            break;
        default:
            command = message;

    }
    console.log(command);
};

module.exports = print;
