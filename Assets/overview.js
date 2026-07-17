// Assets/overview.js
document.addEventListener("DOMContentLoaded", () => {
    const metricsImg = document.getElementById("github-metrics-img");

    // 毎日0時にURLパラメータを切り替えるための「本日の日付文字列(YYYYMMDD)」を取得
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const dateParam = `${yyyy}${mm}${dd}`; // 例: "20260714"

    // GitHub上のSVGのパスを指定 (リポジトリの配置場所に合わせて適宜変更してください)
    // ※もし本番サイトのディレクトリ内に生成している場合は "output/details.svg?v=..." に変更してください
    // const svgUrl = `https://raw.githubusercontent.com/Grain6888/Grain6888/main/output/details.svg?v=${dateParam}`;
    // または、GitHubのビューアーから直接SVGを取得する場合
    const svgUrl = `https://github.com/Grain6888/Grain6888/blob/main/output/details.svg?raw=true`;

    // 画像のSrcにセットして読み込み
    metricsImg.src = svgUrl;
});