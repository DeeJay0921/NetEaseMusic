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
    audio.src='http://m10.music.126.net/20170930004535/9c19b17fad238861af285a2cea5795eb/ymusic/65f1/9c10/8777/3024762a7e227382f56e543aa0041f4b.mp3'
    audio.oncanplay = function () {
        audio.play()
        $('.disc-container').addClass('playing')
    }
})