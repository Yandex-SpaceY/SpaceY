import React, { FC, ReactElement, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { getAllLeaderboard } from 'api/leaderboardApi';
import { PAGE_NAMES } from 'constants/commonConstants';
import { ERROR_CONSTANTS } from 'constants/errorConstants';
import { LINK_TEXTS } from 'constants/linkConstants';
import { LEADER_CONSTANTS, REQUEST_DATA } from 'constants/leaderConstants';
import { ROUTE_CONSTANTS } from 'constants/routeConstants';
import { ALERT_TEXTS } from 'constants/alertConstants';
import { Avatar, PageMeta } from 'components';
import { setAlert, setUserPending } from 'store/user/actions';
import { userUserDataSelector } from 'store/user/selectors';
import { formatBigNumbers, getImageUrl } from 'utils';

import './leaderboard.scss';

interface ILeaders {
  id: number,
  avatar: string | null,
  login: string,
  spaceScore: number,
  place?: number,
}
type LeaderState = ILeaders[] | []

const Leaderboard: FC = (): ReactElement => {
  const dispatch = useDispatch();
  const { id: userId } = useSelector(userUserDataSelector);

  const [ leaders, setLeaders ] = useState<LeaderState>([]);

  useEffect(() => {
    const getLeaders = async (): Promise<void> => {
      try {
        dispatch(setUserPending(true));

        let { data } = await getAllLeaderboard({
          ratingFieldName: REQUEST_DATA.SCORE_FIELD,
          cursor: 0,
          limit: REQUEST_DATA.LIMIT,
        });
        data = data.map((item: Record<string, ILeaders[]>) => item.data);

        if (data.length) {
          let dataToRender = [];
          let usersPlace = data.findIndex((item: ILeaders) => userId === item.id);
          const usersMaxScore = data[usersPlace];

          if (usersPlace >= REQUEST_DATA.LIMIT_PER_PAGE) {
            dataToRender = data.slice(0, REQUEST_DATA.LIMIT_PER_PAGE - 1);
            dataToRender.push({ ...usersMaxScore, place: ++usersPlace });
          } else {
            dataToRender = data.slice(0, REQUEST_DATA.LIMIT_PER_PAGE);
          }
          setLeaders(dataToRender);
        }
      } catch (err) {
        const message = err?.response?.data?.reason || err?.message || ERROR_CONSTANTS.DEFAULT_ERROR;
        const alert = {
          title: ALERT_TEXTS.LEADERBOARD,
          message,
          type: 'error'
        };

        dispatch(setAlert(alert));
      } finally {
        dispatch(setUserPending(false));
      }
    };

    getLeaders();
  }, []);

  const showLeaders = () => (
    leaders.map(({ id, place, avatar, login, spaceScore }, index ) => {
      const formattedPlace = formatBigNumbers(place || ++index);
      const formattedScore = formatBigNumbers(spaceScore);

      return (
        <div key={formattedPlace} className={cn('leader', id === userId && 'current-user')}>
          <div className='leader-info'>
            <span className='leader-info-place' title={formattedPlace}>{formattedPlace}</span>
            <Avatar src={getImageUrl(avatar)} className='avatar-small' />
          </div>
          <div className='leader-data'>
            <span className='leader-data-name' title={login}>{login}</span>
            <span title={formattedScore}>{formattedScore}</span>
          </div>
        </div>
      );
    })
  );

  return (
    <div className='main'>
      <PageMeta title={PAGE_NAMES.LEADERBOARD} />
      <div className='content-wrapper-leaderboard'>
        <div className='content'>
          <h2>{PAGE_NAMES.LEADERBOARD}</h2>

          {leaders.length
            ? showLeaders()
            : <h3 className='info-message'>{LEADER_CONSTANTS.BE_LEADER}</h3>
          }

          <div className='content-links'>
            <Link to={ROUTE_CONSTANTS.GAME} className='content-links-game'>
              {LINK_TEXTS.NEW_GAME}
            </Link>
            <Link to={ROUTE_CONSTANTS.GAME} className='link'>
              {LINK_TEXTS.GAME}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
