const coloumn = document.querySelectorAll(".coloumn");

document.addEventListener("keydown", (e) => {
  e.preventDefault();
  if (e.code == "Space") {
    SetRanCol();
  }
});

document.addEventListener("click", (e) => {
  const type = e.target.dataset.type;
  if (type == "lock") {
    const node =
      e.target.tagName.toLowerCase() === "i" ? e.target : e.target.children[0];
    node.classList.toggle("fa-lock-open");
    node.classList.toggle("fa-lock");
  } else if (type == "copy") {
    Copy(e.target.textContent);
    setTimeout(() => {
      e.target.textContent = "Copyed!";
    }, 1000);
  }
  let arr = [];
  setTimeout(() => {
    arr.push(e.target.textContent);
  }, 0.5);
  setTimeout(() => {
    e.target.textContent = arr[0];
  }, 2000);
});

function generateColor() {
  const hex = "0123456789ABCDF";
  let color = "";
  for (let i = 0; i < 6; i++) {
    color += hex[Math.floor(Math.random() * hex.length)];
  }
  return "#" + color;
}

function SetRanCol(isInitial) {
  const colors = isInitial ? getColorsHash() : [];
  coloumn.forEach((col, index) => {
    const isLocked = col.querySelector("i").classList.contains("fa-lock");
    const text = col.querySelector("h2");
    const button = col.querySelector("button");
    const color = isInitial
      ? colors[index]
        ? colors[index]
        : chroma.random()
      : chroma.random();
    if (isLocked) {
      colors.push(text.textContent);
      return;
    }
    if (!isInitial) {
      colors.push(color);
    }

    text.textContent = color;
    col.style.backgroundColor = color;
    TextColor(text, color);
    TextColor(button, color);
  });
  Hash(colors);
}

function Copy(text) {
  return navigator.clipboard.writeText(text);
}

function TextColor(text, color) {
  const luminance = chroma(color).luminance();
  text.style.color = luminance > 0.5 ? "black" : "white";
}

function Hash(arrColors = []) {
  document.location.hash = arrColors
    .map((col) => {
      return col.toString().substring(1);
    })
    .join("-");
}

function getColorsHash() {
  if (document.location.hash.length > 1) {
    return document.location.hash
      .substring(1)
      .split("-")
      .map((color) => "#" + color);
  }
  return [];
}

SetRanCol(true);
