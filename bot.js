const { Telegraf } = require('telegraf');
const fetch = require('node-fetch');
const DISH_LIST = require('./const');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => {
  ctx.reply(`
Привет ${ctx.from.first_name}!
Выбери категорию еды, и я для тебя подберу вкусняшки! В моём меню есть такие категории:

🍚 - /risotto - 🍚 

🍔 - /burger - 🍔

🌮 - /dosa - 🌮

🫓 - /idly - 🫓

🍕 - /pizza - 🍕

🥗 - /randomDish - 🥗

🍹 - /randomCockrail - 🍹`);
});

bot.command('/risotto', async (ctx) => {
  const biryani = await fetch(
    'https://foodish-api.herokuapp.com/api/images/biryani',
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    },
  );
  const resBiryani = await biryani.json();

  const recipes = await fetch(
    'https://www.themealdb.com/api/json/v1/1/search.php?s=Lamb',
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    },
  );
  const resresipes = await recipes.json();
  const meals = resresipes.meals[0];
  const { strMeal, strInstructions } = meals;
  console.log(strMeal, strInstructions);

  await ctx.replyWithPhoto(resBiryani.image);
  ctx.reply(`${strMeal}\n \n${strInstructions}`);
});

bot.command('/burger', async (ctx) => {
  const biryani = await fetch(
    'https://foodish-api.herokuapp.com/api/images/burger',
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    },
  );
  const resBiryani = await biryani.json();

  const recipes = await fetch(
    'https://www.themealdb.com/api/json/v1/1/search.php?s=burger',
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    },
  );
  const resresipes = await recipes.json();

  const meals = resresipes.meals[0];
  const { strMeal, strInstructions } = meals;

  await ctx.replyWithPhoto(resBiryani.image);
  ctx.reply(`${strMeal}\n \n${strInstructions}`);
});

bot.command('/dosa', async (ctx) => {
  const biryani = await fetch(
    'https://foodish-api.herokuapp.com/api/images/dosa',
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    },
  );
  const resBiryani = await biryani.json();

  const recipes = await fetch(
    'https://www.themealdb.com/api/json/v1/1/search.php?s=Shawarma',
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    },
  );
  const resresipes = await recipes.json();

  const meals = resresipes.meals[0];
  const { strMeal, strInstructions } = meals;

  await ctx.replyWithPhoto(resBiryani.image);
  ctx.reply(`${strMeal}\n \n${strInstructions}`);
});
bot.command('/idly', async (ctx) => {
  const biryani = await fetch(
    'https://foodish-api.herokuapp.com/api/images/idly',
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    },
  );
  const resBiryani = await biryani.json();

  const recipes = await fetch(
    'https://www.themealdb.com/api/json/v1/1/search.php?s=Vegetable',
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    },
  );
  const resresipes = await recipes.json();

  const meals = resresipes.meals[0];
  const { strMeal, strInstructions } = meals;

  await ctx.replyWithPhoto(resBiryani.image);
  ctx.reply(`${strMeal}\n \n${strInstructions}`);
});

bot.command('/pizza', async (ctx) => {
  const biryani = await fetch(
    'https://foodish-api.herokuapp.com/api/images/pizza',
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    },
  );
  const resBiryani = await biryani.json();

  const recipes = await fetch(
    'https://www.themealdb.com/api/json/v1/1/search.php?s=Pizza',
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    },
  );
  const resresipes = await recipes.json();

  const meals = resresipes.meals[0];
  const { strMeal, strInstructions } = meals;

  await ctx.replyWithPhoto(resBiryani.image);
  ctx.reply(`${strMeal}\n \n${strInstructions}`);
});
bot.command('/randomDish', async (ctx) => {
  const recipes = await fetch(
    'https://www.themealdb.com/api/json/v1/1/random.php',
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    },
  );
  const resresipes = await recipes.json();

  const meals = resresipes.meals[0];
  const { strMeal, strInstructions, strMealThumb } = meals;

  await ctx.replyWithPhoto(strMealThumb);
  ctx.reply(`${strMeal}\n \n${strInstructions}`);
});

bot.command('/randomCockrail', async (ctx) => {
  const recipes = await fetch(
    'https://www.thecocktaildb.com/api/json/v1/1/random.php',
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    },
  );
  const resresipes = await recipes.json();
  const drinks = resresipes.drinks[0];
  const {
    strDrink,
    strCategory,
    strAlcoholic,
    strInstructions,
    strDrinkThumb,
  } = drinks;

  await ctx.replyWithPhoto(strDrinkThumb);
  ctx.reply(
    `Drink: ${strDrink}\n \n Category: ${strCategory} \n\n Alcoholic: ${strAlcoholic} \n\n Instructions: ${strInstructions}`,
  );
});

bot.help((ctx) => ctx.reply(DISH_LIST));
bot.on('text', async (ctx) => {
  ctx.reply('Давай вызовем слюну, тапни => /help');
});

bot.command('/time', (ctx) => {
  ctx.reply(String(new Date()));
});
bot.hears('Hi', (ctx) => ctx.reply('Hey there'));
bot.launch();
