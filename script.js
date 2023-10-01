// Set the target end date and time (YYYY, MM, DD, HH, MM, SS)
const targetDate = new Date("2023-10-01T23:59:59");

function updateCountdown() {
  const currentDate = new Date();
  const timeDifference = targetDate - currentDate;

  // Clock Maths

  if (timeDifference > 0) {
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    // Update the clock values in the HTML
    document.getElementById("days").textContent = days
      .toString()
      .padStart(2, "0");
    document.getElementById("hours").textContent = hours
      .toString()
      .padStart(2, "0");
    document.getElementById("minutes").textContent = minutes
      .toString()
      .padStart(2, "0");
    document.getElementById("seconds").textContent = seconds
      .toString()
      .padStart(2, "0");
  } else {
    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";
  }
}

// Update the countdown every second
setInterval(updateCountdown, 1000);

// Initial call to set the initial countdown values
updateCountdown();

// ROTATE SVG

function toggleContent(container) {
  const paragraph = container.nextElementSibling; // Select the adjacent <p> element

  if (paragraph.classList.contains("hidden-p")) {
    // Show the paragraph
    paragraph.classList.remove("hidden-p");
    paragraph.classList.add("visible-p");
  } else {
    // Hide the paragraph
    paragraph.classList.remove("visible-p");
    paragraph.classList.add("hidden-p");
  }

  // Toggle the rotation of the SVG
  const svg = container.querySelector("svg");
  const currentRotation = svg.style.transform || "rotate(0deg)";

  if (currentRotation === "rotate(0deg)") {
    svg.style.transform = "rotate(180deg)";
  } else {
    svg.style.transform = "rotate(0deg)";
  }
}

// BUTTON HOVER EFFECT

// Function to handle mouse movement over a target element
const handleOnMouseMove = (e) => {
  // Extract the target element from the event object
  const { currentTarget: target } = e;

  // Get the position of the target element relative to the viewport
  const rect = target.getBoundingClientRect();

  // Calculate the  position of the mouse cursor relative to the target element
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // Set custom CSS properties '--mouse-x' and '--mouse-y' on the target element
  target.style.setProperty("--mouse-x", `${x}px`);
  target.style.setProperty("--mouse-y", `${y}px`);
  target.style.setProperty("--mouseCircle", "150px");
};

// Function to toggle the 'clicked' button class
const handleClick = (e) => {
  const { currentTarget: target } = e;
  target.classList.add("clicked");
  target.style.setProperty("--mouseCircle", "500px");

  // Remove the 'clicked' class after the animations are complete
  setTimeout(() => {
    target.classList.remove("clicked");
  }, 400);
};

//Put the functions on the button
for (const button of document.querySelectorAll(".button")) {
  button.onmousemove = (e) => handleOnMouseMove(e);
  button.onclick = (e) => handleClick(e);
}

// Hamburger button effect

const buttons = document.querySelector(".hamburger-button");
const nav = document.querySelector("nav");
let menuItems = document.querySelectorAll(".show-menu ul li");

buttons.addEventListener("click", () => {
  const currentState = buttons.getAttribute("aria-expanded");

  if (!currentState || currentState === "false") {
    buttons.setAttribute("aria-expanded", "true");
  } else {
    buttons.setAttribute("aria-expanded", "false");
  }

  nav.classList.toggle("show-menu");

  if (nav.classList.contains("show-menu")) {
    setTimeout(() => {
      nav.style.opacity = "1";
      nav.style.transform = "translateX(0)";
    }, 1);

    menuItems = document.querySelectorAll(".show-menu ul li");

    nav.addEventListener("transitionend", () => {
      menuItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add("show-item");
        }, index * 60); // Adjust the delay as needed
      });
      // Remove the transitionend event listener to prevent it from firing multiple times
      nav.removeEventListener("transitionend", () => {});
    });
  } else {
    // If the menu is closing, remove the show-item class immediately
    menuItems.forEach((item) => {
      item.classList.remove("show-item");
    });

    // Animate the nav element to slide out
    setTimeout(() => {
      nav.style.opacity = "0";
      nav.style.transform = "translateX(100%)";
    }, 500);
  }
});
