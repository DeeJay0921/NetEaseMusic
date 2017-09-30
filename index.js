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
                        演唱者1--专辑1
                        </p>
                        <svg class="play">
                            <use xlink:href="#icon-play"></use>
                        </svg>
                    </a>
                </li>`)
            $('#latestMusic').append($li)
        })
        $('#latestMusicLoading').remove()
    },function () {
        alert('request fail')
    })
})
