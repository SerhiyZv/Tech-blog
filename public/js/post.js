
const newComment = document.querySelector("#new-comment");
const commentForm = document.querySelector("#comment-form");
const commentFormContainer = document.querySelector("#comment-form-container");

// API call to check if user is still signed in 
const checkSignedIn = async () => {
    const response = await fetch('/api/users/signed-in', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    if (response.ok) {
        // Displays comment form
        commentFormContainer.classList.remove("hide");
        newComment.classList.add("hide");
    } else {
        // Redirects user to sign in page
        document.location.replace("/login");
    }
}

// Assigns checkSignedIn to "New Comment" button
newComment.addEventListener("click", checkSignedIn);

// Function to submit new comment info to server
const submitComment = async (event) => {
    event.preventDefault();

    const postId = document.querySelector(".post").dataset.post_id;

    const commentText = document.querySelector("#textarea").value.trim();

    if (!commentText) {
        alert("Enter comment text");
    }

    const response = await fetch('/api/comments/new', {
        method: 'POST',
        body: JSON.stringify({
            text: commentText,
            comment_date: new Date(),
            post_id: postId
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })

    if (response.ok) {
        // Reloads page
        document.location.replace(`/post/${postId}`);
    }
}

// Assigns submit Comment
commentForm.addEventListener("submit", submitComment);