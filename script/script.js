const createElements = (arr) => {
  const htmlElements = arr.map(
    (elem) =>
      `<span class="btn bg-cyan-50 rounded-lg border-none font-normal">${elem}</span>`
  );
  return htmlElements.join(" ");
};

// speak the word functionality
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

// saveWord
const saveWord = (word) => {
  console.log(word);
  const learnWordContainer = document.getElementById("learn-words-container");
  const li = document.createElement("li");
  li.innerHTML = `
  <li>${word}</li>
  `;
  learnWordContainer.appendChild(li);
};

const showLearnWord = () => {
  // console.log("all words")
  learnWords.showModal();
};

// manageLoader
const manageLoader = (status) => {
  if (status) {
    document.getElementById("loader").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("word-container").classList.remove("hidden");
    document.getElementById("loader").classList.add("hidden");
  }
};

// remove Active Class from Btn
const removeActive = () => {
  const btns = document.querySelectorAll(".lesson-btn");
  btns.forEach((btn) => {
    btn.classList.add("btn-outline");
  });
};

// Load Lessson from API
const loadLeassons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all") // promise of response
    .then((res) => res.json()) // promise of json
    .then((json) => showLevel(json.data));
};

// Load Level Word from API
const loadLevelWord = (id) => {
  // show loader for loading level word
  manageLoader(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url).then((res) =>
    res.json().then((lessonData) => {
      removeActive();
      const activeBtn = document.getElementById(`lesson-btn-${id}`);
      activeBtn.classList.remove("btn-outline");
      showLevelWord(lessonData.data);
    })
  );
};
// Load Word Details from API
const loadWordDetail = (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((json) => showWordDetail(json.data));
};

// show Modal or Word Details
const showWordDetail = (detail) => {
  const detailModal = document.getElementById("word_detail_modal");
  const detailContainer = document.querySelector(".detail-container");
  detailContainer.innerHTML = "";
  const detailCard = document.createElement("div");
  detailCard.innerHTML = `
            <div class="border border-[#EDF7FF] rounded-lg p-5">
              <h3 class="text-2xl font-bold">
                ${detail.word} (<i class="fa-solid fa-microphone-lines"></i>:${
    detail.pronunciation
  })
              </h3>
              <p class="mt-5 font-semibold">Meaning</p>
              <p class="font-bangla py-4 font-semibold">${detail.meaning}</p>
              <p class="font-bold">Example</p>
              <p class="py-2">${detail.sentence}</p>
              <p class="font-bangla font-semibold py-4">সমার্থক শব্দ গুলো</p>
              <div class="space-x-2">
                    ${createElements(detail.synonyms)}
              </div>
            </div>
    `;
  detailContainer.appendChild(detailCard);
  detailModal.showModal();
};

// show or dispaly word card
const showLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if (!words.length) {
    wordContainer.innerHTML = `
    <div class="text-center col-span-full md:py-10">
        <img class="mx-auto" src="./assets/alert-error.png" alt="alert sign" />
        <p
        class="font-bangla text-xs md:text-xl font-medium text-gray-500 my-2 md:my-6"
        >
        এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
        </p>
        <h2 class="font-bangla text-2xl md:text-5xl font-semibold">
        নেক্সট Lesson এ যান
        </h2>
    </div>
        `;
    manageLoader(false);
    return;
  }
  words.forEach((word) => {
    const card = document.createElement("div");
    card.innerHTML = `
    <div class="card bg-base-100 card-xl shadow-sm h-full">
    <div class="card-body text-center">
        <div onclick="saveWord('${
          word.word
        }')" class="text-right mb-3 text-2xl cursor-pointer"><i class="fa-regular fa-heart"></i></div>
        <h3 class="text-2xl font-bold">${
          word.word ? word.word : "শব্দ পাওয়া যায় নি"
        }</h3>
        <h4 class="text-sm font-medium">Meaning /Pronunciation</h4>
        <h2 class="font-bangla text-2xl font-bold mt-4 mb-8">"${
          word.meaning ? word.meaning : "অর্থ পাওয়া যায় নি"
        } / ${word.pronunciation}"</h2>
        <div class="justify-between card-actions">
            <button onclick="loadWordDetail(${
              word.id
            })" class="btn bg-cyan-50 hover:bg-cyan-200 border-none">
                <i class="fa-solid fa-circle-info text-xl"></i>
            </button>
            <button onclick="pronounceWord('${
              word.word
            }')" class="btn bg-cyan-50 hover:bg-cyan-200 border-none">
                <i class="fa-solid fa-volume-high text-xl"></i>
            </button>
        </div>
    </div> 
    </div>
    `;
    // append the card into wordContainer
    wordContainer.appendChild(card);
    manageLoader(false);
  });
};

// show lessons level
const showLevel = (lessons) => {
  // get the container & empty
  const lessonsContainer = document.querySelector("#lessons-container");
  lessonsContainer.innerHTML = "";
  //   get into the every leasson
  lessons.forEach((lesson) => {
    // console.log(lesson);
    // create an element & set the html
    const div = document.createElement("div");
    div.innerHTML = `
    <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="lesson-btn btn btn-outline btn-primary">
          <i class="fa-solid fa-book-open"></i> Lesson ${lesson.level_no}
    </button>
    
    `;
    // append into the container
    lessonsContainer.appendChild(div);
  });
};

loadLeassons();

// Search Option
document.getElementById("search-btn").addEventListener("click", (e) => {
  removeActive();
  const searchInp = document.getElementById("search-input");
  const searchValue = searchInp.value.toLowerCase().trim();
  fetch("https://openapi.programming-hero.com/api/words/all").then((res) =>
    res.json().then((words) => {
      const allWrods = words.data;
      const filterWords = allWrods.filter((word) =>
        word.word.toLowerCase().includes(searchValue)
      );
      // console.log(filterWords);
      showLevelWord(filterWords);
    })
  );
  // console.log(searchValue);
});
