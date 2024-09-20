interface TestimonialCardProps {
  review: string;
  profilePicture?: string;
  name: string;
  title: string;
}

const TestimonialCard = ({
  review,
  profilePicture,
  name,
  title,
}: TestimonialCardProps) => {
  return (
    <div className="bg-white text-black flex flex-col items-start p-4 h-60 min-w-[300px] justify-between rounded-2xl">
      <div className="bg-white text-black text-xs leading-relaxed">
        {review}
      </div>
      <div className="user-info flex gap-4">
        <div className="profile-picture w-10 h-10 ">
          <img
            className="w-full rounded-3xl h-full object-cover object-center"
            src={profilePicture}
            alt=""
          />
        </div>
        <div>
          <p className="name font-medium">{name}</p>
          <p className="title text-xs">{title} </p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
