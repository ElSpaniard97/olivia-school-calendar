// === Olivia Sims Calendar Suite ===
// Shared logic for Calendar, Tasks, Weekly, Verses

(function() {
  const PASSWORD = "Moana0121";
  const STORAGE_TASKS = "olivia_tasks";
  const STORAGE_VERSES = "olivia_pinned_verses";

  // Password protection (simple prompt gate)
  if (!localStorage.getItem("olivia_authed")) {
    const input = prompt("Enter password to access:");
    if (input !== PASSWORD) {
      alert("Incorrect password. Reload to try again.");
      document.body.innerHTML = "";
      return;
    }
    localStorage.setItem("olivia_authed", "1");
  }

  // ===== Utility Helpers =====
  const saveTasks = (tasks) => localStorage.setItem(STORAGE_TASKS, JSON.stringify(tasks));
  const loadTasks = () => JSON.parse(localStorage.getItem(STORAGE_TASKS) || "[]");

  const saveVerses = (verses) => localStorage.setItem(STORAGE_VERSES, JSON.stringify(verses));
  const loadVerses = () => JSON.parse(localStorage.getItem(STORAGE_VERSES) || "[]");

  const ymd = (d) => d.toISOString().split("T")[0];

  // ===== Calendar Page Logic =====
  if (document.title.includes("Calendar")) {
    const daysContainer = document.querySelector(".days");
    const monthTitle = document.querySelector(".month");
    const yearTitle = document.querySelector(".year");
    const tasks = loadTasks();
    const today = new Date();

    let viewDate = new Date(today.getFullYear(), today.getMonth(), 1);
    renderCalendar();

    function renderCalendar() {
      const year = viewDate.getFullYear();
      const month = viewDate.getMonth();
      const firstDay = new Date(year, month, 1);
      const startDay = (firstDay.getDay() + 6) % 7; // Monday start
      const lastDate = new Date(year, month + 1, 0).getDate();

      monthTitle.textContent = firstDay.toLocaleDateString("en-US", { month: "long" });
      yearTitle.textContent = year;

      daysContainer.innerHTML = "";

      // fill blanks before first day
      for (let i = 0; i < startDay; i++) {
        const blank = document.createElement("div");
        blank.className = "day-cell";
        blank.style.background = "#fafafa";
        daysContainer.appendChild(blank);
      }

      for (let d = 1; d <= lastDate; d++) {
        const cell = document.createElement("div");
        cell.className = "day-cell";
        const date = new Date(year, month, d);
        const dateStr = ymd(date);
        const dateNum = document.createElement("div");
        dateNum.className = "date-num";
        dateNum.textContent = d;
        cell.appendChild(dateNum);

        const hasTasks = tasks.some((t) => t.date === dateStr);
        if (hasTasks) {
          const dot = document.createElement("div");
          dot.className = "task-dot";
          cell.appendChild(dot);
        }

        if (ymd(today) === dateStr) cell.classList.add("today");

        cell.addEventListener("click", () => showDayTasks(dateStr));
        daysContainer.appendChild(cell);
      }
    }

    function showDayTasks(dateStr) {
      const dayTasks = loadTasks().filter((t) => t.date === dateStr);
      if (!dayTasks.length) {
        alert(`No tasks for ${dateStr}.`);
        return;
      }
      let msg = `Tasks for ${dateStr}:\n`;
      for (const t of dayTasks) msg += `• ${t.title} (${t.category}, ${t.priority})\n`;
      alert(msg);
    }
  }

  // ===== Task Manager Page =====
  if (document.title.includes("Task Manager")) {
    const list = document.querySelector("ul");
    const addBtn = document.querySelector(".btn.primary");
    const titleInput = document.querySelector("input[placeholder='Task title']");
    const dateInput = document.querySelector("input[type='date']");
    const selects = document.querySelectorAll("select");

    let tasks = loadTasks();
    renderTasks();

    addBtn.addEventListener("click", () => {
      const title = titleInput.value.trim();
      const date = dateInput.value;
      const category = selects[0].value;
      const priority = selects[1].value;

      if (!title || !date) return alert("Please fill out all fields.");
      tasks.push({ title, date, category, priority, done: false });
      saveTasks(tasks);
      titleInput.value = "";
      dateInput.value = "";
      renderTasks();
    });

    function renderTasks() {
      list.innerHTML = "";
      if (!tasks.length) return (list.innerHTML = "<li>No tasks yet</li>");
      for (const [i, t] of tasks.entries()) {
        const li = document.createElement("li");
        li.style.margin = "6px 0";
        li.style.background = "#fbe9ef";
        li.style.padding = "8px 10px";
        li.style.borderRadius = "10px";
        li.innerHTML = `
          <strong>${t.title}</strong> (${t.date}) 
          - ${t.category} / ${t.priority}
          <button data-i="${i}" class="delete-btn" style="float:right;">Delete</button>
        `;
        list.appendChild(li);
      }
      list.querySelectorAll(".delete-btn").forEach((b) =>
        b.addEventListener("click", (e) => {
          const i = e.target.dataset.i;
          if (confirm("Delete this task?")) {
            tasks.splice(i, 1);
            saveTasks(tasks);
            renderTasks();
          }
        })
      );
    }
  }

  // ===== Weekly View Page =====
  if (document.title.includes("Weekly View")) {
    const container = document.querySelector("main section div:last-child");
    const tasks = loadTasks();
    const today = new Date();
    const monday = new Date(today);
    monday.setDate(today.getDate() - ((today.getDay() + 6) % 7));

    renderWeek(monday);

    function renderWeek(start) {
      const end = new Date(start);
      end.setDate(start.getDate() + 6);
      container.innerHTML = "";

      for (let i = 0; i < 7; i++) {
        const d = new Date(start);
        d.setDate(start.getDate() + i);
        const dateStr = ymd(d);
        const title = d.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });
        const div = document.createElement("div");
        div.innerHTML = `<h4>${title}</h4>`;
        const dayTasks = tasks.filter((t) => t.date === dateStr);
        if (!dayTasks.length) div.innerHTML += `<p style="color:gray;">No tasks</p>`;
        else {
          const ul = document.createElement("ul");
          for (const t of dayTasks) {
            const li = document.createElement("li");
            li.textContent = `${t.title} (${t.category}, ${t.priority})`;
            ul.appendChild(li);
          }
          div.appendChild(ul);
        }
        container.appendChild(div);
      }
    }
  }

  // ===== Verses Page =====
  if (document.title.includes("Pinned Verses")) {
    const verses = loadVerses();
    const verseContainer = document.querySelector("main section");
    const clearBtn = document.querySelector(".btn.primary");

    renderVerses();

    clearBtn.addEventListener("click", () => {
      if (confirm("Clear all pinned verses?")) {
        saveVerses([]);
        renderVerses();
      }
    });

    function renderVerses() {
      verseContainer.querySelectorAll(".verse").forEach((v) => v.remove());
      const data = loadVerses();
      if (!data.length) {
        const msg = document.createElement("p");
        msg.textContent = "No pinned verses yet.";
        verseContainer.insertBefore(msg, clearBtn);
        return;
      }
      for (const v of data) {
        const div = document.createElement("div");
        div.className = "verse";
        div.innerHTML = `<div class="verse-ref">${v.ref}</div><div class="verse-text">${v.text}</div>`;
        verseContainer.insertBefore(div, clearBtn);
      }
    }
  }

  // ===== Live Bible Verse Fetcher (Calendar only) =====
  if (document.title.includes("Calendar")) {
    const verseBox = document.createElement("div");
    verseBox.className = "verse";
    verseBox.innerHTML = `<div class="verse-ref">Loading verse...</div>`;
    document.querySelector(".shell").prepend(verseBox);

    async function fetchVerse() {
      try {
        // Using a free random verse API (fallback if Bible.com blocks CORS)
        const res = await fetch("https://labs.bible.org/api/?passage=random&type=json");
        const data = await res.json();
        const v = data[0];
        verseBox.innerHTML = `
          <div class="verse-ref">${v.bookname} ${v.chapter}:${v.verse}</div>
          <div class="verse-text">${v.text}</div>
          <button class="btn primary" id="pinVerseBtn">Pin Verse</button>
        `;
        document.getElementById("pinVerseBtn").addEventListener("click", () => {
          const verses = loadVerses();
          verses.push({ ref: `${v.bookname} ${v.chapter}:${v.verse}`, text: v.text });
          saveVerses(verses);
          alert("Verse pinned!");
        });
      } catch {
        verseBox.innerHTML = `<div class="verse-text">Could not load verse. Please try again later.</div>`;
      }
    }
    fetchVerse();
  }
})();

