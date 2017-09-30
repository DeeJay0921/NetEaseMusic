$(function () {

    let id = location.search.match(/\bid=([^&]*)/)[1]

    $.get('./songs.json').then(function (res) {
        let songs = res
        let song = songs.filter((s)=>{
            return s.id == id
        })
        let {url} = song[0]
        let audio = document.createElement('audio')
        audio.src = url
        $('.songTitle').text(song[0].name)
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

})