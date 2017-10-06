const test = require('tape')
const { crawl } = require('../index')

test(async (t) => {
  t.plan(17)

  const results_1 = await crawl('nytimes.com')
  t.ok(results_1.length)

  t.ok(typeof results_1[0] === 'object')
  t.ok(results_1[0].crawlUri, 'https://nytimes.com/ads.txt')
  t.ok(results_1[0].siteDomain, 'nytimes.com')
  t.ok(results_1[0].adsystemDomain.length)
  t.ok(results_1[0].sellerAccountId.length)
  t.ok(results_1[0].accountType.length)
  t.ok(typeof results_1[0].tagId === 'string')
  t.ok(typeof results_1[0].entryComment === 'string')

  const results_2 = await crawl('http://www.huffingtonpost.com')
  t.ok(results_2.length)

  const results_3 = await crawl('http://www.espn.com/')
  t.ok(results_3.length)

  const results_4 = await crawl()
  t.ok(results_4.length === 0)

  const results_5 = await crawl('http://example.com')
  t.ok(results_5.length === 0)

  const results_6 = await crawl({})
  t.ok(results_6.length === 0)

  const results_7 = await crawl(function(){})
  t.ok(results_7.length === 0)

  const results_8 = await crawl([])
  t.ok(results_8.length === 0)

  const results_9 = await crawl(`http://www.dailymail.co.uk/`)
  t.ok(results_9.length)
})
