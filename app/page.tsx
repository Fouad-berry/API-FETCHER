'use client';
import React, { useState, useEffect } from 'react';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

const Page: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data: Post[]) => setPosts(data))
      .catch((error) => console.error('Error fetching posts:', error));
  }, []);

  const fetchComments = (post: Post) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
      .then((response) => response.json())
      .then((data: Comment[]) => {
        setComments(data);
        setSelectedPost(post);
        setIsModalOpen(true);
      })
      .catch((error) => console.error('Error fetching comments:', error));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
    setComments([]);
  };

  return (
    <div>
      <h1 className='titre'>Affichage des Posts</h1>
      <div className='card-container'>
        {posts.map((post) => (
          <div
            key={post.id}
            className='card'
            onClick={() => fetchComments(post)}
            style={{
              border: '5px solid #ccc',
              padding: '20px',
              margin: '10px',
              borderRadius: '8px',
              cursor: 'pointer',
              width: '50%',
            }}
          >
            <h2>{post.title}</h2>
            <p><strong>UserId:</strong> {post.userId}</p>
            <p><strong>postId:</strong> {post.id}</p>
            <p>{post.body}</p>
          </div>
        ))}
      </div>

      {isModalOpen && selectedPost && (
        <div
          className='modal'
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            className='modal-content'
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              maxWidth: '600px',
              width: '100%',
            }}
          >
            <h2>Les commentaires pour le post {selectedPost.id}</h2>
            <button
              onClick={closeModal}
              style={{
                float: 'right',
                background: 'red',
                color: 'white',
                border: 'none',
                padding: '5px 10px',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Fermer
            </button>
            {comments.map((comment) => (
              <div key={comment.id} style={{ marginBottom: '20px' }}>
                <h3>{comment.name}</h3>
                <p><strong>Email:</strong> {comment.email}</p>
                <p>{comment.body}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
