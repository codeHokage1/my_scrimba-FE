import { tweetsData } from "./data.js";

const tweetBtn = document.querySelector("#tweet-btn");
const tweetInput = document.querySelector("#tweet-input");

const feed = document.querySelector("#feed");

tweetBtn.addEventListener("click", () => {
	window.alert(tweetInput.value);
	tweetInput.value = "";
});

const renderTweet = (tweets) => {
	feed.innerHTML = "";

	tweets.forEach((tweet) => {
		feed.innerHTML += `
                <div class="tweet" id="${tweet.uuid}">
                    <div class="tweet-inner">
                        <img src="${tweet.profilePic}" class="profile-pic">
                        <div>
                            <p class="handle">${tweet.handle}</p>
                            <p class="tweet-text">${tweet.tweetText}</p>
                            <div class="tweet-details">
                                <span class="tweet-detail">
                                    ${tweet.replies.length}
                                </span>
                                <span class="tweet-detail">
                                    ${tweet.likes}
                                </span>
                                <span class="tweet-detail">
                                    ${tweet.retweets}
                                </span>
                            </div>   
                        </div>            
                    </div>
                </div>
        `;
	});
};

renderTweet(tweetsData)
