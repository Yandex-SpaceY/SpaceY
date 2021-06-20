export interface ILeaders {
  place: number,
  avatar: string | null,
  codename: string,
  score: number,
}

export const leadersInfo: ILeaders[] = [
  {
    place: 1,
    avatar: null,
    codename: 'Somebody',
    score: 44444444444,
  },
  {
    place: 2,
    avatar: null,
    codename: 'Anybody or someoneelse',
    score: 12324,
  },
  {
    place: 3,
    avatar: null,
    codename: 'Nobody',
    score: 1001,
  },
  {
    place: 24,
    avatar: null,
    codename: 'This user',
    score: 123,
  },
];
