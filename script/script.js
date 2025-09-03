const loadLeassons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all") // promise of response
    .then((res) => res.json()) // promise of json
    .then((json) => showLevel(json.data));
};

const loadLessons = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url).then((res) =>
    res.json().then((lessonData) => showLessonWord(lessonData.data))
  );
};

// {
//     "id": 71,
//     "level": 1,
//     "word": "Apple",
//     "meaning": "আপেল",
//     "pronunciation": "অ্যাপল"
// }

const showLessonWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  words.forEach((word) => {
    const card = document.createElement("div");
    card.innerHTML = `
    <div class="card bg-base-100 card-xl shadow-sm">
    <div class="card-body text-center">
        <h3 class="text-2xl font-bold">${word.word}</h3>
        <h4 class="text-sm font-medium">Meaning /Pronunciation</h4>
        <h2 class="font-bangla text-2xl font-bold mt-4 mb-8">"${word.meaning} / ${word.pronunciation}"</h2>
        <div class="justify-between card-actions">
            <button class="btn bg-cyan-50 hover:bg-cyan-200 border-none">
                <i class="fa-solid fa-circle-info text-xl"></i>
            </button>
            <button class="btn bg-cyan-50 hover:bg-cyan-200 border-none">
                <i class="fa-solid fa-volume-high text-xl"></i>
            </button>
        </div>
    </div> 
    </div>
    `;

    wordContainer.appendChild(card);
  });
};

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
    <button onclick="loadLessons(${lesson.level_no})" class="btn btn-outline btn-primary">
          <i class="fa-solid fa-book-open"></i> Lesson ${lesson.level_no}
    </button>
    
    `;
    // append into the container
    lessonsContainer.appendChild(div);
  });
};

loadLeassons();
