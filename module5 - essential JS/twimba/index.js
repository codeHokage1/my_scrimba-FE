import { tweetsData as remoteTweets } from "./data.js";

const tweetBtn = document.querySelector("#tweet-btn");
const tweetInput = document.querySelector("#tweet-input");

const feed = document.querySelector("#feed");

let tweetsData = JSON.parse(localStorage.getItem('tweets')) || remoteTweets;

document.addEventListener("click", performEvent);
tweetBtn.addEventListener("click", addTweet);

const renderTweet = (tweets) => {
	feed.innerHTML = "";
    tweets.forEach((tweet) => {
        let repliesHtml = ``;
        if (tweet.replies.length) {
            tweet.replies.forEach((reply) => {
                repliesHtml += `
                    <div class="tweet-reply">
                        <div class="tweet-inner">
                            <img src="${reply.profilePic}" class="profile-pic">
                            <div>
                                <p class="handle">${reply.handle}</p>
                                <p class="tweet-text">${reply.tweetText}</p>
                            </div>
                        </div>
                    </div>
                `
            })
        }        
		feed.innerHTML += `
                <div class="tweet" id="${tweet.uuid}">
                    <div class="tweet-inner">
                        <img src="${tweet.profilePic}" class="profile-pic">
                        <div>
                            <p class="handle">${tweet.handle}</p>
                            <p class="tweet-text">${tweet.tweetText}</p>
                            <div class="tweet-details">
                                <span class="tweet-detail">
                                    <i class="fa-regular fa-comment-dots" data-comment-for="${
																			tweet.uuid
																		}"></i>
                                    ${tweet.replies.length}
                                </span>
                                <span class="tweet-detail">
                                    <i class="fa-solid fa-heart like-tweet ${
																			tweet.isLiked ? "liked" : null
																		}" data-like-for="${tweet.uuid}"></i>
                                    ${tweet.likes}
                                </span>
                                <span class="tweet-detail">
                                    <i class="fa-solid fa-retweet ${
																			tweet.isRetweeted ? "retweeted" : null
																		}" data-retweet-for="${tweet.uuid}"></i>
                                    ${tweet.retweets}
                                </span>
                                <span class="tweet-detail trash">
                                    <i class="fa-solid fa-trash" data-delete-for="${tweet.uuid}"></i>
                                </span>
                            </div>   
                        </div>            
                    </div>
                    <div class="hidden" id="replies-${tweet.uuid}">
                        <div class="add-reply">
                            <img src="images/scrimbalogo.png" alt="Scrimba logo"/>                                            
                            <div class="reply-details">
                                <textarea class="reply-input" id="reply-for-${tweet.uuid}"></textarea>
                                <button class="reply-btn" data-reply-for="${tweet.uuid}">Reply</button>
                            </div>                                        
                        </div>
                        ${repliesHtml}
                    </div> 
                </div>
        `;
	});
};

renderTweet(tweetsData);

function performEvent(event) {
	let tweetToLike = event.target.dataset.likeFor;
    let tweetToRetweet = event.target.dataset.retweetFor;
    let tweetToComments = event.target.dataset.commentFor;
    let tweetToReply = event.target.dataset.replyFor;
    let tweetToDelete = event.target.dataset.deleteFor;

	// if (!tweetToLike && !tweetToRetweet && !tweetToComments) return;

	if (tweetToLike) {
		const foundTweet = tweetsData.find((tweet) => tweet.uuid === tweetToLike);
		if (!foundTweet.isLiked) {
			foundTweet.isLiked = true;
			foundTweet.likes++;
		} else {
			foundTweet.isLiked = false;
			foundTweet.likes--;
        }

	    renderTweet(tweetsData);        
	} else if (tweetToRetweet) {
		const foundTweet = tweetsData.find(
			(tweet) => tweet.uuid === tweetToRetweet
		);
		if (!foundTweet.isRetweeted) {
			foundTweet.isRetweeted = true;
			foundTweet.retweets++;
		} else {
			foundTweet.isRetweeted = false;
			foundTweet.retweets--;
        }
	    renderTweet(tweetsData);        
    } else if (tweetToComments){
        document.getElementById(`replies-${tweetToComments}`).classList.toggle("hidden");
    } else if(tweetToReply) {
        const reply = document.getElementById(`reply-for-${tweetToReply}`);
        const foundPost = tweetsData.find(post => post.uuid === tweetToReply);

        if (reply.value) {
            const newReply = {
                handle: `@Twimba`,
                profilePic: `images/scrimbalogo.png`,
                tweetText: reply.value
            }
            foundPost.replies.unshift(newReply);
            reply.value = '';
            renderTweet(tweetsData)
            document.getElementById(`replies-${tweetToReply}`).classList.remove("hidden");
        }
    } else if (tweetToDelete) {
        const foundPost = tweetsData.find(post => post.uuid === tweetToDelete);
        tweetsData = tweetsData.filter(tweets => tweets.uuid !== foundPost.uuid);
        renderTweet(tweetsData)
        
    }
    localStorage.setItem('tweets', JSON.stringify(tweetsData));

}

function addTweet() {
    const tweet = tweetInput.value;
    if (!tweet) return;
    
    const newTweet = {
        uuid: uuidv4(),
        handle: "@Twimba",
        profilePic: "images/scrimbalogo.png",
        likes: 0,
        retweets: 0,
        tweetText: tweet,
        replies: [],
        isLiked: false,
        isRetweeted: false
    }
    tweetsData.unshift(newTweet);
    tweetInput.value = "";
    renderTweet(tweetsData);
}


