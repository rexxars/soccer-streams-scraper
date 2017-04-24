const cheerio = require('cheerio')
const request = require('./request')

async function getMatches () {
  const body = await request('/').then(res => res.body)
  return parseMatches(body)
}

async function getStreamsForMatch (match) {
  const id = typeof match === 'string' ? match : match.id
  const body = await request(`/streams/${id}`).then(res => res.body)
  return parseStreams(body)
}

function parseMatches (body) {
  const $ = cheerio.load(body)

  return $('#manage_events tbody tr').map((index, el) => {
    const row = $(el)
    const time = row.find('.event-time').data('eventtime')
    if (!time) {
      return
    }

    const competition = row.find('td:nth-child(2) img').attr('alt')
    const teams = parseTeams(row.find('td:nth-child(3)'))
    const link = row.find('td:last-child a')
    const url = link.attr('href')
    const [, id] = url.match(/\/streams\/(\d+\/.*?)$/)
    const numStreams = Number(link.find('.count').text())

    const date = new Date(time)
    return {id, teams, date, competition, url, numStreams}
  }).get()
}

function parseTeams (rootEl) {
  const home = rootEl.find('.text-right img')
  const away = rootEl.find('.text-left img')
  return {
    home: {
      name: home.attr('alt'),
      imgUrl: imgUrlify(home.attr('src'))
    },
    away: {
      name: away.attr('alt'),
      imgUrl: imgUrlify(away.attr('src'))
    }
  }
}

function imgUrlify (url) {
  const uri = url.indexOf('//') === 0 ? `https:${url}` : url
  return uri.replace('/small/', '/')
}

function parseStreams (body) {
  const $ = cheerio.load(body)
  return $('#streams-table tbody tr').map((index, el) => {
    const row = $(el)
    const id = Number(row.data('stream-id'))
    if (!id || isNaN(id)) {
      return
    }

    const sponsored = (row.attr('class') || '').split(' ').indexOf('sponsor') !== -1
    const type = (row.data('type') || '').toLowerCase()
    const href = row.data('href')
    const mobileCompatible = (row.data('mobile') || '').toLowerCase() === 'yes'
    const quality = row.data('quality')
    const language = (row.data('language') || '').toLowerCase()
    const nsfw = row.find('.tag.nsfw-tag').length > 0
    const rating = Number(row.find('.rating .rate').text())
    return {id, type, href, mobileCompatible, quality, language, nsfw, rating, sponsored}
  }).get()
}

module.exports = {
  getMatches,
  getStreamsForMatch,

  parseStreams,
  parseTeams,
  parseMatches
}
