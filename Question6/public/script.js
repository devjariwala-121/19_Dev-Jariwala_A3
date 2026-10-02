async function getJoke() {

    const response = await fetch("/api/joke");

    const data = await response.json();

    document.getElementById("setup").innerText =
        data.setup;

    document.getElementById("punchline").innerText =
        data.punchline;
}