export function Avatar({ firstname, lastname, image, website }: User) {
  return (
    <div>
      <h2>
        {firstname} {lastname}
      </h2>
      {image && <img src={image} alt="photo de profil" />}
      {website && <span>{website}</span>}
    </div>
  );
}
