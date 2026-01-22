const data = [
  { id: 1, src: "images/g1.jpg", type: "general", unlocked: true },
  { id: 2, src: "images/g2.jpg", type: "general", unlocked: false },
  { id: 3, src: "images/m1.jpg", type: "male", unlocked: false },
  { id: 4, src: "images/f1.jpg", type: "female", unlocked: false },
];

let currentFilter = "general";

const grid = document.getElementById("grid");
const modal = document.getElementById("modal");
const modalGrid = document.getElementById("modalGrid");

function render(target, clickable = false) {
  target.innerHTML = "";

  data
    .filter(i => currentFilter === "general" || i.type === currentFilter)
    .forEach(item => {
      const card = document.createElement("div");
      card.className = `card ${item.unlocked ? "unlocked" : "locked"}`;
      if (item.unlocking) card.classList.add("unlocking");

      const img = document.createElement("img");
      img.src = item.src;
      card.appendChild(img);

      if (!item.unlocked) {
        const lock = document.createElement("div");
        lock.className = "lock";
        lock.innerHTML = `
          <svg>
            <circle cx="35" cy="35" r="30"></circle>
          </svg>
          🔒
        `;
        lock.onclick = () => unlock(item);
        card.appendChild(lock);
      }

      if (clickable) {
        card.onclick = () => openModal();
      }

      target.appendChild(card);
    });
}

function unlock(item) {
  if (item.unlocked || item.unlocking) return;

  item.unlocking = true;
  render(grid);
  render(modalGrid);

  setTimeout(() => {
    item.unlocked = true;
    item.unlocking = false;
    render(grid);
    render(modalGrid);
  }, 15000);
}

function openModal() {
  modal.style.display = "block";
  render(modalGrid);
}

document.getElementById("closeModal").onclick = () => {
  modal.style.display = "none";
};

document.querySelectorAll(".filter").forEach(btn => {
  btn.onclick = () => {
    document.querySelector(".filter.active").classList.remove("active");
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    render(grid, true);
  };
});

render(grid, true);
