// assets/news.js
document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("news-container");
    const sortSelect = document.getElementById("sort-order");

    const response = await fetch("assets/news.json");
    const newsList = await response.json();

    function formatDate(dateISO) {
        const d = new Date(dateISO);
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, "0");
        const dd = String(d.getDate()).padStart(2, "0");
        return `${yyyy}/${mm}/${dd}`;
    }

    function render(sortOrder = "desc") {
        container.innerHTML = "";

        // 年度ごとにグループ化
        const grouped = newsList.reduce((acc, item) => {
            acc[item.year] = acc[item.year] || [];
            acc[item.year].push(item);
            return acc;
        }, {});

        // 年度の並び替え
        let years = Object.keys(grouped).map(y => parseInt(y, 10));
        years.sort((a, b) => (sortOrder === "asc" ? a - b : b - a));

        years.forEach(year => {
            const yearGroup = document.createElement("div");
            yearGroup.className = "year-group";

            const header = document.createElement("div");
            header.className = "year-header";

            const title = document.createElement("h3");
            title.className = "year-title";
            title.textContent = year;

            const toggle = document.createElement("span");
            toggle.className = "year-toggle";

            // 2026年度だけデフォルトで開く
            const body = document.createElement("div");
            body.className = "year-body";

            const isDefaultOpen = year === 2026;
            if (isDefaultOpen) {
                body.classList.add("open");
                toggle.textContent = "Click to collapse";
            } else {
                toggle.textContent = "Click to expand";
            }

            header.appendChild(title);
            header.appendChild(toggle);

            // 年度内の記事を dateISO でソート
            const sortedItems = grouped[year].sort((a, b) => {
                const da = new Date(a.dateISO);
                const db = new Date(b.dateISO);
                return sortOrder === "asc" ? da - db : db - da;
            });

            sortedItems.forEach(item => {
                const article = document.createElement("article");
                article.className = "news-card";

                article.innerHTML = `
          <header class="news-card-header">
            <h3 class="news-title">${item.title}</h3>
            <span class="news-date">${formatDate(item.dateISO)}</span>
          </header>
          <p class="news-summary">${item.summary}</p>
          ${item.links && item.links.length
                        ? `<div class="news-links">
              ${item.links
                            .map(
                                link => `
                <a href="${link.url}" class="news-link" target="_blank">
                  ${link.label}
                  <img class="favicon" data-domain="${link.url}">
                </a>
              `
                            )
                            .join("")}
            </div>`
                        : ""
                    }
        `;

                body.appendChild(article);
            });

            // 折り畳み動作
            header.addEventListener("click", () => {
                const isOpen = body.classList.contains("open");
                body.classList.toggle("open", !isOpen);
                toggle.textContent = isOpen ? "Click to expand" : "Click to collapse";
            });

            yearGroup.appendChild(header);
            yearGroup.appendChild(body);
            container.appendChild(yearGroup);
        });

        loadFavicons();
    }

    sortSelect.addEventListener("change", () => {
        render(sortSelect.value);
    });

    render(sortSelect.value);
});
