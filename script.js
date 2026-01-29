let snowing = false;
let snowInterval;

const ground = document.querySelector(".snow-ground");
const snowman = document.querySelector(".snowman");
const btn = document.getElementById("snowBtn");

function toggleSnow() {
  if (!snowing) {
    snowInterval = setInterval(createSnowflake, 200);
    btn.textContent = "ngưng";

    // Delay snowman appearance until some snow accumulates
    snowman.style.opacity = 0; // start hidden
  } else {
    clearInterval(snowInterval);
    btn.textContent = "tuyết đầu mùa";
  }
  snowing = !snowing;
}

function createSnowflake() {
  const snowflake = document.createElement("div");
  snowflake.innerHTML = "❄️";
  snowflake.style.position = "fixed";

  // Pick a random cloud
  const clouds = document.querySelectorAll(".cloud");
  const cloud = clouds[Math.floor(Math.random() * clouds.length)];
  const cloudRect = cloud.getBoundingClientRect();

  snowflake.style.left = cloudRect.left + Math.random() * cloudRect.width + "px";
  snowflake.style.top = cloudRect.bottom + "px";
  snowflake.style.fontSize = "20px";
  snowflake.style.pointerEvents = "none";
  snowflake.style.zIndex = "100";

  document.body.appendChild(snowflake);

  let fall = setInterval(() => {
    snowflake.style.top = snowflake.offsetTop + 2 + "px";
    const groundTop = window.innerHeight - ground.offsetHeight;

    if (snowflake.offsetTop >= groundTop - 20) {
      snowflake.remove();
      clearInterval(fall);

      // Increase snow ground
      ground.style.height = ground.offsetHeight + 1 + "px";

      // Show snowman after 30px snow
      if (ground.offsetHeight > 30) {
        snowman.style.opacity = 1;
      }
    }
  }, 20);
}

// Reset function
function resetSnow() {
  if (snowing) {
    clearInterval(snowInterval);
    snowing = false;
    btn.textContent = "Start Snow";
  }

  // Remove all snowflakes
  document.querySelectorAll("div").forEach(div => {
    if (div.innerHTML === "❄️") div.remove();
  });

  // Reset snow ground
  ground.style.height = "0px";

  // Hide snowman
  snowman.style.opacity = 0;
}
