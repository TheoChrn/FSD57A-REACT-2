interface User {
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
