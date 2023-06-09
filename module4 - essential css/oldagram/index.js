const allPosts = document.querySelector("#all-posts");

const posts = [
	{
		name: "Vincent van Gogh",
		username: "vincey1853",
		location: "Zundert, Netherlands",
		avatar: "images/avatar-vangogh.jpg",
		post: "images/post-vangogh.jpg",
		comment: "just took a few mushrooms lol",
		likes: 21,
	},
	{
		name: "Gustave Courbet",
		username: "gus1819",
		location: "Ornans, France",
		avatar: "images/avatar-courbet.jpg",
		post: "images/post-courbet.jpg",
		comment: "i'm feelin a bit stressed tbh",
		likes: 4,
	},
	{
		name: "Joseph Ducreux",
		username: "jd1735",
		location: "Paris, France",
		avatar: "images/avatar-ducreux.jpg",
		post: "images/post-ducreux.jpg",
		comment:
			"gm friends! which coin are YOU stacking up today?? post below and WAGMI!",
		likes: 152,
	},
];

const renderPosts = () => {
	allPosts.innerHTML = "";
	for (let post of posts) {
		let newPost = `
        <section class="post">
			<div class="post-user">
				<img src="${post.avatar}" alt="user-icon" />
				<div>
					<h3 class="post-username">${post.name}</h3>
					<p class="post-location">${post.location}</p>
				</div>
			</div>
			<img
				src="${post.post}"
				alt="painting of ${post.name}"
				class="post-image"
				id="post-${posts.indexOf(post)}"
			/>
			<div class="post-actions">
				<img class="like-btn" src="${post.liked ? "https://img.icons8.com/emoji/512/heart-suit.png" : "images/icon-heart.png"}" alt="heart icon" id="post-${posts.indexOf(
					post
				)}"/>
				<img src="images/icon-comment.png" alt="comment icon" />
				<img src="images/icon-dm.png" alt="share icon" />
			</div>
			<p class="likes">
				<span id="likes-number">${post.likes}</span> likes
			</p>
			<p class="caption">
				<span class="user-caption">${post.username}</span> j${post.comment}
		</section>
        `;
		allPosts.innerHTML += newPost;
	}
	listenForLikes();
};

// renderPosts();
document.addEventListener("DOMContentLoaded", renderPosts);

function listenForLikes() {
	const like = (event) => {
		let postIndex = event.target.id.split("-")[1];
		if (!posts[postIndex].liked) {
			posts[postIndex].likes += 1;
			posts[postIndex].liked = true;
		} else {
			posts[postIndex].likes -= 1;
			posts[postIndex].liked = false;
		}
		renderPosts();
	};

	const likeBtns = document.querySelectorAll(".like-btn");
	const postImages = document.querySelectorAll(".post-image");

	postImages.forEach(post => {
		post.addEventListener("dblclick", like)
	})

	likeBtns.forEach((btn) => {
		btn.addEventListener("click", like);
	});
}
