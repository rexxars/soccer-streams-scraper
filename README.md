# soccer-streams-scraper

[![npm version](http://img.shields.io/npm/v/soccer-streams-scraper.svg?style=flat-square)](http://browsenpm.org/package/soccer-streams-scraper)[![Build Status](http://img.shields.io/travis/rexxars/soccer-streams-scraper/master.svg?style=flat-square)](https://travis-ci.org/rexxars/soccer-streams-scraper)

Fetches soccer stream info from soccerstreams.net

## Installing

```
npm install --save soccer-streams-scraper
```

## Usage

### Get matches

```js
var soccerStreams = require('soccer-streams-scraper')

soccerStreams.getMatches().then(res => {
  console.log(res)
})
```

Output:

```json
[
  {
    "id": "6071/vitesse-79_vs_feyenoord-70",
    "teams": {
      "home": {
        "name": "Vitesse",
        "imgUrl": "https://cdn.soccerstreams.net/images/teams/vitesse-1530.png"
      },
      "away": {
        "name": "Feyenoord",
        "imgUrl": "https://cdn.soccerstreams.net/images/teams/feyenoord-1518.png"
      }
    },
    "date": "2017-04-23T10:30:00.000Z",
    "competition": "Eredivisie",
    "url": "http://soccerstreams.net/streams/6071/vitesse-79_vs_feyenoord-70",
    "numStreams": 5
  },
  {
    "id": "6068/sparta-rotterdam-76_vs_ado-den-haag-73",
    "teams": {
      "home": {
        "name": "Sparta Rotterdam",
        "imgUrl": "https://cdn.soccerstreams.net/images/teams/sparta-rotterdam-1535.png"
      },
      "away": {
        "name": "ADO Den Haag",
        "imgUrl": "https://cdn.soccerstreams.net/images/teams/ado-den-haag-1514.png"
      }
    },
    "date": "2017-04-23T10:30:00.000Z",
    "competition": "Eredivisie",
    "url": "http://soccerstreams.net/streams/6068/sparta-rotterdam-76_vs_ado-den-haag-73",
    "numStreams": 2
  }
]
```

### Get streams

```js
var soccerStreams = require('soccer-streams-scraper')

var matchId = '6072/burnley-1006_vs_manchester-united-56'

soccerStreams.getStreamsForMatch(matchId).then(res => {
  console.log(res)
})
```

Output:

```json
[
  {
    "id": 13594,
    "type": "http",
    "href": "http://www.247hd.info/hd1.php",
    "mobileCompatible": true,
    "quality": "HD",
    "language": "english",
    "nsfw": false,
    "rating": 5,
    "sponsored": false
  },
  {
    "id": 13664,
    "type": "acestream",
    "href": "acestream://93393ff5e41273fb43c104d639e3f0d36f8742e3",
    "mobileCompatible": true,
    "quality": "520P",
    "language": "english",
    "nsfw": false,
    "rating": 4,
    "sponsored": false
  }
]
```

## Disclaimer

I take no responsibility for the content that's provided through this module.  
This module is not associated with or endorsed by soccerstreams.net in any way.

## License

MIT-licensed. See LICENSE.
