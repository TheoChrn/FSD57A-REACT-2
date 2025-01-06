export function Avatar({
  firstName,
  lastName,
  image,
}: {
  firstName: string;
  lastName: string;
  image: string;
}) {
  return (
    <div>
      <h2>
        {firstName} {lastName}
      </h2>
      <img src={image} alt="photo de profil" />
    </div>
  );
}
