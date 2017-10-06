const { crawl } = require('./index')

;(async () => {
  const uri = process.argv[2]

  const results = await crawl(uri)

  console.log(JSON.stringify(results, null, 2))
})()
