const _newsArticles = [
    {"id": 1, "title": "Despacito 2 announced"},
    {"id": 2, "title": "Ya yeet"},
    {"id": 3, "title": "Ya boi"}
]

export default {
    //CB mocks callback because REST API calls typically take some time
    getNewsArticles(cb) {
        setTimeout(() => cb(_newsArticles), 100)
    }
}
  
