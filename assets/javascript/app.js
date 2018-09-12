$(document).ready(function () {
    var still;
    var anim;
    var key = 'AsGfif7JjnpVSemTXFF5otD0Eiw1KN7W';
    var numberOfPics = 5;


    var topic = [
        'Adventure Time',
        'Dark Souls',
        'Runescape',
        'Final Fantasy'
    ];

    function btnCreation() {
        for (var i = 0; i < topic.length; i++) {
            var btn = $('<button>');
            btn.text(topic[i]);
            $('#btnContainer').append(btn);
        }
    }
    btnCreation();

    $('#add').click(function () {
        var searched = $('#search').val();
        $('#search').text('');
        topic.push(searched);
        $('#btnContainer').html('');
        btnCreation();
    });

    $('#delete').click(function () {
        $('#gifContainer').html('');
        $('#btnContainer').html('');
    });

    $('body').on('click', 'button', function (e) {
        for (var i = 0; i < numberOfPics; i++) {
            var queryURL = 'https://api.giphy.com/v1/gifs/random?api_key=' + key + '&tag=' + e.currentTarget.innerText;
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                still = response.data.images.fixed_height_small_still.url;
                anim = response.data.images.fixed_height_small.url;
                var rating = response.data.images;

                var col = $('<div class="col-sm-3 pushBot">');

                var btn1 = $('<p>')
                    .text('Rating: G')
                    .attr('class', 'imgBtn');

                var btn2 = $('<a>')
                    .css('font-size', '15px')  
                    .css('color', 'red') 
                    .text('♥ Like');

                var img = $('<img>')
                    .attr('src', still)
                    .attr('id', 'still');

                col.append(img);
                col.prepend(btn1);
                col.prepend(btn2);
                $('#gifContainer').prepend(col);
            });
        }
    });

    $('a').on('click', function(e) {
            var btn = e.currentTarget;
            console.log(btn);
            alert('liked!');
            btn.remove();
    })

    $('body').on('click', 'img', function (e) {

        var targetImg = e.currentTarget;
        var id = targetImg.id;
        if (id === 'anim') {
            var rgx = /(.gif)/img;
            var targetEdit = targetImg.src.replace(rgx, '_s.gif');
            targetImg.src = targetEdit;
            targetImg.id = 'still';
        } else if (id === 'still') {
            var rgx = /(\_s)/img;
            var targetEdit = targetImg.src.replace(rgx, '');
            targetImg.src = targetEdit;
            targetImg.id = 'anim';
        }

    });




});