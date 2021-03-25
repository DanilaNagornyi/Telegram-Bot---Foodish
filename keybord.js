const { Markup } = require('telegraf');

function getMainMenu() {
  return Markup.keyboard([
    [' Мои задачи', 'Добавить задачу'],
    ['Мотивируй'],
  ]).resize().extra();
}

module.exports = getMainMenu;
