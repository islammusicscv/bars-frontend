interface Props {
    content: string;
    createdAt: Date;
}

const CardComment = ({content, createdAt}: Props) => {
  return (
      <>
          <div>
              {content}
          </div>
          <h6>{createdAt.toString()}</h6>
      </>
  )
}
export default CardComment