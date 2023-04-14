


interface MessageProps {
  user: boolean;
  message: string;
}

export const Message = ({ user, message }: MessageProps) => {

  let color = 'blue';
  if (user) {
    color = "red"
  };
  
  return(
    <>
      <div className="message">
        {message}
      </div>
      <style jsx>
        {`
          .message {
            background-color: ${color};
          }
        
        `}
      </style>
    </>

  )
}