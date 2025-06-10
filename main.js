function extractId(url) {
  try {
    const u = new URL(url);
    return new URLSearchParams(u.search).get("id");
  } catch {
    return null;
  }
}

function loadVideo() {
  const input = document.getElementById("urlInput").value.trim();
  const id = extractId(input) || "mjXtbZDA1";
  const direct = `https://cdn.videy.co/${id}.mp4`;
  const player = document.getElementById("player");
  player.src = direct;
  player.load();

  const result = {
    creator: "branpedia",
    directUrl: direct,
    originalUrl: input,
    videoId: id,
  };

  document.getElementById("json").textContent = JSON.stringify(result, null, 2);
  const newUrl = `${location.origin}${location.pathname}?videy=${encodeURIComponent(input)}`;
  history.pushState({ path: newUrl }, '', newUrl);
}

document.getElementById("loadBtn").onclick = loadVideo;

window.onload = () => {
  const params = new URLSearchParams(location.search);
  const url = params.get("videy");
  if (url) {
    document.getElementById("urlInput").value = decodeURIComponent(url);
  }
  loadVideo();
};
