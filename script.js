let nameWeights = {
  // Jacob: 1,
  // Ryan: 1,
  // Cody: 1,
  // Chris: 1,
  // Andy: 1,
  // Nick: 1,
  // Roger: 1,
  // Susie: 1,
  // Scott: 1,
  // Chandler: 1,
  // Timmy: 1,
  // Thomas: 1,
  // Xavi: 1,
  // Robert: 1
};

(async function fetchStudents() {
  await fetch("https://devpipeline-mock-api.herokuapp.com/api/get-users").then(
    (response) =>
      response.json().then((data) => {
        for (let person of data.users) {
          nameWeights[person.first_name] = 1;
        }
      })
  );
  renderNames();
})();

const nameContainer = document.querySelector(".name-container");
const randomName = document.querySelector(".random-pick");

const renderNames = () => {
  for (let name in nameWeights) {
    let nameWrapper = document.createElement("div");
    let studentName = document.createElement("h5");
    let minusBtn = document.createElement("button");
    let plusBtn = document.createElement("button");

    nameWrapper.className = "name-wrapper";
    studentName.className = `student-name ${name}`;
    studentName.innerHTML = `${name} : ${nameWeights[name]}`;
    minusBtn.className = "minus";
    minusBtn.innerHTML = "-";
    plusBtn.className = "plus";
    plusBtn.innerHTML = "+";

    plusBtn.onclick = () => {
      handleWeightChange(name, 1);
    };

    minusBtn.onclick = () => {
      handleWeightChange(name, -1);
    };

    nameWrapper.append(studentName, minusBtn, plusBtn);
    nameContainer.append(nameWrapper);
  }
};

const handleWeightChange = (name, crement) => {
  if (nameWeights[name] === 0 && crement === -1) {
    return;
  }

  const prevValue = nameWeights[name];
  nameWeights[name] = prevValue + crement;
  const weightEle = document.querySelector(`.${name}`);
  weightEle.innerHTML = `${name} : ${nameWeights[name]}`;
};

const sleep = (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
};

const resetNames = () => {
  for (let person in nameWeights) {
    nameWeights[person] = 1;
  }
};

const runProgram = async () => {
  for (let person in nameWeights) {
    console.log(nameWeights[person]);
    if (nameWeights[person] !== 0) {
      console.log(
        Object.keys(nameWeights)[Object.keys(nameWeights).length - 1] === person
      );
      break;
    } else if (
      Object.keys(nameWeights)[Object.keys(nameWeights).length - 1] === person
    ) {
      console.log(Object.keys(nameWeights)[Object.keys(obj).length - 1]);
      resetNames();
      return;
    } else {
      return;
    }
  }

  randomName.classList.remove("chosen-one");
  let nameArr = [];
  for (let name in nameWeights) {
    const individualNames = Array(nameWeights[name]).fill(name);
    nameArr = nameArr.concat(individualNames);
  }
  let nameChosen = "";
  for (let i = 0; i < 20; i++) {
    nameChosen = randomName.innerHTML =
      nameArr[Math.floor(Math.random() * nameArr.length)];
    await sleep(100);
  }
  nameWeights[nameChosen] = 0;
  const domName = document.querySelector(`.${nameChosen}`);
  domName.innerHTML = `${nameChosen} : ${nameWeights[nameChosen]}`;
  randomName.classList.add("chosen-one");
};
