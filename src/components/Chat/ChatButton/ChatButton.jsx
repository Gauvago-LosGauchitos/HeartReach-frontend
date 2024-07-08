import './ChatButton.css';

export const ChatButton = ({ onClick }) => {
  return (
    <div className="chat-button" onClick={onClick}>
      💬
    </div>
  );
};

