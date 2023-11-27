const apiKeyVoiceRSS = "2da6abdafa8944c3ba62b138b49be940";
const audioElement = document.getElementById("audio");
const button = document.getElementById("button");

function toggleButton() {
  button.disabled = !button.disabled;
}

function tellJoke(joke) {
  VoiceRSS.speech({
    key: apiKeyVoiceRSS,
    src: joke,
    hl: "en-gb",
    r: 2,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

async function getJokes() {
  let joke = "";
  const apiUrl =
    "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    toggleButton();
    tellJoke(joke);
  } catch (error) {
    console.log("Laden der Witze ist fehlgeschlagen", error);
  }
}

button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
