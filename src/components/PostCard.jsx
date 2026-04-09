const PostCard = ({ post }) => {
  return (
    <div className="post-card-container">
      <p>{post.companyName}</p>
      <p className="center">{post.title}</p>
      <p className="text-end">{post.status}</p>

      <p>
        <a href={post.link} target="_blank" rel="noopener noreferrer">
          Original ad
        </a>
      </p>
      <p className="last-grid text-end">
        {new Date(post.applicationDate).toLocaleDateString()}
      </p>
    </div>
  );
};

export default PostCard;
