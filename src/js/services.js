// drop-select activator
function toggleClass(elem, className) {
  if (elem.className.indexOf(className) !== -1) {
    elem.className = elem.className.replace(className, "");
  } else {
    elem.className = elem.className.replace(/\s+/g, " ") + " " + className;
  }

  return elem;
}

function toggleDisplay(elem) {
  const curDisplayStyle = elem.style.display;

  if (curDisplayStyle === "none" || curDisplayStyle === "") {
    elem.style.display = "block";
  } else {
    elem.style.display = "none";
  }
}

function toggleMenuDisplay(e) {
  const dropdown = e.currentTarget.parentNode;
  const menu = dropdown.querySelector(".menu");
  const icon = dropdown.querySelector(".fa-angle-right");

  menu.classList.remove("hided");
  toggleClass(menu, "menu--hide");
  toggleClass(icon, "rotate-90");
}

function handleOptionSelected(e) {
  toggleClass(e.target.parentNode, "menu--hide");

  const id = e.target.id;
  const newValue = e.target.textContent + " ";
  const titleElem = document.querySelector(".dropdown .title");
  const icon = document.querySelector(".dropdown .title .fa");

  titleElem.textContent = newValue;
  titleElem.appendChild(icon);

  //trigger custom event
  document.querySelector(".dropdown .title").dispatchEvent(new Event("change"));
  //setTimeout is used so transition is properly shown
  // setTimeout(() => toggleClass(icon, "rotate-90", 0));
}

//get elements
const dropdownTitle = document.querySelector(".dropdown .title");
const dropdownOptions = document.querySelectorAll(".dropdown .option");

//bind listeners to these elements
dropdownTitle.addEventListener("click", toggleMenuDisplay);

dropdownOptions.forEach((option) =>
  option.addEventListener("click", handleOptionSelected)
);

// document
//   .querySelector(".dropdown .title")
//   .addEventListener("change", handleTitleChange);

function setupTabs() {
  document.querySelectorAll(".tabs__btn").forEach((button) => {
    button.addEventListener("click", () => {
      const bar = button.parentElement;
      const tabsContainer = bar.parentElement.parentElement;
      const tabNumber = button.dataset.forTab;
      const tabToActivate = tabsContainer.querySelector(
        `.tabs__content[data-tab="${tabNumber}"]`
      );

      bar.querySelectorAll(".tabs__btn").forEach((button) => {
        button.classList.remove("tabs__btn--active");
      });
      tabsContainer.querySelectorAll(".tabs__content").forEach((tab) => {
        tab.classList.remove("tabs__content--active");
      });

      button.classList.add("tabs__btn--active");
      tabToActivate.classList.add("tabs__content--active");
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupTabs();

  document.querySelectorAll(".tabs").forEach((tabsContainer) => {
    tabsContainer.querySelector(".tabs__bar .tabs__btn").click();
  });
});

// function fetchData() {
//   const ACCESS_TOKEN_HERE =
//     "EAAEmENfYkWUBABLCtaS84DSWZCQ4q98n0SAI7p1IlL5weEPhMpCbmII0lq7BIA6vClB5rFQfZAIAhbdKbZAwHZAfXFiTcyKqwRUw73yh91axkpVSpWLP52lDp1lqdlq0Gdo31Md0BR29C97gDmQU7kVZACvHCB622ZBGW0CWRqDMKse98BBz2QidM5SMh6XbLK3wBUd1nAzWroHoYU6ZCoGxgKskkY8DtAhIVKWUsNrNsrCDZA5yS0IA";
//   const USER_ID = `1944686099038710`

//     // var url = `https://graph.facebook.com/${USER_ID}?fields=birthday,email,hometown&access_token=${ACCESS_TOKEN_HERE}`
//     // console.log(url);

//   fetch(`https://graph.facebook.com/v11.0/112073617808584?fields=images&access_token=EAANfP2hmmXMBACuVQPEDTAnzqtLgZAca0DF9wNIzkBa6o89dVYlCjA4LaAo3OBPRDZBqOHu3ZA9v97SqWnXKTyKsYnDr1UWWgJ7GdeYIR78pGZBjJeBEIuKT2ciyQuGEb52xRRXt0ZCvqEztonxoq4jw67ce38rJ6tYFw5zHEeTIoVZChW53BruqnxlHAZAK5QY7rXRV9uwBMbRZCjCuXfzg`).then((response) => {
//     response
//   }).then((data) => console.log(data))
//   }

// fetchData();
FB.api(
  '/112073617808584',
  'GET',
  {"fields":"images"},
  function(response) {
      console.log(response);
  }
);
