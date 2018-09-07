var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myObj = JSON.parse(this.responseText);
        var TopicArray = [];
        var hight = 0;
        TopicArray[0] = document.createElement('div');
        TopicArray[0].className = "Topic";
        document.getElementById('topics').appendChild(TopicArray[0]);
        TopicArray[0].style.position = "absolute";
        TopicArray[0].style.left = '0px';
        TopicArray[0].style.top = hight + 'px';
        var TitleInTopicArray = [];
        TitleInTopicArray[0] = document.createElement('a');
        TitleInTopicArray[0].className = "Title";
        TopicArray[0].appendChild(TitleInTopicArray[0]);
        TopicArray[0].style.fontSize = "xx-large";
        var UsernameInTopicArray = [];
        UsernameInTopicArray[0] = document.createElement('div');
        UsernameInTopicArray[0].className = "Username";
        TopicArray[0].appendChild(UsernameInTopicArray[0]);
        var NumberOfCommentsInTopicArray = [];
        NumberOfCommentsInTopicArray[0] = document.createElement('div');
        NumberOfCommentsInTopicArray[0].className = "NumberOfComments";
        TopicArray[0].appendChild(NumberOfCommentsInTopicArray[0]);
        TitleInTopicArray[0].innerHTML = myObj.Posts[0].title;
        var path = '/news/'+ myObj.Posts[0].id;
        TitleInTopicArray[0].setAttribute('href', path);
        UsernameInTopicArray[0].innerHTML = myObj.Posts[0].author;
        NumberOfCommentsInTopicArray[0].innerHTML = myObj.Posts[0].comments.length;
        for (i = 1; i < Object.keys(myObj.Posts).length; i++) {
            TopicArray[i] = document.createElement('div');
            TopicArray[i].className = "topic";
            TopicArray[i].style.position = "absolute";
            TopicArray[i].style.left = '0px';
            hight = hight + 50;
            TopicArray[i].style.top = hight + 'px';
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
            path = '/news/'+ myObj.Posts[i].id;
            TitleInTopicArray[i].setAttribute('href', path);
            UsernameInTopicArray[i].innerHTML = myObj.Posts[i].author;
            NumberOfCommentsInTopicArray[i].innerHTML = myObj.Posts[i].comments.length;
        }
    }
};
xmlhttp.open("GET", "/posts");
xmlhttp.send();