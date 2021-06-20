export interface ITopic {
  title: string,
  count_messages: number,
  date: number,
}

interface ITopicsIinfo {
  data: ITopic[],
  totalRecords: number,
  limit: number,
  skip: number,
}

export const topicsInfo: ITopicsIinfo = {
  data: [
    {
      title: 'Last topic',
      count_messages: 0,
      date: 1624218251000,
    },
    {
      title: 'One more topic and topic and some other words about this topic',
      count_messages: 48,
      date: 1611171851000,
    },
    {
      title: 'Old topic',
      count_messages: 148,
      date: 1548013451000,
    },
  ],
  totalRecords: 138,
  limit: 3,
  skip: 0,
};
