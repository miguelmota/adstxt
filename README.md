# adstxt

> Crawls website for [ads.txt](https://iabtechlab.com/ads-txt/) entries.

# Install

```bash
npm install adstxt
```

# API

- **crawl**(uri) -> Promise({object[]})

  - {string} uri - website domain or uri

# Usage

```
const { crawl } = require('adstxt')

;(async () => {

console.log(await crawl('nytimes.com'))

/*
[
  {
    "crawlUri": "https://nytimes.com/ads.txt",
    "siteDomain": "nytimes.com",
    "adsystemDomain": "c.amazon-adsystem.com",
    "sellerAccountId": "3030",
    "accountType": "direct",
    "tagId": "",
    "entryComment": ""
  },
  ...
]
*/

console.log(await crawl('http://www.dailymail.co.uk/'))

/*
[
  {
    "crawlUri": "http://dailymail.co.uk/ads.txt",
    "siteDomain": "dailymail.co.uk",
    "adsystemDomain": "tremorhub.com",
    "sellerAccountId": "z87wm",
    "accountType": "reseller",
    "tagId": "1a4e959a1b50034a",
    "entryComment": "US"
  },
  ...
]
*/

})()
```

# CLI

```bash
npm install -g adstxt
```

```
$ adstxt nytimes.com

/*
[
  {
    "crawlUri": "https://nytimes.com/ads.txt",
    "siteDomain": "nytimes.com",
    "adsystemDomain": "c.amazon-adsystem.com",
    "sellerAccountId": "3030",
    "accountType": "direct",
    "tagId": "",
    "entryComment": ""
  },
  ...
]
*/
```

# Test

```bash
npm test
```

# Resources

- [Ads.txt - Authorized digital Sellers](https://iabtechlab.com/ads-txt/)

# License

MIT
