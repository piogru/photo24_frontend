type LikeCounterProps = {
  likes?: number;
  hideLikes?: boolean;
};

export default function LikeCount({
  likes,
  hideLikes = false,
}: LikeCounterProps) {
  return (
    <>
      {!hideLikes ?
        <span className="font-semibold">{likes} likes</span>
      : null}
    </>
  );
}
