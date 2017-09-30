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
    audio.src='//dl.stream.qqmusic.qq.com/C400001AjnfP2g3gdz.m4a?vkey=D890974519FF528FB0FC34C31C64E47D69B7C47F60E3BC0F3EFBA3F67BA6DBBBEA1F8428B474F7899283C35B5F9997DD169CBBB1527EFBAE&guid=7669628493&uin=0&fromtag=66';
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