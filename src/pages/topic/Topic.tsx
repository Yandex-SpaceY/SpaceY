import React, { FC, ReactElement, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import cn from 'classnames';

import { createMessage, getCurrentTopic } from 'api/forumApi';
import { ALERT_TEXTS } from 'constants/alertConstants';
import { BUTTON_TEXTS } from 'constants/buttonConstants';
import { FORUM_CONSTANTS } from 'constants/forumConstants';
import { PAGE_NAMES } from 'constants/commonConstants';
import { ERROR_CONSTANTS } from 'constants/errorConstants';
import { LINK_TEXTS } from 'constants/linkConstants';
import { PAGE_SIZE } from 'constants/paginationConstants';
import { ROUTE_CONSTANTS } from 'constants/routeConstants';
import { Avatar, Button, Textarea, Modal, ModalContent, PageMeta, Pagination } from 'components';
import { setAlert, setUserPending } from 'store/user/actions';
import { userUserDataSelector } from 'store/user/selectors';
import { formatDate, DATE_FORMAT, getImageUrl } from 'utils';

import './topic.scss';

interface IMessage {
  id: number;
  text: string;
  login: string;
  createdAt: number;
  user: {
    login: string;
    avatar: string;
  }
}

interface IDetailedParams {
  id: string
}

type MessageState = IMessage[]

const Topic: FC<RouteComponentProps<IDetailedParams>> = ({ history, match }): ReactElement => {
  const dispatch = useDispatch();
  const { id: userId } = useSelector(userUserDataSelector);
  const topicId = Number(match.params.id);

  const [ messages, setMessages ] = useState<MessageState>([]);
  const [ totalRecords, setTotalRecords ] = useState<number>(0);
  const [ currentPage, setCurrentPage ] = useState<number>(1);
  const [ messageText, setMessageText ] = useState<string>('');
  const [ topicTitle, setTopicTitle ] = useState<string>('');
  const [ isModalOpen, setIsModalOpen ] = useState<boolean>(false);

  useEffect(() => {
    getMessages();
  }, [topicId]);

  const getMessages = async (page = currentPage, limit = PAGE_SIZE): Promise<void> => {
    try {
      dispatch(setUserPending(true));

      const { data: { payload } } = await getCurrentTopic(topicId, page, limit);

      setMessages(payload.messages);
      setTotalRecords(payload.messagesCount);
      setCurrentPage(page);
      setTopicTitle(payload.title);

      dispatch(setUserPending(false));
    } catch (err) {
      const message
        = err?.response?.data?.reason || err?.response?.data?.error || err?.message || ERROR_CONSTANTS.DEFAULT_ERROR;
      const alert = {
        title: ALERT_TEXTS.TOPIC,
        message,
        type: 'error'
      };

      dispatch(setUserPending(false));
      dispatch(setAlert(alert));

      history.replace('/forum');
    }
  };

  const showMessages = () => (
    messages.map(({ id, text, user: { login, avatar }, createdAt: date }) => {
      const formattedDate = formatDate(date, DATE_FORMAT.FULL_DATE);

      return (
        <div key={id} className='message'>
          <Avatar src={getImageUrl(avatar)} className='avatar-small' />
          <div className='message-content'>
            <div className='message-info'>
              <span>{login}</span>
              <span>{formattedDate}</span>
            </div>
            <span>{text}</span>
          </div>
        </div>
      );
    })
  );

  const getPagination = () => {
    if (totalRecords > PAGE_SIZE) {
      return (
        <Pagination
          totalPages={Math.ceil(totalRecords / PAGE_SIZE)}
          onPageChange={(page: number) => getMessages(page)}
          currentPage={currentPage}
        />
      );
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleClear = () => {
    setMessageText('');
    closeModal();
  };

  const addMessage = async () => {
    await createMessage({ userId, topicId, text: messageText });
    handleClear();
    setCurrentPage(1);
    await getMessages(1);
  };

  return (
    <div className='main forum-topic'>
      <PageMeta title={PAGE_NAMES.TOPIC} />
      <div className='content-wrapper double'>
        <div className='content'>
          <h2>{topicTitle}</h2>

          {messages.length
            ? (
              <>
                {showMessages()}
                {getPagination()}
              </>
            ) : <h3>{FORUM_CONSTANTS.FIRST_MESSAGE}</h3>
          }

          <Button onClick={openModal} className={cn('message-button', messages.length && 'reply')}>
            {messages.length ? BUTTON_TEXTS.REPLY : BUTTON_TEXTS.ADD}
          </Button>

          <div className='links-topic'>
            <Link to={ROUTE_CONSTANTS.FORUM} className='link'>
              {LINK_TEXTS.FORUM}
            </Link>
            <span className='link link-disabled'>&nbsp;/&nbsp;</span>
            <Link to={ROUTE_CONSTANTS.GAME} className='link'>
              {LINK_TEXTS.GAME}
            </Link>
          </div>

          <Modal
            visible={isModalOpen}
            handleClear={handleClear}
          >
            <ModalContent
              description={
                <>
                  <h2>{topicTitle}</h2>
                  <Textarea
                    value={messageText}
                    name='message'
                    placeholder={FORUM_CONSTANTS.ADD_TEXT}
                    rows={10}
                    onChange={e => setMessageText(e.target.value)}
                  />
                </>
              }
              actions={
                <>
                  <Button children={BUTTON_TEXTS.POST} onClick={addMessage} />
                  <Button children={BUTTON_TEXTS.CANCEL} onClick={handleClear} />
                </>
              }
            />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Topic);
