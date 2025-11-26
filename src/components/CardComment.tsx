interface Props {
    content: string;
    createdAt: Date;
}

const CardComment = ({content, createdAt}: Props) => {
  return (
      <>
          <div> VSŠ je zakon</div>
          <div>
              {content}
          </div>
          <h6>{createdAt}</h6>
      </>
  )
}
export default CardComment