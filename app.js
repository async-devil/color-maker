const chalk = require("chalk");
const {Select} = require("enquirer");
const {NumberPrompt} = require("enquirer");
const {Input} = require("enquirer");

const red = chalk.bold.red;
const green = chalk.bold.green;
const blue = chalk.bold.blue;
const warning = chalk.bold.keyword("orange");

var r_rand, g_rand, b_rand, r_inp, g_inp, b_inp, usr_choise;

const version = "1.0";

const rand_colour = chalk.rgb(
  (r_rand = getRandomInt1(256)),
  (g_rand = getRandomInt2(256)),
  (b_rand = getRandomInt3(256))
).bold;

function getRandomInt1(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getRandomInt2(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getRandomInt3(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

console.log(
  rand_colour(
    " ▄▄·       ▄▄▌        ▄• ▄▌▄▄▄    • ▌ ▄ ·.  ▄▄▄· ▄ •▄ ▄▄▄ .▄▄▄ \n"
  ) +
    rand_colour(
      "▐█ ▌▪ ▄█▀▄ ██•   ▄█▀▄ █▪██▌▀▄ █·  ·██ ▐███▪▐█ ▀█ █▌▄▌▪▀▄.▀·▀▄ █·\n"
    ) +
    rand_colour(
      "██ ▄▄▐█▌.▐▌██ ▪ ▐█▌.▐▌█▌▐█▌▐▀▀▄   ▐█ ▌▐▌▐█·▄█▀▀█ ▐▀▀▄·▐▀▀▪▄▐▀▀▄ \n"
    ) +
    rand_colour(
      "▐███▌▐█▌.▐▌▐█▌ ▄▐█▌.▐▌▐█▄█▌▐█•█▌  ██ ██▌▐█▌▐█▪ ▐▌▐█.█▌▐█▄▄▌▐█•█▌\n"
    ) +
    rand_colour(
      "·▀▀▀  ▀█▄▀▪.▀▀▀  ▀█▄▀▪ ▀▀▀ .▀  ▀  ▀▀  █▪▀▀▀ ▀  ▀ ·▀  ▀ ▀▀▀ .▀  ▀"
    ) +
    chalk.bold(
      "   by async-devil   (" + red(r_rand),
      green(g_rand),
      blue(b_rand) + ")\n  version: " + version + "\n"
    )
);

async function modeSelector(callback) {
  const prompt = new Select({
    name: "color",
    message: "Please select mode",
    choices: [
      {
        name: "Only red",
        value: "#ff0000"
      },
      {
        name: "Only green",
        value: "#00ff00"
      },
      {
        name: "Only blue",
        value: "#0000ff"
      },
      {
        name: "Red and green",
        value: "#ffff00"
      },
      {
        name: "Red and blue",
        value: "#ff00ff"
      },
      {
        name: "Green and blue",
        value: "#00ffff"
      },
      {
        name: "All colors",
        value: "#ffffff"
      },
      {
        name: "Exit",
        value: "#ffffff"
      }
    ]
  });

  await prompt
    .run()
    .then(answer => {
      //console.log('Answer:', answer);
      usr_choise = answer;
      if (usr_choise == "Exit") exit();
      else redInput();
    })
    .catch(console.error);
}

async function redInput(error) {
  if (!error) {
    const prompt = new NumberPrompt({
      name: "redColour",
      message: chalk.bold("Please enter " + red("red") + " value")
    });

    await prompt.run().then(answer => {
      //console.log('Answer:', answer)
      r_inp = answer;
      if (r_inp <= 0) notValid();
      else greenInput();
    });
  }
}

async function greenInput(error) {
  if (!error) {
    const prompt = new NumberPrompt({
      name: "greenColour",
      message: chalk.bold("Please enter " + green("green") + " value")
    });

    await prompt.run().then(answer => {
      //console.log('Answer:', answer)
      g_inp = answer;
      if (g_inp <= 0) notValid();
      else blueInput();
    });
  }
}

async function blueInput(error) {
  if (!error) {
    const prompt = new NumberPrompt({
      name: "blueColour",
      message: chalk.bold("Please enter " + blue("blue") + " value")
    });

    await prompt.run().then(answer => {
      //console.log('Answer:', answer)
      b_inp = answer;
      if (b_inp <= 0) notValid();
      else textInput();
    });
  }
}

function textInput(error) {
  if (!error) {
    const prompt = new Input({
      message: "Please input text",
      initial: "Test"
    });

    prompt.run().then(answer => {
      text_inp = answer;
      logicalPart(usr_choise, [r_inp, g_inp, b_inp], text_inp);
    });
  }
}

function notValid() {
  console.log(warning("Warning! 0 or less are not a valid value"));
}

function exit() {
  console.log(chalk.bold("Good bye!"));
}

function logicalPart(select, levels, text) {
  var select;
  let choise = [];
  let difference = [];
  const r = 1;
  const g = 1;
  const b = 1;
  var i_num = 0;

  var text;
  var levels;
  console.log(select, levels, text);
  switch (
    select //logic of selected mode
  ) {
    case "Only red":
      choise.push(r, 0, 0);
      break;
    case "Only green":
      choise.push(0, g, 0);
      break;
    case "Only blue":
      choise.push(0, 0, b);
      break;
    case "Red and green":
      choise.push(r, g, 0);
      break;
    case "Red and blue":
      choise.push(r, 0, b);
      break;
    case "Green and blue":
      choise.push(0, g, b);
      break;
    case "All colors":
      choise.push(r, g, b);
      break;
    case "Exit":
      break;
    default:
      text = "INVALID VALUE";
      choise.push(r, g, b);
      break;
  }

  if (choise[0] == 0) {
    difference.push(0);
  }
  if (choise[1] == 0) {
    difference.push(1);
  }
  if (choise[2] == 0) {
    difference.push(2);
  }
  var length_i = difference.length + 1;
  var length_p = choise.length + 1;

  while (choise[0] <= 255 && choise[1] <= 255 && choise[2] <= 255) {
    //while r <= 255 etc.
    console.log(chalk.rgb(choise[0], choise[1], choise[2]).bold(text)); //rgb output
    console.log(
      chalk.bold(
        "Num: ",
        warning(i_num),
        "value: ",
        red(choise[0]),
        green(choise[1]),
        blue(choise[2])
      )
    );

    for (var p = 0; p < length_p; p++) {
      //sum value of rgb to usr input
      choise[p] = choise[p] + levels[p];
    }
    for (var i = 0; i < length_i; i++) {
      //makes 0 still 0
      choise[difference[i]] = 0;
    }
    i_num++;
  }
  console.log(green("Good Bye!"));
}

modeSelector();
