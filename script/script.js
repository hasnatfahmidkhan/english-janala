const loadLeassons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all") // promise of response
    .then((res) => res.json()) // promise of json
    .then((json) => showData(json.data));
};

// {
//     "id": 101,
//     "level_no": 1,
//     "lessonName": "Basic Vocabulary"
// }

const showData = (lessons) => {
  // get the container & empty
  const lessonsContainer = document.querySelector("#lessons-container");
  lessonsContainer.innerHTML = "";
  //   get into the every leasson
  lessons.forEach((lesson) => {
    // console.log(lesson);
    // create an element & set the html
    const div = document.createElement("div");
    div.innerHTML = `
    <button class="btn btn-outline btn-primary">
          <i class="fa-solid fa-book-open"></i> Lesson ${lesson.level_no}
    </button>
    
    `;
    // append into the container
    lessonsContainer.appendChild(div);
  });
};

loadLeassons();
