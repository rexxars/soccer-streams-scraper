const fs = require('fs')
const path = require('path')
const ss = require('../')

const fixturesDir = path.join(__dirname, 'fixtures')

test('can scrape front page', () => {
  const expected = require('./fixtures/index.json')
  const front = fs.readFileSync(path.join(fixturesDir, 'index.html'), 'utf8')
  const matches = normalize(ss.parseMatches(front))
  expect(matches).toEqual(expected)
})

test('can scrape streams page', () => {
  const expected = require('./fixtures/streams.json')
  const streamsPage = fs.readFileSync(path.join(fixturesDir, 'streams.html'), 'utf8')
  const streams = normalize(ss.parseStreams(streamsPage))
  expect(streams).toEqual(expected)
})

test('can retrieve front page (integration test)', () => {
  return ss.getMatches().then(matches => {
    const first = matches[0]
    const last = matches[matches.length - 1]

    expect(matches.length).toBeGreaterThan(0)

    expect(first.id).toMatch(/^\d+\/[^/]+/)
    expect(last.id).toMatch(/^\d+\/[^/]+/)

    expect(first.date).toBeInstanceOf(Date)
    expect(last.date).toBeInstanceOf(Date)

    expect(first.competition.length).toBeGreaterThan(0)
    expect(last.competition.length).toBeGreaterThan(0)

    expect(first.url).toMatch(/^https?:\/\//)
    expect(last.url).toMatch(/^https?:\/\//)

    expect(first.teams.home.name).not.toBe(first.teams.away.name)
    expect(last.teams.home.name).not.toBe(last.teams.away.name)

    expect(first.teams.home.imgUrl).toMatch(/^https?:\/\//)
    expect(first.teams.away.imgUrl).toMatch(/^https?:\/\//)

    expect(last.teams.home.imgUrl).toMatch(/^https?:\/\//)
    expect(last.teams.away.imgUrl).toMatch(/^https?:\/\//)
  })
})

test('can retrieve streams page (integration test)', () => {
  return ss.getMatches().then(matches => {
    const id = matches[0] && matches[0].id
    if (!id) {
      throw new Error('No matches found')
    }

    return ss.getStreamsForMatch(id).then(streams => {
      const first = streams[0]
      if (!first) {
        throw new Error('No streams found')
      }

      expect(first.id).toBeGreaterThan(0)
      expect(first.type).toMatch(/^(http|acestream)$/)
      expect(first.href).toMatch(/^(https?|acestream):\/\//)
    })
  })
})

// Remove dates since they cant be easily compared
function normalize (input) {
  return JSON.parse(JSON.stringify(input))
}
