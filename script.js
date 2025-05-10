async function fetchNews(rssUrl, containerId) {
  const proxyUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

  try {
    const res = await fetch(proxyUrl);
    const data = await res.json();

    const container = document.querySelector(`#${containerId} .news-list`);
    container.innerHTML = ""; // clear previous

    data.items.slice(0, 5).forEach(item => {
      const el = document.createElement("div");
      el.className = "headline";
      el.innerHTML = `
        <a href="${item.link}" target="_blank" rel="noopener">${item.title}</a>
        <span class="timestamp">🕒 ${new Date(item.pubDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
      `;
      container.appendChild(el);
    });
  } catch (err) {
    console.error(`Error fetching news for ${containerId}`, err);
  }
}

function refreshAllNews() {
  fetchNews("https://www.whitehouse.gov/briefing-room/feed/", "white-house");
  fetchNews("https://www.congress.gov/rss/most-viewed", "congress");
  fetchNews("https://www.supremecourt.gov/rss/opinions.xml", "supreme-court");
}

refreshAllNews();
setInterval(refreshAllNews, 3 * 60 * 1000); // every 3 minutes
