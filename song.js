$(function () {

    let id = location.search.match(/\bid=([^&]*)/)[1]

    $.get('./songs.json').then(function (res) {
        let songs = res
        let song = songs.filter((s)=>{
            return s.id == id
        })
        let {url,name,lyric} = song[0]
        initPlayer.call(undefined,url)
        initText(name,lyric)
    })
    
    //lyric & name
    function initText(name, lyric) {
        $('.songTitle').text(name)
        // console.log(name,lyric)
        parseLyric(lyric)
    }
    
    function parseLyric(lyric) {
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
    }
    
    
    // url
    function initPlayer(url) {
        let audio = document.createElement('audio')
        audio.src = url
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
        setInterval(()=> {
            let seconds = audio.currentTime
            let minutes = ~~(seconds / 60)
            let left = seconds - minutes*60
            let time =  `${pad(minutes)}:${pad(left)}`
            // console.log(time)//拿到currentTime
            let $p = $('.lines>p')
            let $whichLine
            for (let i = 0;i < $p.length; i ++) {
                if( $p[i+1] !== undefined && $p.eq(i).attr('data-time') < time && $p.eq(i+1).attr('data-time') > time) { //超过当前时间但是没到下一句的时间时，显示当前行
                    $whichLine = $p.eq(i)
                }
            }
            if ($whichLine) {
                $whichLine.addClass('active').prev().removeClass('active')
                let top = $whichLine.offset().top
                let linesTop = $('.lines').offset().top
                let delta = top - linesTop - $('.lyric').height()/3
                $('.lines').css(
                    'transform', `translateY(-${delta}px)`
                )
                // console.log(top,linesTop)
            }
        },500)
    }

    function pad(number) {
        return number >= 10 ? number + '' : '0' + number
    }


})