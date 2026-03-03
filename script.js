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
  // 1 get the container
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";
  if (!words || words.length === 0) {
    wordContainer.innerHTML = `<div
        class="text-center bg-sky-100 col-span-full rounded-xl py-10 space-y-6 font-bangla"
      >
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
          <h2 class="font-bold text-2xl">${word.word ? word : "শব্দ পাওয়া যায়নি"}</h2>
          <p class="font-semibold">${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"}</p>
          <div class="font-medium text-2xl font-bangla">${word.pronunciation ? word.pronunciation : "Pronounciation পাওয়া  যায়নি"}</div>
          <div class="flex justify-between items-center">
            <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
            <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
          </div>
        </div>`;
    // 4 append ele
    wordContainer.append(card);
  });
};
// step 2
// const displayLevelWord = (words) => {
//   const wordContainer = document.getElementById("word-container");
//   wordContainer.innerHTML = "";

//   // ✅ Check first
//   if (!words || words.length === 0) {
//     wordContainer.innerHTML = `
//       <div
//         class="text-center bg-sky-100 col-span-full rounded-xl py-10 space-y-6 font-bangla"
//       >
//         <p class="text-xl font-medium text-gray-400">
//           এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
//         </p>
//         <h2 class="font-bold text-4xl">নেক্সট Lesson এ যান</h2>
//       </div>
//     `;
//     return;
//   }

//   // ✅ Then loop
//   words.forEach((word) => {
//     const card = document.createElement("div");

//     card.innerHTML = `
//       <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
//         <h2 class="font-bold text-2xl">${word.word}</h2>
//         <p class="font-semibold">${word.meaning}</p>
//         <div class="font-medium text-2xl font-bangla">${word.pronunciation}</div>
//         <div class="flex justify-between items-center">
//           <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
//             <i class="fa-solid fa-circle-info"></i>
//           </button>
//           <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
//             <i class="fa-solid fa-volume-high"></i>
//           </button>
//         </div>
//       </div>
//     `;

//     wordContainer.append(card);
//   });
// };
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
