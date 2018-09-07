var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myObj = JSON.parse(this.responseText);
        var TopicArray = [];
        var hight = 0;
        var topic = window.location.pathname.split('/')[1];
        var TitleInTopicArray = [];
        var TopicArray = [];
        var UsernameInTopicArray = [];
        var NumberOfCommentsInTopicArray = [];
        console.log(topic);
        for (i = 0; i < Object.keys(myObj.Posts).length; i++) {
            if (myObj.Posts[i].topic == topic) {
                TopicArray[i] = document.createElement('div');
                TopicArray[i].className = "topic";
                TopicArray[i].style.position = "absolute";
                TopicArray[i].style.left = '0px';
                TopicArray[i].style.top = hight + 'px';
                hight = hight + 50;
                document.getElementById('topics').appendChild(TopicArray[i]);
                TitleInTopicArray[i] = document.createElement('a');
                TitleInTopicArray[i].className = "Title";
                TopicArray[i].appendChild(TitleInTopicArray[i]);
                TopicArray[i].style.fontSize = "xx-large";
                UsernameInTopicArray[i] = document.createElement('div');
                UsernameInTopicArray[i].className = "Username";
                TopicArray[i].appendChild(UsernameInTopicArray[i]);
                NumberOfCommentsInTopicArray[i] = document.createElement('div');
                NumberOfCommentsInTopicArray[i].className = "NumberOfComments";
                TopicArray[i].appendChild(NumberOfCommentsInTopicArray[i]);
                TitleInTopicArray[i].innerHTML = myObj.Posts[i].title;
                path = '/' + myObj.Posts[i].topic + '/' + myObj.Posts[0].id;
                TitleInTopicArray[i].setAttribute('href', path);
                UsernameInTopicArray[i].innerHTML = myObj.Posts[i].author;
                NumberOfCommentsInTopicArray[i].innerHTML = myObj.Posts[i].comments.length;
            }
        }
    }
};
xmlhttp.open("GET", "/posts");
xmlhttp.send();