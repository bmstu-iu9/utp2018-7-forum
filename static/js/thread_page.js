var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myObj = JSON.parse(this.responseText);
        var MessagesArray = [];
        var hight = 80;
        var post_code = window.location.pathname.split('/')[2];
        var post_number = 0;
        for(j=0; j<myObj.Posts.length; j++){
            if(myObj.Posts[j].id == post_code){
                post_number=j;
            }
        }
        var img = [];
        img[0] = document.createElement("img");
        img[0].src = "../static/avatars/default.png"
        img[0].style.width = "100%";
        img[0].style.height = "100%";
        var ThreadTitle = document.createElement('div');
        var TextInTitle = document.createElement('div');
        ThreadTitle.className = "ThreadTitle";
        TextInTitle.className = "TextInTitle";
        TextInTitle.style.textAlign = "center";
        TextInTitle.innerHTML = myObj.Posts[post_number].title;
        ThreadTitle.appendChild(TextInTitle);
        document.getElementById('Thread').appendChild(ThreadTitle);
        MessagesArray[0] = document.createElement('div');
        MessagesArray[0].className = "Message";
        document.getElementById('Thread').appendChild(MessagesArray[0]);
        MessagesArray[0].style.position = "absolute";
        MessagesArray[0].style.left = '0%';
        MessagesArray[0].style.top = hight + 'px';
        hight = hight + 320;
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
        AvatarArray[0].appendChild(img[0]);
        ProfileArray[0].appendChild(AvatarArray[0]);
        var TextWindowArray = [];
        TextWindowArray[0] = document.createElement('div');
        TextWindowArray[0].className = "TextWindow";
        var TextArray = [];
        TextArray[0] = document.createElement('div');
        TextArray[0].className = "TextInWindow";
        TextWindowArray[0].appendChild(TextArray[0]);
        MessagesArray[0].appendChild(TextWindowArray[0]);
        NicknameArray[0].innerHTML = myObj.Posts[post_number].author;
        TextArray[0].innerHTML = myObj.Posts[post_number].text;
        for(i=1; i<=Object.keys(myObj.Posts[post_number].comments).length; i++){
            MessagesArray[i] = document.createElement('div');
            MessagesArray[i].className = "Message";
            document.getElementById('Thread').appendChild(MessagesArray[i]);
            MessagesArray[i].style.position = "absolute";
            MessagesArray[i].style.left = '0%';
            MessagesArray[i].style.top = hight + 'px';
            hight = hight + 300;
            ProfileArray[i] = document.createElement('div');
            ProfileArray[i].className = "ProfileOfMessage";
            MessagesArray[i].appendChild(ProfileArray[i]);
            NicknameArray[i] = document.createElement('div');
            NicknameArray[i].className = "NickName";
            NicknameArray[i].style.textAlign = "center";
            ProfileArray[i].appendChild(NicknameArray[i]);
            AvatarArray[i] = document.createElement('div');
            AvatarArray[i].className = "Avatar";
            img[i] = document.createElement("img");
            img[i].src = "../static/avatars/default.png"
            img[i].style.width = "100%";
            img[i].style.height = "100%";
            AvatarArray[i].appendChild(img[i]);
            ProfileArray[i].appendChild(AvatarArray[i]);
            TextWindowArray[i] = document.createElement('div');
            TextWindowArray[i].className = "TextWindow";
            TextArray[i] = document.createElement('div');
            TextArray[i].className = "TextInWindow";
            TextWindowArray[i].appendChild(TextArray[i]);
            MessagesArray[i].appendChild(TextWindowArray[i]);
            NicknameArray[i].innerHTML = myObj.Posts[post_number].comments[i-1].author;
            TextArray[i].innerHTML = myObj.Posts[post_number].comments[i-1].text;
        }
        var a = document.cookie.split(';');
        for(i=0; i<a.length; i++){
            if(a[i].indexOf("login")>-1)
                b=a[i];
        }
        var log = b.split('=')[1];
        var AddComment = document.createElement('div');
        AddComment.className = "AddComment";
        AddComment.style.top = hight + 20 + 'px'
        AddComment.innerHTML = "<form method='post' action='/posts/add-comment'>" +
            "<div class='TextCreateComment'> <p><textarea rows='6' cols='81' name='text' required placeholder='Text' maxlength='940' style='font-size: 30px'></textarea></p> </div> " +
            "<input type='hidden' name='post_id' id='post_id' value=" + post_code +
            "> " +
            "<input type='hidden' name='author' id='author' value=" + log +
            "> " +
            "<button class='CommentButton'><strong>Comment</strong></button> </form>"
        document.getElementById('Thread').appendChild(AddComment);
    }
};
xmlhttp.open("GET", "/posts");
xmlhttp.send();

