import React, { FC, ReactElement, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { BUTTON_TEXTS } from 'constants/buttonConstants';
import { PAGE_NAMES } from 'constants/commonConstants';
import { LINK_TEXTS } from 'constants/linkConstants';
import { FORUM_CONSTANTS } from 'constants/forumConstants';
import { PAGE_SIZE } from 'constants/paginationConstants';
import { ROUTE_CONSTANTS } from 'constants/routeConstants';
import { Button, Pagination } from 'components';
import { formatBigNumbers, formatDate } from 'utils';
import { topicsInfo, ITopic } from './mock';

import './forum.scss';

type TopicState = ITopic[] | []

const Forum: FC = (): ReactElement => {
  const [ topics, setTopics ] = useState<TopicState>([]);
  const [ totalRecords, setTotalRecords ] = useState<number>(0);

  useEffect(() => {
    setTopics(topicsInfo.data);
    setTotalRecords(topicsInfo.totalRecords);
  }, []);

  const showTopics = () => (
    topics.map(({ title, count_messages: count, date }) => {
      const formattedCount = formatBigNumbers(count);
      const formattedDate = formatDate(date);

      return (
        <div key={`${title}${count}`} className='topic'>
          <div className='topic-info'>
            <span className='topic-info-title uppercase'>{title}</span>
            <span className='topic-info-count'>({formattedCount})</span>
          </div>
          <span className='topic-date'>{formattedDate}</span>
        </div>
      );
    })
  );

  const getPagination = () => (
    <Pagination
      totalPages={Math.ceil(totalRecords / PAGE_SIZE)}
      onPageChange={() => console.log('I was clicked')}
      currentPage={1}
    />
  );

  return (
    <div className='main'>
      <div className='content-wrapper double'>
        <div className='content'>
          <h2>{PAGE_NAMES.FORUM}</h2>

          {topics.length
            ? (
              <>
                {showTopics()}
                {getPagination()}
              </>
            ) : <h3>{FORUM_CONSTANTS.FIRST_TOPIC}</h3>
          }

          <div className='content-links'>
            <Button onClick={() => console.log('create topic')} className='uppercase'>
              {BUTTON_TEXTS.NEW_TOPIC}
            </Button>
            <Link to={ROUTE_CONSTANTS.DASHBOARD} className='link'>
              {LINK_TEXTS.DASHBOARD}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forum;
