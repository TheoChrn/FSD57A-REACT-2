export function Avatar({
  firstname,
  lastname,
  image,
  website,
  birthDate,
}: MockUser) {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {image && <img src={image} alt="photo de profil" />}
      <h2>
        {firstname} {lastname}
      </h2>
      <span>{birthDate}</span>
      {website && <span>{website}</span>}
    </div>
  );
}
