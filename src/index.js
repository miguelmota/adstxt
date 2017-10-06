const request = require('request-promise')
const parseDomain = require('parse-domain')

async function crawl (uri) {
  const result = []

  if (typeof uri !== 'string') {
    return result
  }

  if (!uri.length) {
    return result
  }

  const {subdomain, domain, tld} = parseDomain(uri)

  let siteDomain = `${domain}.${tld}`
  let crawlDomain = `${domain}.${tld}`

  const urls = [
    `https://${crawlDomain}/ads.txt`,
    `http://${crawlDomain}/ads.txt`
  ]

  if (subdomain) {
    crawlDomain = `${subdomain}.${domain}.${tld}`

    urls.unshift([
      `https://${crawlDomain}/ads.txt`,
      `http://${crawlDomain}/ads.txt`
    ])
  }

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i]
    try {
      const body = await request(url)
      const lines = body.split('\n')
      lines.forEach(x => {
        const line = x.replace(/#.*/gi, '')
        const cols = line.split(',')
        const adsystemDomain = (cols[0]||'').toLowerCase().trim()
        const sellerAccountId = (cols[1]||'').toLowerCase().trim()
        const accountType = (cols[2]||'').toLowerCase().trim()
        const tagId = (cols[3]||'').toLowerCase().trim()
        const entryComment = (/#.*/.test(x) ? x.replace(/.*#(.*)/gi, '$1').trim() : '')

        if (!adsystemDomain) {
          return false
        }

        const entry = {
          crawlUri: url,
          siteDomain,
          adsystemDomain,
          sellerAccountId,
          accountType,
          tagId,
          entryComment
        }

        result.push(entry)
      })

      break
    } catch (error) {
      continue
    }
  }

  return result
}

module.exports = {
  crawl
}
