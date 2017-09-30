$(function () {
    $.get('/lyric.json').then(function (response) {
        let {lyric} = response
        let arr = lyric.split('\n')
        let regExp = /^\[(.+)\](.*)$/;
        arr = arr.map(function (string) {
            let  matches = string.match(regExp)
            if (matches) {
                return {
                    time: matches[1],
                    words: matches[2]
                }
            }
        })
        // console.log(arr) arr为多个obj对象的数组
        let $lines= $('.lines')
        arr.map(function (obj) {
            let $p = $('<p></p>')
            if (obj) {
                $p.attr('data-time',obj.time).text(obj.words)
                $p.appendTo($lines)
            }
            else {
                return
            }

        })
    })
    let audio = document.createElement('audio')
    audio.src = '//ox2pbpy73.bkt.clouddn.com/1048%252Fd3ce%252Ffec4%252F0bcebfc98d9bb363e1f43030af38ddc4.mp3'
    audio.oncanplay = function () {
        audio.play()
        $('.disc-container').addClass('playing')
    }
    $('.iconPause').on('click',function () {
        audio.pause()
        $('.disc-container').removeClass('playing')
    })
    $('.iconPlay').on('click',function () {
        audio.play()
        $('.disc-container').addClass('playing')
    })
})