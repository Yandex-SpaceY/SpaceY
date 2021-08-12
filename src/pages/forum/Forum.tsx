import React, { FC, ReactElement, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getTopics, createTopic } from 'api/forumApi';
import { BUTTON_TEXTS } from 'constants/buttonConstants';
import { PAGE_NAMES } from 'constants/commonConstants';
import { ERROR_CONSTANTS } from 'constants/errorConstants';
import { LINK_TEXTS } from 'constants/linkConstants';
import { FORUM_CONSTANTS } from 'constants/forumConstants';
import { PAGE_SIZE } from 'constants/paginationConstants';
import { ROUTE_CONSTANTS } from 'constants/routeConstants';
import { Button, Input, Modal, PageMeta, Pagination } from 'components';
import { setUserPending } from 'store/user/actions';
import { userUserDataSelector } from 'store/user/selectors';
import { formatBigNumbers, formatDate } from 'utils';

import './forum.scss';

export interface ITopic {
  id: number;
  title: string,
  messagesCount: number,
  createdAt: number,
}

type TopicState = ITopic[] | []

const Forum: FC = (): ReactElement => {
  const dispatch = useDispatch();
  const { id } = useSelector(userUserDataSelector);

  const [ topics, setTopics ] = useState<TopicState>([]);
  const [ totalRecords, setTotalRecords ] = useState<number>(0);
  const [ currentPage, setCurrentPage ] = useState<number>(1);
  const [ isModalOpen, setIsModalOpen ] = useState<boolean>(false);
  const [ topicTitle, setTopicTitle ] = useState<string>('');

  useEffect(() => {
    getForumTopics();
  }, []);

  const getForumTopics = async (page = currentPage, limit = PAGE_SIZE): Promise<void> => {
    try {
      dispatch(setUserPending(true));

      const { data } = await getTopics(page, limit);

      if (data.payload.length) {
        setTopics(data.payload);
        setTotalRecords(data.totalRecords);
        setCurrentPage(page);
      }
    } catch (err) {
      console.error(err?.response?.data?.reason || err?.message || ERROR_CONSTANTS.DEFAULT_ERROR);
    } finally {
      dispatch(setUserPending(false));
    }
  };

  const showTopics = () => (
    topics.map(({ id, title, messagesCount: count, createdAt: date }) => {
      const formattedCount = formatBigNumbers(count);
      const formattedDate = formatDate(date);

      return (
        <div key={id} className='topic'>
          <div className='topic-info' onClick={() => console.log('add redirection to the topic here')}>
            <span className='topic-info-title uppercase'>{title}</span>
            <span className='topic-info-count'>({formattedCount})</span>
          </div>
          <span className='topic-date'>{formattedDate}</span>
        </div>
      );
    })
  );

  const getPagination = () => {
    if (totalRecords > PAGE_SIZE) {
      return (
        <Pagination
          totalPages={Math.ceil(totalRecords / PAGE_SIZE)}
          onPageChange={(page: number) => getForumTopics(page)}
          currentPage={currentPage}
        />
      );
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleClear = () => {
    setTopicTitle('');
    closeModal();
  };

  const createNewTopic = async () => {
    await createTopic({ userId: id, title: topicTitle });
    setIsModalOpen(false);
    setTopicTitle('');
    setCurrentPage(1);
    await getForumTopics(1);
  };

  return (
    <div className='main'>
      <PageMeta title={PAGE_NAMES.FORUM} />
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
            <Button onClick={openModal} className='uppercase'>
              {BUTTON_TEXTS.NEW_TOPIC}
            </Button>
            <Link to={ROUTE_CONSTANTS.GAME} className='link'>
              {LINK_TEXTS.GAME}
            </Link>
          </div>
          <Modal
            visible={isModalOpen}
            handleClear={handleClear}
            description={
              <Input
                value={topicTitle}
                name='topic'
                title='topic title'
                className='max-width'
                onChange={e => setTopicTitle(e.target.value)}
              />
            }
            actions={
              <>
                <Button children={BUTTON_TEXTS.SAVE} onClick={createNewTopic} />
                <Button children={BUTTON_TEXTS.CANCEL} onClick={handleClear} />
              </>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Forum;
