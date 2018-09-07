var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myObj = JSON.parse(this.responseText);
        var MessagesArray = [];
        var hight = 13;
        MessagesArray[0] = document.createElement('div');
        MessagesArray[0].className = "Message";
        document.getElementById('Thread').appendChild(MessagesArray[0]);
        MessagesArray[0].style.position = "absolute";
        MessagesArray[0].style.left = '0%';
        MessagesArray[0].style.top = hight + '%';
        var ProfileArray = [];
        ProfileArray[0] = document.createElement('div');
        ProfileArray[0].className = "ProfileOfMessage";
        MessagesArray[0].appendChild(ProfileArray[0]);
        var NicknameArray = [];
        NicknameArray[0] = document.createElement('div');
        NicknameArray[0].className = "NickName";
        ProfileArray[0].appendChild(NicknameArray[0]);
        var UsernameInTopicArray = [];
        UsernameInTopicArray[0] = document.createElement('div');
        UsernameInTopicArray[0].className = "Username";
        TopicArray[0].appendChild(UsernameInTopicArray[0]);
        var NumberOfCommentsInTopicArray = [];
        NumberOfCommentsInTopicArray[0] = document.createElement('div');
        NumberOfCommentsInTopicArray[0].className = "NumberOfComments";
        TopicArray[0].appendChild(NumberOfCommentsInTopicArray[0]);
        TitleInTopicArray[0].innerHTML = myObj.Posts[0].title;
        TitleInTopicArray[0].setAttribute('href', '/thread');
        UsernameInTopicArray[0].innerHTML = myObj.Posts[0].author;
        NumberOfCommentsInTopicArray[0].innerHTML = myObj.Posts[0].comments.length;
    }
};
xmlhttp.open("GET", "/posts");
xmlhttp.send();

