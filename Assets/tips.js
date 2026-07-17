// Assets/tips.js
document.addEventListener("DOMContentLoaded", async () => {
    const listContainer = document.getElementById("tips-list-container");
    const tipsBody = document.getElementById("tips-body");

    // Markdownのテキストから最初の大見出し「# タイトル」を抽出する関数
    function extractTitle(markdownText, defaultTitle) {
        const match = markdownText.match(/^#\s+(.+)$/m);
        return match ? match[1].trim() : defaultTitle;
    }

    // Markdownファイルを読み込んで表示する関数
    async function loadMarkdown(fileName) {
        if (!fileName) return;

        tipsBody.innerHTML = `<p style="color: var(--text-muted);">Loading...</p>`;

        try {
            // Assets/tips/ 配下のファイルをフェッチ
            const response = await fetch(`Assets/tips/${fileName}`);
            if (!response.ok) throw new Error("File not found");

            const markdownText = await response.text();

            // marked.js を使ってHTMLに変換して注入
            tipsBody.innerHTML = marked.parse(markdownText);
        } catch (error) {
            tipsBody.innerHTML = `<p style="color: red;">記事の読み込みに失敗しました (${fileName})</p>`;
        }
    }

    try {
        // 自動生成されたJSONファイルから、Markdownファイル一覧を取得する
        const response = await fetch("Assets/tips/tips-list.json");
        if (!response.ok) throw new Error("Failed to load tips-list.json");
        const fileNames = await response.json();

        // .md で終わるファイルのみにフィルタリング
        const mdFiles = fileNames.filter(name => name.endsWith(".md"));

        if (mdFiles.length === 0) {
            listContainer.innerHTML = `<li style="color: var(--text-muted); font-size: 0.85rem; padding: 8px 12px;">No articles found</li>`;
            tipsBody.innerHTML = `<p style="color: var(--text-muted);">No articles found</p>`;
            return;
        }

        // 各Markdownファイルを一時的に取得して、タイトル（#）を並列処理で抽出
        const articles = await Promise.all(
            mdFiles.map(async (fileName) => {
                try {
                    const res = await fetch(`Assets/tips/${fileName}`);
                    if (!res.ok) throw new Error();
                    const text = await res.text();

                    const fallbackTitle = fileName.replace(".md", "");
                    const title = extractTitle(text, fallbackTitle);
                    return { fileName, title, success: true };
                } catch (err) {
                    return { fileName, title: `Error: ${fileName}`, success: false };
                }
            })
        );

        // サイドバーにリスト要素を動的に生成
        listContainer.innerHTML = "";
        articles.forEach((article, idx) => {
            const li = document.createElement("li");
            li.className = "tips-item";
            if (idx === 0) li.classList.add("active"); // 最初の記事を初期状態で選択
            li.textContent = article.title;
            li.setAttribute("data-file", article.fileName);

            // クリックイベントの登録
            li.addEventListener("click", () => {
                document.querySelectorAll(".tips-item").forEach(i => i.classList.remove("active"));
                li.classList.add("active");

                loadMarkdown(article.fileName);
            });

            listContainer.appendChild(li);
        });

        // 初期表示として、最初の記事を展開
        if (articles.length > 0 && articles[0].success) {
            loadMarkdown(articles[0].fileName);
        }

    } catch (error) {
        listContainer.innerHTML = `<li style="color: red; font-size: 0.85rem; padding: 8px 12px;">Failed to load list</li>`;
        tipsBody.innerHTML = `<p style="color: red;">記事リストの取得に失敗しました。自動化スクリプト等で "Assets/tips/tips-list.json" が正しく生成されているか確認してください。</p>`;
    }
});