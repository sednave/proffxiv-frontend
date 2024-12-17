const domain = "http://localhost:5000"

export async function GetMostProfitableCrafts() {
    const endpoint = `${domain}/topProfit`;
    return fetch(endpoint, {
        method: "GET"
    })
    .then((res) => res.json())
}