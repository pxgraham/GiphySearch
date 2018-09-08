$(document).ready(function () {
    var still;
    var anim;
    var key = 'AIf3qe5zqrkGAABYCy9QLD5kmbElLJeY';
    

    var topic = [
        'Adventure Time',
        'Dark Souls',
        'Runescape',
        'Final Fantasy'        
    ];


    for (var i = 0; i < topic.length; i++) {
        var btn = $('<button>');
        btn.text(topic[i]);
        $('#btnContainer').append(btn);
    }

    $('#add').click(function () {
        var searched = $('#search').val();
        var btn = $('<button>');
        btn.text(searched);
        $('#btnContainer').append(btn);
    });

    $('#delete').click(function() {
        $('#gifContainer').html('');
        $('#btnContainer').html('');
    });

    $('body').on('click', 'button', function (e) {
        for(var i = 0; i < 9; i++) {
            var queryURL = 'https://api.giphy.com/v1/gifs/random?api_key=' + key + '&tag=' + e.currentTarget.innerText;
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {   

                still = response.data.images.fixed_height_small_still.url;
                anim = response.data.images.fixed_height_small.url;
                var rating = response.data.images

                var col = $('<div class="col-sm-3 pushBot">');
                var btn1 = $('<button>');
                btn1.attr('class', 'imgBtn');
                var btn2 = $('<button>');
                btn2.attr('class', 'imgBtn');
                btn1.text('Rating: G');
                btn2.text('Download');
                btn2.attr('style', 'color: cyan;')


                var img = $('<img>');
                img.attr('src', still);
                img.attr('id', 'still'); 

                col.append(img);
                col.append(btn1);
                col.append(btn2);
                console.log(response);

                $('#gifContainer').prepend(col);
            });  
        }  

    });

    $('body').on('click', 'img', function (e) {

        var targetImg = e.currentTarget;
        var id = targetImg.id;
        if(id === 'anim') {
            var rgx = /(.gif)/img;
            var targetEdit = targetImg.src.replace(rgx, '_s.gif');
            targetImg.src = targetEdit;
            targetImg.id = 'still';
        } else if(id === 'still') {
            var rgx = /(\_s)/img;
            var targetEdit = targetImg.src.replace(rgx, '');
            targetImg.src = targetEdit;
            targetImg.id = 'anim';
        }

    });




});