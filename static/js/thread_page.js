var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myObj = JSON.parse(this.responseText);
        var MessagesArray = [];
        var hight = 13;
        var img = document.createElement("img");
        img.src = "../static/avatars/default.png"
        img.style.width = "100%";
        img.style.height = "100%";
        var ThreadTitle = document.createElement('div');
        var TextInTitle = document.createElement('div');
        ThreadTitle.className = "ThreadTitle";
        TextInTitle.className = "TextInTitle";
        TextInTitle.style.textAlign = "center";
        TextInTitle.innerHTML = myObj.Posts[0].title;
        ThreadTitle.appendChild(TextInTitle);
        document.getElementById('Thread').appendChild(ThreadTitle);
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
        NicknameArray[0].style.textAlign = "center";
        ProfileArray[0].appendChild(NicknameArray[0]);
        var AvatarArray =[];
        AvatarArray[0] = document.createElement('div');
        AvatarArray[0].className = "Avatar";
        AvatarArray[0].appendChild(img);
        ProfileArray[0].appendChild(AvatarArray[0]);
        var TextWindowArray = [];
        TextWindowArray[0] = document.createElement('div');
        TextWindowArray[0].className = "TextWindow";
        var TextArray = [];
        TextArray[0] = document.createElement('div');
        TextArray[0].className = "TextInWindow";
        TextWindowArray[0].appendChild(TextArray[0]);
        MessagesArray[0].appendChild(TextWindowArray[0]);
        NicknameArray[0].innerHTML = myObj.Posts[0].author;
        TextArray[0].innerHTML = myObj.Posts[0].text;
        for(i=0; i<Object.keys(myObj.Posts[0].comments).length; i++){
            MessagesArray[i] = document.createElement('div');
            MessagesArray[i].className = "Message";
            document.getElementById('Thread').appendChild(MessagesArray[i]);
            MessagesArray[i].style.position = "absolute";
            MessagesArray[0].style.left = '0%';
            hight = hight + 40;
            MessagesArray[i].style.top = hight + '%';
            ProfileArray[i] = document.createElement('div');
            ProfileArray[i].className = "ProfileOfMessage";
            MessagesArray[i].appendChild(ProfileArray[i]);
            NicknameArray[i] = document.createElement('div');
            NicknameArray[i].className = "NickName";
            NicknameArray[i].style.textAlign = "center";
            ProfileArray[i].appendChild(NicknameArray[i]);
            AvatarArray[i] = document.createElement('div');
            AvatarArray[i].className = "Avatar";
            AvatarArray[i].appendChild(img);
            ProfileArray[i].appendChild(AvatarArray[i]);
            TextWindowArray[i] = document.createElement('div');
            TextWindowArray[i].className = "TextWindow";
            TextArray[i] = document.createElement('div');
            TextArray[i].className = "TextInWindow";
            TextWindowArray[i].appendChild(TextArray[i]);
            MessagesArray[i].appendChild(TextWindowArray[i]);
            NicknameArray[i].innerHTML = myObj.Posts[i].author;
            TextArray[i].innerHTML = myObj.Posts[i].text;
        }
        var a = document.cookie.split(';');
        for(var i=0; i<a.length; i++){
            if(a[i].indexOf("login")>-1)
                b=a[i];
        }
        var log = b.split('=')[1];
        document.getElementById('author').value = log;
        var id = window.location.pathname.split('/')[2];
        var AddComment = document.createElement('div');
        AddComment.className = "AddComment";
        AddComment.style.top = hight + 36 + '%'
        AddComment.innerHTML = "<form method='post' action='/posts/add-comment'>" +
            "<div class='TextCreateComment'> <p><textarea rows='6' cols='83' name='text' required placeholder='Text' maxlength='940' style='font-size: 30px'></textarea></p> </div> " +
            "<input type='hidden' name='post_id' id='post_id' value=id> " +
            "<input type='hidden' name='author' id='author' value=log> " +
            "<button class='CommentButton'><strong>Comment</strong></button> </form>"
        document.getElementById('Thread').appendChild(AddComment);
    }
};
xmlhttp.open("GET", "/posts");
xmlhttp.send();

