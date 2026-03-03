// step 1
const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLessons(json.data));
};
// step 2
const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLevelWord(data.data));
};
// step 2
const displayLevelWord = (words) => {
  console.log(words);
  // 1 get the container
  const wordContainer = document.getElementById("word-container");
//   wordContainer.innerHTML = "";
  // 2 get every element
  words.forEach((word) => {
    // problem^
    // 3 creat elment
    const card = document.createElement("div");
    card.innerHTML = `<p>cat</p>`;
    // 4 append ele
    wordContainer.append(card);
  });
};
// step 2

// step 1
const displayLessons = (lessons) => {
  // 1 get the container
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";
  // 2 get every ele
  for (const lesson of lessons) {
    // 3 creat elment
    const btnDiv = document.createElement("div");
    // problem^
    btnDiv.innerHTML = `<button onclick="loadLevelWord(${lesson.level_no})"  class="btn btn-outline btn-primary"
        ><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>`;
    // 4 append ele
    levelContainer.append(btnDiv);
  }
};
// step 1
loadLessons();
