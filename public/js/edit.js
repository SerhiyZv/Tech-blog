// DOM declarations
const postForm = document.querySelector("#post-form");
const newPostBtn = document.querySelector("#publish");
const updatePostBtn = document.querySelector("#update");
const deletePostBtn = document.querySelector("#delete");

const publishPost = async () => {
    const title = document.querySelector("#titlearea").value.trim();
    const text = document.querySelector("#textarea").value.trim();

    const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
            title,
            text,
            post_date: new Date(),
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    })

    if (response.ok) {
        // Load dashboard, that now includes new post
        document.location.replace("/dashboard");
    } else {
        alert("Server error: Please try again");
    }
}

const updatePost = async () => {
    const postId = document.querySelector("#post-form").dataset.post_id;
    const title = document.querySelector("#titlearea").value.trim();
    const text = document.querySelector("#textarea").value.trim();

    if (!title) {
        alert("Enter title for post");
        return;
    }

    if (!text) {
        alert("Enter text for post");
        return;
    }

    const response = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            text
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    })

    if (response.ok) {
        // Load dashboard, that shows updated post
        document.location.replace("/dashboard");
    } else {
        alert("Server error: Please try again");
    }
}

const deletePost = async () => {
    const postId = document.querySelector("#post-form").dataset.post_id;

    const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    if (response.ok) {
        document.location.replace("/dashboard");
    } else {
        alert("Server error: Please try again");
    }
}

// Checks that button was served to page by handlebars
if (newPostBtn) {
    newPostBtn.addEventListener("click", publishPost);
}

if (updatePostBtn) {
    updatePostBtn.addEventListener("click", updatePost);
    deletePostBtn.addEventListener("click", deletePost);
}