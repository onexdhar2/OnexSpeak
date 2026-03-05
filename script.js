const createElements = (arr) => {
  const htmlElements = arr.map((el) => `<span class="btn">${el}</span>`);
  return htmlElements.join(" ");
};

const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("word-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};
// step 1
const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLessons(json.data));
};
const removeActive = () => {
  const lessonButtons = document.querySelectorAll(".lesson-btn");
  // console.log(lessonButtons)
  lessonButtons.forEach((btn) => btn.classList.remove("active"));
};
// step 2
const loadLevelWord = (id) => {
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      // console.log(clickBtn);
      clickBtn.classList.add("active");
      displayLevelWord(data.data);
    });
};

// .............
const loadWordDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;

  const res = await fetch(url);
  const details = await res.json();

  console.log(details.data);
  displayWordDetails(details.data);
};
const displayWordDetails = (word) => {
  console.log(word);
  const detailsBox = document.getElementById("details-container");
  detailsBox.innerHTML = `
    <div class="">
            <h2 class="text-2xl font-bold">
              ${word.word} (<i class="fa-solid fa-microphone-lines"></i> :${
                word.pronunciation
              })
            </h2>
          </div>
          <div class="">
            <h2 class="font-bold">Meaning</h2>
            <p>${word.meaning}</p>
          </div>
          <div class="">
            <h2 class="font-bold">Example</h2>
            <p>${word.sentence}</p>
          </div>
          <div class="">
            <h2 class="font-bold">Synonym</h2>
            <div class="">${createElements(word.synonyms)}</div>
          </div>
    
    
    `;
  document.getElementById("word_modal").showModal();
};
// step 2
const displayLevelWord = (words) => {
  // 1 get the container
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";
  if (!words || words.length === 0) {
    wordContainer.innerHTML = `<div
        class="text-center bg-sky-100 col-span-full rounded-xl py-10 space-y-6 font-bangla"
      >
      <img class="mx-auto" src="./assets/alert-error.png"/>
        <p class="text-xl font-medium text-gray-400">
          এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
        </p>
        <h2 class="font-bold text-4xl">নেক্সট Lesson এ যান</h2>
      </div>`;
    return;
  }
  // 2 get every element
  words.forEach((word) => {
    // problem^

    // 3 creat elment
    const card = document.createElement("div");
    card.innerHTML = `<div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
          <h2 class="font-bold text-2xl">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
          <p class="font-semibold">${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"}</p>
          <div class="font-medium text-2xl font-bangla">${word.pronunciation ? word.pronunciation : "Pronounciation পাওয়া  যায়নি"}</div>
          <div class="flex justify-between items-center">
            <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
            <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
          </div>
        </div>`;
    // 4 append ele
    wordContainer.append(card);
    manageSpinner(false)
  });
};

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
    btnDiv.innerHTML = `<button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})"  class="btn btn-outline btn-primary lesson-btn"
        ><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>`;
    // 4 append ele
    levelContainer.append(btnDiv);
  }
};
// step 1
loadLessons();
