$(function () {
    $.get('./songs.json').then(function (response) {
        let items = response
        items.forEach((i)=> {
            let $li = $(`
                <li>
                    <a href="./song.html?id=${i.id}">
                        <h3>${i.name}</h3>
                        <p>
                            <svg class="sq">
                                <use xlink:href="#icon-SQ"></use>
                            </svg>
                        ${i.singer}
                        </p>
                        <svg class="play">
                            <use xlink:href="#icon-play"></use>
                        </svg>
                    </a>
                </li>`)
            $('#latestMusic').append($li)
        })
        $('#latestMusicLoading').remove()
        $('#latestMusicLoading3').remove()
    },function () {
        alert('request fail')
    })

    $('.siteNav').on('click','ol.tabItems>li',function (e) {
        let $li = $(e.currentTarget).addClass('active')
        $li.siblings().removeClass('active')
        let index = $li.index()
        $li.trigger('changeTab',index)
        $('.tab-content > li').eq(index).addClass('active').siblings().removeClass('active')
    })
    $('.siteNav').on('changeTab',function (e,i) {
        if ($('.tab-content > li').eq(i).attr('data-downloaded') === 'yes') {return}
        if (i === 1) {
            $.get('./songs.json').then((res)=> {
                $('.tab-content > li').eq(i).attr('data-downloaded','yes')
                let items = res
                items.forEach((i)=> {
                    let $li2 = $(`
                <li>
                    <a href="./song.html?id=${i.id}">
                        <h3>${i.name}</h3>
                        <p>
                            <svg class="sq">
                                <use xlink:href="#icon-SQ"></use>
                            </svg>
                        ${i.singer}
                        </p>
                        <svg class="play">
                            <use xlink:href="#icon-play"></use>
                        </svg>
                    </a>
                </li>`)
                $('.hotSongs').append($li2)
                })
                $('#latestMusicLoading2').remove()
            })
        }
        else if (i === 2) {
            $.get('./songs.json').then((res)=> {
                $('.tab-content > li').eq(i).attr('data-downloaded','yes')
            })
        }
    })

    //搜索
    function search(keyword) {
        return new Promise((resolve,reject)=> {
            const database = [
                {"id": "1","name": "看透以后"},
                {"id": "2","name": "爱呀"},
                {"id": "3","name": "也罢"},
                {"id": "4","name": "Closer"},
                {"id": "5","name": "Shape Of My Heart"},
                {"id": "6","name": "凉城"},
                {"id": "7","name": "Daisy"},
                {"id": "8","name": "恋爱サーキュレーション"},
                {"id": "9","name": "Bleeding Love"},
                {"id": "10","name": "Price Tag"}
            ];
            let res = database.filter((item)=> {
                return item.name.indexOf(keyword) >= 0
            })
            setTimeout(function () {
                resolve(res)
            },0)
        })
        window.search = search
    }

    let  clock = undefined

    $('input#searchSong').on('input',function (e) {
        $('.search-list').css(
            'display','none'
        )
        $('.show-res').css(
            'display','block'
        )

        let $input = $(e.currentTarget)
        let value = $input.val().trim()
        if (value === '') {
            $('.search-list').css(
                'display','block'
            )
            $('.show-res').css(
                'display','none'
            )
        }
        if (clock) {
            clearTimeout(clock)
        }
        clock = setTimeout(function () {
            search(value).then(function (res) {
                clock = undefined
                if (res.length != 0 && res[0].id !== undefined) {
                        let $a = $(`
                    <a href="./song.html?id=${res[0].id}" class="search-res">
                        <svg class="search-icon">
                            <use xlink:href="#icon-sousuo"></use>
                        </svg>
                        <p id="output">${res[0].name}</p>
                    </a>`)
                        $('.show-res').append($a)
                }
                else {
                    // $('#output').text('没有搜索到结果')
                    console.log('not found')
                    let $a = $(`
                    <a href="" class="search-res">
                        <svg class="search-icon">
                            <use xlink:href="#icon-sousuo"></use>
                        </svg>
                        <p id="output">没有搜索到结果</p>
                    </a>`)
                    $('.show-res').append($a)
                }
            })
        },500)
        $('.show-res > a:first-child').remove()
        // console.log(value)
    })
})
