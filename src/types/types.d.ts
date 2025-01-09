interface MockUser {
  id: string;
  firstname: string;
  lastname: string;
  image?: string;
  website: string;
  birthDate: string;
  address: {
    geo: {
      lat: number;
      lng: number;
    };
  };
}

interface Weather {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
  };
}

interface Music {
  id: number;
  name: string;
  author: string;
  genre: string;
}

interface User {
  _id: number;
  first_name: string;
  last_name: string;
  passion: string;
}

interface Post {
  _id: number;
  title: string;
  body: string;
  date: Date;
  userId: User["_id"];
}

interface PopulatedPost extends Omit<Post, "userId"> {
  userId: User;
}
