const domain = "https://proffxivit-backend.onrender.com/"

export async function GetMostProfitableCrafts() {
    const endpoint = `${domain}/topProfit`;
    return fetch(endpoint, {
        method: "GET"
    })
    .then((res) => res.json())
}