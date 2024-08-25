import axios from 'axios'

interface DataType {
  name: {
    first: string;
    last: string;
  };
  login: {
    uuid: string;
  };
  picture: {
    medium: string;
  };
}

export interface UserType {
  name: string;
  uuid: string;
  avatar: string;
}

export const userRequestUrl =
  'https://randomuser.me/api/?inc=name,login,picture&noinfo&nat=us';

export const getUser = (): Promise<UserType> => {
  return axios
    .get(userRequestUrl)
    .then(({ data }: { data: { results: DataType[] } }) => {
      const { name, login, picture } = data.results[0];
      const { first, last } = name;

      return {
        name: `${first} ${last}`,
        uuid: login.uuid,
        avatar: picture.medium,
      };
    });
};