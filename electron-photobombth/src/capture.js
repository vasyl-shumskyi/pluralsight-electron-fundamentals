const video = require('./video')

window.addEventListener('DOMContentLoaded', _ => {
  const videoEl = document.getElementById('video')
  const canvasEl = document.getElementById('canvas')
  const recordEl = document.getElementById('record')
  const photosEl = document.getElementById('.photosContainer')
  const counterEl = document.getElementById('counter')

  video.init(navigator, videoEl)


})